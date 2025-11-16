// // // // // // // // //kodi funksional i fazes se pare
// // // // // // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // // // // // import { useFocusEffect } from "expo-router";
// // // // // // // // // import React, { useCallback, useState } from "react";
// // // // // // // // // import { StyleSheet, Text, View } from "react-native";

// // // // // // // // // const COLORS = {
// // // // // // // // //   green: "#355E3B",
// // // // // // // // //   page: "#F7F4E9",
// // // // // // // // //   card: "#E6DFC5",
// // // // // // // // //   textDark: "#2E2E2E",
// // // // // // // // //   cardSoft: "#EFE8CF",
// // // // // // // // // };

// // // // // // // // // export default function HealthWidgets({
// // // // // // // // //   steps = 5432,
// // // // // // // // //   stepGoal = 8000,
// // // // // // // // //   sleepMinutes = 465, 
// // // // // // // // // }) {
// // // // // // // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // // // // // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // // // // // // //   useFocusEffect(
// // // // // // // // //     useCallback(() => {
// // // // // // // // //       const loadData = async () => {
// // // // // // // // //         const today = new Date().toISOString().slice(0, 10);

// // // // // // // // //         const keys = await AsyncStorage.getAllKeys();
// // // // // // // // //         let foodTotal = 0;
// // // // // // // // //         for (const key of keys) {
// // // // // // // // //           if (key.startsWith("food_") && key.includes(today)) {
// // // // // // // // //             const raw = await AsyncStorage.getItem(key);
// // // // // // // // //             if (!raw) continue;
// // // // // // // // //             try {
// // // // // // // // //               const data = JSON.parse(raw);
// // // // // // // // //               if (data?.total) foodTotal += data.total;
// // // // // // // // //             } catch {}
// // // // // // // // //           }
// // // // // // // // //         }

// // // // // // // // //         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
// // // // // // // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // // // // // // //         setFoodCalories(foodTotal);
// // // // // // // // //         setWorkoutCalories(workoutTotal);
// // // // // // // // //       };

// // // // // // // // //       loadData();
// // // // // // // // //       return () => {};
// // // // // // // // //     }, [])
// // // // // // // // //   );

// // // // // // // // //   const progress = Math.min(steps / stepGoal, 1);
// // // // // // // // //   const angle = `${360 * progress}deg`;
// // // // // // // // //   const hours = Math.floor(sleepMinutes / 60);
// // // // // // // // //   const mins = sleepMinutes % 60;

// // // // // // // // //   return (
// // // // // // // // //     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
// // // // // // // // //       <View style={styles.cards}>
// // // // // // // // //         {/*numrues hapash*/}
// // // // // // // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // // // // // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // // // // // // //           <View style={styles.circleWrap}>
// // // // // // // // //             <View style={[styles.progressCircle, { backgroundColor: COLORS.cardSoft }]}>
// // // // // // // // //               <View
// // // // // // // // //                 style={[
// // // // // // // // //                   styles.progressFill,
// // // // // // // // //                   {
// // // // // // // // //                     transform: [{ rotate: angle }],
// // // // // // // // //                     borderTopColor: COLORS.green,
// // // // // // // // //                     borderRightColor: COLORS.green,
// // // // // // // // //                   },
// // // // // // // // //                 ]}
// // // // // // // // //               />
// // // // // // // // //               <View style={styles.innerCircle}>
// // // // // // // // //                 <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
// // // // // // // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // // // // // // //               </View>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Gjumi */}
// // // // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // // // //           <Text style={styles.title}>Gjumi</Text>
// // // // // // // // //           <View style={styles.sleepRow}>
// // // // // // // // //             <Text style={styles.moon}>🌙</Text>
// // // // // // // // //             <View>
// // // // // // // // //               <Text style={styles.sleepTime}>
// // // // // // // // //                 {hours} h {mins} m
// // // // // // // // //               </Text>
// // // // // // // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Kaloritë e konsumuara */}
// // // // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // // // // // // //           <View style={styles.calRow}>
// // // // // // // // //             <Text style={styles.fire}>🔥</Text>
// // // // // // // // //             <View>
// // // // // // // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Kaloritë e djegura */}
// // // // // // // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // // // // // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // // // // // // //           <View style={styles.calRow}>
// // // // // // // // //             <Text style={styles.fire}>🏋️</Text>
// // // // // // // // //             <View>
// // // // // // // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </View>
// // // // // // // // //       </View>
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: { flex: 1, alignItems: "center", paddingVertical: 10 },

// // // // // // // // //   cards: {
// // // // // // // // //     flex: 1,
// // // // // // // // //     width: "100%",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     justifyContent: "flex-start",
// // // // // // // // //     paddingVertical: 6,
// // // // // // // // //   },

// // // // // // // // //   cardBase: {
// // // // // // // // //     width: "90%",
// // // // // // // // //     backgroundColor: COLORS.card,
// // // // // // // // //     borderRadius: 18,
// // // // // // // // //     padding: 18,
// // // // // // // // //     elevation: 3,
// // // // // // // // //     shadowColor: "#000",
// // // // // // // // //     shadowOpacity: 0.04,
// // // // // // // // //     shadowRadius: 2,
// // // // // // // // //     shadowOffset: { width: 0, height: 2 },
// // // // // // // // //     marginBottom: 10,
// // // // // // // // //   },
// // // // // // // // //   lastCard: { marginBottom: 0 },

// // // // // // // // //   cardTall: { minHeight: 240 }, 
// // // // // // // // //   cardSmall: { minHeight: 135 }, 

// // // // // // // // //   title: { fontSize: 15, color: COLORS.textDark, marginBottom: 6, fontWeight: "700" },


// // // // // // // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // // // // // // //   progressCircle: {
// // // // // // // // //     width: 150,  
// // // // // // // // //     height: 150,
// // // // // // // // //     borderRadius: 75,
// // // // // // // // //     justifyContent: "center",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     position: "relative",
// // // // // // // // //   },
// // // // // // // // //   progressFill: {
// // // // // // // // //     position: "absolute",
// // // // // // // // //     width: "100%",
// // // // // // // // //     height: "100%",
// // // // // // // // //     borderRadius: 75,
// // // // // // // // //     borderWidth: 14,
// // // // // // // // //     borderLeftColor: "transparent",
// // // // // // // // //     borderBottomColor: "transparent",
// // // // // // // // //   },
// // // // // // // // //   innerCircle: {
// // // // // // // // //     width: 100,
// // // // // // // // //     height: 100,
// // // // // // // // //     borderRadius: 50,
// // // // // // // // //     backgroundColor: COLORS.page,
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     justifyContent: "center",
// // // // // // // // //   },
// // // // // // // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // // // // // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },


// // // // // // // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // // // // // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // // // // // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },


// // // // // // // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // // // // // // //   fire: { fontSize: 30, marginRight: 10 },
// // // // // // // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // // // //   calLabel: { fontSize: 13, color: COLORS.textDark },
// // // // // // // // // });
// // // // // // // // //MOS E FSHI FAZEN E PARE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// // // // // // // // //prova e re me API te motit-po funksionon
// // // // // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // // // // import * as Location from "expo-location"; // GPS për mobile
// // // // // // // // import { useFocusEffect } from "expo-router";
// // // // // // // // import React, { useCallback, useEffect, useState } from "react";
// // // // // // // // import { Platform, StyleSheet, Text, View } from "react-native";

// // // // // // // // const COLORS = {
// // // // // // // //   green: "#355E3B",
// // // // // // // //   page: "#F7F4E9",
// // // // // // // //   card: "#E6DFC5",
// // // // // // // //   textDark: "#2E2E2E",
// // // // // // // //   cardSoft: "#EFE8CF",
// // // // // // // // };

// // // // // // // // const OPEN_WEATHER_API_KEY = "a53564ca78a5eb1e44612c01f6485a43"; // 🔴 vendose API key

// // // // // // // // export default function HealthWidgets({
// // // // // // // //   steps = 5432,
// // // // // // // //   stepGoal = 8000,
// // // // // // // //   sleepMinutes = 465,
// // // // // // // // }) {
// // // // // // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // // // // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // // // // // //   // ---- STATE për motin ----
// // // // // // // //   const [weather, setWeather] = useState(null);
// // // // // // // //   const [weatherLoading, setWeatherLoading] = useState(true);
// // // // // // // //   const [weatherError, setWeatherError] = useState(null);

// // // // // // // //   // ======================
// // // // // // // //   // 1) Leximi i kalorive nga AsyncStorage
// // // // // // // //   // ======================
// // // // // // // //   useFocusEffect(
// // // // // // // //     useCallback(() => {
// // // // // // // //       const loadData = async () => {
// // // // // // // //         const today = new Date().toISOString().slice(0, 10);

// // // // // // // //         const keys = await AsyncStorage.getAllKeys();
// // // // // // // //         let foodTotal = 0;
// // // // // // // //         for (const key of keys) {
// // // // // // // //           if (key.startsWith("food_") && key.includes(today)) {
// // // // // // // //             const raw = await AsyncStorage.getItem(key);
// // // // // // // //             if (!raw) continue;
// // // // // // // //             try {
// // // // // // // //               const data = JSON.parse(raw);
// // // // // // // //               if (data?.total) foodTotal += data.total;
// // // // // // // //             } catch {}
// // // // // // // //           }
// // // // // // // //         }

// // // // // // // //         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
// // // // // // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // // // // // //         setFoodCalories(foodTotal);
// // // // // // // //         setWorkoutCalories(workoutTotal);
// // // // // // // //       };

// // // // // // // //       loadData();
// // // // // // // //       return () => {};
// // // // // // // //     }, [])
// // // // // // // //   );

// // // // // // // //   // ======================
// // // // // // // //   // 2) Marrja e lokacionit:
// // // // // // // //   //    - në mobile: GPS (expo-location)
// // // // // // // //   //    - në Web: IP-based location (ipapi.co)
// // // // // // // //   // ======================
// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchWeather = async () => {
// // // // // // // //       try {
// // // // // // // //         setWeatherLoading(true);
// // // // // // // //         setWeatherError(null);

// // // // // // // //         let latitude;
// // // // // // // //         let longitude;
// // // // // // // //         let cityFromIP = null;

// // // // // // // //         if (Platform.OS === "web") {
// // // // // // // //           // ⭐ WEB: përdor IP-based location
// // // // // // // //           const geoRes = await fetch("https://ipapi.co/json/");
// // // // // // // //           if (!geoRes.ok) {
// // // // // // // //             throw new Error("Gabim gjatë marrjes së lokacionit (IP)");
// // // // // // // //           }
// // // // // // // //           const geoData = await geoRes.json();
// // // // // // // //           latitude = geoData.latitude;
// // // // // // // //           longitude = geoData.longitude;
// // // // // // // //           cityFromIP = geoData.city;
// // // // // // // //         } else {
// // // // // // // //           // 📱 MOBILE: përdor GPS (expo-location)
// // // // // // // //           const { status } = await Location.requestForegroundPermissionsAsync();
// // // // // // // //           if (status !== "granted") {
// // // // // // // //             setWeatherError("Leja për lokacion u refuzua");
// // // // // // // //             return;
// // // // // // // //           }

// // // // // // // //           const position = await Location.getCurrentPositionAsync({});
// // // // // // // //           latitude = position.coords.latitude;
// // // // // // // //           longitude = position.coords.longitude;
// // // // // // // //         }

// // // // // // // //         if (!latitude || !longitude) {
// // // // // // // //           throw new Error("Koordinatat nuk u gjetën");
// // // // // // // //         }

// // // // // // // //         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
// // // // // // // //         const res = await fetch(url);
// // // // // // // //         if (!res.ok) {
// // // // // // // //           throw new Error("Gabim gjatë marrjes së motit");
// // // // // // // //         }

// // // // // // // //         const data = await res.json();

// // // // // // // //         // nëse jemi në Web dhe API s’kthejnë city, përdor city nga IP
// // // // // // // //         if (Platform.OS === "web" && cityFromIP && !data.name) {
// // // // // // // //           data.name = cityFromIP;
// // // // // // // //         }

// // // // // // // //         setWeather(data);
// // // // // // // //       } catch (err) {
// // // // // // // //   console.log("WEATHER ERROR:", err);
// // // // // // // //   setWeatherError(err.message || "Gabim i panjohur");
// // // // // // // // }
// // // // // // // //  finally {
// // // // // // // //         setWeatherLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchWeather();
// // // // // // // //   }, []);

// // // // // // // //   // ======================
// // // // // // // //   // Llogaritjet ekzistuese
// // // // // // // //   // ======================
// // // // // // // //   const progress = Math.min(steps / stepGoal, 1);
// // // // // // // //   const angle = `${360 * progress}deg`;
// // // // // // // //   const hours = Math.floor(sleepMinutes / 60);
// // // // // // // //   const mins = sleepMinutes % 60;

// // // // // // // //   const temperature =
// // // // // // // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // // // // // // //   const cityName = weather?.name;
// // // // // // // //   const description = weather?.weather?.[0]?.description;

// // // // // // // //   return (
// // // // // // // //     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
// // // // // // // //       <View style={styles.cards}>
// // // // // // // //         {/* KARTA E MOTIT */}
// // // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // // //           <Text style={styles.title}>Moti sot</Text>

// // // // // // // //           {weatherLoading && <Text>Duke u ngarkuar...</Text>}

// // // // // // // //           {!weatherLoading && weatherError && (
// // // // // // // //             <Text style={styles.errorText}>{weatherError}</Text>
// // // // // // // //           )}

// // // // // // // //           {!weatherLoading && !weatherError && temperature !== null && (
// // // // // // // //             <View style={styles.weatherRow}>
// // // // // // // //               <Text style={styles.weatherIcon}>☀️</Text>
// // // // // // // //               <View>
// // // // // // // //                 <Text style={styles.weatherTemp}>{temperature}°C</Text>
// // // // // // // //                 <Text style={styles.weatherCity}>
// // // // // // // //                   {cityName || "Lokacioni yt"}
// // // // // // // //                 </Text>
// // // // // // // //                 <Text style={styles.weatherDesc}>
// // // // // // // //                   {description || "Pa të dhëna"}
// // // // // // // //                 </Text>
// // // // // // // //               </View>
// // // // // // // //             </View>
// // // // // // // //           )}
// // // // // // // //         </View>

// // // // // // // //         {/*numrues hapash*/}
// // // // // // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // // // // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // // // // // //           <View style={styles.circleWrap}>
// // // // // // // //             <View
// // // // // // // //               style={[
// // // // // // // //                 styles.progressCircle,
// // // // // // // //                 { backgroundColor: COLORS.cardSoft },
// // // // // // // //               ]}
// // // // // // // //             >
// // // // // // // //               <View
// // // // // // // //                 style={[
// // // // // // // //                   styles.progressFill,
// // // // // // // //                   {
// // // // // // // //                     transform: [{ rotate: angle }],
// // // // // // // //                     borderTopColor: COLORS.green,
// // // // // // // //                     borderRightColor: COLORS.green,
// // // // // // // //                   },
// // // // // // // //                 ]}
// // // // // // // //               />
// // // // // // // //               <View style={styles.innerCircle}>
// // // // // // // //                 <Text style={styles.stepCount}>
// // // // // // // //                   {steps.toLocaleString()}
// // // // // // // //                 </Text>
// // // // // // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // // // // // //               </View>
// // // // // // // //             </View>
// // // // // // // //           </View>
// // // // // // // //         </View>

// // // // // // // //         {/* Gjumi */}
// // // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // // //           <Text style={styles.title}>Gjumi</Text>
// // // // // // // //           <View style={styles.sleepRow}>
// // // // // // // //             <Text style={styles.moon}>🌙</Text>
// // // // // // // //             <View>
// // // // // // // //               <Text style={styles.sleepTime}>
// // // // // // // //                 {hours} h {mins} m
// // // // // // // //               </Text>
// // // // // // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // // // // // //             </View>
// // // // // // // //           </View>
// // // // // // // //         </View>

// // // // // // // //         {/* Kaloritë e konsumuara */}
// // // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // // // // // //           <View style={styles.calRow}>
// // // // // // // //             <Text style={styles.fire}>🔥</Text>
// // // // // // // //             <View>
// // // // // // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // // //             </View>
// // // // // // // //           </View>
// // // // // // // //         </View>

// // // // // // // //         {/* Kaloritë e djegura */}
// // // // // // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // // // // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // // // // // //           <View style={styles.calRow}>
// // // // // // // //             <Text style={styles.fire}>🏋️</Text>
// // // // // // // //             <View>
// // // // // // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // // //             </View>
// // // // // // // //           </View>
// // // // // // // //         </View>
// // // // // // // //       </View>
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: { flex: 1, alignItems: "center", paddingVertical: 10 },

// // // // // // // //   cards: {
// // // // // // // //     flex: 1,
// // // // // // // //     width: "100%",
// // // // // // // //     alignItems: "center",
// // // // // // // //     justifyContent: "flex-start",
// // // // // // // //     paddingVertical: 6,
// // // // // // // //   },

// // // // // // // //   cardBase: {
// // // // // // // //     width: "90%",
// // // // // // // //     backgroundColor: COLORS.card,
// // // // // // // //     borderRadius: 18,
// // // // // // // //     padding: 18,
// // // // // // // //     elevation: 3,
// // // // // // // //     shadowColor: "#000",
// // // // // // // //     shadowOpacity: 0.04,
// // // // // // // //     shadowRadius: 2,
// // // // // // // //     shadowOffset: { width: 0, height: 2 },
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   lastCard: { marginBottom: 0 },

// // // // // // // //   cardTall: { minHeight: 240 },
// // // // // // // //   cardSmall: { minHeight: 135 },

// // // // // // // //   title: {
// // // // // // // //     fontSize: 15,
// // // // // // // //     color: COLORS.textDark,
// // // // // // // //     marginBottom: 6,
// // // // // // // //     fontWeight: "700",
// // // // // // // //   },

