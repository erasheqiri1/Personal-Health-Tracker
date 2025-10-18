// // import React from "react";
// // import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// // import { useRouter } from "expo-router";
// // import { FontAwesome } from "@expo/vector-icons";

// // const COLORS = {
// //   green: "#355E3B",
// //   page: "#F7F4E9",
// //   card: "#E6DFC5",
// //   cardSoft: "#EFE8CF",
// //   textDark: "#2E2E2E",
// // };

// // const breakfastIdeas = [
// //   "Tërshërë me qumësht 1.5–2% + fruta të stinës + fara liri",
// //   "Omëletë 2 vezë + djathë i butë + domate, 1 fetë bukë integrale",
// //   "Kos grek 5% + mjaltë (pak) + arra + boronica",
// //   "Smoothie balancuar: qumësht 1.5% + banane + spinaq + një grusht tërshërë",
// //   "Tost integrale me avokado (1/3) + vezë e zier sipër",
// //   "Puding chia me qumësht + kakao + pak kokos i grirë",
// //   "Palaçinka integrale me gjizë/kotixh dhe reçel shtëpie (pak)",
// // ];

// // const lunchIdeas = [
// //   "Pula në grill + oriz integral + sallatë me vaj ulliri",
// //   "Salmon i pjekur + kuinoa + rukola/limon",
// //   "Pasta integrale me ton + ullinj + domate qershi + parmixhano (pak)",
// //   "Bowl me gjoks pule, fasule, misër, avokado dhe kos–limon",
// //   "Qofte shtëpie (porcion) + patate të ëmbla + sallatë jeshile",
// //   "Wrap integrale me hummus, falafel (porcion) dhe sallatë",
// //   "Rizoto integrale me kërpudha + parmixhano (pak)",
// // ];

// // const dinnerIdeas = [
// //   "Peshk i bardhë + perime në avull + patate të ziera (porcion i moderuar)",
// //   "Turkey burger (pa bukë ose me bukë integrale) + sallatë coleslaw e lehtë",
// //   "Curry pule me oriz basmati (porcion i balancuar)",
// //   "Noodles oriz me perime + tofu/pule (porcion i mesëm)",
// //   "Pjatë mesdhetare: djathë i butë + ullinj + domate + bukë integrale (porcion)",
// //   "Frittata me perime + sallatë",
// //   "Sallatë greke + 1 pitë e vogël integrale",
// // ];

// // export default function MbajPeshe() {
// //   const router = useRouter();

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>
// //       <View style={styles.header}>
// //         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
// //           <FontAwesome name="arrow-left" size={22} color="#fff" />
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>Plani: Mbaj Peshën</Text>
// //         <View style={{ width: 44 }} />
// //       </View>

// //       <ScrollView contentContainerStyle={styles.wrap}>
// //         <TipCard />
// //         <MealCard title="Mëngjesi – 7 ide" items={breakfastIdeas} />
// //         <MealCard title="Dreka – 7 ide" items={lunchIdeas} />
// //         <MealCard title="Darkë – 7 ide" items={dinnerIdeas} />
// //         <View style={{ height: 20 }} />
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // function MealCard({ title, items }: { title: string; items: string[] }) {
// //   return (
// //     <View style={styles.card}>
// //       <Text style={styles.cardTitle}>{title}</Text>
// //       {items.map((t, i) => (
// //         <View key={i} style={styles.row}>
// //           <FontAwesome name="circle" size={8} color={COLORS.green} style={{ marginTop: 6 }} />
// //           <Text style={styles.item}>{t}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   );
// // }

