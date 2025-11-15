
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
// import { Stack, router } from "expo-router";
// import React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// const COLORS = {
//   green: "#355E3B",
//   bg: "#F7F4E9",
//   card: "#E6DFC5",
//   textDark: "#2E2E2E",
// };

// export default function AdminHome() {
//   return (
//     <View style={s.container}>

//       <Stack.Screen
//         options={{
//           title: "Admin – Ushtrimet",
//           headerStyle: { backgroundColor: COLORS.green },
//           headerTintColor: "#fff",
//           headerTitleStyle: { fontWeight: "bold" },
//         }}
//       />

//       <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

//       {/* ---------------- HOME WORKOUT ---------------- */}
//       <Pressable
//         style={s.card}
//         onPress={() => router.push("/admin/ushtrime/homeworkout")}
//       >
//         <View style={s.row}>
//           <View style={s.iconCircle}>
//             <FontAwesome5 name="home" size={28} color={COLORS.green} />
//           </View>

//           <View style={s.textBlock}>
//             <Text style={s.cardTitle}>Home Workout</Text>
//             <Text style={s.cardSubtitle}>
//               CRUD për ushtrimet e planit Home Workout.
//             </Text>
//           </View>
//         </View>

//         <Feather name="chevron-right" size={26} color={COLORS.textDark} />
//       </Pressable>

//       {/* ---------------- WEIGHTLIFTING ---------------- */}
//       <Pressable
//         style={s.card}
//         onPress={() => router.push("/admin/ushtrime/wightlifting")}
//       >
//         <View style={s.row}>
//           <View style={s.iconCircle}>
//             <FontAwesome5 name="dumbbell" size={28} color={COLORS.green} />
//           </View>

//           <View style={s.textBlock}>
//             <Text style={s.cardTitle}>Weightlifting</Text>
//             <Text style={s.cardSubtitle}>
//               CRUD për ushtrimet e planit Weightlifting.
//             </Text>
//           </View>
//         </View>

//         <Feather name="chevron-right" size={26} color={COLORS.textDark} />
//       </Pressable>

//     </View>
//   );
// }

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//     padding: 16,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "800",
//     marginBottom: 12,
//     color: COLORS.green,
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     paddingVertical: 32,
//     paddingHorizontal: 22,
//     minHeight: 140,
//     width: "100%",
//     marginBottom: 14,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 5,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 16,
//     flex: 1,
//   },

//   iconCircle: {
//     width: 60,
//     height: 60,
//     backgroundColor: "#F7F4E9",
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   textBlock: {
//     flex: 1,
//   },

//   cardTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     marginBottom: 4,
//     color: COLORS.textDark,
//   },

//   cardSubtitle: {
//     fontSize: 16,
//     color: "#444",
//     lineHeight: 22,
//   },
// });
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AdminOptionCard from "../../../components/AdminOptionCard";

const COLORS = {
  green: "#355E3B",
  bg: "#F7F4E9",
};

export default function AdminUshtrime() {
  return (
    <View style={s.container}>
      <Stack.Screen
        options={{
          title: "Admin – Ushtrimet",
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

      <AdminOptionCard
        icon={<FontAwesome5 name="home" size={28} color={COLORS.green} />}
        title="Home Workout"
        subtitle="Menaxho ushtrimet e planit Home Workout."
        onPress={() => router.push("/admin/ushtrime/homeworkout")}
      />

      <AdminOptionCard
        icon={<FontAwesome5 name="dumbbell" size={28} color={COLORS.green} />}
        title="Weightlifting"
        subtitle="Menaxho ushtrimet e planit Weightlifting."
        onPress={() => router.push("/admin/ushtrime/wightlifting")}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
    color: COLORS.green,
  },
});