// // // // // // // //   // STEPS
// // // // // // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // // // // // //   progressCircle: {
// // // // // // // //     width: 150,
// // // // // // // //     height: 150,
// // // // // // // //     borderRadius: 75,
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     position: "relative",
// // // // // // // //   },
// // // // // // // //   progressFill: {
// // // // // // // //     position: "absolute",
// // // // // // // //     width: "100%",
// // // // // // // //     height: "100%",
// // // // // // // //     borderRadius: 75,
// // // // // // // //     borderWidth: 14,
// // // // // // // //     borderLeftColor: "transparent",
// // // // // // // //     borderBottomColor: "transparent",
// // // // // // // //   },
// // // // // // // //   innerCircle: {
// // // // // // // //     width: 100,
// // // // // // // //     height: 100,
// // // // // // // //     borderRadius: 50,
// // // // // // // //     backgroundColor: COLORS.page,
// // // // // // // //     alignItems: "center",
// // // // // // // //     justifyContent: "center",
// // // // // // // //   },
// // // // // // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // // // // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // // //   // SLEEP
// // // // // // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // // // // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // // // // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // // //   // CALORIES
// // // // // // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // // // // // //   fire: { fontSize: 30, marginRight: 10 },
// // // // // // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // // //   // WEATHER
// // // // // // // //   weatherRow: { flexDirection: "row", alignItems: "center" },
// // // // // // // //   weatherIcon: { fontSize: 30, marginRight: 10 },
// // // // // // // //   weatherTemp: { fontSize: 22, fontWeight: "bold", color: COLORS.green },
// // // // // // // //   weatherCity: { fontSize: 14, color: COLORS.textDark },
// // // // // // // //   weatherDesc: { fontSize: 13, color: COLORS.textDark },
// // // // // // // //   errorText: { fontSize: 13, color: "red" },
// // // // // // // // });


// // // // // // // //ME KARTE TE DIZAJNUME
// // // // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // // // import * as Location from "expo-location";
// // // // // // // import { useFocusEffect } from "expo-router";
// // // // // // // import React, { useCallback, useEffect, useState } from "react";
// // // // // // // import { Image, Platform, StyleSheet, Text, View } from "react-native";

// // // // // // // const COLORS = {
// // // // // // //   green: "#355E3B",
// // // // // // //   page: "#F7F4E9",
// // // // // // //   card: "#E6DFC5",
// // // // // // //   textDark: "#2E2E2E",
// // // // // // //   cardSoft: "#EFE8CF",
// // // // // // // };

// // // // // // // const OPEN_WEATHER_API_KEY = "a53564ca78a5eb1e44612c01f6485a43";

// // // // // // // export default function HealthWidgets({
// // // // // // //   steps = 5432,
// // // // // // //   stepGoal = 8000,
// // // // // // //   sleepMinutes = 465,
// // // // // // // }) {
// // // // // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // // // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // // // // //   const [weather, setWeather] = useState(null);
// // // // // // //   const [weatherLoading, setWeatherLoading] = useState(true);
// // // // // // //   const [weatherError, setWeatherError] = useState(null);

// // // // // // //   // Leximi i kalorive
// // // // // // //   useFocusEffect(
// // // // // // //     useCallback(() => {
// // // // // // //       const loadData = async () => {
// // // // // // //         const today = new Date().toISOString().slice(0, 10);

// // // // // // //         const keys = await AsyncStorage.getAllKeys();
// // // // // // //         let foodTotal = 0;
// // // // // // //         for (const key of keys) {
// // // // // // //           if (key.startsWith("food_") && key.includes(today)) {
// // // // // // //             const raw = await AsyncStorage.getItem(key);
// // // // // // //             if (!raw) continue;
// // // // // // //             try {
// // // // // // //               const data = JSON.parse(raw);
// // // // // // //               if (data?.total) foodTotal += data.total;
// // // // // // //             } catch {}
// // // // // // //           }
// // // // // // //         }

// // // // // // //         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
// // // // // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // // // // //         setFoodCalories(foodTotal);
// // // // // // //         setWorkoutCalories(workoutTotal);
// // // // // // //       };

// // // // // // //       loadData();
// // // // // // //       return () => {};
// // // // // // //     }, [])
// // // // // // //   );