// // function TipCard() {
// //   return (
// //     <View style={[styles.card, { backgroundColor: COLORS.cardSoft }]}>
// //       <Text style={styles.cardTitle}>Udhëzime të shpejta</Text>
// //       <Text style={styles.tip}>• Qëllimi: kalori në ekuilibër (≃ TDEE), porcione të moderuara.</Text>
// //       <Text style={styles.tip}>• Makro afërsisht: 30% P / 40% K / 30% Y (fleksibël sipas preferencës).</Text>
// //       <Text style={styles.tip}>• Ruaj aktivitetin: 8–10k hapa/ditë ose stërvitje 3–4x/javë.</Text>
// //       <Text style={styles.tip}>• Konsistencë perfeksion; mos kaloni vakte rregullisht.</Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   header: {
// //     height: 56,
// //     backgroundColor: COLORS.green,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 12,
// //   },
// //   backBtn: { width: 44, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
// //   headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800", letterSpacing: 0.3 },
// //   wrap: { padding: 16, gap: 14 },
// //   card: {
// //     backgroundColor: COLORS.card,
// //     padding: 14,
// //     borderRadius: 16,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.06,
// //     shadowRadius: 6,
// //     shadowOffset: { width: 0, height: 3 },
// //     elevation: 2,
// //   },
// //   cardTitle: { color: COLORS.green, fontSize: 18, fontWeight: "800", marginBottom: 8 },
// //   row: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
// //   item: { flex: 1, color: COLORS.textDark, fontSize: 15, lineHeight: 20 },
// //   tip: { color: COLORS.textDark, opacity: 0.9, marginBottom: 6, lineHeight: 20 },
// // });
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FontAwesome } from "@expo/vector-icons";

// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   cardSoft: "#EFE8CF",
//   textDark: "#2E2E2E",
// };

// // --- ushqimet me kalori të përafërta ---
// const breakfastIdeas = [
//   { name: "Tërshërë me qumësht 1.5–2% + fruta të stinës + fara liri", kcal: 350 },
//   { name: "Omëletë 2 vezë + djathë i butë + domate, 1 fetë bukë integrale", kcal: 400 },
//   { name: "Kos grek 5% + mjaltë (pak) + arra + boronica", kcal: 320 },
//   { name: "Smoothie balancuar: qumësht 1.5% + banane + spinaq + një grusht tërshërë", kcal: 300 },
//   { name: "Tost integrale me avokado (1/3) + vezë e zier sipër", kcal: 330 },
//   { name: "Puding chia me qumësht + kakao + pak kokos i grirë", kcal: 280 },
//   { name: "Palaçinka integrale me gjizë/kotixh dhe reçel shtëpie (pak)", kcal: 370 },
// ];

// const lunchIdeas = [
//   { name: "Pula në grill + oriz integral + sallatë me vaj ulliri", kcal: 550 },
//   { name: "Salmon i pjekur + kuinoa + rukola/limon", kcal: 580 },
//   { name: "Pasta integrale me ton + ullinj + domate qershi + parmixhano (pak)", kcal: 500 },
//   { name: "Bowl me gjoks pule, fasule, misër, avokado dhe kos–limon", kcal: 600 },
//   { name: "Qofte shtëpie (porcion) + patate të ëmbla + sallatë jeshile", kcal: 620 },
//   { name: "Wrap integrale me hummus, falafel (porcion) dhe sallatë", kcal: 550 },
//   { name: "Rizoto integrale me kërpudha + parmixhano (pak)", kcal: 520 },
// ];

// const dinnerIdeas = [
//   { name: "Peshk i bardhë + perime në avull + patate të ziera (porcion i moderuar)", kcal: 480 },
//   { name: "Turkey burger (pa bukë ose me bukë integrale) + sallatë coleslaw e lehtë", kcal: 500 },
//   { name: "Curry pule me oriz basmati (porcion i balancuar)", kcal: 550 },
//   { name: "Noodles oriz me perime + tofu/pule (porcion i mesëm)", kcal: 520 },
//   { name: "Pjatë mesdhetare: djathë i butë + ullinj + domate + bukë integrale (porcion)", kcal: 450 },
//   { name: "Frittata me perime + sallatë", kcal: 400 },
//   { name: "Sallatë greke + 1 pitë e vogël integrale", kcal: 420 },
// ];

