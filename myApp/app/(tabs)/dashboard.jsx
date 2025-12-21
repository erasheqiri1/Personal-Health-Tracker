
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { getRecipeOfDay, searchRecipeWithDetails } from "../../services/mealsAPI";
import { useWeather } from "../../services/weatherAPI";

import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
  cardSoft: "#EFE8CF",
};

export default function HealthWidgets({
  steps = 5432,
  stepGoal = 8000,
  sleepMinutes = 465,
}) {
  const [foodCalories, setFoodCalories] = useState(0);
  const [workoutCalories, setWorkoutCalories] = useState(0);

  // ======== LOCATION + OSM OVERPASS ========
  const [locStatus, setLocStatus] = useState("idle"); // idle | loading | ready | denied | error
  const [userCoords, setUserCoords] = useState(null); // { latitude, longitude }
  const [nearestPoi, setNearestPoi] = useState(null); // { name, latitude, longitude, distanceKm, type }
  const [poiError, setPoiError] = useState("");

  // ✅ Weather merret VETËM nga coords të expo-location
  const { weather, weatherLoading, weatherError } = useWeather(userCoords);

  const [recipeOfDay, setRecipeOfDay] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchRecipe, setSearchRecipe] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const mainRecipe = searchRecipe || recipeOfDay;

  const [sleepStart, setSleepStart] = useState(null);
  const [sleepDuration, setSleepDuration] = useState(sleepMinutes || 0);
  const isSleeping = !!sleepStart;

  const FAR_KM_THRESHOLD = 2.5;

  const getSleepComment = (mins) => {
    if (!mins || mins <= 0) return "";
    if (mins < 300) return "Jo gjum i mirë (më pak se 5 orë)";
    if (mins < 480) return "Gjum mesatar (5–8 orë)";
    return "Gjum shumë i mirë (më shumë se 8 orë)";
  };

  const formatSleep = (mins) => {
    if (!mins || mins <= 0) return "S’ka të dhëna për gjumin";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h} h ${m} m`;
  };

  // ======== HELPERS (distance + Overpass) ========
  const haversineKm = (a, b) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const s =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
    return R * c;
  };

  const buildOverpassQuery = (type, lat, lon, radius = 2500) => {
    const around = `around:${radius},${lat},${lon}`;

    if (type === "park") {
      return `
[out:json][timeout:20];
(
  node[leisure=park](${around});
  way[leisure=park](${around});
  relation[leisure=park](${around});
);
out center;`.trim();
    }

    return `