// // // // // // //   // Marrja e lokacionit & motit (Web: IP, Mobile: GPS)
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchWeather = async () => {
// // // // // // //       try {
// // // // // // //         setWeatherLoading(true);
// // // // // // //         setWeatherError(null);

// // // // // // //         let latitude;
// // // // // // //         let longitude;
// // // // // // //         let cityFromIP = null;

// // // // // // //         if (Platform.OS === "web") {
// // // // // // //           const geoRes = await fetch("https://ipapi.co/json/");
// // // // // // //           if (!geoRes.ok) {
// // // // // // //             throw new Error("Gabim gjatë marrjes së lokacionit (IP)");
// // // // // // //           }
// // // // // // //           const geoData = await geoRes.json();
// // // // // // //           latitude = geoData.latitude;
// // // // // // //           longitude = geoData.longitude;
// // // // // // //           cityFromIP = geoData.city;
// // // // // // //         } else {
// // // // // // //           const { status } = await Location.requestForegroundPermissionsAsync();
// // // // // // //           if (status !== "granted") {
// // // // // // //             setWeatherError("Leja për lokacion u refuzua");
// // // // // // //             return;
// // // // // // //           }

// // // // // // //           const position = await Location.getCurrentPositionAsync({});
// // // // // // //           latitude = position.coords.latitude;
// // // // // // //           longitude = position.coords.longitude;
// // // // // // //         }

// // // // // // //         if (!latitude || !longitude) {
// // // // // // //           throw new Error("Koordinatat nuk u gjetën");
// // // // // // //         }

// // // // // // //         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
// // // // // // //         const res = await fetch(url);
// // // // // // //         if (!res.ok) {
// // // // // // //           throw new Error("Gabim gjatë marrjes së motit");
// // // // // // //         }

// // // // // // //         const data = await res.json();

// // // // // // //         if (Platform.OS === "web" && cityFromIP && !data.name) {
// // // // // // //           data.name = cityFromIP;
// // // // // // //         }

// // // // // // //         setWeather(data);
// // // // // // //       } catch (err) {
// // // // // // //         console.log("WEATHER ERROR:", err);
// // // // // // //         setWeatherError(err.message || "Gabim i panjohur");
// // // // // // //       } finally {
// // // // // // //         setWeatherLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchWeather();
// // // // // // //   }, []);

// // // // // // //   // Llogaritje ekzistuese
// // // // // // //   const progress = Math.min(steps / stepGoal, 1);
// // // // // // //   const angle = `${360 * progress}deg`;
// // // // // // //   const hours = Math.floor(sleepMinutes / 60);
// // // // // // //   const mins = sleepMinutes % 60;

// // // // // // //   const temperature =
// // // // // // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // // // // // //   const feelsLike =
// // // // // // //     weather?.main?.feels_like != null
// // // // // // //       ? Math.round(weather.main.feels_like)
// // // // // // //       : null;
// // // // // // //   const humidity = weather?.main?.humidity;
// // // // // // //   const windSpeed = weather?.wind?.speed;
// // // // // // //   const cityName = weather?.name;
// // // // // // //   const descriptionEn = weather?.weather?.[0]?.description || "";
// // // // // // //   const iconCode = weather?.weather?.[0]?.icon;
// // // // // // //   const iconUrl = iconCode
// // // // // // //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// // // // // // //     : null;

// // // // // // //   // Përkthim i thjeshtë i përshkrimit
// // // // // // //   const translateDesc = (desc) => {
// // // // // // //     const d = desc.toLowerCase();
// // // // // // //     if (d.includes("clear")) return "qiell i kthjellët";
// // // // // // //     if (d.includes("cloud")) return "me re";
// // // // // // //     if (d.includes("rain")) return "shi";
// // // // // // //     if (d.includes("snow")) return "borë";
// // // // // // //     if (d.includes("thunder")) return "stuhi";
// // // // // // //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// // // // // // //     return desc; // default anglisht
// // // // // // //   };

// // // // // // //   const descriptionSq = translateDesc(descriptionEn);

// // // // // // //   return (
// // // // // // //     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
// // // // // // //       <View style={styles.cards}>
// // // // // // //         {/* KARTA E MOTIT – iPhone-style */}
// // // // // // //         <View style={[styles.cardBase, styles.weatherCard]}>
// // // // // // //           <View style={styles.weatherHeaderRow}>
// // // // // // //             <Text style={styles.weatherTitle}>Moti sot</Text>
// // // // // // //             {cityName && (
// // // // // // //               <Text style={styles.weatherCitySmall}>{cityName}</Text>
// // // // // // //             )}
// // // // // // //           </View>

// // // // // // //           {weatherLoading && <Text style={styles.loadingText}>Duke u ngarkuar...</Text>}

// // // // // // //           {!weatherLoading && weatherError && (
// // // // // // //             <Text style={styles.errorText}>{weatherError}</Text>
// // // // // // //           )}

// // // // // // //           {!weatherLoading && !weatherError && temperature !== null && (
// // // // // // //             <View style={styles.weatherMainRow}>
// // // // // // //               <View style={styles.weatherLeft}>
// // // // // // //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// // // // // // //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// // // // // // //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// // // // // // //               </View>

// // // // // // //               <View style={styles.weatherRight}>
// // // // // // //                 {iconUrl ? (
// // // // // // //                   <Image
// // // // // // //                     source={{ uri: iconUrl }}
// // // // // // //                     style={styles.weatherIconImg}
// // // // // // //                     resizeMode="contain"
// // // // // // //                   />
// // // // // // //                 ) : (
// // // // // // //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// // // // // // //                 )}
// // // // // // //                 <View style={styles.weatherMiniRow}>
// // // // // // //                   {feelsLike !== null && (
// // // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // // //                       Ndjehet: {feelsLike}°
// // // // // // //                     </Text>
// // // // // // //                   )}
// // // // // // //                   {humidity != null && (
// // // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // // //                       Lagështia: {humidity}%
// // // // // // //                     </Text>
// // // // // // //                   )}
// // // // // // //                   {windSpeed != null && (
// // // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // // //                       Era: {windSpeed} m/s
// // // // // // //                     </Text>
// // // // // // //                   )}
// // // // // // //                 </View>
// // // // // // //               </View>
// // // // // // //             </View>
// // // // // // //           )}
// // // // // // //         </View>

// // // // // // //         {/* Numrues hapash */}
// // // // // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // // // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // // // // //           <View style={styles.circleWrap}>
// // // // // // //             <View
// // // // // // //               style={[
// // // // // // //                 styles.progressCircle,
// // // // // // //                 { backgroundColor: COLORS.cardSoft },
// // // // // // //               ]}
// // // // // // //             >
// // // // // // //               <View
// // // // // // //                 style={[
// // // // // // //                   styles.progressFill,
// // // // // // //                   {
// // // // // // //                     transform: [{ rotate: angle }],
// // // // // // //                     borderTopColor: COLORS.green,
// // // // // // //                     borderRightColor: COLORS.green,
// // // // // // //                   },
// // // // // // //                 ]}
// // // // // // //               />
// // // // // // //               <View style={styles.innerCircle}>
// // // // // // //                 <Text style={styles.stepCount}>
// // // // // // //                   {steps.toLocaleString()}
// // // // // // //                 </Text>
// // // // // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // // // // //               </View>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Gjumi */}
// // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // //           <Text style={styles.title}>Gjumi</Text>
// // // // // // //           <View style={styles.sleepRow}>
// // // // // // //             <Text style={styles.moon}>🌙</Text>
// // // // // // //             <View>
// // // // // // //               <Text style={styles.sleepTime}>
// // // // // // //                 {hours} h {mins} m
// // // // // // //               </Text>
// // // // // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Kaloritë e konsumuara */}
// // // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // // // // //           <View style={styles.calRow}>
// // // // // // //             <Text style={styles.fire}>🔥</Text>
// // // // // // //             <View>
// // // // // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Kaloritë e djegura */}
// // // // // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // // // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // // // // //           <View style={styles.calRow}>
// // // // // // //             <Text style={styles.fire}>🏋️</Text>
// // // // // // //             <View>
// // // // // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         </View>
// // // // // // //       </View>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { flex: 1, alignItems: "center", paddingVertical: 10 },

// // // // // // //   cards: {
// // // // // // //     flex: 1,
// // // // // // //     width: "100%",
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "flex-start",
// // // // // // //     paddingVertical: 6,
// // // // // // //   },

// // // // // // //   cardBase: {
// // // // // // //     width: "90%",
// // // // // // //     backgroundColor: COLORS.card,
// // // // // // //     borderRadius: 18,
// // // // // // //     padding: 18,
// // // // // // //     elevation: 3,
// // // // // // //     shadowColor: "#000",
// // // // // // //     shadowOpacity: 0.06,
// // // // // // //     shadowRadius: 4,
// // // // // // //     shadowOffset: { width: 0, height: 3 },
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   lastCard: { marginBottom: 0 },

// // // // // // //   cardTall: { minHeight: 240 },
// // // // // // //   cardSmall: { minHeight: 135 },

// // // // // // //   title: {
// // // // // // //     fontSize: 15,
// // // // // // //     color: COLORS.textDark,
// // // // // // //     marginBottom: 6,
// // // // // // //     fontWeight: "700",
// // // // // // //   },

// // // // // // //   // STEPS
// // // // // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // // // // //   progressCircle: {
// // // // // // //     width: 150,
// // // // // // //     height: 150,
// // // // // // //     borderRadius: 75,
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //     position: "relative",
// // // // // // //   },
// // // // // // //   progressFill: {
// // // // // // //     position: "absolute",
// // // // // // //     width: "100%",
// // // // // // //     height: "100%",
// // // // // // //     borderRadius: 75,
// // // // // // //     borderWidth: 14,
// // // // // // //     borderLeftColor: "transparent",
// // // // // // //     borderBottomColor: "transparent",
// // // // // // //   },
// // // // // // //   innerCircle: {
// // // // // // //     width: 100,
// // // // // // //     height: 100,
// // // // // // //     borderRadius: 50,
// // // // // // //     backgroundColor: COLORS.page,
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "center",
// // // // // // //   },
// // // // // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // // // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // //   // SLEEP
// // // // // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // // // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // // // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // //   // CALORIES
// // // // // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // // // // //   fire: { fontSize: 30, marginRight: 10 },
// // // // // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // // //   // WEATHER – stil i ri
// // // // // // //   weatherCard: {
// // // // // // //     backgroundColor: "#E6DFC5",
// // // // // // //     borderRadius: 22,
// // // // // // //     paddingVertical: 16,
// // // // // // //     paddingHorizontal: 18,
// // // // // // //   },
// // // // // // //   weatherHeaderRow: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     marginBottom: 4,
// // // // // // //   },
// // // // // // //   weatherTitle: {
// // // // // // //     fontSize: 15,
// // // // // // //     fontWeight: "700",
// // // // // // //     color: COLORS.textDark,
// // // // // // //   },
// // // // // // //   weatherCitySmall: {
// // // // // // //     fontSize: 13,
// // // // // // //     color: COLORS.textDark,
// // // // // // //     opacity: 0.8,
// // // // // // //   },
// // // // // // //   loadingText: {
// // // // // // //     marginTop: 8,
// // // // // // //     fontSize: 13,
// // // // // // //     color: COLORS.textDark,
// // // // // // //   },
// // // // // // //   weatherMainRow: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     marginTop: 8,
// // // // // // //   },
// // // // // // //   weatherLeft: {
// // // // // // //     flex: 1,
// // // // // // //   },
// // // // // // //   weatherTemp: {
// // // // // // //     fontSize: 40,
// // // // // // //     fontWeight: "700",
// // // // // // //     color: COLORS.green,
// // // // // // //   },
// // // // // // //   weatherDescMain: {
// // // // // // //     fontSize: 16,
// // // // // // //     fontWeight: "600",
// // // // // // //     color: COLORS.textDark,
// // // // // // //     marginTop: 2,
// // // // // // //   },
// // // // // // //   weatherDescSub: {
// // // // // // //     fontSize: 12,
// // // // // // //     color: COLORS.textDark,
// // // // // // //     opacity: 0.7,
// // // // // // //   },
// // // // // // //   weatherRight: {
// // // // // // //     alignItems: "flex-end",
// // // // // // //     justifyContent: "center",
// // // // // // //     flex: 1,
// // // // // // //   },
// // // // // // //   weatherIconImg: {
// // // // // // //     width: 60,
// // // // // // //     height: 60,
// // // // // // //     marginBottom: 4,
// // // // // // //   },
// // // // // // //   weatherIconEmoji: {
// // // // // // //     fontSize: 32,
// // // // // // //     marginBottom: 4,
// // // // // // //   },
// // // // // // //   weatherMiniRow: {
// // // // // // //     alignItems: "flex-end",
// // // // // // //   },
// // // // // // //   weatherMiniText: {
// // // // // // //     fontSize: 11,
// // // // // // //     color: COLORS.textDark,
// // // // // // //     opacity: 0.8,
// // // // // // //   },
// // // // // // //   errorText: {
// // // // // // //     fontSize: 13,
// // // // // // //     color: "red",
// // // // // // //     marginTop: 4,
// // // // // // //   },
// // // // // // // });


// // // // // // //me api ne ven tjeter
// // // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // // import { useFocusEffect } from "expo-router";
// // // // // // import React, { useCallback, useState } from "react";
// // // // // // import { Image, StyleSheet, Text, View } from "react-native";

// // // // // // import { useWeather } from "../../services/weather"; // ⬅️ RREGULLO PATH NËSE DUHET

// // // // // // const COLORS = {
// // // // // //   green: "#355E3B",
// // // // // //   page: "#F7F4E9",
// // // // // //   card: "#E6DFC5",
// // // // // //   textDark: "#2E2E2E",
// // // // // //   cardSoft: "#EFE8CF",
// // // // // // };

// // // // // // export default function HealthWidgets({
// // // // // //   steps = 5432,
// // // // // //   stepGoal = 8000,
// // // // // //   sleepMinutes = 465,
// // // // // // }) {
// // // // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // // // //   // 🔹 Moti vjen prej hook-ut
// // // // // //   const { weather, weatherLoading, weatherError } = useWeather();

// // // // // //   // Leximi i kalorive
// // // // // //   useFocusEffect(
// // // // // //     useCallback(() => {
// // // // // //       const loadData = async () => {
// // // // // //         const today = new Date().toISOString().slice(0, 10);

// // // // // //         const keys = await AsyncStorage.getAllKeys();
// // // // // //         let foodTotal = 0;
// // // // // //         for (const key of keys) {
// // // // // //           if (key.startsWith("food_") && key.includes(today)) {
// // // // // //             const raw = await AsyncStorage.getItem(key);
// // // // // //             if (!raw) continue;
// // // // // //             try {
// // // // // //               const data = JSON.parse(raw);
// // // // // //               if (data?.total) foodTotal += data.total;
// // // // // //             } catch {}
// // // // // //           }
// // // // // //         }

// // // // // //         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
// // // // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // // // //         setFoodCalories(foodTotal);
// // // // // //         setWorkoutCalories(workoutTotal);
// // // // // //       };

// // // // // //       loadData();
// // // // // //       return () => {};
// // // // // //     }, [])
// // // // // //   );

// // // // // //   // Llogaritje ekzistuese
// // // // // //   const progress = Math.min(steps / stepGoal, 1);
// // // // // //   const angle = `${360 * progress}deg`;
// // // // // //   const hours = Math.floor(sleepMinutes / 60);
// // // // // //   const mins = sleepMinutes % 60;

// // // // // //   const temperature =
// // // // // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // // // // //   const feelsLike =
// // // // // //     weather?.main?.feels_like != null
// // // // // //       ? Math.round(weather.main.feels_like)
// // // // // //       : null;
// // // // // //   const humidity = weather?.main?.humidity;
// // // // // //   const windSpeed = weather?.wind?.speed;
// // // // // //   const cityName = weather?.name;
// // // // // //   const descriptionEn = weather?.weather?.[0]?.description || "";
// // // // // //   const iconCode = weather?.weather?.[0]?.icon;
// // // // // //   const iconUrl = iconCode
// // // // // //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// // // // // //     : null;

// // // // // //   // Përkthim i thjeshtë i përshkrimit
// // // // // //   const translateDesc = (desc) => {
// // // // // //     const d = desc.toLowerCase();
// // // // // //     if (d.includes("clear")) return "qiell i kthjellët";
// // // // // //     if (d.includes("cloud")) return "me re";
// // // // // //     if (d.includes("rain")) return "shi";
// // // // // //     if (d.includes("snow")) return "borë";
// // // // // //     if (d.includes("thunder")) return "stuhi";
// // // // // //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// // // // // //     return desc; // default anglisht
// // // // // //   };

// // // // // //   const descriptionSq = translateDesc(descriptionEn);

// // // // // //   return (
// // // // // //     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
// // // // // //       <View style={styles.cards}>
// // // // // //         {/* KARTA E MOTIT – iPhone-style */}
// // // // // //         <View style={[styles.cardBase, styles.weatherCard]}>
// // // // // //           <View style={styles.weatherHeaderRow}>
// // // // // //             <Text style={styles.weatherTitle}>Moti sot</Text>
// // // // // //             {cityName && (
// // // // // //               <Text style={styles.weatherCitySmall}>{cityName}</Text>
// // // // // //             )}
// // // // // //           </View>

// // // // // //           {weatherLoading && (
// // // // // //             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
// // // // // //           )}

// // // // // //           {!weatherLoading && weatherError && (
// // // // // //             <Text style={styles.errorText}>{weatherError}</Text>
// // // // // //           )}

// // // // // //           {!weatherLoading && !weatherError && temperature !== null && (
// // // // // //             <View style={styles.weatherMainRow}>
// // // // // //               <View style={styles.weatherLeft}>
// // // // // //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// // // // // //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// // // // // //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// // // // // //               </View>

// // // // // //               <View style={styles.weatherRight}>
// // // // // //                 {iconUrl ? (
// // // // // //                   <Image
// // // // // //                     source={{ uri: iconUrl }}
// // // // // //                     style={styles.weatherIconImg}
// // // // // //                     resizeMode="contain"
// // // // // //                   />
// // // // // //                 ) : (
// // // // // //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// // // // // //                 )}
// // // // // //                 <View style={styles.weatherMiniRow}>
// // // // // //                   {feelsLike !== null && (
// // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // //                       Ndjehet: {feelsLike}°
// // // // // //                     </Text>
// // // // // //                   )}
// // // // // //                   {humidity != null && (
// // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // //                       Lagështia: {humidity}%
// // // // // //                     </Text>
// // // // // //                   )}
// // // // // //                   {windSpeed != null && (
// // // // // //                     <Text style={styles.weatherMiniText}>
// // // // // //                       Era: {windSpeed} m/s
// // // // // //                     </Text>
// // // // // //                   )}
// // // // // //                 </View>
// // // // // //               </View>
// // // // // //             </View>
// // // // // //           )}
// // // // // //         </View>

// // // // // //         {/* Numrues hapash */}
// // // // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // // // //           <View style={styles.circleWrap}>
// // // // // //             <View
// // // // // //               style={[
// // // // // //                 styles.progressCircle,
// // // // // //                 { backgroundColor: COLORS.cardSoft },
// // // // // //               ]}
// // // // // //             >
// // // // // //               <View
// // // // // //                 style={[
// // // // // //                   styles.progressFill,
// // // // // //                   {
// // // // // //                     transform: [{ rotate: angle }],
// // // // // //                     borderTopColor: COLORS.green,
// // // // // //                     borderRightColor: COLORS.green,
// // // // // //                   },
// // // // // //                 ]}
// // // // // //               />
// // // // // //               <View style={styles.innerCircle}>
// // // // // //                 <Text style={styles.stepCount}>
// // // // // //                   {steps.toLocaleString()}
// // // // // //                 </Text>
// // // // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // // // //               </View>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Gjumi */}
// // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // //           <Text style={styles.title}>Gjumi</Text>
// // // // // //           <View style={styles.sleepRow}>
// // // // // //             <Text style={styles.moon}>🌙</Text>
// // // // // //             <View>
// // // // // //               <Text style={styles.sleepTime}>
// // // // // //                 {hours} h {mins} m
// // // // // //               </Text>
// // // // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Kaloritë e konsumuara */}
// // // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // // // //           <View style={styles.calRow}>
// // // // // //             <Text style={styles.fire}>🔥</Text>
// // // // // //             <View>
// // // // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Kaloritë e djegura */}
// // // // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // // // //           <View style={styles.calRow}>
// // // // // //             <Text style={styles.fire}>🏋️</Text>
// // // // // //             <View>
// // // // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         </View>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { flex: 1, alignItems: "center", paddingVertical: 10 },

// // // // // //   cards: {
// // // // // //     flex: 1,
// // // // // //     width: "100%",
// // // // // //     alignItems: "center",
// // // // // //     justifyContent: "flex-start",
// // // // // //     paddingVertical: 6,
// // // // // //   },

// // // // // //   cardBase: {
// // // // // //     width: "90%",
// // // // // //     backgroundColor: COLORS.card,
// // // // // //     borderRadius: 18,
// // // // // //     padding: 18,
// // // // // //     elevation: 3,
// // // // // //     shadowColor: "#000",
// // // // // //     shadowOpacity: 0.06,
// // // // // //     shadowRadius: 4,
// // // // // //     shadowOffset: { width: 0, height: 3 },
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   lastCard: { marginBottom: 0 },

// // // // // //   cardTall: { minHeight: 240 },
// // // // // //   cardSmall: { minHeight: 135 },

// // // // // //   title: {
// // // // // //     fontSize: 15,
// // // // // //     color: COLORS.textDark,
// // // // // //     marginBottom: 6,
// // // // // //     fontWeight: "700",
// // // // // //   },

// // // // // //   // STEPS
// // // // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // // // //   progressCircle: {
// // // // // //     width: 150,
// // // // // //     height: 150,
// // // // // //     borderRadius: 75,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     position: "relative",
// // // // // //   },
// // // // // //   progressFill: {
// // // // // //     position: "absolute",
// // // // // //     width: "100%",
// // // // // //     height: "100%",
// // // // // //     borderRadius: 75,
// // // // // //     borderWidth: 14,
// // // // // //     borderLeftColor: "transparent",
// // // // // //     borderBottomColor: "transparent",
// // // // // //   },
// // // // // //   innerCircle: {
// // // // // //     width: 100,
// // // // // //     height: 100,
// // // // // //     borderRadius: 50,
// // // // // //     backgroundColor: COLORS.page,
// // // // // //     alignItems: "center",
// // // // // //     justifyContent: "center",
// // // // // //   },
// // // // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // //   // SLEEP
// // // // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // //   // CALORIES
// // // // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // // // //   fire: { fontSize: 30, marginRight: 10 },
// // // // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // // // // //   // WEATHER – stil i ri
// // // // // //   weatherCard: {
// // // // // //     backgroundColor: "#E6DFC5",
// // // // // //     borderRadius: 22,
// // // // // //     paddingVertical: 16,
// // // // // //     paddingHorizontal: 18,
// // // // // //   },
// // // // // //   weatherHeaderRow: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     marginBottom: 4,
// // // // // //   },
// // // // // //   weatherTitle: {
// // // // // //     fontSize: 15,
// // // // // //     fontWeight: "700",
// // // // // //     color: COLORS.textDark,
// // // // // //   },
// // // // // //   weatherCitySmall: {
// // // // // //     fontSize: 13,
// // // // // //     color: COLORS.textDark,
// // // // // //     opacity: 0.8,
// // // // // //   },
// // // // // //   loadingText: {
// // // // // //     marginTop: 8,
// // // // // //     fontSize: 13,
// // // // // //     color: COLORS.textDark,
// // // // // //   },
// // // // // //   weatherMainRow: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     marginTop: 8,
// // // // // //   },
// // // // // //   weatherLeft: {
// // // // // //     flex: 1,
// // // // // //   },
// // // // // //   weatherTemp: {
// // // // // //     fontSize: 40,
// // // // // //     fontWeight: "700",
// // // // // //     color: COLORS.green,
// // // // // //   },
// // // // // //   weatherDescMain: {
// // // // // //     fontSize: 16,
// // // // // //     fontWeight: "600",
// // // // // //     color: COLORS.textDark,
// // // // // //     marginTop: 2,
// // // // // //   },
// // // // // //   weatherDescSub: {
// // // // // //     fontSize: 12,
// // // // // //     color: COLORS.textDark,
// // // // // //     opacity: 0.7,
// // // // // //   },
// // // // // //   weatherRight: {
// // // // // //     alignItems: "flex-end",
// // // // // //     justifyContent: "center",
// // // // // //     flex: 1,
// // // // // //   },
// // // // // //   weatherIconImg: {
// // // // // //     width: 60,
// // // // // //     height: 60,
// // // // // //     marginBottom: 4,
// // // // // //   },
// // // // // //   weatherIconEmoji: {
// // // // // //     fontSize: 32,
// // // // // //     marginBottom: 4,
// // // // // //   },
// // // // // //   weatherMiniRow: {
// // // // // //     alignItems: "flex-end",
// // // // // //   },
// // // // // //   weatherMiniText: {
// // // // // //     fontSize: 11,
// // // // // //     color: COLORS.textDark,
// // // // // //     opacity: 0.8,
// // // // // //   },
// // // // // //   errorText: {
// // // // // //     fontSize: 13,
// // // // // //     color: "red",
// // // // // //     marginTop: 4,
// // // // // //   },
// // // // // // });
// // // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // // import { useFocusEffect } from "expo-router";
// // // // // import React, { useCallback, useState } from "react";
// // // // // import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// // // // // import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// // // // // const COLORS = {
// // // // //   green: "#355E3B",
// // // // //   page: "#F7F4E9",
// // // // //   card: "#E6DFC5",
// // // // //   textDark: "#2E2E2E",
// // // // //   cardSoft: "#EFE8CF",
// // // // // };

// // // // // export default function HealthWidgets({
// // // // //   steps = 5432,
// // // // //   stepGoal = 8000,
// // // // //   sleepMinutes = 465,
// // // // // }) {
// // // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // // //   const { weather, weatherLoading, weatherError } = useWeather();

// // // // //   useFocusEffect(
// // // // //     useCallback(() => {
// // // // //       const loadData = async () => {
// // // // //         const today = new Date().toISOString().slice(0, 10);

// // // // //         const keys = await AsyncStorage.getAllKeys();
// // // // //         let foodTotal = 0;

// // // // //         for (const key of keys) {
// // // // //           if (key.startsWith("food_") && key.includes(today)) {
// // // // //             const raw = await AsyncStorage.getItem(key);
// // // // //             if (!raw) continue;
// // // // //             try {
// // // // //               const data = JSON.parse(raw);
// // // // //               if (data?.total) foodTotal += data.total;
// // // // //             } catch {}
// // // // //           }
// // // // //         }

// // // // //         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
// // // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // // //         setFoodCalories(foodTotal);
// // // // //         setWorkoutCalories(workoutTotal);
// // // // //       };

// // // // //       loadData();
// // // // //     }, [])
// // // // //   );

// // // // //   // Llogaritjet
// // // // //   const progress = Math.min(steps / stepGoal, 1);
// // // // //   const angle = `${360 * progress}deg`;

// // // // //   const hours = Math.floor(sleepMinutes / 60);
// // // // //   const mins = sleepMinutes % 60;

// // // // //   const temperature =
// // // // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // // // //   const feelsLike =
// // // // //     weather?.main?.feels_like != null
// // // // //       ? Math.round(weather.main.feels_like)
// // // // //       : null;
// // // // //   const humidity = weather?.main?.humidity;
// // // // //   const windSpeed = weather?.wind?.speed;
// // // // //   const cityName = weather?.name;
// // // // //   const descriptionEn = weather?.weather?.[0]?.description || "";
// // // // //   const iconCode = weather?.weather?.[0]?.icon;
// // // // //   const iconUrl = iconCode
// // // // //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// // // // //     : null;

// // // // //   const translateDesc = (desc) => {
// // // // //     const d = desc.toLowerCase();
// // // // //     if (d.includes("clear")) return "qiell i kthjellët";
// // // // //     if (d.includes("cloud")) return "me re";
// // // // //     if (d.includes("rain")) return "shi";
// // // // //     if (d.includes("snow")) return "borë";
// // // // //     if (d.includes("thunder")) return "stuhi";
// // // // //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// // // // //     return desc;
// // // // //   };

// // // // //   const descriptionSq = translateDesc(descriptionEn);

// // // // //   return (
// // // // //     <ScrollView
// // // // //       style={{ flex: 1, backgroundColor: COLORS.page }}
// // // // //       contentContainerStyle={styles.container}
// // // // //       showsVerticalScrollIndicator={false}
// // // // //     >
// // // // //       <View style={styles.cards}>
// // // // //         {/* MOTI */}
// // // // //         <View style={[styles.cardBase, styles.weatherCard]}>
// // // // //           <View style={styles.weatherHeaderRow}>
// // // // //             <Text style={styles.weatherTitle}>Moti sot</Text>
// // // // //             {cityName && <Text style={styles.weatherCitySmall}>{cityName}</Text>}
// // // // //           </View>

// // // // //           {weatherLoading && (
// // // // //             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
// // // // //           )}

// // // // //           {!weatherLoading && weatherError && (
// // // // //             <Text style={styles.errorText}>{weatherError}</Text>
// // // // //           )}

// // // // //           {!weatherLoading && !weatherError && temperature !== null && (
// // // // //             <View style={styles.weatherMainRow}>
// // // // //               <View style={styles.weatherLeft}>
// // // // //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// // // // //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// // // // //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// // // // //               </View>

// // // // //               <View style={styles.weatherRight}>
// // // // //                 {iconUrl ? (
// // // // //                   <Image
// // // // //                     source={{ uri: iconUrl }}
// // // // //                     style={styles.weatherIconImg}
// // // // //                     resizeMode="contain"
// // // // //                   />
// // // // //                 ) : (
// // // // //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// // // // //                 )}
// // // // //                 <View style={styles.weatherMiniRow}>
// // // // //                   {feelsLike !== null && (
// // // // //                     <Text style={styles.weatherMiniText}>
// // // // //                       Ndjehet: {feelsLike}°
// // // // //                     </Text>
// // // // //                   )}
// // // // //                   {humidity != null && (
// // // // //                     <Text style={styles.weatherMiniText}>
// // // // //                       Lagështia: {humidity}%
// // // // //                     </Text>
// // // // //                   )}
// // // // //                   {windSpeed != null && (
// // // // //                     <Text style={styles.weatherMiniText}>
// // // // //                       Era: {windSpeed} m/s
// // // // //                     </Text>
// // // // //                   )}
// // // // //                 </View>
// // // // //               </View>
// // // // //             </View>
// // // // //           )}
// // // // //         </View>

// // // // //         {/* HAPAT */}
// // // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // // //           <View style={styles.circleWrap}>
// // // // //             <View
// // // // //               style={[
// // // // //                 styles.progressCircle,
// // // // //                 { backgroundColor: COLORS.cardSoft },
// // // // //               ]}
// // // // //             >
// // // // //               <View
// // // // //                 style={[
// // // // //                   styles.progressFill,
// // // // //                   {
// // // // //                     transform: [{ rotate: angle }],
// // // // //                     borderTopColor: COLORS.green,
// // // // //                     borderRightColor: COLORS.green,
// // // // //                   },
// // // // //                 ]}
// // // // //               />
// // // // //               <View style={styles.innerCircle}>
// // // // //                 <Text style={styles.stepCount}>
// // // // //                   {steps.toLocaleString()}
// // // // //                 </Text>
// // // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // // //               </View>
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>

// // // // //         {/* GJUMI */}
// // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // //           <Text style={styles.title}>Gjumi</Text>
// // // // //           <View style={styles.sleepRow}>
// // // // //             <Text style={styles.moon}>🌙</Text>
// // // // //             <View>
// // // // //               <Text style={styles.sleepTime}>
// // // // //                 {hours} h {mins} m
// // // // //               </Text>
// // // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>

// // // // //         {/* KALORITË E KONSUMUARA */}
// // // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // // //           <View style={styles.calRow}>
// // // // //             <Text style={styles.fire}>🔥</Text>
// // // // //             <View>
// // // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>

// // // // //         {/* KALORITË E DJEGURA */}
// // // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // // //           <View style={styles.calRow}>
// // // // //             <Text style={styles.fire}>🏋️</Text>
// // // // //             <View>
// // // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>
// // // // //       </View>
// // // // //     </ScrollView>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     alignItems: "center",
// // // // //     paddingVertical: 10,
// // // // //     paddingBottom: 110, // ⬅️ KJO TA ZGJAT DERI NË FUND
// // // // //   },

// // // // //   cards: {
// // // // //     flex: 1,
// // // // //     width: "100%",
// // // // //     alignItems: "center",
// // // // //     justifyContent: "flex-start",
// // // // //     paddingVertical: 6,
// // // // //   },

// // // // //   cardBase: {
// // // // //     width: "90%",
// // // // //     backgroundColor: COLORS.card,
// // // // //     borderRadius: 18,
// // // // //     padding: 18,
// // // // //     elevation: 3,
// // // // //     shadowColor: "#000",
// // // // //     shadowOpacity: 0.06,
// // // // //     shadowRadius: 4,
// // // // //     shadowOffset: { width: 0, height: 3 },
// // // // //     marginBottom: 10,
// // // // //   },

// // // // //   lastCard: { marginBottom: 0 },

// // // // //   cardTall: { minHeight: 240 },
// // // // //   cardSmall: { minHeight: 135 },

// // // // //   title: {
// // // // //     fontSize: 15,
// // // // //     color: COLORS.textDark,
// // // // //     marginBottom: 6,
// // // // //     fontWeight: "700",
// // // // //   },

// // // // //   // STEPS
// // // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // // //   progressCircle: {
// // // // //     width: 150,
// // // // //     height: 150,
// // // // //     borderRadius: 75,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     position: "relative",
// // // // //   },
// // // // //   progressFill: {
// // // // //     position: "absolute",
// // // // //     width: "100%",
// // // // //     height: "100%",
// // // // //     borderRadius: 75,
// // // // //     borderWidth: 14,
// // // // //     borderLeftColor: "transparent",
// // // // //     borderBottomColor: "transparent",
// // // // //   },
// // // // //   innerCircle: {
// // // // //     width: 100,
// // // // //     height: 100,
// // // // //     borderRadius: 50,
// // // // //     backgroundColor: COLORS.page,
// // // // //     alignItems: "center",
// // // // //     justifyContent: "center",
// // // // //   },
// // // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // //   // GJUMI
// // // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // // // //   // CALORIES
// // // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // // //   fire: { fontSize: 30, marginRight: 10 },
// // // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // // // //   // WEATHER
// // // // //   weatherCard: {
// // // // //     backgroundColor: "#E6DFC5",
// // // // //     borderRadius: 22,
// // // // //     paddingVertical: 16,
// // // // //     paddingHorizontal: 18,
// // // // //   },
// // // // //   weatherHeaderRow: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     alignItems: "center",
// // // // //     marginBottom: 4,
// // // // //   },
// // // // //   weatherTitle: {
// // // // //     fontSize: 15,
// // // // //     fontWeight: "700",
// // // // //     color: COLORS.textDark,
// // // // //   },
// // // // //   weatherCitySmall: {
// // // // //     fontSize: 13,
// // // // //     color: COLORS.textDark,
// // // // //     opacity: 0.8,
// // // // //   },
// // // // //   loadingText: {
// // // // //     marginTop: 8,
// // // // //     fontSize: 13,
// // // // //     color: COLORS.textDark,
// // // // //   },
// // // // //   weatherMainRow: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     alignItems: "center",
// // // // //     marginTop: 8,
// // // // //   },
// // // // //   weatherLeft: {
// // // // //     flex: 1,
// // // // //   },
// // // // //   weatherTemp: {
// // // // //     fontSize: 40,
// // // // //     fontWeight: "700",
// // // // //     color: COLORS.green,
// // // // //   },
// // // // //   weatherDescMain: {
// // // // //     fontSize: 16,
// // // // //     fontWeight: "600",
// // // // //     color: COLORS.textDark,
// // // // //     marginTop: 2,
// // // // //   },
// // // // //   weatherDescSub: {
// // // // //     fontSize: 12,
// // // // //     color: COLORS.textDark,
// // // // //     opacity: 0.7,
// // // // //   },
// // // // //   weatherRight: {
// // // // //     alignItems: "flex-end",
// // // // //     justifyContent: "center",
// // // // //     flex: 1,
// // // // //   },
// // // // //   weatherIconImg: {
// // // // //     width: 60,
// // // // //     height: 60,
// // // // //     marginBottom: 4,
// // // // //   },
// // // // //   weatherIconEmoji: {
// // // // //     fontSize: 32,
// // // // //     marginBottom: 4,
// // // // //   },
// // // // //   weatherMiniRow: {
// // // // //     alignItems: "flex-end",
// // // // //   },
// // // // //   weatherMiniText: {
// // // // //     fontSize: 11,
// // // // //     color: COLORS.textDark,
// // // // //     opacity: 0.8,
// // // // //   },
// // // // //   errorText: {
// // // // //     fontSize: 13,
// // // // //     color: "red",
// // // // //     marginTop: 4,
// // // // //   },
// // // // // });


// // // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // import { useFocusEffect } from "expo-router";
// // // // import React, { useCallback, useState } from "react";
// // // // import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// // // // import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// // // // const COLORS = {
// // // //   green: "#355E3B",
// // // //   page: "#F7F4E9",
// // // //   card: "#E6DFC5",
// // // //   textDark: "#2E2E2E",
// // // //   cardSoft: "#EFE8CF",
// // // // };

// // // // export default function HealthWidgets({
// // // //   steps = 5432,
// // // //   stepGoal = 8000,
// // // //   sleepMinutes = 465,
// // // // }) {
// // // //   const [foodCalories, setFoodCalories] = useState(0);
// // // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // // //   const { weather, weatherLoading, weatherError } = useWeather();

// // // //   // 🔹 Lexo kaloritë nga AsyncStorage me formatin e RI:
// // // //   // food_kcal_YYYY-MM-DD  dhe  workout_kcal_YYYY-MM-DD
// // // //   useFocusEffect(
// // // //     useCallback(() => {
// // // //       const loadData = async () => {
// // // //         const today = new Date().toISOString().slice(0, 10);

// // // //         // Ushqimi – ruajtur si string numerik (p.sh. "450")
// // // //         const foodRaw = await AsyncStorage.getItem(`food_kcal_${today}`);
// // // //         const foodTotal = foodRaw ? Number(foodRaw) : 0;

// // // //         // Ushtrimet – ruajtur nga WorkoutPlanScreen
// // // //         const workoutRaw = await AsyncStorage.getItem(
// // // //           `workout_kcal_${today}`
// // // //         );
// // // //         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

// // // //         setFoodCalories(foodTotal);
// // // //         setWorkoutCalories(workoutTotal);
// // // //       };

// // // //       loadData();
// // // //     }, [])
// // // //   );

// // // //   // Llogaritjet
// // // //   const progress = Math.min(steps / stepGoal, 1);
// // // //   const angle = `${360 * progress}deg`;

// // // //   const hours = Math.floor(sleepMinutes / 60);
// // // //   const mins = sleepMinutes % 60;

// // // //   const temperature =
// // // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // // //   const feelsLike =
// // // //     weather?.main?.feels_like != null
// // // //       ? Math.round(weather.main.feels_like)
// // // //       : null;
// // // //   const humidity = weather?.main?.humidity;
// // // //   const windSpeed = weather?.wind?.speed;
// // // //   const cityName = weather?.name;
// // // //   const descriptionEn = weather?.weather?.[0]?.description || "";
// // // //   const iconCode = weather?.weather?.[0]?.icon;
// // // //   const iconUrl = iconCode
// // // //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// // // //     : null;

// // // //   const translateDesc = (desc) => {
// // // //     const d = desc.toLowerCase();
// // // //     if (d.includes("clear")) return "qiell i kthjellët";
// // // //     if (d.includes("cloud")) return "me re";
// // // //     if (d.includes("rain")) return "shi";
// // // //     if (d.includes("snow")) return "borë";
// // // //     if (d.includes("thunder")) return "stuhi";
// // // //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// // // //     return desc;
// // // //   };

// // // //   const descriptionSq = translateDesc(descriptionEn);

// // // //   return (
// // // //     <ScrollView
// // // //       style={{ flex: 1, backgroundColor: COLORS.page }}
// // // //       contentContainerStyle={styles.container}
// // // //       showsVerticalScrollIndicator={false}
// // // //     >
// // // //       <View style={styles.cards}>
// // // //         {/* MOTI */}
// // // //         <View style={[styles.cardBase, styles.weatherCard]}>
// // // //           <View style={styles.weatherHeaderRow}>
// // // //             <Text style={styles.weatherTitle}>Moti sot</Text>
// // // //             {cityName && <Text style={styles.weatherCitySmall}>{cityName}</Text>}
// // // //           </View>

// // // //           {weatherLoading && (
// // // //             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
// // // //           )}

// // // //           {!weatherLoading && weatherError && (
// // // //             <Text style={styles.errorText}>{weatherError}</Text>
// // // //           )}

// // // //           {!weatherLoading && !weatherError && temperature !== null && (
// // // //             <View style={styles.weatherMainRow}>
// // // //               <View style={styles.weatherLeft}>
// // // //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// // // //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// // // //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// // // //               </View>

// // // //               <View style={styles.weatherRight}>
// // // //                 {iconUrl ? (
// // // //                   <Image
// // // //                     source={{ uri: iconUrl }}
// // // //                     style={styles.weatherIconImg}
// // // //                     resizeMode="contain"
// // // //                   />
// // // //                 ) : (
// // // //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// // // //                 )}
// // // //                 <View style={styles.weatherMiniRow}>
// // // //                   {feelsLike !== null && (
// // // //                     <Text style={styles.weatherMiniText}>
// // // //                       Ndjehet: {feelsLike}°
// // // //                     </Text>
// // // //                   )}
// // // //                   {humidity != null && (
// // // //                     <Text style={styles.weatherMiniText}>
// // // //                       Lagështia: {humidity}%
// // // //                     </Text>
// // // //                   )}
// // // //                   {windSpeed != null && (
// // // //                     <Text style={styles.weatherMiniText}>
// // // //                       Era: {windSpeed} m/s
// // // //                     </Text>
// // // //                   )}
// // // //                 </View>
// // // //               </View>
// // // //             </View>
// // // //           )}
// // // //         </View>

// // // //         {/* HAPAT */}
// // // //         <View style={[styles.cardBase, styles.cardTall]}>
// // // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // // //           <View style={styles.circleWrap}>
// // // //             <View
// // // //               style={[
// // // //                 styles.progressCircle,
// // // //                 { backgroundColor: COLORS.cardSoft },
// // // //               ]}
// // // //             >
// // // //               <View
// // // //                 style={[
// // // //                   styles.progressFill,
// // // //                   {
// // // //                     transform: [{ rotate: angle }],
// // // //                     borderTopColor: COLORS.green,
// // // //                     borderRightColor: COLORS.green,
// // // //                   },
// // // //                 ]}
// // // //               />
// // // //               <View style={styles.innerCircle}>
// // // //                 <Text style={styles.stepCount}>
// // // //                   {steps.toLocaleString()}
// // // //                 </Text>
// // // //                 <Text style={styles.stepLabel}>hapa</Text>
// // // //               </View>
// // // //             </View>
// // // //           </View>
// // // //         </View>

// // // //         {/* GJUMI */}
// // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // //           <Text style={styles.title}>Gjumi</Text>
// // // //           <View style={styles.sleepRow}>
// // // //             <Text style={styles.moon}>🌙</Text>
// // // //             <View>
// // // //               <Text style={styles.sleepTime}>
// // // //                 {hours} h {mins} m
// // // //               </Text>
// // // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // // //             </View>
// // // //           </View>
// // // //         </View>

// // // //         {/* KALORITË E KONSUMUARA */}
// // // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // // //           <View style={styles.calRow}>
// // // //             <Text style={styles.fire}>🔥</Text>
// // // //             <View>
// // // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // //             </View>
// // // //           </View>
// // // //         </View>

// // // //         {/* KALORITË E DJEGURA */}
// // // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // // //           <View style={styles.calRow}>
// // // //             <Text style={styles.fire}>🏋️</Text>
// // // //             <View>
// // // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // // //               <Text style={styles.calLabel}>kalori sot</Text>
// // // //             </View>
// // // //           </View>
// // // //         </View>
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     alignItems: "center",
// // // //     paddingVertical: 10,
// // // //     paddingBottom: 110, // ⬅️ KJO TA ZGJAT DERI NË FUND
// // // //   },

// // // //   cards: {
// // // //     flex: 1,
// // // //     width: "100%",
// // // //     alignItems: "center",
// // // //     justifyContent: "flex-start",
// // // //     paddingVertical: 6,
// // // //   },

// // // //   cardBase: {
// // // //     width: "90%",
// // // //     backgroundColor: COLORS.card,
// // // //     borderRadius: 18,
// // // //     padding: 18,
// // // //     elevation: 3,
// // // //     shadowColor: "#000",
// // // //     shadowOpacity: 0.06,
// // // //     shadowRadius: 4,
// // // //     shadowOffset: { width: 0, height: 3 },
// // // //     marginBottom: 10,
// // // //   },

// // // //   lastCard: { marginBottom: 0 },

// // // //   cardTall: { minHeight: 240 },
// // // //   cardSmall: { minHeight: 135 },

// // // //   title: {
// // // //     fontSize: 15,
// // // //     color: COLORS.textDark,
// // // //     marginBottom: 6,
// // // //     fontWeight: "700",
// // // //   },

// // // //   // STEPS
// // // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // // //   progressCircle: {
// // // //     width: 150,
// // // //     height: 150,
// // // //     borderRadius: 75,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     position: "relative",
// // // //   },
// // // //   progressFill: {
// // // //     position: "absolute",
// // // //     width: "100%",
// // // //     height: "100%",
// // // //     borderRadius: 75,
// // // //     borderWidth: 14,
// // // //     borderLeftColor: "transparent",
// // // //     borderBottomColor: "transparent",
// // // //   },
// // // //   innerCircle: {
// // // //     width: 100,
// // // //     height: 100,
// // // //     borderRadius: 50,
// // // //     backgroundColor: COLORS.page,
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //   },
// // // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // // //   // GJUMI
// // // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // // //   // CALORIES
// // // //   calRow: { flexDirection: "row", alignItems: "center" },
// // // //   fire: { fontSize: 30, marginRight: 10 },
// // // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // // //   // WEATHER
// // // //   weatherCard: {
// // // //     backgroundColor: "#E6DFC5",
// // // //     borderRadius: 22,
// // // //     paddingVertical: 16,
// // // //     paddingHorizontal: 18,
// // // //   },
// // // //   weatherHeaderRow: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     marginBottom: 4,
// // // //   },
// // // //   weatherTitle: {
// // // //     fontSize: 15,
// // // //     fontWeight: "700",
// // // //     color: COLORS.textDark,
// // // //   },
// // // //   weatherCitySmall: {
// // // //     fontSize: 13,
// // // //     color: COLORS.textDark,
// // // //     opacity: 0.8,
// // // //   },
// // // //   loadingText: {
// // // //     marginTop: 8,
// // // //     fontSize: 13,
// // // //     color: COLORS.textDark,
// // // //   },
// // // //   weatherMainRow: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     marginTop: 8,
// // // //   },
// // // //   weatherLeft: {
// // // //     flex: 1,
// // // //   },
// // // //   weatherTemp: {
// // // //     fontSize: 40,
// // // //     fontWeight: "700",
// // // //     color: COLORS.green,
// // // //   },
// // // //   weatherDescMain: {
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //     color: COLORS.textDark,
// // // //     marginTop: 2,
// // // //   },
// // // //   weatherDescSub: {
// // // //     fontSize: 12,
// // // //     color: COLORS.textDark,
// // // //     opacity: 0.7,
// // // //   },
// // // //   weatherRight: {
// // // //     alignItems: "flex-end",
// // // //     justifyContent: "center",
// // // //     flex: 1,
// // // //   },
// // // //   weatherIconImg: {
// // // //     width: 60,
// // // //     height: 60,
// // // //     marginBottom: 4,
// // // //   },
// // // //   weatherIconEmoji: {
// // // //     fontSize: 32,
// // // //     marginBottom: 4,
// // // //   },
// // // //   weatherMiniRow: {
// // // //     alignItems: "flex-end",
// // // //   },
// // // //   weatherMiniText: {
// // // //     fontSize: 11,
// // // //     color: COLORS.textDark,
// // // //     opacity: 0.8,
// // // //   },
// // // //   errorText: {
// // // //     fontSize: 13,
// // // //     color: "red",
// // // //     marginTop: 4,
// // // //   },
// // // // });
// // // //qikjo nalt funksionon deri qitash tash pe provovjm njo tjere


// // // //qikjo po funksiono
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import { useFocusEffect } from "expo-router";
// // // import React, { useCallback, useState } from "react";
// // // import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// // // import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// // // // 🔹 IMPORTET SHTESË – për Firestore + Auth
// // // import { doc, getDoc } from "firebase/firestore";
// // // import { auth, db } from "../../firebaseConfig"; // rregullo path nëse duhet

// // // const COLORS = {
// // //   green: "#355E3B",
// // //   page: "#F7F4E9",
// // //   card: "#E6DFC5",
// // //   textDark: "#2E2E2E",
// // //   cardSoft: "#EFE8CF",
// // // };

// // // export default function HealthWidgets({
// // //   steps = 5432,
// // //   stepGoal = 8000,
// // //   sleepMinutes = 465,
// // // }) {
// // //   const [foodCalories, setFoodCalories] = useState(0);
// // //   const [workoutCalories, setWorkoutCalories] = useState(0);

// // //   const { weather, weatherLoading, weatherError } = useWeather();

// // //   // 🔹 Lexo kaloritë nga AsyncStorage + Firestore
// // //   // food_kcal_YYYY-MM-DD  dhe  workout_kcal_YYYY-MM-DD
// // //   useFocusEffect(
// // //     useCallback(() => {
// // //       const loadData = async () => {
// // //         const today = new Date().toISOString().slice(0, 10);
// // //         const foodKey = `food_kcal_${today}`;
// // //         const workoutKey = `workout_kcal_${today}`;

// // //         // 1) Lexo nga AsyncStorage
// // //         const foodRawLocal = await AsyncStorage.getItem(foodKey);
// // //         const workoutRawLocal = await AsyncStorage.getItem(workoutKey);

// // //         let foodTotal = foodRawLocal ? Number(foodRawLocal) : 0;
// // //         let workoutTotal = workoutRawLocal ? Number(workoutRawLocal) : 0;

// // //         // 2) Provo me lexu edhe nga Firestore nëse ka user
// // //         const user = auth.currentUser;
// // //         if (user) {
// // //           try {
// // //             // 🔸 Ushqimi – koleksioni dailyIntake/{userId}/days/{dayId}
// // //             const foodDocRef = doc(db, "dailyIntake", user.uid, "days", today);
// // //             const foodSnap = await getDoc(foodDocRef);
// // //             if (foodSnap.exists()) {
// // //               const data = foodSnap.data();
// // //               const firestoreFood = Number(data.totalCalories || 0);
// // //               // përdor vlerën e Firestore nëse është > 0
// // //               if (firestoreFood > 0) {
// // //                 foodTotal = firestoreFood;
// // //                 await AsyncStorage.setItem(foodKey, String(foodTotal));
// // //               }
// // //             }

// // //             // 🔸 Ushtrimet – koleksioni workoutDaily, docId = uid_today
// // //             const workoutDocRef = doc(db, "workoutDaily", `${user.uid}_${today}`);
// // //             const workoutSnap = await getDoc(workoutDocRef);
// // //             if (workoutSnap.exists()) {
// // //               const data = workoutSnap.data();
// // //               const firestoreWorkout = Number(data.totalCalories || 0);
// // //               if (firestoreWorkout > 0) {
// // //                 workoutTotal = firestoreWorkout;
// // //                 await AsyncStorage.setItem(workoutKey, String(workoutTotal));
// // //               }
// // //             }
// // //           } catch (e) {
// // //             console.log("HealthWidgets Firestore load error:", e);
// // //             // në rast gabimi, thjesht mbesim me vlerat lokale
// // //           }
// // //         }

// // //         setFoodCalories(foodTotal);
// // //         setWorkoutCalories(workoutTotal);
// // //       };

// // //       loadData();
// // //     }, [])
// // //   );

// // //   // Llogaritjet
// // //   const progress = Math.min(steps / stepGoal, 1);
// // //   const angle = `${360 * progress}deg`;

// // //   const hours = Math.floor(sleepMinutes / 60);
// // //   const mins = sleepMinutes % 60;

// // //   const temperature =
// // //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// // //   const feelsLike =
// // //     weather?.main?.feels_like != null
// // //       ? Math.round(weather.main.feels_like)
// // //       : null;
// // //   const humidity = weather?.main?.humidity;
// // //   const windSpeed = weather?.wind?.speed;
// // //   const cityName = weather?.name;
// // //   const descriptionEn = weather?.weather?.[0]?.description || "";
// // //   const iconCode = weather?.weather?.[0]?.icon;
// // //   const iconUrl = iconCode
// // //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// // //     : null;

// // //   const translateDesc = (desc) => {
// // //     const d = desc.toLowerCase();
// // //     if (d.includes("clear")) return "qiell i kthjellët";
// // //     if (d.includes("cloud")) return "me re";
// // //     if (d.includes("rain")) return "shi";
// // //     if (d.includes("snow")) return "borë";
// // //     if (d.includes("thunder")) return "stuhi";
// // //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// // //     return desc;
// // //   };

// // //   const descriptionSq = translateDesc(descriptionEn);

// // //   return (
// // //     <ScrollView
// // //       style={{ flex: 1, backgroundColor: COLORS.page }}
// // //       contentContainerStyle={styles.container}
// // //       showsVerticalScrollIndicator={false}
// // //     >
// // //       <View style={styles.cards}>
// // //         {/* MOTI */}
// // //         <View style={[styles.cardBase, styles.weatherCard]}>
// // //           <View style={styles.weatherHeaderRow}>
// // //             <Text style={styles.weatherTitle}>Moti sot</Text>
// // //             {cityName && <Text style={styles.weatherCitySmall}>{cityName}</Text>}
// // //           </View>

// // //           {weatherLoading && (
// // //             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
// // //           )}

// // //           {!weatherLoading && weatherError && (
// // //             <Text style={styles.errorText}>{weatherError}</Text>
// // //           )}

// // //           {!weatherLoading && !weatherError && temperature !== null && (
// // //             <View style={styles.weatherMainRow}>
// // //               <View style={styles.weatherLeft}>
// // //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// // //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// // //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// // //               </View>

// // //               <View style={styles.weatherRight}>
// // //                 {iconUrl ? (
// // //                   <Image
// // //                     source={{ uri: iconUrl }}
// // //                     style={styles.weatherIconImg}
// // //                     resizeMode="contain"
// // //                   />
// // //                 ) : (
// // //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// // //                 )}
// // //                 <View style={styles.weatherMiniRow}>
// // //                   {feelsLike !== null && (
// // //                     <Text style={styles.weatherMiniText}>
// // //                       Ndjehet: {feelsLike}°
// // //                     </Text>
// // //                   )}
// // //                   {humidity != null && (
// // //                     <Text style={styles.weatherMiniText}>
// // //                       Lagështia: {humidity}%
// // //                     </Text>
// // //                   )}
// // //                   {windSpeed != null && (
// // //                     <Text style={styles.weatherMiniText}>
// // //                       Era: {windSpeed} m/s
// // //                     </Text>
// // //                   )}
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           )}
// // //         </View>