// // krijo çelës unik për çdo ditë
// const todayKey = () => `food_keep_${new Date().toISOString().slice(0, 10)}`;

// export default function MbajPeshen() {
//   const router = useRouter();
//   const [selected, setSelected] = useState<Record<string, boolean>>({});

//   // lexon të dhënat e ruajtura për sot
//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem(todayKey());
//       if (raw) setSelected(JSON.parse(raw));
//     })();
//   }, []);

//   // ndërron gjendjen e një ushqimi
//   function toggle(itemName: string) {
//     setSelected((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
//   }

//   // ruan manualisht me butonin "Ruaj për sot"
//  // ruan manualisht me butonin "Ruaj për sot"
// async function saveToday() {
//   const data = {
//     selected,
//     total,
//   };
//   await AsyncStorage.setItem(todayKey(), JSON.stringify(data));
// }

//   // llogarit kaloritë totale
//   const total = useMemo(() => {
//     let sum = 0;
//     [breakfastIdeas, lunchIdeas, dinnerIdeas].forEach((meal) => {
//       meal.forEach((item) => {
//         if (selected[item.name]) sum += item.kcal;
//       });
//     });
//     return sum;
//   }, [selected]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
//           <FontAwesome name="arrow-left" size={22} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Plani: Mbaj Peshën</Text>
//         <View style={{ width: 44 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.wrap}>
//         <TipCard />

//         <MealCard title="Mëngjesi" items={breakfastIdeas} selected={selected} toggle={toggle} />
//         <MealCard title="Dreka" items={lunchIdeas} selected={selected} toggle={toggle} />
//         <MealCard title="Darkë" items={dinnerIdeas} selected={selected} toggle={toggle} />

//         {/* Totali + Butoni Ruaj */}
//         <View style={styles.totalWrap}>
//           <Text style={styles.totalText}>Ju keni ngrene: {total} kcal</Text>
//           <TouchableOpacity style={styles.saveBtn} onPress={saveToday}>
//             <Text style={{ color: "#fff", fontWeight: "700" }}>Ruaj për sot</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // ======= KOMPONENTË =======

// function MealCard({
//   title,
//   items,
//   selected,
//   toggle,
// }: {
//   title: string;
//   items: { name: string; kcal: number }[];
//   selected: Record<string, boolean>;
//   toggle: (name: string) => void;
// }) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>{title}</Text>
//       {items.map((it, i) => (
//         <Pressable
//           key={i}
//           onPress={() => toggle(it.name)}
//           style={[styles.row, selected[it.name] && styles.rowActive]}
//         >
//           <FontAwesome
//             name={selected[it.name] ? "check-circle" : "circle-thin"}
//             size={18}
//             color={selected[it.name] ? COLORS.green : "#999"}
//             style={{ marginTop: 2 }}
//           />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.item}>{it.name}</Text>
//             <Text style={styles.kcal}>{it.kcal} kcal</Text>
//           </View>
//         </Pressable>
//       ))}
//     </View>
//   );
// }

// function TipCard() {
//   return (
//     <View style={[styles.card, { backgroundColor: COLORS.cardSoft }]}>
//       <Text style={styles.cardTitle}>Udhëzime të shpejta</Text>
//       <Text style={styles.tip}>• Qëllimi: kalori në ekuilibër (≃ TDEE), porcione të moderuara.</Text>
//       <Text style={styles.tip}>• Makro afërsisht: 30% P / 40% K / 30% Y (fleksibël sipas preferencës).</Text>
//       <Text style={styles.tip}>• Ruaj aktivitetin: 8–10k hapa/ditë ose stërvitje 3–4x/javë.</Text>
//       <Text style={styles.tip}>• Konsistencë perfeksion; mos kaloni vakte rregullisht.</Text>
//     </View>
//   );
// }

