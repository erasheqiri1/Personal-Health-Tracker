// components/FoodItemCard.jsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  green: "#355E3B",
  bg: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
};

export default function AdminFoodItemCard({
  sectionLabel,   // "Mëngjes" / "Drekë" / "Darkë"
  title,
  subtitle,
  calories,
  onEdit,
  onDelete,
}) {
  return (
    <View style={s.card}>
      <View style={{ flex: 1 }}>
        <Text style={s.mealSection}>{sectionLabel}</Text>
        <Text style={s.mealTitle}>{title}</Text>
        <Text style={s.mealSubtitle}>{subtitle}</Text>
        <Text style={s.mealKcal}>{calories} kcal</Text>
      </View>

      <View style={s.actions}>
        <Pressable style={s.smallBtn} onPress={onEdit}>
          <Text style={s.smallBtnText}>Edit</Text>
        </Pressable>
        <Pressable style={[s.smallBtn, s.deleteBtn]} onPress={onDelete}>
          <Text style={s.smallBtnText}>Fshi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  mealSection: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.green,
    marginBottom: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  mealSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  mealKcal: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.green,
  },
  actions: {
    justifyContent: "space-between",
    marginLeft: 8,
  },
  smallBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteBtn: {
    backgroundColor: "#C0392B",
  },
  smallBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