// // //         {/* HAPAT */}
// // //         <View style={[styles.cardBase, styles.cardTall]}>
// // //           <Text style={styles.title}>Gjurmues i hapave</Text>
// // //           <View style={styles.circleWrap}>
// // //             <View
// // //               style={[
// // //                 styles.progressCircle,
// // //                 { backgroundColor: COLORS.cardSoft },
// // //               ]}
// // //             >
// // //               <View
// // //                 style={[
// // //                   styles.progressFill,
// // //                   {
// // //                     transform: [{ rotate: angle }],
// // //                     borderTopColor: COLORS.green,
// // //                     borderRightColor: COLORS.green,
// // //                   },
// // //                 ]}
// // //               />
// // //               <View style={styles.innerCircle}>
// // //                 <Text style={styles.stepCount}>
// // //                   {steps.toLocaleString()}
// // //                 </Text>
// // //                 <Text style={styles.stepLabel}>hapa</Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         </View>

// // //         {/* GJUMI */}
// // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // //           <Text style={styles.title}>Gjumi</Text>
// // //           <View style={styles.sleepRow}>
// // //             <Text style={styles.moon}>🌙</Text>
// // //             <View>
// // //               <Text style={styles.sleepTime}>
// // //                 {hours} h {mins} m
// // //               </Text>
// // //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// // //             </View>
// // //           </View>
// // //         </View>

