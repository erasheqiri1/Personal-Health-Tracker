
// import { FontAwesome } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   collection,
//   onSnapshot,
//   query,
//   where,
// } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';

// const COLORS = {
//   green: '#355E3B',
//   bg: '#F7F4E9',
//   card: '#E6DFC5',
//   cardSoft: '#EFE8CF',
//   textDark: '#2E2E2E',
// };

// export default function HumbPeshPlan() {
//   const router = useRouter();

//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // id-të e ushqimeve të zgjedhura për çdo seksion (1 opsion per seksion)
//   const [selected, setSelected] = useState({
//     menges: null,
//     dreka: null,
//     darke: null,
//   });

//   // READ – leximi i ushqimeve për planin "humb"
//   useEffect(() => {
//     setLoading(true);
//     const q = query(
//       collection(db, 'meals'),
//       where('plan', '==', 'humb')
//     );

//     const unsub = onSnapshot(
//       q,
//       snapshot => {
//         const list = snapshot.docs.map(d => ({
//           id: d.id,
//           ...d.data(),
//         }));
//         setMeals(list);
//         setLoading(false);
//         setError('');
//       },
//       err => {
//         console.log('Meal read error:', err);
//         setError('S’u lexuan ushqimet.');
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, []);

//   // i ndajmë në seksione
//   const grouped = useMemo(() => {
//     const base = { menges: [], dreka: [], darke: [] };
//     for (const m of meals) {
//       if (m.section === 'menges') base.menges.push(m);
//       else if (m.section === 'dreka') base.dreka.push(m);
//       else if (m.section === 'darke') base.darke.push(m);
//     }
//     return base;
//   }, [meals]);

//   // total kcal sipas zgjedhjeve (1 per seksion)
//   const totalKcal = useMemo(() => {
//     let total = 0;
//     for (const sec of ['menges', 'dreka', 'darke']) {
//       const id = selected[sec];
//       if (!id) continue;
//       const meal = meals.find(m => m.id === id);
//       if (meal?.calories) total += Number(meal.calories);
//     }
//     return total;
//   }, [selected, meals]);

//   const handleSelect = (section, id) => {
//   setSelected(prev => ({
//     ...prev,
//     // nëse veç është i zgjedhur ky id → bëje null (unclick)
//     [section]: prev[section] === id ? null : id,
//   }));
// };

//   const handleSaveForToday = async () => {
//     if (totalKcal === 0) {
//       Alert.alert('Vërejtje', 'Zgjidh të paktën një ushqim.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       Alert.alert('Gabim', 'Duhet të jeni i kyçur për ta ruajtur.');
//       return;
//     }

//     try {
//       // këtu ma vonë mundesh me e shtu n'Firestore (p.sh. dailyIntake)
//       Alert.alert(
//         'Ruajtur',
//         `U ruajt për sot: ${totalKcal} kcal (plan: Humb Peshë).`
//       );
//     } catch (e) {
//       console.log('Save intake error:', e);
//       Alert.alert('Gabim', 'Nuk u ruajt konsumimi për sot.');
//     }
//   };

//   const renderSection = (label, key) => {
//     const list = grouped[key];
//     if (!list?.length) return null;

//     return (
//       <View style={s.card}>
//         <Text style={s.cardTitle}>{label}</Text>
//         {list.map(meal => {
//           const checked = selected[key] === meal.id;
//           return (
//             <Pressable
//               key={meal.id}
//               style={[
//                 s.row,
//                 checked && s.rowActive,
//               ]}
//               onPress={() => handleSelect(key, meal.id)}
//             >
//               {/* radio/check ikonë në stilin tand */}
//               <FontAwesome
//                 name={checked ? 'check-circle' : 'circle-thin'}
//                 size={20}
//                 color={checked ? COLORS.green : '#999'}
//                 style={{ marginTop: 2, marginRight: 8 }}
//               />
//               <View style={{ flex: 1 }}>
//                 <Text style={s.mealTitle}>{meal.title}</Text>
//                 {!!meal.subtitle && (
//                   <Text style={s.mealSubtitle}>{meal.subtitle}</Text>
//                 )}
//                 <Text style={s.mealKcal}>{meal.calories} kcal</Text>
//               </View>
//             </Pressable>
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
//       {/* HEADER si te ShtoPeshe */}
//       <View style={s.header}>
//         <Pressable
//           style={s.backBtn}
//           onPress={() => router.back()}
//         >
//           <FontAwesome name="arrow-left" size={22} color="#fff" />
//         </Pressable>
//         <Text style={s.headerTitle}>Plani: Humb Peshë</Text>
//         <View style={{ width: 44 }} />
//       </View>

