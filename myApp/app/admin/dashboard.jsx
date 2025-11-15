
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
// import { Stack, router } from "expo-router";
// import { signOut } from 'firebase/auth';
// import React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { auth } from '../../firebaseConfig'; // ose '../firebaseConfig' varësisht ku je


// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   textDark: "#2E2E2E",
// };

// export default function AdminHome() {
//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "Admin | Paneli kryesor",
//           headerStyle: { backgroundColor: COLORS.green },
//           headerTintColor: "#fff",
//           headerTitleStyle: { fontWeight: "bold" },
//         }}
//       />

//       <View style={styles.container}>
//         <Text style={styles.title}>Çka don me menaxhu?</Text>

//         {/* Ushqimet */}
//         <Pressable
//           style={({ pressed }) => [
//             styles.card,
//             pressed && styles.cardPressed,
//           ]}
//           onPress={() => router.push("/admin/ushqime")}
//         >
//           <View style={styles.cardLeft}>
//             <View style={styles.iconCircle}>
//               <FontAwesome5 name="utensils" size={32} color={COLORS.green} />
//             </View>

//             <View style={styles.textBlock}>
//               <Text style={styles.cardTitle}>Menaxho planet e ushqimit</Text>
//               <Text style={styles.cardSubtitle}>
//                 Shto, ndrysho ose fshij planet e ushqimit për përdoruesit(shto pesh, humb pesh & mbaj pesh).
//               </Text>
//             </View>
//           </View>

//           <Feather name="chevron-right" size={30} color={COLORS.textDark} />
//         </Pressable>

//         {/* Ushtrimet */}
//         <Pressable
//           style={({ pressed }) => [
//             styles.card,
//             pressed && styles.cardPressed,
//           ]}
//           onPress={() => router.push("/admin/ushtrime")}
//         >
//           <View style={styles.cardLeft}>
//             <View style={styles.iconCircle}>
//               <FontAwesome5 name="dumbbell" size={32} color={COLORS.green} />
//             </View>

//             <View style={styles.textBlock}>
//               <Text style={styles.cardTitle}>Menaxho planet e ushtrimeve</Text>
//               <Text style={styles.cardSubtitle}>
//                 Shto ushtrime të reja, ndrysho detajet ose fshij planet (homeworkout & weightlifting).
//               </Text>
//             </View>
//           </View>

//           <Feather name="chevron-right" size={30} color={COLORS.textDark} />
//         </Pressable>

//         {/* BUTONI POSHT – Dil nga llogaria */}
// <Pressable
//   style={styles.logoutBtn}
//   onPress={async () => {
//     try {
//       await signOut(auth);                 // del prej Firebase Auth
//       router.replace('/(auth)/login');     // n'login direkt
//     } catch (e) {
//       console.log('Logout error:', e);
//     }
//   }}
// >
//   <Text style={styles.logoutText}>Dil nga llogaria</Text>
// </Pressable>

//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.page,
//     paddingHorizontal: 24,
//     paddingVertical: 30,
//     justifyContent: "center",
//     gap: 30,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: COLORS.textDark,
//     marginBottom: 10,
//     textAlign: "center",
//   },

//   /** IDENTIKE për të dy kartat */
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,

//     paddingVertical: 35,
//     paddingHorizontal: 25,

//     minHeight: 200,        // ↙️ të dyat identike pa marrë parasysh tekstin
//     width: "100%",

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//   },

//   cardPressed: {
//     opacity: 0.85,
//     transform: [{ scale: 0.97 }],
//   },

//   cardLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 18,
//     flex: 1,
//   },

//   iconCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#F7F4E9",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   textBlock: {
//     flex: 1,
//     flexShrink: 1,
//     paddingRight: 10,
//   },

//   cardTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: COLORS.textDark,
//     marginBottom: 6,
//   },

//   cardSubtitle: {
//     fontSize: 16,
//     color: "#444",
//     lineHeight: 22,
//   },
//   logoutBtn: {
//   marginTop: 20,
//   backgroundColor: COLORS.green,
//   paddingVertical: 14,
//   borderRadius: 16,
//   alignItems: "center",
// },
// logoutText: {
//   color: "#fff",
//   fontSize: 16,
//   fontWeight: "700",
// },

// });

import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AdminCard from "../../components/AdminCard";
import { auth } from "../../firebaseConfig";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
};

export default function AdminHome() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Admin | Paneli kryesor",
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Çka don me menaxhu?</Text>

        <AdminCard
          icon={<FontAwesome5 name="utensils" size={32} color={COLORS.green} />}
          title="Menaxho planet e ushqimit"
          subtitle="Shto, ndrysho ose fshij planet e ushqimit për përdoruesit (shto pesh, humb pesh & mbaj pesh)."
          onPress={() => router.push("/admin/ushqime")}
        />

        <AdminCard
          icon={<FontAwesome5 name="dumbbell" size={32} color={COLORS.green} />}
          title="Menaxho planet e ushtrimeve"
          subtitle="Shto ushtrime të reja, ndrysho detajet ose fshij planet (homeworkout & weightlifting)."
          onPress={() => router.push("/admin/ushtrime")}
        />

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Dil nga llogaria</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.page,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 20,
    textAlign: "center",
  },
  logoutBtn: {
    marginTop: 10,
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