// // //         {/* KALORITË E KONSUMUARA */}
// // //         <View style={[styles.cardBase, styles.cardSmall]}>
// // //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// // //           <View style={styles.calRow}>
// // //             <Text style={styles.fire}>🔥</Text>
// // //             <View>
// // //               <Text style={styles.calNum}>{foodCalories}</Text>
// // //               <Text style={styles.calLabel}>kalori sot</Text>
// // //             </View>
// // //           </View>
// // //         </View>

// // //         {/* KALORITË E DJEGURA */}
// // //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// // //           <Text style={styles.title}>Kaloritë e djegura</Text>
// // //           <View style={styles.calRow}>
// // //             <Text style={styles.fire}>🏋️</Text>
// // //             <View>
// // //               <Text style={styles.calNum}>{workoutCalories}</Text>
// // //               <Text style={styles.calLabel}>kalori sot</Text>
// // //             </View>
// // //           </View>
// // //         </View>
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     alignItems: "center",
// // //     paddingVertical: 10,
// // //     paddingBottom: 110,
// // //   },

// // //   cards: {
// // //     flex: 1,
// // //     width: "100%",
// // //     alignItems: "center",
// // //     justifyContent: "flex-start",
// // //     paddingVertical: 6,
// // //   },

// // //   cardBase: {
// // //     width: "90%",
// // //     backgroundColor: COLORS.card,
// // //     borderRadius: 18,
// // //     padding: 18,
// // //     elevation: 3,
// // //     shadowColor: "#000",
// // //     shadowOpacity: 0.06,
// // //     shadowRadius: 4,
// // //     shadowOffset: { width: 0, height: 3 },
// // //     marginBottom: 10,
// // //   },

// // //   lastCard: { marginBottom: 0 },

// // //   cardTall: { minHeight: 240 },
// // //   cardSmall: { minHeight: 135 },

// // //   title: {
// // //     fontSize: 15,
// // //     color: COLORS.textDark,
// // //     marginBottom: 6,
// // //     fontWeight: "700",
// // //   },

// // //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// // //   progressCircle: {
// // //     width: 150,
// // //     height: 150,
// // //     borderRadius: 75,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     position: "relative",
// // //   },
// // //   progressFill: {
// // //     position: "absolute",
// // //     width: "100%",
// // //     height: "100%",
// // //     borderRadius: 75,
// // //     borderWidth: 14,
// // //     borderLeftColor: "transparent",
// // //     borderBottomColor: "transparent",
// // //   },
// // //   innerCircle: {
// // //     width: 100,
// // //     height: 100,
// // //     borderRadius: 50,
// // //     backgroundColor: COLORS.page,
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //   },
// // //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// // //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// // //   sleepRow: { flexDirection: "row", alignItems: "center" },
// // //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// // //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// // //   calRow: { flexDirection: "row", alignItems: "center" },
// // //   fire: { fontSize: 30, marginRight: 10 },
// // //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// // //   calLabel: { fontSize: 13, color: COLORS.textDark },

// // //   weatherCard: {
// // //     backgroundColor: "#E6DFC5",
// // //     borderRadius: 22,
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 18,
// // //   },
// // //   weatherHeaderRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 4,
// // //   },
// // //   weatherTitle: {
// // //     fontSize: 15,
// // //     fontWeight: "700",
// // //     color: COLORS.textDark,
// // //   },
// // //   weatherCitySmall: {
// // //     fontSize: 13,
// // //     color: COLORS.textDark,
// // //     opacity: 0.8,
// // //   },
// // //   loadingText: {
// // //     marginTop: 8,
// // //     fontSize: 13,
// // //     color: COLORS.textDark,
// // //   },
// // //   weatherMainRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginTop: 8,
// // //   },
// // //   weatherLeft: { flex: 1 },
// // //   weatherTemp: {
// // //     fontSize: 40,
// // //     fontWeight: "700",
// // //     color: COLORS.green,
// // //   },
// // //   weatherDescMain: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     color: COLORS.textDark,
// // //     marginTop: 2,
// // //   },
// // //   weatherDescSub: {
// // //     fontSize: 12,
// // //     color: COLORS.textDark,
// // //     opacity: 0.7,
// // //   },
// // //   weatherRight: {
// // //     alignItems: "flex-end",
// // //     justifyContent: "center",
// // //     flex: 1,
// // //   },
// // //   weatherIconImg: {
// // //     width: 60,
// // //     height: 60,
// // //     marginBottom: 4,
// // //   },
// // //   weatherIconEmoji: {
// // //     fontSize: 32,
// // //     marginBottom: 4,
// // //   },
// // //   weatherMiniRow: {
// // //     alignItems: "flex-end",
// // //   },
// // //   weatherMiniText: {
// // //     fontSize: 11,
// // //     color: COLORS.textDark,
// // //     opacity: 0.8,
// // //   },
// // //   errorText: {
// // //     fontSize: 13,
// // //     color: "red",
// // //     marginTop: 4,
// // //   },
// // // });



// // //qitu funksionin api e recetav

// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useFocusEffect } from "expo-router";
// // import React, { useCallback, useState } from "react";
// // import {
// //   Image,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";

// // import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// // // Firestore + Auth
// // import { doc, getDoc } from "firebase/firestore";
// // import { auth, db } from "../../firebaseConfig"; // rregullo path nëse duhet

// // // 🔹 Recetat nga Spoonacular (services/receta.js)
// // import {
// //   getRecipeOfDay,
// //   searchRecipeWithDetails,
// // } from "../../services/receta"; // rregullo path nëse duhet

// // const COLORS = {
// //   green: "#355E3B",
// //   page: "#F7F4E9",
// //   card: "#E6DFC5",
// //   textDark: "#2E2E2E",
// //   cardSoft: "#EFE8CF",
// // };

// // export default function HealthWidgets({
// //   steps = 5432,
// //   stepGoal = 8000,
// //   sleepMinutes = 465,
// // }) {
// //   const [foodCalories, setFoodCalories] = useState(0);
// //   const [workoutCalories, setWorkoutCalories] = useState(0);

// //   const { weather, weatherLoading, weatherError } = useWeather();

// //   // 🔹 RECETAT
// //   const [recipeOfDay, setRecipeOfDay] = useState(null);
// //   const [recipeLoading, setRecipeLoading] = useState(false);
// //   const [recipeError, setRecipeError] = useState("");

// //   const [searchText, setSearchText] = useState("");
// //   const [searchRecipe, setSearchRecipe] = useState(null);
// //   const [searchLoading, setSearchLoading] = useState(false);
// //   const [searchError, setSearchError] = useState("");

// //   // Receta që shfaqet realisht: nëse ka rezultat nga search → ai, ndryshe random
// //   const mainRecipe = searchRecipe || recipeOfDay;

// //   // 🔹 Lexo kaloritë nga AsyncStorage + Firestore dhe recetën random
// //   useFocusEffect(
// //     useCallback(() => {
// //       const loadData = async () => {
// //         const today = new Date().toISOString().slice(0, 10);
// //         const foodKey = `food_kcal_${today}`;
// //         const workoutKey = `workout_kcal_${today}`;

// //         // 1) Lexo nga AsyncStorage
// //         const foodRawLocal = await AsyncStorage.getItem(foodKey);
// //         const workoutRawLocal = await AsyncStorage.getItem(workoutKey);

// //         let foodTotal = foodRawLocal ? Number(foodRawLocal) : 0;
// //         let workoutTotal = workoutRawLocal
// //           ? Number(workoutRawLocal)
// //           : 0;

// //         // 2) Provo me lexu edhe nga Firestore nëse ka user
// //         const user = auth.currentUser;
// //         if (user) {
// //           try {
// //             // Ushqimi – dailyIntake/{userId}/days/{dayId}
// //             const foodDocRef = doc(
// //               db,
// //               "dailyIntake",
// //               user.uid,
// //               "days",
// //               today
// //             );
// //             const foodSnap = await getDoc(foodDocRef);
// //             if (foodSnap.exists()) {
// //               const data = foodSnap.data();
// //               const firestoreFood = Number(data.totalCalories || 0);
// //               if (firestoreFood > 0) {
// //                 foodTotal = firestoreFood;
// //                 await AsyncStorage.setItem(foodKey, String(foodTotal));
// //               }
// //             }

// //             // Ushtrimet – workoutDaily, docId = uid_today
// //             const workoutDocRef = doc(
// //               db,
// //               "workoutDaily",
// //               `${user.uid}_${today}`
// //             );
// //             const workoutSnap = await getDoc(workoutDocRef);
// //             if (workoutSnap.exists()) {
// //               const data = workoutSnap.data();
// //               const firestoreWorkout = Number(data.totalCalories || 0);
// //               if (firestoreWorkout > 0) {
// //                 workoutTotal = firestoreWorkout;
// //                 await AsyncStorage.setItem(
// //                   workoutKey,
// //                   String(workoutTotal)
// //                 );
// //               }
// //             }
// //           } catch (e) {
// //             console.log("HealthWidgets Firestore load error:", e);
// //             // në rast gabimi, mbesim me vlerat lokale
// //           }
// //         }

// //         setFoodCalories(foodTotal);
// //         setWorkoutCalories(workoutTotal);
// //       };

// //       const loadRecipe = async () => {
// //         try {
// //           setRecipeLoading(true);
// //           setRecipeError("");
// //           const r = await getRecipeOfDay();
// //           if (!r) {
// //             setRecipeError("S’ka recetë për momentin.");
// //           } else {
// //             setRecipeOfDay(r);
// //           }
// //         } catch (e) {
// //           console.log("loadRecipe error:", e);
// //           setRecipeError("Gabim gjatë marrjes së recetës.");
// //         } finally {
// //           setRecipeLoading(false);
// //         }
// //       };

// //       loadData();
// //       loadRecipe();
// //     }, [])
// //   );

// //   // 🔍 ndryshimi i tekstit të kërkimit
// //   const handleSearchTextChange = (text) => {
// //     setSearchText(text);

// //     // Nëse përdoruesi e fshin tekstin → kthehet te receta random
// //     if (text.trim() === "") {
// //       setSearchRecipe(null);
// //       setSearchError("");
// //     }
// //   };

// //   // 🔍 Kërkimi kur shtypet "Kërko" ose Enter
// //   const handleSearch = async () => {
// //     const q = searchText.trim();
// //     if (!q) {
// //       // bosh → kthehu te random
// //       setSearchRecipe(null);
// //       setSearchError("");
// //       return;
// //     }

// //     try {
// //       setSearchLoading(true);
// //       setSearchError("");
// //       const r = await searchRecipeWithDetails(q);
// //       if (!r) {
// //         setSearchRecipe(null);
// //         setSearchError("S’u gjet asnjë recetë.");
// //       } else {
// //         setSearchRecipe(r);
// //       }
// //     } catch (e) {
// //       console.log("searchRecipe error:", e);
// //       setSearchRecipe(null);
// //       setSearchError("Gabim gjatë kërkimit të recetës.");
// //     } finally {
// //       setSearchLoading(false);
// //     }
// //   };

// //   // Llogaritjet
// //   const progress = Math.min(steps / stepGoal, 1);
// //   const angle = `${360 * progress}deg`;

// //   const hours = Math.floor(sleepMinutes / 60);
// //   const mins = sleepMinutes % 60;

// //   const temperature =
// //     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
// //   const feelsLike =
// //     weather?.main?.feels_like != null
// //       ? Math.round(weather.main.feels_like)
// //       : null;
// //   const humidity = weather?.main?.humidity;
// //   const windSpeed = weather?.wind?.speed;
// //   const cityName = weather?.name;
// //   const descriptionEn = weather?.weather?.[0]?.description || "";
// //   const iconCode = weather?.weather?.[0]?.icon;
// //   const iconUrl = iconCode
// //     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
// //     : null;