//       <ScrollView contentContainerStyle={s.wrap}>
//         {/* Udhëzimet – mundesh mi ndryshu textet po stilin po e ruaj */}
//         <View style={[s.card, { backgroundColor: COLORS.cardSoft }]}>
//           <Text style={s.cardTitle}>Udhëzime të shpejta</Text>
//           <Text style={s.tip}>
//             • Qëllimi: deficit kalorik i lehtë (-250–400 kcal/ditë).
//           </Text>
//           <Text style={s.tip}>
//             • Fokus te perimet, proteinat e larta, shmang kaloritë boshe
//             (pije të ëmbla, snacks ultra–të–përpunuara).
//           </Text>
//           <Text style={s.tip}>
//             • Mbaj 3 vakte + 1 ndërmjetëse nëse ke nevojë, jo “urije ekstreme”.
//           </Text>
//         </View>

//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color={COLORS.green}
//             style={{ marginTop: 20 }}
//           />
//         ) : error ? (
//           <Text style={s.error}>{error}</Text>
//         ) : (
//           <>
//             {renderSection('Mëngjesi', 'menges')}
//             {renderSection('Dreka', 'dreka')}
//             {renderSection('Darkë', 'darke')}
//           </>
//         )}

//         <View style={s.totalWrap}>
//           <Text style={s.totalText}>
//             Ju sot keni ngrënë: {totalKcal} kcal
//           </Text>
//           <Pressable
//             style={s.saveBtn}
//             onPress={handleSaveForToday}
//           >
//             <Text style={{ color: '#fff', fontWeight: '700' }}>
//               Ruaj për sot
//             </Text>
//           </Pressable>
//         </View>

//         <View style={{ height: 30 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const s = StyleSheet.create({
//   header: {
//     height: 56,
//     backgroundColor: COLORS.green,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   backBtn: {
//     width: 44,
//     height: 36,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '800',
//     letterSpacing: 0.3,
//   },
//   wrap: {
//     padding: 16,
//     gap: 14,
//   },
//   card: {
//     backgroundColor: COLORS.card,
//     padding: 14,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 2,
//   },
//   cardTitle: {
//     color: COLORS.green,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 10,
//     marginBottom: 10,
//     padding: 6,
//     borderRadius: 10,
//   },
//   rowActive: {
//     backgroundColor: '#e6efd9',
//   },
//   mealTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: COLORS.textDark,
//   },
//   mealSubtitle: {
//     fontSize: 12,
//     color: '#444',
//   },
//   mealKcal: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: COLORS.green,
//     marginTop: 2,
//   },
//   tip: {
//     color: COLORS.textDark,
//     opacity: 0.9,
//     marginBottom: 6,
//     lineHeight: 20,
//     fontSize: 13,
//   },
//   totalWrap: {
//     backgroundColor: COLORS.cardSoft,
//     borderRadius: 14,
//     padding: 12,
//     marginTop: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalText: {
//     color: COLORS.textDark,
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   saveBtn: {
//     backgroundColor: COLORS.green,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 10,
//   },
//   error: {
//     color: '#C0392B',
//     marginTop: 12,
//   },
// });

// app/plans/humb-peshe.jsx
import React from 'react';
import PlanMealsScreen from '../../components/PlanMealsScreen'; // RREGULLO path sipas strukturës

export default function HumbPeshPlan() {
  return (
    <PlanMealsScreen
      planKey="humb"
      headerTitle="Plani: Humb Peshë"
      tips={[
        '• Qëllimi: deficit kalorik i lehtë (-250–400 kcal/ditë).',
        '• Fokus te perimet, proteinat e larta, shmang kaloritë boshe (pije të ëmbla, snacks ultra–të–përpunuara).',
        '• Mbaj 3 vakte + 1 ndërmjetëse nëse ke nevojë, jo “urije ekstreme”.',
      ]}
    />
  );
}
