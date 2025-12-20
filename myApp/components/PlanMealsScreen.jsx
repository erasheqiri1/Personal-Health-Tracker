import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../constants';
import AnimatedButton from './AnimatedButton';
import Modal from './Modal';

/* =========================
   Memoized row component
   ========================= */
const MealRow = React.memo(({ meal, checked, onPress }) => (
  <Pressable
    style={[s.row, checked && s.rowActive]}
    onPress={onPress}
  >
    <FontAwesome
      name={checked ? 'check-circle' : 'circle-thin'}
      size={20}
      color={checked ? COLORS.green : '#999'}
      style={{ marginTop: 2, marginRight: 8 }}
    />
    <View style={{ flex: 1 }}>
      <Text style={s.mealTitle}>{meal.title}</Text>
      {!!meal.subtitle && (
        <Text style={s.mealSubtitle}>{meal.subtitle}</Text>
      )}
      <Text style={s.mealKcal}>{meal.calories} kcal</Text>
    </View>
  </Pressable>
));

export default function PlanMealsScreen({ planKey, headerTitle, tips = [] }) {
  const router = useRouter();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState({
    menges: null,
    dreka: null,
    darke: null,
  });

  const [totalToday, setTotalToday] = useState(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  /* =========================
     READ – Firestore
     ========================= */
  // READ – leximi i ushqimeve për planin (planKey)
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'meals'), where('plan', '==', planKey));

    const unsub = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));
        setMeals(list);
        setLoading(false);
        setError('');
      },
      err => {
        console.log('Meal read error:', err);
        setError('S’u lexuan ushqimet.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [planKey]);

  /* =========================
     Memoized grouping
     ========================= */
  const grouped = useMemo(() => {
    const base = { menges: [], dreka: [], darke: [] };
    for (const m of meals) {
      if (m.section === 'menges') base.menges.push(m);
      else if (m.section === 'dreka') base.dreka.push(m);
      else if (m.section === 'darke') base.darke.push(m);
    }
    return base;
  }, [meals]);

  /* =========================
     FlatList data
     ========================= */
  const flatListData = useMemo(() => {
    const data = [];
    if (tips.length > 0) {
      data.push({ type: 'tips', tips });
    }
    if (loading) {
      data.push({ type: 'loading' });
    } else if (error) {
      data.push({ type: 'error', error });
    } else {
      if (grouped.menges.length > 0) data.push({ type: 'section', key: 'menges', label: 'Mëngjesi', meals: grouped.menges });
      if (grouped.dreka.length > 0) data.push({ type: 'section', key: 'dreka', label: 'Dreka', meals: grouped.dreka });
      if (grouped.darke.length > 0) data.push({ type: 'section', key: 'darke', label: 'Darkë', meals: grouped.darke });
    }
    data.push({ type: 'footer', totalKcal, totalToday });
    return data;
  }, [tips, loading, error, grouped, totalKcal, totalToday]);

  /* =========================
     Memoized total kcal
     ========================= */
  const totalKcal = useMemo(() => {
    let total = 0;
    for (const sec of ['menges', 'dreka', 'darke']) {
      const id = selected[sec];
      if (!id) continue;
      const meal = meals.find(m => m.id === id);
      if (meal?.calories) total += Number(meal.calories);
    }
    return total;
  }, [selected, meals]);

  /* =========================
     Load saved daily total
     ========================= */
  useEffect(() => {
    const loadTotal = async () => {
      const user = auth.currentUser;
      const today = new Date().toISOString().slice(0, 10);
      const localKey = `food_kcal_${today}`;

      if (!user) {
        setTotalToday(0);
        await AsyncStorage.setItem(localKey, '0');
        return;
      }

      try {
        const docRef = doc(db, 'dailyIntake', user.uid, 'days', today);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const total = Number(snap.data().totalCalories || 0);
          setTotalToday(total);
          await AsyncStorage.setItem(localKey, String(total));
        } else {
          setTotalToday(0);
          await AsyncStorage.setItem(localKey, '0');
        }
      } catch (e) {
        const localVal = await AsyncStorage.getItem(localKey);
        setTotalToday(localVal ? Number(localVal) : 0);
      }
    };

    loadTotal();
  }, []);

  /* =========================
     Handlers
     ========================= */
  const handleSelect = useCallback((section, id) => {
    setSelected(prev => ({
      ...prev,
      [section]: prev[section] === id ? null : id,
    }));
  }, []);

  const handleSaveForToday = useCallback(async () => {
    if (totalKcal === 0) {
      Alert.alert('Vërejtje', 'Zgjidh të paktën një ushqim.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Gabim', 'Duhet të jeni i kyçur për ta ruajtur.');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const localKey = `food_kcal_${today}`;

    try {
      const prev = await AsyncStorage.getItem(localKey);
      const prevNum = prev ? Number(prev) : (totalToday || 0);
      const newTotal = prevNum + totalKcal;

      await AsyncStorage.setItem(localKey, String(newTotal));
      setTotalToday(newTotal);

      const docRef = doc(db, 'dailyIntake', user.uid, 'days', today);
      await setDoc(
        docRef,
        {
          userId: user.uid,
          date: today,
          plan: planKey,
          totalCalories: newTotal,
          lastAdded: totalKcal,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setSuccessModalVisible(true);
      setTimeout(() => setSuccessModalVisible(false), 2000);
    } catch (e) {
      Alert.alert('Gabim', 'Nuk u ruajt konsumimi për sot.');
    }
  }, [totalKcal, totalToday, planKey]);

  /* =========================
     FlatList renderItem
     ========================= */
  const renderItem = useCallback(({ item }) => {
    switch (item.type) {
      case 'tips':
        return (
          <View style={[s.card, { backgroundColor: COLORS.cardSoft }]}>
            <Text style={s.cardTitle}>Udhëzime të shpejta</Text>
            {item.tips.map((t, idx) => (
              <Text key={idx} style={s.tip}>{t}</Text>
            ))}
          </View>
        );
      case 'loading':
        return (
          <ActivityIndicator size="large" color={COLORS.green} />
        );
      case 'error':
        return (
          <Text style={s.error}>{item.error}</Text>
        );
      case 'section':
        return (
          <View style={s.card}>
            <Text style={s.cardTitle}>{item.label}</Text>
            {item.meals.map(meal => (
              <MealRow
                key={meal.id}
                meal={meal}
                checked={selected[item.key] === meal.id}
                onPress={() => handleSelect(item.key, meal.id)}
              />
            ))}
          </View>
        );
      case 'footer':
        return (
          <View>
            <View style={s.totalWrap}>
              <View>
                <Text style={s.totalText}>
                  Zgjedhja aktuale: {item.totalKcal} kcal
                </Text>
                {item.totalToday !== null && (
                  <Text style={s.totalText}>
                    Totali i ruajtur për sot: {item.totalToday} kcal
                  </Text>
                )}
              </View>
              <AnimatedButton
                style={s.saveBtn}
                onPress={handleSaveForToday}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>
                  Ruaj për sot
                </Text>
              </AnimatedButton>
            </View>
            <View style={{ height: 30 }} />
          </View>
        );
      default:
        return null;
    }
  }, [selected, handleSelect, handleSaveForToday]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={s.header}>
        <Pressable style={s.backBtn} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={s.headerTitle}>{headerTitle}</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={flatListData}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={s.wrap}
      />

      <Modal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)}>
        <Text style={{ fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.green, textAlign: 'center' }}>
          Ruajtur me sukses!
        </Text>
        <Text style={{ fontSize: FONT_SIZES.md, color: COLORS.textDark, textAlign: 'center', marginTop: SPACING.sm }}>
          U shtuan {totalKcal} kcal për sot.
        </Text>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  backBtn: {
    width: 44,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  wrap: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    color: COLORS.green,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.extraBold,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
    padding: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  rowActive: {
    backgroundColor: '#e6efd9',
  },
  mealTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textDark,
  },
  mealSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: '#444',
  },
  mealKcal: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.green,
    marginTop: SPACING.xs,
  },
  tip: {
    color: COLORS.textDark,
    opacity: 0.9,
    marginBottom: SPACING.xs,
    lineHeight: 20,
    fontSize: 13,
  },
  totalWrap: {
    backgroundColor: COLORS.inputBg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: COLORS.green,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  error: {
    color: COLORS.error,
    marginTop: SPACING.md,
  },
});