// //   const translateDesc = (desc) => {
// //     const d = desc.toLowerCase();
// //     if (d.includes("clear")) return "qiell i kthjellët";
// //     if (d.includes("cloud")) return "me re";
// //     if (d.includes("rain")) return "shi";
// //     if (d.includes("snow")) return "borë";
// //     if (d.includes("thunder")) return "stuhi";
// //     if (d.includes("mist") || d.includes("fog")) return "mjergull";
// //     return desc;
// //   };

// //   const descriptionSq = translateDesc(descriptionEn);

// //   return (
// //     <ScrollView
// //       style={{ flex: 1, backgroundColor: COLORS.page }}
// //       contentContainerStyle={styles.container}
// //       showsVerticalScrollIndicator={false}
// //     >
// //       <View style={styles.cards}>
// //         {/* MOTI */}
// //         <View style={[styles.cardBase, styles.weatherCard]}>
// //           <View style={styles.weatherHeaderRow}>
// //             <Text style={styles.weatherTitle}>Moti sot</Text>
// //             {cityName && (
// //               <Text style={styles.weatherCitySmall}>{cityName}</Text>
// //             )}
// //           </View>

// //           {weatherLoading && (
// //             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
// //           )}

// //           {!weatherLoading && weatherError && (
// //             <Text style={styles.errorText}>{weatherError}</Text>
// //           )}

// //           {!weatherLoading && !weatherError && temperature !== null && (
// //             <View style={styles.weatherMainRow}>
// //               <View style={styles.weatherLeft}>
// //                 <Text style={styles.weatherTemp}>{temperature}°</Text>
// //                 <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
// //                 <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
// //               </View>

// //               <View style={styles.weatherRight}>
// //                 {iconUrl ? (
// //                   <Image
// //                     source={{ uri: iconUrl }}
// //                     style={styles.weatherIconImg}
// //                     resizeMode="contain"
// //                   />
// //                 ) : (
// //                   <Text style={styles.weatherIconEmoji}>☀️</Text>
// //                 )}
// //                 <View style={styles.weatherMiniRow}>
// //                   {feelsLike !== null && (
// //                     <Text style={styles.weatherMiniText}>
// //                       Ndjehet: {feelsLike}°
// //                     </Text>
// //                   )}
// //                   {humidity != null && (
// //                     <Text style={styles.weatherMiniText}>
// //                       Lagështia: {humidity}%
// //                     </Text>
// //                   )}
// //                   {windSpeed != null && (
// //                     <Text style={styles.weatherMiniText}>
// //                       Era: {windSpeed} m/s
// //                     </Text>
// //                   )}
// //                 </View>
// //               </View>
// //             </View>
// //           )}
// //         </View>

// //         {/* HAPAT */}
// //         <View style={[styles.cardBase, styles.cardTall]}>
// //           <Text style={styles.title}>Gjurmues i hapave</Text>
// //           <View style={styles.circleWrap}>
// //             <View
// //               style={[
// //                 styles.progressCircle,
// //                 { backgroundColor: COLORS.cardSoft },
// //               ]}
// //             >
// //               <View
// //                 style={[
// //                   styles.progressFill,
// //                   {
// //                     transform: [{ rotate: angle }],
// //                     borderTopColor: COLORS.green,
// //                     borderRightColor: COLORS.green,
// //                   },
// //                 ]}
// //               />
// //               <View style={styles.innerCircle}>
// //                 <Text style={styles.stepCount}>
// //                   {steps.toLocaleString()}
// //                 </Text>
// //                 <Text style={styles.stepLabel}>hapa</Text>
// //               </View>
// //             </View>
// //           </View>
// //         </View>

// //         {/* GJUMI */}
// //         <View style={[styles.cardBase, styles.cardSmall]}>
// //           <Text style={styles.title}>Gjumi</Text>
// //           <View style={styles.sleepRow}>
// //             <Text style={styles.moon}>🌙</Text>
// //             <View>
// //               <Text style={styles.sleepTime}>
// //                 {hours} h {mins} m
// //               </Text>
// //               <Text style={styles.sleepLabel}>kohë gjumi</Text>
// //             </View>
// //           </View>
// //         </View>

// //         {/* KALORITË E KONSUMUARA */}
// //         <View style={[styles.cardBase, styles.cardSmall]}>
// //           <Text style={styles.title}>Kaloritë e konsumuara</Text>
// //           <View style={styles.calRow}>
// //             <Text style={styles.fire}>🔥</Text>
// //             <View>
// //               <Text style={styles.calNum}>{foodCalories}</Text>
// //               <Text style={styles.calLabel}>kalori sot</Text>
// //             </View>
// //           </View>
// //         </View>

// //         {/* RECETË E SHËNDETSHME – search lart, recetë poshtë */}
// //         <View style={[styles.cardBase, styles.cardTall]}>
// //           <Text style={styles.title}>Recetë e shëndetshme</Text>

// //           {/* KËRKO – gjithmonë NALT */}
// //           <View style={styles.searchBox}>
// //             <Text style={styles.searchLabel}>Kërko recetë:</Text>
// //             <TextInput
// //               placeholder="shkruaj p.sh. salad, pasta..."
// //               placeholderTextColor="#777"
// //               style={styles.searchInput}
// //               value={searchText}
// //               onChangeText={handleSearchTextChange}
// //               onSubmitEditing={handleSearch}
// //             />
// //             <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
// //               <Text style={styles.searchBtnText}>Kërko</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {searchLoading && (
// //             <Text style={styles.loadingText}>Duke kërkuar...</Text>
// //           )}
// //           {!!searchError && (
// //             <Text style={styles.errorText}>{searchError}</Text>
// //           )}

// //           {!searchRecipe && recipeLoading && (
// //             <Text style={styles.loadingText}>
// //               Duke u ngarkuar receta...
// //             </Text>
// //           )}
// //           {!searchRecipe && !!recipeError && (
// //             <Text style={styles.errorText}>{recipeError}</Text>
// //           )}

// //           {mainRecipe && (
// //             <View style={styles.recipeContainer}>
// //               <View style={styles.recipeRow}>
// //                 {mainRecipe.image && (
// //                   <Image
// //                     source={{ uri: mainRecipe.image }}
// //                     style={styles.recipeImage}
// //                   />
// //                 )}
// //                 <View style={{ flex: 1, marginLeft: 10 }}>
// //                   <Text style={styles.recipeTitle}>{mainRecipe.title}</Text>
// //                   <Text style={styles.recipeMeta}>
// //                     {mainRecipe.readyInMinutes
// //                       ? `Gati për ${mainRecipe.readyInMinutes} min`
// //                       : ""}
// //                     {mainRecipe.servings
// //                       ? ` • Porcione: ${mainRecipe.servings}`
// //                       : ""}
// //                   </Text>
// //                 </View>
// //               </View>

// //               <Text style={styles.recipeSectionTitle}>Përbërësit:</Text>
// //               {(mainRecipe.extendedIngredients || [])
// //                 .slice(0, 4)
// //                 .map((ing, idx) => (
// //                   <Text
// //                     key={ing.id || `${ing.original}-${idx}`}
// //                     style={styles.recipeBullet}
// //                   >
// //                     • {ing.original}
// //                   </Text>
// //                 ))}

// //               <Text style={styles.recipeSectionTitle}>Hapat:</Text>
// //               {((mainRecipe.analyzedInstructions || [])[0]?.steps || [])
// //                 .slice(0, 3)
// //                 .map((step) => (
// //                   <Text key={step.number} style={styles.recipeStep}>
// //                     {step.number}. {step.step}
// //                   </Text>
// //                 ))}
// //             </View>
// //           )}
// //         </View>

// //         {/* KALORITË E DJEGURA */}
// //         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
// //           <Text style={styles.title}>Kaloritë e djegura</Text>
// //           <View style={styles.calRow}>
// //             <Text style={styles.fire}>🏋️</Text>
// //             <View>
// //               <Text style={styles.calNum}>{workoutCalories}</Text>
// //               <Text style={styles.calLabel}>kalori sot</Text>
// //             </View>
// //           </View>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: "center",
// //     paddingVertical: 10,
// //     paddingBottom: 110,
// //   },

// //   cards: {
// //     flex: 1,
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "flex-start",
// //     paddingVertical: 6,
// //   },

// //   cardBase: {
// //     width: "90%",
// //     backgroundColor: COLORS.card,
// //     borderRadius: 18,
// //     padding: 18,
// //     elevation: 3,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.06,
// //     shadowRadius: 4,
// //     shadowOffset: { width: 0, height: 3 },
// //     marginBottom: 10,
// //   },

// //   lastCard: { marginBottom: 0 },

// //   cardTall: { minHeight: 240 },
// //   cardSmall: { minHeight: 135 },

// //   title: {
// //     fontSize: 15,
// //     color: COLORS.textDark,
// //     marginBottom: 6,
// //     fontWeight: "700",
// //   },

// //   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
// //   progressCircle: {
// //     width: 150,
// //     height: 150,
// //     borderRadius: 75,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     position: "relative",
// //   },
// //   progressFill: {
// //     position: "absolute",
// //     width: "100%",
// //     height: "100%",
// //     borderRadius: 75,
// //     borderWidth: 14,
// //     borderLeftColor: "transparent",
// //     borderBottomColor: "transparent",
// //   },
// //   innerCircle: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     backgroundColor: COLORS.page,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
// //   stepLabel: { fontSize: 13, color: COLORS.textDark },

// //   sleepRow: { flexDirection: "row", alignItems: "center" },
// //   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
// //   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// //   sleepLabel: { fontSize: 13, color: COLORS.textDark },

// //   calRow: { flexDirection: "row", alignItems: "center" },
// //   fire: { fontSize: 30, marginRight: 10 },
// //   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
// //   calLabel: { fontSize: 13, color: COLORS.textDark },

// //   weatherCard: {
// //     backgroundColor: "#E6DFC5",
// //     borderRadius: 22,
// //     paddingVertical: 16,
// //     paddingHorizontal: 18,
// //   },
// //   weatherHeaderRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 4,
// //   },
// //   weatherTitle: {
// //     fontSize: 15,
// //     fontWeight: "700",
// //     color: COLORS.textDark,
// //   },
// //   weatherCitySmall: {
// //     fontSize: 13,
// //     color: COLORS.textDark,
// //     opacity: 0.8,
// //   },
// //   loadingText: {
// //     marginTop: 8,
// //     fontSize: 13,
// //     color: COLORS.textDark,
// //   },
// //   weatherMainRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: 8,
// //   },
// //   weatherLeft: { flex: 1 },
// //   weatherTemp: {
// //     fontSize: 40,
// //     fontWeight: "700",
// //     color: COLORS.green,
// //   },
// //   weatherDescMain: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: COLORS.textDark,
// //     marginTop: 2,
// //   },
// //   weatherDescSub: {
// //     fontSize: 12,
// //     color: COLORS.textDark,
// //     opacity: 0.7,
// //   },
// //   weatherRight: {
// //     alignItems: "flex-end",
// //     justifyContent: "center",
// //     flex: 1,
// //   },
// //   weatherIconImg: {
// //     width: 60,
// //     height: 60,
// //     marginBottom: 4,
// //   },
// //   weatherIconEmoji: {
// //     fontSize: 32,
// //     marginBottom: 4,
// //   },
// //   weatherMiniRow: {
// //     alignItems: "flex-end",
// //   },
// //   weatherMiniText: {
// //     fontSize: 11,
// //     color: COLORS.textDark,
// //     opacity: 0.8,
// //   },
// //   errorText: {
// //     fontSize: 13,
// //     color: "red",
// //     marginTop: 4,
// //   },

// //   // 🔹 RECETA + SEARCH
// //   searchBox: {
// //     marginBottom: 8,
// //   },
// //   searchLabel: {
// //     fontSize: 13,
// //     color: COLORS.textDark,
// //     marginBottom: 4,
// //   },
// //   searchInput: {
// //     height: 36,
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     borderColor: "rgba(0,0,0,0.15)",
// //     paddingHorizontal: 10,
// //     fontSize: 13,
// //     backgroundColor: COLORS.page,
// //     marginBottom: 6,
// //   },
// //   searchBtn: {
// //     alignSelf: "flex-start",
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 10,
// //     backgroundColor: COLORS.green,
// //   },
// //   searchBtnText: {
// //     color: "#fff",
// //     fontSize: 13,
// //     fontWeight: "600",
// //   },

// //   recipeContainer: {
// //     marginTop: 10,
// //   },
// //   recipeRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: 6,
// //   },
// //   recipeImage: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 12,
// //     backgroundColor: "#ccc",
// //   },
// //   recipeTitle: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: COLORS.textDark,
// //   },
// //   recipeMeta: {
// //     fontSize: 11,
// //     color: "#555",
// //     marginTop: 2,
// //   },
// //   recipeSectionTitle: {
// //     marginTop: 4,
// //     fontSize: 13,
// //     fontWeight: "600",
// //     color: COLORS.textDark,
// //   },
// //   recipeBullet: {
// //     fontSize: 12,
// //     color: "#444",
// //   },
// //   recipeStep: {
// //     fontSize: 12,
// //     color: "#444",
// //   },
// // });

// //komplet funksional
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from "expo-router";
// import React, { useCallback, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// // Firestore + Auth
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../firebaseConfig"; // rregullo path nëse duhet

// // Recetat nga Spoonacular
// import {
//   getRecipeOfDay,
//   searchRecipeWithDetails,
// } from "../../services/receta"; // rregullo path nëse duhet

// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   textDark: "#2E2E2E",
//   cardSoft: "#EFE8CF",
// };

// export default function HealthWidgets({
//   steps = 5432,
//   stepGoal = 8000,
//   sleepMinutes = 465,
// }) {
//   const [foodCalories, setFoodCalories] = useState(0);
//   const [workoutCalories, setWorkoutCalories] = useState(0);

//   const { weather, weatherLoading, weatherError } = useWeather();

//   // RECETAT
//   const [recipeOfDay, setRecipeOfDay] = useState(null);
//   const [recipeLoading, setRecipeLoading] = useState(false);
//   const [recipeError, setRecipeError] = useState("");

//   const [searchText, setSearchText] = useState("");
//   const [searchRecipe, setSearchRecipe] = useState(null);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [searchError, setSearchError] = useState("");

//   const mainRecipe = searchRecipe || recipeOfDay;

//   // GJUMI – Start/Stop
//   const [sleepStart, setSleepStart] = useState(null); // Date ose null
//   const [sleepDuration, setSleepDuration] = useState(sleepMinutes || 0); // në minuta
//   const isSleeping = !!sleepStart;

//   const getSleepComment = (mins) => {
//     if (!mins || mins <= 0) return "";
//     if (mins < 300) return "Jo gjum i mirë (më pak se 5 orë)";
//     if (mins < 480) return "Gjum mesatar (5–8 orë)";
//     return "Gjum shumë i mirë (më shumë se 8 orë)";
//   };

//   const formatSleep = (mins) => {
//     if (!mins || mins <= 0) return "S’ka të dhëna për gjumin";
//     const h = Math.floor(mins / 60);
//     const m = mins % 60;
//     return `${h} h ${m} m`;
//   };

//   // 🔹 Lexo kaloritë, gjumin + recetën random
//   useFocusEffect(
//     useCallback(() => {
//       const loadData = async () => {
//         const today = new Date().toISOString().slice(0, 10);
//         const foodKey = `food_kcal_${today}`;
//         const workoutKey = `workout_kcal_${today}`;

//         const foodRawLocal = await AsyncStorage.getItem(foodKey);
//         const workoutRawLocal = await AsyncStorage.getItem(workoutKey);

//         let foodTotal = foodRawLocal ? Number(foodRawLocal) : 0;
//         let workoutTotal = workoutRawLocal
//           ? Number(workoutRawLocal)
//           : 0;

//         // leximi fillestar i gjumit nga AsyncStorage
//         let localStart = null;
//         let localMinutes = 0;
//         try {
//           const startIso = await AsyncStorage.getItem("sleep_start");
//           const lastMinRaw = await AsyncStorage.getItem(
//             "sleep_lastMinutes"
//           );

//           if (startIso) {
//             localStart = new Date(startIso);
//           }
//           if (lastMinRaw) {
//             localMinutes = Number(lastMinRaw);
//           } else if (sleepMinutes) {
//             localMinutes = sleepMinutes;
//           }
//         } catch (e) {
//           console.log("Sleep load local error:", e);
//         }

//         setSleepStart(localStart);
//         setSleepDuration(localMinutes);

//         const user = auth.currentUser;
//         if (user) {
//           try {
//             // Ushqimi – dailyIntake/{userId}/days/{dayId}
//             const foodDocRef = doc(
//               db,
//               "dailyIntake",
//               user.uid,
//               "days",
//               today
//             );
//             const foodSnap = await getDoc(foodDocRef);
//             if (foodSnap.exists()) {
//               const data = foodSnap.data();
//               const firestoreFood = Number(data.totalCalories || 0);
//               if (firestoreFood > 0) {
//                 foodTotal = firestoreFood;
//                 await AsyncStorage.setItem(foodKey, String(foodTotal));
//               }
//             }

//             // Ushtrimet – workoutDaily, docId = uid_today
//             const workoutDocRef = doc(
//               db,
//               "workoutDaily",
//               `${user.uid}_${today}`
//             );
//             const workoutSnap = await getDoc(workoutDocRef);
//             if (workoutSnap.exists()) {
//               const data = workoutSnap.data();
//               const firestoreWorkout = Number(data.totalCalories || 0);
//               if (firestoreWorkout > 0) {
//                 workoutTotal = firestoreWorkout;
//                 await AsyncStorage.setItem(
//                   workoutKey,
//                   String(workoutTotal)
//                 );
//               }
//             }

