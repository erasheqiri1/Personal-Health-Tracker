import { Feather } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  green: "#355E3B",
  bg: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
};

function AdminOptionCard({ icon, title, subtitle, onPress }) {
  return (
    <Pressable style={s.card} onPress={onPress}>
      <View style={s.row}>
        <View style={s.iconCircle}>{icon}</View>

        <View style={s.textBlock}>
          <Text style={s.cardTitle}>{title}</Text>
          <Text style={s.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <Feather name="chevron-right" size={26} color={COLORS.textDark} />
    </Pressable>
  );
}

export default memo(AdminOptionCard);

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 22,
    minHeight: 140,
    width: "100%",
    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },

  iconCircle: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.bg,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  textBlock: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4,
    color: COLORS.textDark,
  },

  cardSubtitle: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
});