// // ======= STILE =======
// const styles = StyleSheet.create({
//   header: {
//     height: 56,
//     backgroundColor: COLORS.green,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//   },
//   backBtn: {
//     width: 44,
//     height: 36,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "800",
//     letterSpacing: 0.3,
//   },
//   wrap: { padding: 16, gap: 14 },
//   card: {
//     backgroundColor: COLORS.card,
//     padding: 14,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 2,
//   },
//   cardTitle: {
//     color: COLORS.green,
//     fontSize: 18,
//     fontWeight: "800",
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 10,
//     marginBottom: 10,
//     padding: 6,
//     borderRadius: 10,
//   },
//   rowActive: {
//     backgroundColor: "#e6efd9",
//   },
//   item: { flex: 1, color: COLORS.textDark, fontSize: 15, lineHeight: 20 },
//   kcal: { color: COLORS.textDark, opacity: 0.7, fontSize: 13 },
//   tip: { color: COLORS.textDark, opacity: 0.9, marginBottom: 6, lineHeight: 20 },
//   totalWrap: {
//     backgroundColor: COLORS.cardSoft,
//     borderRadius: 14,
//     padding: 12,
//     marginTop: 8,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalText: { color: COLORS.textDark, fontSize: 16, fontWeight: "700" },
//   saveBtn: {
//     backgroundColor: COLORS.green,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 10,
//   },
// });
import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  cardSoft: "#EFE8CF",
  textDark: "#2E2E2E",
};

// --- Ushqimet me kalori të përafërta ---
const breakfastIdeas = [
  { name: "Tërshërë me qumësht 1.5–2% + fruta të stinës + fara liri", kcal: 350 },
  { name: "Omëletë 2 vezë + djathë i butë + domate, 1 fetë bukë integrale", kcal: 400 },
  { name: "Kos grek 5% + mjaltë (pak) + arra + boronica", kcal: 320 },
  { name: "Smoothie balancuar: qumësht 1.5% + banane + spinaq + një grusht tërshërë", kcal: 300 },
  { name: "Tost integrale me avokado (1/3) + vezë e zier sipër", kcal: 330 },
  { name: "Puding chia me qumësht + kakao + pak kokos i grirë", kcal: 280 },
  { name: "Palaçinka integrale me gjizë/kotixh dhe reçel shtëpie (pak)", kcal: 370 },
];

const lunchIdeas = [
  { name: "Pula në grill + oriz integral + sallatë me vaj ulliri", kcal: 550 },
  { name: "Salmon i pjekur + kuinoa + rukola/limon", kcal: 580 },
  { name: "Pasta integrale me ton + ullinj + domate qershi + parmixhano (pak)", kcal: 500 },
  { name: "Bowl me gjoks pule, fasule, misër, avokado dhe kos–limon", kcal: 600 },
  { name: "Qofte shtëpie (porcion) + patate të ëmbla + sallatë jeshile", kcal: 620 },
  { name: "Wrap integrale me hummus, falafel (porcion) dhe sallatë", kcal: 550 },
  { name: "Rizoto integrale me kërpudha + parmixhano (pak)", kcal: 520 },
];

const dinnerIdeas = [
  { name: "Peshk i bardhë + perime në avull + patate të ziera (porcion i moderuar)", kcal: 480 },
  { name: "Turkey burger (pa bukë ose me bukë integrale) + sallatë coleslaw e lehtë", kcal: 500 },
  { name: "Curry pule me oriz basmati (porcion i balancuar)", kcal: 550 },
  { name: "Noodles oriz me perime + tofu/pule (porcion i mesëm)", kcal: 520 },
  { name: "Pjatë mesdhetare: djathë i butë + ullinj + domate + bukë integrale (porcion)", kcal: 450 },
  { name: "Frittata me perime + sallatë", kcal: 400 },
  { name: "Sallatë greke + 1 pitë e vogël integrale", kcal: 420 },
];