//             // 🔹 Gjumi – sleepDaily/{userId}/days/{today}
//             const sleepDocRef = doc(
//               db,
//               "sleepDaily",
//               user.uid,
//               "days",
//               today
//             );
//             const sleepSnap = await getDoc(sleepDocRef);
//             if (sleepSnap.exists()) {
//               const s = sleepSnap.data();
//               if (s.startTime && !s.endTime) {
//                 // gjum në proces
//                 const st = new Date(s.startTime);
//                 setSleepStart(st);
//                 await AsyncStorage.setItem(
//                   "sleep_start",
//                   s.startTime
//                 );
//                 await AsyncStorage.removeItem("sleep_lastMinutes");
//               } else if (s.endTime && s.minutes != null) {
//                 const mins = Number(s.minutes);
//                 setSleepStart(null);
//                 setSleepDuration(mins);
//                 await AsyncStorage.removeItem("sleep_start");
//                 await AsyncStorage.setItem(
//                   "sleep_lastMinutes",
//                   String(mins)
//                 );
//               }
//             }
//           } catch (e) {
//             console.log("HealthWidgets Firestore load error:", e);
//           }
//         }

//         setFoodCalories(foodTotal);
//         setWorkoutCalories(workoutTotal);
//       };

//       const loadRecipe = async () => {
//         try {
//           setRecipeLoading(true);
//           setRecipeError("");
//           const r = await getRecipeOfDay();
//           if (!r) {
//             setRecipeError("S’ka recetë për momentin.");
//           } else {
//             setRecipeOfDay(r);
//           }
//         } catch (e) {
//           console.log("loadRecipe error:", e);
//           setRecipeError("Gabim gjatë marrjes së recetës.");
//         } finally {
//           setRecipeLoading(false);
//         }
//       };

//       loadData();
//       loadRecipe();
//     }, [sleepMinutes])
//   );

//   // START gjumin
//   const handleStartSleep = async () => {
//     const now = new Date();
//     setSleepStart(now);

//     await AsyncStorage.setItem("sleep_start", now.toISOString());
//     await AsyncStorage.removeItem("sleep_lastMinutes");

//     const user = auth.currentUser;
//     if (user) {
//       const today = new Date().toISOString().slice(0, 10);
//       const sleepDocRef = doc(
//         db,
//         "sleepDaily",
//         user.uid,
//         "days",
//         today
//       );
//       try {
//         await setDoc(
//           sleepDocRef,
//           {
//             startTime: now.toISOString(),
//             endTime: null,
//             minutes: 0,
//           },
//           { merge: true }
//         );
//       } catch (e) {
//         console.log("Start sleep Firestore error:", e);
//       }
//     }
//   };

//   // STOP gjumin
//   const handleStopSleep = async () => {
//     try {
//       if (!sleepStart) return;
//       const now = new Date();
//       const diffMs = now.getTime() - sleepStart.getTime();
//       const mins = Math.max(0, Math.round(diffMs / 60000));

//       setSleepDuration(mins);
//       setSleepStart(null);

//       await AsyncStorage.removeItem("sleep_start");
//       await AsyncStorage.setItem(
//         "sleep_lastMinutes",
//         String(mins)
//       );

//       const user = auth.currentUser;
//       if (user) {
//         const today = new Date().toISOString().slice(0, 10);
//         const sleepDocRef = doc(
//           db,
//           "sleepDaily",
//           user.uid,
//           "days",
//           today
//         );
//         try {
//           await setDoc(
//             sleepDocRef,
//             {
//               endTime: now.toISOString(),
//               minutes: mins,
//             },
//             { merge: true }
//           );
//         } catch (e) {
//           console.log("Stop sleep Firestore error:", e);
//         }
//       }
//     } catch (e) {
//       console.log("Stop sleep error:", e);
//     }
//   };

//   // SEARCH recetë – ndryshim teksti
//   const handleSearchTextChange = (text) => {
//     setSearchText(text);
//     if (text.trim() === "") {
//       setSearchRecipe(null);
//       setSearchError("");
//     }
//   };

//   // SEARCH recetë – butoni / enter
//   const handleSearch = async () => {
//     const q = searchText.trim();
//     if (!q) {
//       setSearchRecipe(null);
//       setSearchError("");
//       return;
//     }

//     try {
//       setSearchLoading(true);
//       setSearchError("");
//       const r = await searchRecipeWithDetails(q);
//       if (!r) {
//         setSearchRecipe(null);
//         setSearchError("S’u gjet asnjë recetë.");
//       } else {
//         setSearchRecipe(r);
//       }
//     } catch (e) {
//       console.log("searchRecipe error:", e);
//       setSearchRecipe(null);
//       setSearchError("Gabim gjatë kërkimit të recetës.");
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Moti
//   const temperature =
//     weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
//   const feelsLike =
//     weather?.main?.feels_like != null
//       ? Math.round(weather.main.feels_like)
//       : null;
//   const humidity = weather?.main?.humidity;
//   const windSpeed = weather?.wind?.speed;
//   const cityName = weather?.name;
//   const descriptionEn = weather?.weather?.[0]?.description || "";
//   const iconCode = weather?.weather?.[0]?.icon;
//   const iconUrl = iconCode
//     ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
//     : null;

//   const translateDesc = (desc) => {
//     const d = desc.toLowerCase();
//     if (d.includes("clear")) return "qiell i kthjellët";
//     if (d.includes("cloud")) return "me re";
//     if (d.includes("rain")) return "shi";
//     if (d.includes("snow")) return "borë";
//     if (d.includes("thunder")) return "stuhi";
//     if (d.includes("mist") || d.includes("fog")) return "mjergull";
//     return desc;
//   };

//   const descriptionSq = translateDesc(descriptionEn);

//   // 🔥 Sugjerimi i aktivitetit bazuar në mot
//   const getActivitySuggestion = () => {
//     if (temperature == null) return "";

//     const d = descriptionEn.toLowerCase();
//     const isRain =
//       d.includes("rain") ||
//       d.includes("storm") ||
//       d.includes("drizzle");
//     const isSnow = d.includes("snow");
//     const isVeryCold = temperature < 0;
//     const isCold = temperature >= 0 && temperature < 8;
//     const isHot = temperature > 28;
//     const isWarm = temperature >= 15 && temperature <= 25;

//     if (isRain || isSnow) {
//       return "Ka shi/borë – bëj ushtrime brenda (home workout, yoga ose stretching).";
//     }
//     if (isVeryCold) {
//       return "Shumë ftohtë jashtë – vishu trashë ose zgjidh ushtrime brenda.";
//     }
//     if (isHot) {
//       return "Moti shumë i nxehtë – ec në mëngjes ose mbrëmje dhe pi shumë uj gjatë ditës.";
//     }
//     if (isWarm && windSpeed != null && windSpeed < 8) {
//       return "Kushtet perfekte për ecje 30–40 minuta jashtë ose një vrap të lehtë.";
//     }
//     if (isWarm) {
//       return "Moti i mirë për aktivitet jashtë – bën një shëtitje të lehtë ose çiklizëm.";
//     }
//     if (isCold) {
//       return "Pak ftohtë – bëj shëtitje të shkurtër me veshje të ngrohta ose ushtrime brenda.";
//     }
//     return "Zgjidh një aktivitet të lehtë – kombinim ecje jashtë dhe ushtrimesh brenda.";
//   };

//   const activitySuggestion = getActivitySuggestion();

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: COLORS.page }}
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={styles.cards}>
//         {/* MOTI */}
//         <View style={[styles.cardBase, styles.weatherCard]}>
//           <View style={styles.weatherHeaderRow}>
//             <Text style={styles.weatherTitle}>Moti sot</Text>
//             {cityName && (
//               <Text style={styles.weatherCitySmall}>{cityName}</Text>
//             )}
//           </View>

//           {weatherLoading && (
//             <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
//           )}

//           {!weatherLoading && weatherError && (
//             <Text style={styles.errorText}>{weatherError}</Text>
//           )}

//           {!weatherLoading && !weatherError && temperature !== null && (
//             <View>
//               <View style={styles.weatherMainRow}>
//                 <View style={styles.weatherLeft}>
//                   <Text style={styles.weatherTemp}>{temperature}°</Text>
//                   <Text style={styles.weatherDescMain}>{descriptionSq}</Text>
//                   <Text style={styles.weatherDescSub}>{descriptionEn}</Text>
//                 </View>

//                 <View style={styles.weatherRight}>
//                   {iconUrl ? (
//                     <Image
//                       source={{ uri: iconUrl }}
//                       style={styles.weatherIconImg}
//                       resizeMode="contain"
//                     />
//                   ) : (
//                     <Text style={styles.weatherIconEmoji}>☀️</Text>
//                   )}
//                   <View style={styles.weatherMiniRow}>
//                     {feelsLike !== null && (
//                       <Text style={styles.weatherMiniText}>
//                         Ndjehet: {feelsLike}°
//                       </Text>
//                     )}
//                     {humidity != null && (
//                       <Text style={styles.weatherMiniText}>
//                         Lagështia: {humidity}%
//                       </Text>
//                     )}
//                     {windSpeed != null && (
//                       <Text style={styles.weatherMiniText}>
//                         Era: {windSpeed} m/s
//                       </Text>
//                     )}
//                   </View>
//                 </View>
//               </View>

//               {activitySuggestion !== "" && (
//                 <View style={styles.activityBox}>
//                   <Text style={styles.activityTitle}>
//                     Sugjerim aktiviteti
//                   </Text>
//                   <Text style={styles.activityText}>
//                     {activitySuggestion}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           )}
//         </View>

//         {/* GJUMI – START/STOP + KOMENT */}
//         <View style={[styles.cardBase, styles.cardSmall]}>
//           <Text style={styles.title}>Gjumi</Text>
//           <View style={styles.sleepRow}>
//             <Text style={styles.moon}>🌙</Text>
//             <View>
//               <Text style={styles.sleepTime}>
//                 {formatSleep(sleepDuration)}
//               </Text>
//               {sleepDuration > 0 && (
//                 <Text style={styles.sleepLabel}>
//                   {getSleepComment(sleepDuration)}
//                 </Text>
//               )}
//             </View>
//           </View>

//           <TouchableOpacity
//             style={[
//               styles.sleepBtn,
//               isSleeping ? styles.sleepBtnStop : styles.sleepBtnStart,
//             ]}
//             onPress={isSleeping ? handleStopSleep : handleStartSleep}
//           >
//             <Text style={styles.sleepBtnText}>
//               {isSleeping ? "Ndale gjumin" : "Fillo gjumin"}
//             </Text>
//           </TouchableOpacity>

//           {isSleeping && (
//             <Text style={styles.sleepStatusText}>
//               Gjumi është duke u matur...
//             </Text>
//           )}
//         </View>

//         {/* RECETË E SHËNDETSHME – search lart, recetë poshtë */}
//         <View style={[styles.cardBase, styles.cardTall]}>
//           <Text style={styles.title}>Recetë e shëndetshme</Text>

//           <View style={styles.searchBox}>
//             <Text style={styles.searchLabel}>Kërko recetë:</Text>
//             <TextInput
//               placeholder="shkruaj p.sh. salad, pasta..."
//               placeholderTextColor="#777"
//               style={styles.searchInput}
//               value={searchText}
//               onChangeText={handleSearchTextChange}
//               onSubmitEditing={handleSearch}
//             />
//             <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
//               <Text style={styles.searchBtnText}>Kërko</Text>
//             </TouchableOpacity>
//           </View>

//           {searchLoading && (
//             <Text style={styles.loadingText}>Duke kërkuar...</Text>
//           )}
//           {!!searchError && (
//             <Text style={styles.errorText}>{searchError}</Text>
//           )}

//           {!searchRecipe && recipeLoading && (
//             <Text style={styles.loadingText}>
//               Duke u ngarkuar receta...
//             </Text>
//           )}
//           {!searchRecipe && !!recipeError && (
//             <Text style={styles.errorText}>{recipeError}</Text>
//           )}

//           {mainRecipe && (
//             <View style={styles.recipeContainer}>
//               <View style={styles.recipeRow}>
//                 {mainRecipe.image && (
//                   <Image
//                     source={{ uri: mainRecipe.image }}
//                     style={styles.recipeImage}
//                   />
//                 )}
//                 <View style={{ flex: 1, marginLeft: 10 }}>
//                   <Text style={styles.recipeTitle}>{mainRecipe.title}</Text>
//                   <Text style={styles.recipeMeta}>
//                     {mainRecipe.readyInMinutes
//                       ? `Gati për ${mainRecipe.readyInMinutes} min`
//                       : ""}
//                     {mainRecipe.servings
//                       ? ` • Porcione: ${mainRecipe.servings}`
//                       : ""}
//                   </Text>
//                 </View>
//               </View>

//               <Text style={styles.recipeSectionTitle}>Përbërësit:</Text>
//               {(mainRecipe.extendedIngredients || [])
//                 .slice(0, 4)
//                 .map((ing, idx) => (
//                   <Text
//                     key={ing.id || `${ing.original}-${idx}`}
//                     style={styles.recipeBullet}
//                   >
//                     • {ing.original}
//                   </Text>
//                 ))}

//               <Text style={styles.recipeSectionTitle}>Hapat:</Text>
//               {((mainRecipe.analyzedInstructions || [])[0]?.steps || [])
//                 .slice(0, 3)
//                 .map((step) => (
//                   <Text key={step.number} style={styles.recipeStep}>
//                     {step.number}. {step.step}
//                   </Text>
//                 ))}
//             </View>
//           )}
//         </View>

//         {/* KALORITË E KONSUMUARA */}
//         <View style={[styles.cardBase, styles.cardSmall]}>
//           <Text style={styles.title}>Kaloritë e konsumuara</Text>
//           <View style={styles.calRow}>
//             <Text style={styles.fire}>🔥</Text>
//             <View>
//               <Text style={styles.calNum}>{foodCalories}</Text>
//               <Text style={styles.calLabel}>kalori sot</Text>
//             </View>
//           </View>
//         </View>

//         {/* KALORITË E DJEGURA */}
//         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
//           <Text style={styles.title}>Kaloritë e djegura</Text>
//           <View style={styles.calRow}>
//             <Text style={styles.fire}>🏋️</Text>
//             <View>
//               <Text style={styles.calNum}>{workoutCalories}</Text>
//               <Text style={styles.calLabel}>kalori sot</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingBottom: 110,
//   },

//   cards: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingVertical: 6,
//   },

//   cardBase: {
//     width: "90%",
//     backgroundColor: COLORS.card,
//     borderRadius: 18,
//     padding: 18,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 3 },
//     marginBottom: 10,
//   },

//   lastCard: { marginBottom: 0 },

//   cardTall: { minHeight: 240 },
//   cardSmall: { minHeight: 135 },

//   title: {
//     fontSize: 15,
//     color: COLORS.textDark,
//     marginBottom: 6,
//     fontWeight: "700",
//   },

//   // SLEEP
//   sleepRow: { flexDirection: "row", alignItems: "center" },
//   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
//   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
//   sleepLabel: { fontSize: 13, color: COLORS.textDark },

//   sleepBtn: {
//     marginTop: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 10,
//     alignSelf: "flex-start",
//   },
//   sleepBtnStart: {
//     backgroundColor: COLORS.green,
//   },
//   sleepBtnStop: {
//     backgroundColor: "#b3261e",
//   },
//   sleepBtnText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   sleepStatusText: {
//     marginTop: 6,
//     fontSize: 12,
//     color: COLORS.textDark,
//     opacity: 0.8,
//   },

//   // KALORITË
//   calRow: { flexDirection: "row", alignItems: "center" },
//   fire: { fontSize: 30, marginRight: 10 },
//   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
//   calLabel: { fontSize: 13, color: COLORS.textDark },

//   // MOTI
//   weatherCard: {
//     backgroundColor: "#E6DFC5",
//     borderRadius: 22,
//     paddingVertical: 16,
//     paddingHorizontal: 18,
//   },
//   weatherHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   weatherTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: COLORS.textDark,
//   },
//   weatherCitySmall: {
//     fontSize: 13,
//     color: COLORS.textDark,
//     opacity: 0.8,
//   },
//   loadingText: {
//     marginTop: 8,
//     fontSize: 13,
//     color: COLORS.textDark,
//   },
//   weatherMainRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   weatherLeft: { flex: 1 },
//   weatherTemp: {
//     fontSize: 40,
//     fontWeight: "700",
//     color: COLORS.green,
//   },
//   weatherDescMain: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.textDark,
//     marginTop: 2,
//   },
//   weatherDescSub: {
//     fontSize: 12,
//     color: COLORS.textDark,
//     opacity: 0.7,
//   },
//   weatherRight: {
//     alignItems: "flex-end",
//     justifyContent: "center",
//     flex: 1,
//   },
//   weatherIconImg: {
//     width: 60,
//     height: 60,
//     marginBottom: 4,
//   },
//   weatherIconEmoji: {
//     fontSize: 32,
//     marginBottom: 4,
//   },
//   weatherMiniRow: {
//     alignItems: "flex-end",
//   },
//   weatherMiniText: {
//     fontSize: 11,
//     color: COLORS.textDark,
//     opacity: 0.8,
//   },

//   // sugjerimi i aktivitetit
//   activityBox: {
//     marginTop: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     backgroundColor: COLORS.cardSoft,
//   },
//   activityTitle: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: COLORS.textDark,
//     marginBottom: 2,
//   },
//   activityText: {
//     fontSize: 12,
//     color: COLORS.textDark,
//   },

//   errorText: {
//     fontSize: 13,
//     color: "red",
//     marginTop: 4,
//   },

//   // RECETA + SEARCH
//   searchBox: {
//     marginBottom: 8,
//   },
//   searchLabel: {
//     fontSize: 13,
//     color: COLORS.textDark,
//     marginBottom: 4,
//   },
//   searchInput: {
//     height: 36,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "rgba(0,0,0,0.15)",
//     paddingHorizontal: 10,
//     fontSize: 13,
//     backgroundColor: COLORS.page,
//     marginBottom: 6,
//   },
//   searchBtn: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     backgroundColor: COLORS.green,
//   },
//   searchBtnText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   recipeContainer: {
//     marginTop: 10,
//   },
//   recipeRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   recipeImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//     backgroundColor: "#ccc",
//   },
//   recipeTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: COLORS.textDark,
//   },
//   recipeMeta: {
//     fontSize: 11,
//     color: "#555",
//     marginTop: 2,
//   },
//   recipeSectionTitle: {
//     marginTop: 4,
//     fontSize: 13,
//     fontWeight: "600",
//     color: COLORS.textDark,
//   },
//   recipeBullet: {
//     fontSize: 12,
//     color: "#444",
//   },
//   recipeStep: {
//     fontSize: 12,
//     color: "#444",
//   },
// });


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useWeather } from "../../services/weather"; // RREGULLO SIKUR E KE TI

