// components/AdminCard.jsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  green: "#355E3B",
  card: "#E6DFC5",
  page: "#F7F4E9",
  textDark: "#2E2E2E",
};

export default function AdminCard({ icon, title, subtitle, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconCircle}>{icon}</View>

        <View style={styles.textBlock}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 35,
    paddingHorizontal: 25,
    minHeight: 200,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    flex: 1,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.page,
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
    flexShrink: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.textDark,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
});