// 🔑 Çelësi unik për ditën e sotme
const todayKey = () => `food_keep_${new Date().toISOString().slice(0, 10)}`;

export default function MbajPeshen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // 🟢 Lexon të dhënat ekzistuese për sot
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(todayKey());
      if (raw) {
        const data = JSON.parse(raw);
        if (data.selected) setSelected(data.selected); // ✅ korrigjuar
      }
    })();
  }, []);

  // 🔄 Ndërron statusin e një ushqimi (tik)
  function toggle(itemName: string) {
    setSelected((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  }

  // 💾 Ruaj për sot (me total)
  async function saveToday() {
    const key = todayKey();
    const data = { selected, total };
    await AsyncStorage.removeItem(key); // ✅ fshin të vjetrën
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  // 🔢 Llogarit kaloritë totale
  const total = useMemo(() => {
    let sum = 0;
    [breakfastIdeas, lunchIdeas, dinnerIdeas].forEach((meal) => {
      meal.forEach((item) => {
        if (selected[item.name]) sum += item.kcal;
      });
    });
    return sum;
  }, [selected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plani: Mbaj Peshën</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* SCROLL */}
      <ScrollView contentContainerStyle={styles.wrap}>
        <TipCard />

        <MealCard title="Mëngjesi" items={breakfastIdeas} selected={selected} toggle={toggle} />
        <MealCard title="Dreka" items={lunchIdeas} selected={selected} toggle={toggle} />
        <MealCard title="Darkë" items={dinnerIdeas} selected={selected} toggle={toggle} />

        {/* Totali + Butoni Ruaj */}
        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Ju sot keni ngrënë: {total} kcal</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={saveToday}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Ruaj për sot</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ======= KOMPONENTË =======
function MealCard({
  title,
  items,
  selected,
  toggle,
}: {
  title: string;
  items: { name: string; kcal: number }[];
  selected: Record<string, boolean>;
  toggle: (name: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {items.map((it, i) => (
        <Pressable
          key={i}
          onPress={() => toggle(it.name)}
          style={[styles.row, selected[it.name] && styles.rowActive]}
        >
          <FontAwesome
            name={selected[it.name] ? "check-circle" : "circle-thin"}
            size={18}
            color={selected[it.name] ? COLORS.green : "#999"}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.item}>{it.name}</Text>
            <Text style={styles.kcal}>{it.kcal} kcal</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

function TipCard() {
  return (
    <View style={[styles.card, { backgroundColor: COLORS.cardSoft }]}>
      <Text style={styles.cardTitle}>Udhëzime të shpejta</Text>
      <Text style={styles.tip}>• Qëllimi: kalori në ekuilibër (≃ TDEE), porcione të moderuara.</Text>
      <Text style={styles.tip}>• Makro afërsisht: 30% P / 40% K / 30% Y (fleksibël sipas preferencës).</Text>
      <Text style={styles.tip}>• Ruaj aktivitetin: 8–10k hapa/ditë ose stërvitje 3–4x/javë.</Text>
      <Text style={styles.tip}>• Konsistencë perfeksion; mos kaloni vakte rregullisht.</Text>
    </View>
  );
}

// ======= STILE =======
const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: COLORS.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  backBtn: { width: 44, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "800", letterSpacing: 0.3 },
  wrap: { padding: 16, gap: 14 },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: { color: COLORS.green, fontSize: 18, fontWeight: "800", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10, padding: 6, borderRadius: 10 },
  rowActive: { backgroundColor: "#e6efd9" },
  item: { flex: 1, color: COLORS.textDark, fontSize: 15, lineHeight: 20 },
  kcal: { color: COLORS.textDark, opacity: 0.7, fontSize: 13 },
  tip: { color: COLORS.textDark, opacity: 0.9, marginBottom: 6, lineHeight: 20 },
  totalWrap: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: { color: COLORS.textDark, fontSize: 16, fontWeight: "700" },
  saveBtn: { backgroundColor: COLORS.green, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
});