// Firestore + Auth
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // rregullo path nëse duhet

// Recetat nga Spoonacular
import {
  getRecipeOfDay,
  searchRecipeWithDetails,
} from "../../services/receta"; // rregullo path nëse duhet

// 🔥 Mood GIF nga Tenor
import { getMoodGif } from "../../services/moodGif";

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

  const { weather, weatherLoading, weatherError } = useWeather();

  // RECETAT
  const [recipeOfDay, setRecipeOfDay] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchRecipe, setSearchRecipe] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const mainRecipe = searchRecipe || recipeOfDay;

  // GJUMI – Start/Stop
  const [sleepStart, setSleepStart] = useState(null); // Date ose null
  const [sleepDuration, setSleepDuration] = useState(sleepMinutes || 0); // në minuta
  const isSleeping = !!sleepStart;

  // 🔥 MOOD GIF – state
  const [mood, setMood] = useState(null); // "happy" | "tired" | "hungry" | "motivated"
  const [moodGif, setMoodGif] = useState(null);
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodError, setMoodError] = useState("");

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

  // 🔹 Lexo kaloritë, gjumin + recetën random
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

        // leximi fillestar i gjumit nga AsyncStorage
        let localStart = null;
        let localMinutes = 0;
        try {
          const startIso = await AsyncStorage.getItem("sleep_start");
          const lastMinRaw = await AsyncStorage.getItem(
            "sleep_lastMinutes"
          );

          if (startIso) {
            localStart = new Date(startIso);
          }
          if (lastMinRaw) {
            localMinutes = Number(lastMinRaw);
          } else if (sleepMinutes) {
            localMinutes = sleepMinutes;
          }
        } catch (e) {
          console.log("Sleep load local error:", e);
        }

        setSleepStart(localStart);
        setSleepDuration(localMinutes);

        const user = auth.currentUser;
        if (user) {
          try {
            // Ushqimi – dailyIntake/{userId}/days/{dayId}
            const foodDocRef = doc(
              db,
              "dailyIntake",
              user.uid,
              "days",
              today
            );
            const foodSnap = await getDoc(foodDocRef);
            if (foodSnap.exists()) {
              const data = foodSnap.data();
              const firestoreFood = Number(data.totalCalories || 0);
              if (firestoreFood > 0) {
                foodTotal = firestoreFood;
                await AsyncStorage.setItem(foodKey, String(foodTotal));
              }
            }

            // Ushtrimet – workoutDaily, docId = uid_today
            const workoutDocRef = doc(
              db,
              "workoutDaily",
              `${user.uid}_${today}`
            );
            const workoutSnap = await getDoc(workoutDocRef);
            if (workoutSnap.exists()) {
              const data = workoutSnap.data();
              const firestoreWorkout = Number(data.totalCalories || 0);
              if (firestoreWorkout > 0) {
                workoutTotal = firestoreWorkout;
                await AsyncStorage.setItem(
                  workoutKey,
                  String(workoutTotal)
                );
              }
            }

            // 🔹 Gjumi – sleepDaily/{userId}/days/{today}
            const sleepDocRef = doc(
              db,
              "sleepDaily",
              user.uid,
              "days",
              today
            );
            const sleepSnap = await getDoc(sleepDocRef);
            if (sleepSnap.exists()) {
              const s = sleepSnap.data();
              if (s.startTime && !s.endTime) {
                // gjum në proces
                const st = new Date(s.startTime);
                setSleepStart(st);
                await AsyncStorage.setItem(
                  "sleep_start",
                  s.startTime
                );
                await AsyncStorage.removeItem("sleep_lastMinutes");
              } else if (s.endTime && s.minutes != null) {
                const mins = Number(s.minutes);
                setSleepStart(null);
                setSleepDuration(mins);
                await AsyncStorage.removeItem("sleep_start");
                await AsyncStorage.setItem(
                  "sleep_lastMinutes",
                  String(mins)
                );
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
          if (!r) {
            setRecipeError("S’ka recetë për momentin.");
          } else {
            setRecipeOfDay(r);
          }
        } catch (e) {
          console.log("loadRecipe error:", e);
          setRecipeError("Gabim gjatë marrjes së recetës.");
        } finally {
          setRecipeLoading(false);
        }
      };

      loadData();
      loadRecipe();
    }, [sleepMinutes])
  );

  // START gjumin
  const handleStartSleep = async () => {
    const now = new Date();
    setSleepStart(now);

    await AsyncStorage.setItem("sleep_start", now.toISOString());
    await AsyncStorage.removeItem("sleep_lastMinutes");

    const user = auth.currentUser;
    if (user) {
      const today = new Date().toISOString().slice(0, 10);
      const sleepDocRef = doc(
        db,
        "sleepDaily",
        user.uid,
        "days",
        today
      );
      try {
        await setDoc(
          sleepDocRef,
          {
            startTime: now.toISOString(),
            endTime: null,
            minutes: 0,
          },
          { merge: true }
        );
      } catch (e) {
        console.log("Start sleep Firestore error:", e);
      }
    }
  };

  // STOP gjumin
  const handleStopSleep = async () => {
    try {
      if (!sleepStart) return;
      const now = new Date();
      const diffMs = now.getTime() - sleepStart.getTime();
      const mins = Math.max(0, Math.round(diffMs / 60000));

      setSleepDuration(mins);
      setSleepStart(null);

      await AsyncStorage.removeItem("sleep_start");
      await AsyncStorage.setItem(
        "sleep_lastMinutes",
        String(mins)
      );

      const user = auth.currentUser;
      if (user) {
        const today = new Date().toISOString().slice(0, 10);
        const sleepDocRef = doc(
          db,
          "sleepDaily",
          user.uid,
          "days",
          today
        );
        try {
          await setDoc(
            sleepDocRef,
            {
              endTime: now.toISOString(),
              minutes: mins,
            },
            { merge: true }
          );
        } catch (e) {
          console.log("Stop sleep Firestore error:", e);
        }
      }
    } catch (e) {
      console.log("Stop sleep error:", e);
    }
  };

  // SEARCH recetë – ndryshim teksti
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSearchRecipe(null);
      setSearchError("");
    }
  };

  // SEARCH recetë – butoni / enter
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

  // 🔥 Mood handler
  const handleSelectMood = async (m) => {
    // nëse klikon prap të njëjtin, mos e thirr API-n
    if (m === mood && moodGif) return;

    setMood(m);
    setMoodError("");
    setMoodLoading(true);
    try {
      const gif = await getMoodGif(m);
      if (!gif) {
        setMoodGif(null);
        setMoodError("S’u gjet GIF për këtë mood.");
      } else {
        setMoodGif(gif);
      }
    } catch (e) {
      console.log("Mood GIF error:", e);
      setMoodGif(null);
      setMoodError("Gabim gjatë marrjes së GIF.");
    } finally {
      setMoodLoading(false);
    }
  };

  // Moti
  const temperature =
    weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
  const feelsLike =
    weather?.main?.feels_like != null
      ? Math.round(weather.main.feels_like)
      : null;
  const humidity = weather?.main?.humidity;
  const windSpeed = weather?.wind?.speed;
  const cityName = weather?.name;
  const descriptionEn = weather?.weather?.[0]?.description || "";
  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

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

  // 🔥 Sugjerimi i aktivitetit bazuar në mot
  const getActivitySuggestion = () => {
    if (temperature == null) return "";

    const d = descriptionEn.toLowerCase();
    const isRain =
      d.includes("rain") ||
      d.includes("storm") ||
      d.includes("drizzle");
    const isSnow = d.includes("snow");
    const isVeryCold = temperature < 0;
    const isCold = temperature >= 0 && temperature < 8;
    const isHot = temperature > 28;
    const isWarm = temperature >= 15 && temperature <= 25;

    if (isRain || isSnow) {
      return "Ka shi/borë – bëj ushtrime brenda (home workout, yoga ose stretching).";
    }
    if (isVeryCold) {
      return "Shumë ftohtë jashtë – vishu trashë ose zgjidh ushtrime brenda.";
    }
    if (isHot) {
      return "Moti shumë i nxehtë – ec në mëngjes ose mbrëmje dhe pi shumë uj gjatë ditës.";
    }
    if (isWarm && windSpeed != null && windSpeed < 8) {
      return "Kushtet perfekte për ecje 30–40 minuta jashtë ose një vrap të lehtë.";
    }
    if (isWarm) {
      return "Moti i mirë për aktivitet jashtë – bën një shëtitje të lehtë ose çiklizëm.";
    }
    if (isCold) {
      return "Pak ftohtë – bëj shëtitje të shkurtër me veshje të ngrohta ose ushtrime brenda.";
    }
    return "Zgjidh një aktivitet të lehtë – kombinim ecje jashtë dhe ushtrimesh brenda.";
  };

  const activitySuggestion = getActivitySuggestion();

  const moodLabelSq = (m) => {
    if (m === "happy") return "i lumtur";
    if (m === "tired") return "i lodhur";
    if (m === "hungry") return "i uritur";
    if (m === "motivated") return "i motivuar";
    return m;
  };

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
            {cityName && (
              <Text style={styles.weatherCitySmall}>{cityName}</Text>
            )}
          </View>

          {weatherLoading && (
            <Text style={styles.loadingText}>Duke u ngarkuar...</Text>
          )}

          {!weatherLoading && weatherError && (
            <Text style={styles.errorText}>{weatherError}</Text>
          )}

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
                    <Image
                      source={{ uri: iconUrl }}
                      style={styles.weatherIconImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.weatherIconEmoji}>☀️</Text>
                  )}
                  <View style={styles.weatherMiniRow}>
                    {feelsLike !== null && (
                      <Text style={styles.weatherMiniText}>
                        Ndjehet: {feelsLike}°
                      </Text>
                    )}
                    {humidity != null && (
                      <Text style={styles.weatherMiniText}>
                        Lagështia: {humidity}%
                      </Text>
                    )}
                    {windSpeed != null && (
                      <Text style={styles.weatherMiniText}>
                        Era: {windSpeed} m/s
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              {activitySuggestion !== "" && (
                <View style={styles.activityBox}>
                  <Text style={styles.activityTitle}>
                    Sugjerim aktiviteti
                  </Text>
                  <Text style={styles.activityText}>
                    {activitySuggestion}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* GJUMI – START/STOP + KOMENT */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Gjumi</Text>
          <View style={styles.sleepRow}>
            <Text style={styles.moon}>🌙</Text>
            <View>
              <Text style={styles.sleepTime}>
                {formatSleep(sleepDuration)}
              </Text>
              {sleepDuration > 0 && (
                <Text style={styles.sleepLabel}>
                  {getSleepComment(sleepDuration)}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.sleepBtn,
              isSleeping ? styles.sleepBtnStop : styles.sleepBtnStart,
            ]}
            onPress={isSleeping ? handleStopSleep : handleStartSleep}
          >
            <Text style={styles.sleepBtnText}>
              {isSleeping ? "Ndale gjumin" : "Fillo gjumin"}
            </Text>
          </TouchableOpacity>

          {isSleeping && (
            <Text style={styles.sleepStatusText}>
              Gjumi është duke u matur...
            </Text>
          )}
        </View>

        {/* 🔥 MOOD I DITËS – GIF REACTION */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Mood i ditës</Text>

          <View style={styles.moodButtonsRow}>
            <TouchableOpacity
              style={[
                styles.moodBtn,
                mood === "happy" && styles.moodBtnActive,
              ]}
              onPress={() => handleSelectMood("happy")}
            >
              <Text
                style={[
                  styles.moodBtnText,
                  mood === "happy" && styles.moodBtnTextActive,
                ]}
              >
                😊 Happy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moodBtn,
                mood === "tired" && styles.moodBtnActive,
              ]}
              onPress={() => handleSelectMood("tired")}
            >
              <Text
                style={[
                  styles.moodBtnText,
                  mood === "tired" && styles.moodBtnTextActive,
                ]}
              >
                😴 Tired
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moodBtn,
                mood === "hungry" && styles.moodBtnActive,
              ]}
              onPress={() => handleSelectMood("hungry")}
            >
              <Text
                style={[
                  styles.moodBtnText,
                  mood === "hungry" && styles.moodBtnTextActive,
                ]}
              >
                😋 Hungry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.moodBtn,
                mood === "motivated" && styles.moodBtnActive,
              ]}
              onPress={() => handleSelectMood("motivated")}
            >
              <Text
                style={[
                  styles.moodBtnText,
                  mood === "motivated" && styles.moodBtnTextActive,
                ]}
              >
                💪 Motivated
              </Text>
            </TouchableOpacity>
          </View>

          {moodLoading && (
            <Text style={styles.loadingText}>Duke u ngarkuar GIF...</Text>
          )}
          {!!moodError && (
            <Text style={styles.errorText}>{moodError}</Text>
          )}

          {moodGif && !moodLoading && !moodError && (
            <View style={styles.moodGifBox}>
              <Image
                source={{ uri: moodGif.url }}
                style={styles.moodGifImage}
                resizeMode="cover"
              />
              {mood && (
                <Text style={styles.moodSelectedText}>
                  Mood sot: {moodLabelSq(mood)}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* RECETË E SHËNDETSHME – search lart, recetë poshtë */}
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

          {searchLoading && (
            <Text style={styles.loadingText}>Duke kërkuar...</Text>
          )}
          {!!searchError && (
            <Text style={styles.errorText}>{searchError}</Text>
          )}

          {!searchRecipe && recipeLoading && (
            <Text style={styles.loadingText}>
              Duke u ngarkuar receta...
            </Text>
          )}
          {!searchRecipe && !!recipeError && (
            <Text style={styles.errorText}>{recipeError}</Text>
          )}

          {mainRecipe && (
            <View style={styles.recipeContainer}>
              <View style={styles.recipeRow}>
                {mainRecipe.image && (
                  <Image
                    source={{ uri: mainRecipe.image }}
                    style={styles.recipeImage}
                  />
                )}
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.recipeTitle}>{mainRecipe.title}</Text>
                  <Text style={styles.recipeMeta}>
                    {mainRecipe.readyInMinutes
                      ? `Gati për ${mainRecipe.readyInMinutes} min`
                      : ""}
                    {mainRecipe.servings
                      ? ` • Porcione: ${mainRecipe.servings}`
                      : ""}
                  </Text>
                </View>
              </View>

              <Text style={styles.recipeSectionTitle}>Përbërësit:</Text>
              {(mainRecipe.extendedIngredients || [])
                .slice(0, 4)
                .map((ing, idx) => (
                  <Text
                    key={ing.id || `${ing.original}-${idx}`}
                    style={styles.recipeBullet}
                  >
                    • {ing.original}
                  </Text>
                ))}

              <Text style={styles.recipeSectionTitle}>Hapat:</Text>
              {((mainRecipe.analyzedInstructions || [])[0]?.steps || [])
                .slice(0, 3)
                .map((step) => (
                  <Text key={step.number} style={styles.recipeStep}>
                    {step.number}. {step.step}
                  </Text>
                ))}
            </View>
          )}
        </View>

        {/* KALORITË E KONSUMUARA */}
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

        {/* KALORITË E DJEGURA */}
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
  container: {
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 110,
  },

  cards: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
  },

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

  title: {
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 6,
    fontWeight: "700",
  },

  // SLEEP
  sleepRow: { flexDirection: "row", alignItems: "center" },
  moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
  sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  sleepLabel: { fontSize: 13, color: COLORS.textDark },

  sleepBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  sleepBtnStart: {
    backgroundColor: COLORS.green,
  },
  sleepBtnStop: {
    backgroundColor: "#b3261e",
  },
  sleepBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  sleepStatusText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.8,
  },

  // KALORITË
  calRow: { flexDirection: "row", alignItems: "center" },
  fire: { fontSize: 30, marginRight: 10 },
  calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  calLabel: { fontSize: 13, color: COLORS.textDark },

  // MOTI
  weatherCard: {
    backgroundColor: "#E6DFC5",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  weatherHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  weatherTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  weatherCitySmall: {
    fontSize: 13,
    color: COLORS.textDark,
    opacity: 0.8,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.textDark,
  },
  weatherMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  weatherLeft: { flex: 1 },
  weatherTemp: {
    fontSize: 40,
    fontWeight: "700",
    color: COLORS.green,
  },
  weatherDescMain: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 2,
  },
  weatherDescSub: {
    fontSize: 12,
    color: COLORS.textDark,
    opacity: 0.7,
  },
  weatherRight: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  weatherIconImg: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  weatherIconEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  weatherMiniRow: {
    alignItems: "flex-end",
  },
  weatherMiniText: {
    fontSize: 11,
    color: COLORS.textDark,
    opacity: 0.8,
  },

  // sugjerimi i aktivitetit
  activityBox: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: COLORS.cardSoft,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  activityText: {
    fontSize: 12,
    color: COLORS.textDark,
  },

  errorText: {
    fontSize: 13,
    color: "red",
    marginTop: 4,
  },

  // RECETA + SEARCH
  searchBox: {
    marginBottom: 8,
  },
  searchLabel: {
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  searchInput: {
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 10,
    fontSize: 13,
    backgroundColor: COLORS.page,
    marginBottom: 6,
  },
  searchBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  recipeContainer: {
    marginTop: 10,
  },
  recipeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  recipeImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#ccc",
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  recipeMeta: {
    fontSize: 11,
    color: "#555",
    marginTop: 2,
  },
  recipeSectionTitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  recipeBullet: {
    fontSize: 12,
    color: "#444",
  },
  recipeStep: {
    fontSize: 12,
    color: "#444",
  },

  // 🔥 MOOD STYLES
  moodButtonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  moodBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.green,
    marginRight: 6,
    marginTop: 4,
  },
  moodBtnActive: {
    backgroundColor: COLORS.green,
  },
  moodBtnText: {
    fontSize: 12,
    color: COLORS.green,
    fontWeight: "600",
  },
  moodBtnTextActive: {
    color: "#fff",
  },
  moodGifBox: {
    marginTop: 8,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: COLORS.cardSoft,
  },
  moodGifImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#ccc",
  },
  moodSelectedText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    color: COLORS.textDark,
  },
});