[out:json][timeout:20];
(
  node[leisure=fitness_centre](${around});
  way[leisure=fitness_centre](${around});
  relation[leisure=fitness_centre](${around});
  node[sport=fitness](${around});
  way[sport=fitness](${around});
  relation[sport=fitness](${around});
);
out center;`.trim();
  };

  const fetchNearestPoiOverpass = async (type, coords) => {
    const { latitude, longitude } = coords;

    const cacheKey = `nearest_poi_${type}_${latitude.toFixed(3)}_${longitude.toFixed(3)}`;
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }

    const query = buildOverpassQuery(type, latitude, longitude, 2500);

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);

    const json = await res.json();
    const els = Array.isArray(json.elements) ? json.elements : [];

    const candidates = els
      .map((el) => {
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        if (lat == null || lon == null) return null;

        const name = el.tags?.name || (type === "park" ? "Park" : "Fitness");

        const p = { latitude: Number(lat), longitude: Number(lon) };
        const distanceKm = haversineKm(coords, p);

        return {
          name,
          latitude: p.latitude,
          longitude: p.longitude,
          distanceKm: Number(distanceKm.toFixed(2)),
          type,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    const nearest = candidates[0] || null;

    if (nearest) {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(nearest));
    }

    return nearest;
  };

  // ======== WEATHER PARSING ========
  const temperature = weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
  const feelsLike = weather?.main?.feels_like != null ? Math.round(weather.main.feels_like) : null;
  const humidity = weather?.main?.humidity;
  const windSpeed = weather?.wind?.speed;
  const cityName = weather?.name;
  const descriptionEn = weather?.weather?.[0]?.description || "";
  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;

  const translateDesc = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("clear")) return "qiell i kthjellët";
    if (d.includes("cloud")) return "me re";
    if (d.includes("rain")) return "shi";
    if (d.includes("snow")) return "borë";
    if (d.includes("thunder")) return "stuhi";
    if (d.includes("mist") || d.includes("fog")) return "mjergull";
    return desc;
  };

  const descriptionSq = translateDesc(descriptionEn);

  // ======== PLAN (weather -> target poi type) ========
  const getActivityPlan = () => {
    if (temperature == null) return { text: "", poiType: null, mode: "none" };

    const d = descriptionEn.toLowerCase();
    const isRain = d.includes("rain") || d.includes("storm") || d.includes("drizzle");
    const isSnow = d.includes("snow");
    const isVeryCold = temperature < 0;
    const isCold = temperature >= 0 && temperature < 8;
    const isHot = temperature > 28;
    const isWarm = temperature >= 15 && temperature <= 25;

    if (isRain || isSnow) return { text: "Ka shi/borë – bëj ushtrime brenda (home workout, yoga ose stretching).", poiType: null, mode: "home" };
    if (isVeryCold) return { text: "Shumë ftohtë jashtë – temperaturat janë shumë të ulëta. Ushtroni në shtëpi.", poiType: null, mode: "home" };
    if (isHot) return { text: "Moti shumë i nxehtë – ec në mëngjes ose mbrëmje dhe pi shumë uj gjatë ditës.", poiType: null, mode: "light" };
    if (isCold) return { text: "Pak ftohtë – rekomandohet fitnesi më i afërt (ose ushtrime brenda).", poiType: "gym", mode: "gym" };
    if (isWarm && windSpeed != null && windSpeed < 8) return { text: "Kushtet perfekte për ecje 30–40 minuta jashtë ose një vrap të lehtë.", poiType: "park", mode: "outdoor" };
    if (isWarm) return { text: "Moti i mirë për aktivitet jashtë – bën një shëtitje të lehtë ose çiklizëm.", poiType: "park", mode: "outdoor" };

    return { text: "Zgjidh një aktivitet të lehtë – kombinim ecje jashtë dhe ushtrimesh brenda.", poiType: null, mode: "light" };
  };

  const plan = getActivityPlan();

  // ======== LOAD: calories/sleep/recipe + location ========
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const today = new Date().toISOString().slice(0, 10);
        const foodKey = `food_kcal_${today}`;
        const workoutKey = `workout_kcal_${today}`;

        const foodRawLocal = await AsyncStorage.getItem(foodKey);
        const workoutRawLocal = await AsyncStorage.getItem(workoutKey);

        let foodTotal = foodRawLocal ? Number(foodRawLocal) : 0;
        let workoutTotal = workoutRawLocal ? Number(workoutRawLocal) : 0;

        let localStart = null;
        let localMinutes = 0;

        try {
          const startIso = await AsyncStorage.getItem("sleep_start");
          const lastMinRaw = await AsyncStorage.getItem("sleep_lastMinutes");
          if (startIso) localStart = new Date(startIso);
          if (lastMinRaw) localMinutes = Number(lastMinRaw);
          else if (sleepMinutes) localMinutes = sleepMinutes;
        } catch (e) {
          console.log("Sleep load local error:", e);
        }

        setSleepStart(localStart);
        setSleepDuration(localMinutes);

        const user = auth.currentUser;
        if (user) {
          try {
            const foodDocRef = doc(db, "dailyIntake", user.uid, "days", today);
            const foodSnap = await getDoc(foodDocRef);
            if (foodSnap.exists()) {
              const data = foodSnap.data();
              const firestoreFood = Number(data.totalCalories || 0);
              if (firestoreFood > 0) {
                foodTotal = firestoreFood;
                await AsyncStorage.setItem(foodKey, String(foodTotal));
              }
            }

            const workoutDocRef = doc(db, "workoutDaily", `${user.uid}_${today}`);
            const workoutSnap = await getDoc(workoutDocRef);
            if (workoutSnap.exists()) {
              const data = workoutSnap.data();
              const firestoreWorkout = Number(data.totalCalories || 0);
              if (firestoreWorkout > 0) {
                workoutTotal = firestoreWorkout;
                await AsyncStorage.setItem(workoutKey, String(workoutTotal));
              }
            }

            const sleepDocRef = doc(db, "sleepDaily", user.uid, "days", today);
            const sleepSnap = await getDoc(sleepDocRef);
            if (sleepSnap.exists()) {
              const s = sleepSnap.data();
              if (s.startTime && !s.endTime) {
                const st = new Date(s.startTime);
                setSleepStart(st);
                await AsyncStorage.setItem("sleep_start", s.startTime);
                await AsyncStorage.removeItem("sleep_lastMinutes");
              } else if (s.endTime && s.minutes != null) {
                const mins = Number(s.minutes);
                setSleepStart(null);
                setSleepDuration(mins);
                await AsyncStorage.removeItem("sleep_start");
                await AsyncStorage.setItem("sleep_lastMinutes", String(mins));
              }
            }
          } catch (e) {
            console.log("HealthWidgets Firestore load error:", e);
          }
        }

        setFoodCalories(foodTotal);
        setWorkoutCalories(workoutTotal);
      };

      const loadRecipe = async () => {
        try {
          setRecipeLoading(true);
          setRecipeError("");
          const r = await getRecipeOfDay();
          if (!r) setRecipeError("S’ka recetë për momentin.");
          else setRecipeOfDay(r);
        } catch (e) {
          console.log("loadRecipe error:", e);
          setRecipeError("Gabim gjatë marrjes së recetës.");
        } finally {
          setRecipeLoading(false);
        }
      };

      const loadLocation = async () => {
        try {
          setLocStatus("loading");
          setPoiError("");

          const perm = await Location.requestForegroundPermissionsAsync();
          if (perm.status !== "granted") {
            setLocStatus("denied");
            setUserCoords(null);
            setNearestPoi(null);
            return;
          }

          const pos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          setUserCoords(coords);
          setLocStatus("ready");
        } catch (e) {
          console.log("Location error:", e);
          setLocStatus("error");
          setUserCoords(null);
          setNearestPoi(null);
        }
      };

      loadData();
      loadRecipe();
      loadLocation();
    }, [sleepMinutes])
  );

  // ======== When we have coords + weather plan, fetch nearest park/gym ========
  useEffect(() => {
    const run = async () => {
      try {
        setPoiError("");

        if (!userCoords || !plan.poiType) {
          setNearestPoi(null);
          return;
        }

        const type = plan.poiType; // "park" | "gym"
        const nearest = await fetchNearestPoiOverpass(type, userCoords);

        if (!nearest) {
          setNearestPoi(null);
          setPoiError(type === "park" ? "Nuk u gjet park afër." : "Nuk u gjet fitnes afër.");
          return;
        }

        if (nearest.distanceKm > FAR_KM_THRESHOLD) {
          setNearestPoi(null);
          setPoiError(type === "park" ? "Nuk keni park afër — ushtroni në shtëpi." : "Nuk keni fitnes afër — ushtroni në shtëpi.");
          return;
        }

        setNearestPoi(nearest);
      } catch (e) {
        console.log("Overpass fetch error:", e);
        setNearestPoi(null);
        setPoiError("Gabim gjatë kërkimit të lokacioneve afër.");
      }
    };

    run();
  }, [userCoords, plan.poiType, temperature, descriptionEn]);

  // ======== Activity text (final) ========
  const activitySuggestion = (() => {
    if (!plan.text) return "";

    if (nearestPoi && (plan.poiType === "park" || plan.poiType === "gym")) {
      if (plan.poiType === "park") {
        return `Pasiqë moti është i mirë, mund të dilni për ecje. Lokacioni më i afërt: ${nearestPoi.name} (${nearestPoi.distanceKm} km).`;
      }
      return `Temperaturat janë të ftohta – rekomandohet fitnesi më i afërt: ${nearestPoi.name} (${nearestPoi.distanceKm} km).`;
    }

    if (plan.poiType && poiError) return poiError;

    return plan.text;
  })();

  // ======== Sleep handlers ========
  const handleStartSleep = async () => {
    const now = new Date();
    setSleepStart(now);

    await AsyncStorage.setItem("sleep_start", now.toISOString());
    await AsyncStorage.removeItem("sleep_lastMinutes");

    const user = auth.currentUser;
    if (user) {
      const today = new Date().toISOString().slice(0, 10);
      const sleepDocRef = doc(db, "sleepDaily", user.uid, "days", today);
      try {
        await setDoc(sleepDocRef, { startTime: now.toISOString(), endTime: null, minutes: 0 }, { merge: true });
      } catch (e) {
        console.log("Start sleep Firestore error:", e);
      }
    }
  };

  const handleStopSleep = async () => {
    try {
      if (!sleepStart) return;
      const now = new Date();
      const diffMs = now.getTime() - sleepStart.getTime();
      const mins = Math.max(0, Math.round(diffMs / 60000));

      setSleepDuration(mins);
      setSleepStart(null);

      await AsyncStorage.removeItem("sleep_start");
      await AsyncStorage.setItem("sleep_lastMinutes", String(mins));

      const user = auth.currentUser;
      if (user) {
        const today = new Date().toISOString().slice(0, 10);
        const sleepDocRef = doc(db, "sleepDaily", user.uid, "days", today);
        try {
          await setDoc(sleepDocRef, { endTime: now.toISOString(), minutes: mins }, { merge: true });
        } catch (e) {
          console.log("Stop sleep Firestore error:", e);
        }
      }
    } catch (e) {
      console.log("Stop sleep error:", e);
    }
  };

  // ======== Recipe search handlers ========
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSearchRecipe(null);
      setSearchError("");
    }
  };

  const handleSearch = async () => {
    const q = searchText.trim();
    if (!q) {
      setSearchRecipe(null);
      setSearchError("");
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");
      const r = await searchRecipeWithDetails(q);
      if (!r) {
        setSearchRecipe(null);
        setSearchError("S’u gjet asnjë recetë.");
      } else {
        setSearchRecipe(r);
      }
    } catch (e) {
      console.log("searchRecipe error:", e);
      setSearchRecipe(null);
      setSearchError("Gabim gjatë kërkimit të recetës.");
    } finally {
      setSearchLoading(false);
    }
  };

  // ======== Map region helpers ========
  const mapRegion = userCoords
    ? { latitude: userCoords.latitude, longitude: userCoords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }
    : { latitude: 42.6629, longitude: 21.1655, latitudeDelta: 0.05, longitudeDelta: 0.05 };

  const lineCoords =
    userCoords && nearestPoi
      ? [
          { latitude: userCoords.latitude, longitude: userCoords.longitude },
          { latitude: nearestPoi.latitude, longitude: nearestPoi.longitude },
        ]
      : null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.page }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cards}>
        {/* MOTI */}
        <View style={[styles.cardBase, styles.weatherCard]}>
          <View style={styles.weatherHeaderRow}>
            <Text style={styles.weatherTitle}>Moti sot</Text>
            {cityName && <Text style={styles.weatherCitySmall}>{cityName}</Text>}
          </View>

          {weatherLoading && <Text style={styles.loadingText}>Duke u ngarkuar...</Text>}
          {!weatherLoading && weatherError && <Text style={styles.errorText}>{weatherError}</Text>}

          {!weatherLoading && !weatherError && temperature !== null && (
            <View>
              <View style={styles.weatherMainRow}>
                <View style={styles.weatherLeft}>
                  <Text style={styles.weatherTemp}>{temperature}°</Text>
                  <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
                  <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
                </View>

                <View style={styles.weatherRight}>
                  {iconUrl ? (
                    <Image source={{ uri: iconUrl }} style={styles.weatherIconImg} resizeMode="contain" />
                  ) : (
                    <Text style={styles.weatherIconEmoji}>☀️</Text>
                  )}

                  <View style={styles.weatherMiniRow}>
                    {feelsLike !== null && <Text style={styles.weatherMiniText}>Ndjehet: {feelsLike}°</Text>}
                    {humidity != null && <Text style={styles.weatherMiniText}>Lagështia: {humidity}%</Text>}
                    {windSpeed != null && <Text style={styles.weatherMiniText}>Era: {windSpeed} m/s</Text>}
                  </View>
                </View>
              </View>

              {activitySuggestion !== "" && (
                <View style={styles.activityBox}>
                  <Text style={styles.activityTitle}>Sugjerim aktiviteti</Text>
                  <Text style={styles.activityText}>{activitySuggestion}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* HARTA */}
        <View style={[styles.cardBase, styles.mapCard]}>
          <View style={styles.mapHeaderRow}>
            <Text style={styles.title}>Afër meje</Text>
            {nearestPoi && (
              <Text style={styles.mapHeaderSmall}>
                {nearestPoi.type === "park" ? "Park" : "Fitnes"} • {nearestPoi.distanceKm} km
              </Text>
            )}
          </View>

          {locStatus === "loading" && <Text style={styles.loadingText}>Duke marrë lokacionin...</Text>}

          {locStatus === "denied" && (
            <Text style={styles.errorText}>
              Lokacioni nuk u lejua. Lejo location që harta të tregojë “ku je” dhe sugjerimet afër.
            </Text>
          )}

          {locStatus === "error" && <Text style={styles.errorText}>Gabim gjatë marrjes së lokacionit.</Text>}

          {locStatus === "ready" && (
            <>
              <View style={styles.mapWrap}>
                <MapView style={styles.map} initialRegion={mapRegion}>
                  {userCoords && (
                    <Marker coordinate={userCoords} title="Ti je këtu" description="Lokacioni yt aktual" />
                  )}

                  {nearestPoi && (
                    <Marker
                      coordinate={{ latitude: nearestPoi.latitude, longitude: nearestPoi.longitude }}
                      title={nearestPoi.name}
                      description={nearestPoi.type === "park" ? "Park i afërt" : "Fitnes i afërt"}
                    />
                  )}

                  {lineCoords && <Polyline coordinates={lineCoords} strokeWidth={3} />}
                </MapView>
              </View>

              {nearestPoi ? (
                <Text style={styles.mapNote}>
                  Lokacioni më i afërt: <Text style={styles.mapNoteBold}>{nearestPoi.name}</Text> ({nearestPoi.distanceKm} km)
                </Text>
              ) : (
                <Text style={styles.mapNote}>
                  {plan.poiType && poiError ? poiError : "S’ka destinacion të sugjeruar për momentin."}
                </Text>
              )}
            </>
          )}
        </View>

        {/* GJUMI */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Gjumi</Text>

          <View style={styles.sleepRow}>
            <Text style={styles.moon}>🌙</Text>
            <View>
              <Text style={styles.sleepTime}>{formatSleep(sleepDuration)}</Text>
              {sleepDuration > 0 && <Text style={styles.sleepLabel}>{getSleepComment(sleepDuration)}</Text>}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.sleepBtn, isSleeping ? styles.sleepBtnStop : styles.sleepBtnStart]}
            onPress={isSleeping ? handleStopSleep : handleStartSleep}
          >
            <Text style={styles.sleepBtnText}>{isSleeping ? "Ndale gjumin" : "Fillo gjumin"}</Text>
          </TouchableOpacity>

          {isSleeping && <Text style={styles.sleepStatusText}>Gjumi është duke u matur...</Text>}
        </View>

        {/* RECETA */}
        <View style={[styles.cardBase, styles.cardTall]}>
          <Text style={styles.title}>Recetë e shëndetshme</Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchLabel}>Kërko recetë:</Text>
            <TextInput
              placeholder="shkruaj p.sh. salad, pasta..."
              placeholderTextColor="#777"
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearchTextChange}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Text style={styles.searchBtnText}>Kërko</Text>
            </TouchableOpacity>
          </View>

          {searchLoading && <Text style={styles.loadingText}>Duke kërkuar...</Text>}
          {!!searchError && <Text style={styles.errorText}>{searchError}</Text>}

          {!searchRecipe && recipeLoading && <Text style={styles.loadingText}>Duke u ngarkuar receta...</Text>}
          {!searchRecipe && !!recipeError && <Text style={styles.errorText}>{recipeError}</Text>}

          {mainRecipe && (
            <View style={styles.recipeContainer}>
              <View style={styles.recipeRow}>
                {mainRecipe.image && <Image source={{ uri: mainRecipe.image }} style={styles.recipeImage} />}
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.recipeTitle}>{mainRecipe.title}</Text>
                  <Text style={styles.recipeMeta}>
                    {mainRecipe.readyInMinutes ? `Gati për ${mainRecipe.readyInMinutes} min` : ""}
                    {mainRecipe.servings ? ` • Porcione: ${mainRecipe.servings}` : ""}
                  </Text>
                </View>
              </View>

              <Text style={styles.recipeSectionTitle}>Përbërësit:</Text>
              {(mainRecipe.extendedIngredients || []).slice(0, 4).map((ing, idx) => (
                <Text key={ing.id || `${ing.original}-${idx}`} style={styles.recipeBullet}>
                  • {ing.original}
                </Text>
              ))}

              <Text style={styles.recipeSectionTitle}>Hapat:</Text>
              {((mainRecipe.analyzedInstructions || [])[0]?.steps || []).slice(0, 3).map((step) => (
                <Text key={step.number} style={styles.recipeStep}>
                  {step.number}. {step.step}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* KALORITË */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Kaloritë e konsumuara</Text>
          <View style={styles.calRow}>
            <Text style={styles.fire}>🔥</Text>
            <View>
              <Text style={styles.calNum}>{foodCalories}</Text>
              <Text style={styles.calLabel}>kalori sot</Text>
            </View>
          </View>
        </View>

        <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
          <Text style={styles.title}>Kaloritë e djegura</Text>
          <View style={styles.calRow}>
            <Text style={styles.fire}>🏋️</Text>
            <View>
              <Text style={styles.calNum}>{workoutCalories}</Text>
              <Text style={styles.calLabel}>kalori sot</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingVertical: 10, paddingBottom: 110 },
  cards: { flex: 1, width: "100%", alignItems: "center", justifyContent: "flex-start", paddingVertical: 6 },

  cardBase: {
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 10,
  },

  lastCard: { marginBottom: 0 },
  cardTall: { minHeight: 240 },
  cardSmall: { minHeight: 135 },

  title: { fontSize: 15, color: COLORS.textDark, marginBottom: 6, fontWeight: "700" },

  sleepRow: { flexDirection: "row", alignItems: "center" },
  moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
  sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  sleepLabel: { fontSize: 13, color: COLORS.textDark },

  sleepBtn: { marginTop: 10, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, alignSelf: "flex-start" },
  sleepBtnStart: { backgroundColor: COLORS.green },
  sleepBtnStop: { backgroundColor: "#b3261e" },
  sleepBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  sleepStatusText: { marginTop: 6, fontSize: 12, color: COLORS.textDark, opacity: 0.8 },

  calRow: { flexDirection: "row", alignItems: "center" },
  fire: { fontSize: 30, marginRight: 10 },
  calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  calLabel: { fontSize: 13, color: COLORS.textDark },

  weatherCard: { backgroundColor: "#E6DFC5", borderRadius: 22, paddingVertical: 16, paddingHorizontal: 18 },
  weatherHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  weatherTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textDark },
  weatherCitySmall: { fontSize: 13, color: COLORS.textDark, opacity: 0.8 },
  loadingText: { marginTop: 8, fontSize: 13, color: COLORS.textDark },
  weatherMainRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  weatherLeft: { flex: 1 },
  weatherTemp: { fontSize: 40, fontWeight: "700", color: COLORS.green },
  weatherDescMain: { fontSize: 16, fontWeight: "600", color: COLORS.textDark, marginTop: 2 },
  weatherDescSub: { fontSize: 12, color: COLORS.textDark, opacity: 0.7 },
  weatherRight: { alignItems: "flex-end", justifyContent: "center", flex: 1 },
  weatherIconImg: { width: 60, height: 60, marginBottom: 4 },
  weatherIconEmoji: { fontSize: 32, marginBottom: 4 },
  weatherMiniRow: { alignItems: "flex-end" },
  weatherMiniText: { fontSize: 11, color: COLORS.textDark, opacity: 0.8 },

  activityBox: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, backgroundColor: COLORS.cardSoft },
  activityTitle: { fontSize: 13, fontWeight: "600", color: COLORS.textDark, marginBottom: 2 },
  activityText: { fontSize: 12, color: COLORS.textDark },

  errorText: { fontSize: 13, color: "red", marginTop: 4 },

  searchBox: { marginBottom: 8 },
  searchLabel: { fontSize: 13, color: COLORS.textDark, marginBottom: 4 },
  searchInput: { height: 36, borderRadius: 10, borderWidth: 1, borderColor: "rgba(0,0,0,0.15)", paddingHorizontal: 10, fontSize: 13, backgroundColor: COLORS.page, marginBottom: 6 },
  searchBtn: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: COLORS.green },
  searchBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  recipeContainer: { marginTop: 10 },
  recipeRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  recipeImage: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#ccc" },
  recipeTitle: { fontSize: 14, fontWeight: "600", color: COLORS.textDark },
  recipeMeta: { fontSize: 11, color: "#555", marginTop: 2 },
  recipeSectionTitle: { marginTop: 4, fontSize: 13, fontWeight: "600", color: COLORS.textDark },
  recipeBullet: { fontSize: 12, color: "#444" },
  recipeStep: { fontSize: 12, color: "#444" },

  mapCard: { backgroundColor: COLORS.card, paddingBottom: 14 },
  mapHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  mapHeaderSmall: { fontSize: 12, color: COLORS.textDark, opacity: 0.8, marginBottom: 6 },
  mapWrap: { marginTop: 6, width: "100%", height: 200, borderRadius: 16, overflow: "hidden", backgroundColor: "#ddd" },
  map: { width: "100%", height: "100%" },
  mapNote: { marginTop: 8, fontSize: 12, color: COLORS.textDark, opacity: 0.85 },
  mapNoteBold: { fontWeight: "700", color: COLORS.textDark },
});
