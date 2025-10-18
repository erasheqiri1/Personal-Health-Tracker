import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unstable_settings = { 
  headerShown: false, 
  tabBarStyle: { display: "none" } 
};

export default function LogIn() {
  const router = useRouter();
  const [emaili, setEmaili] = useState("");
  const [fjalekalimi, setFjalekalimi] = useState("");
  const [show, setShow] = useState(false);

  const handleLogIn = async () => {
    if (!emaili || !fjalekalimi) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }

    try {
      // Lexo listën e përdoruesve ekzistues nga AsyncStorage
      const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

      // Gjej përdoruesin që ka emailin dhe fjalëkalimin e dhënë
      const foundUser = users.find(
        (u: any) => u.emaili === emaili && u.fjalekalimi === fjalekalimi
      );

      if (foundUser) {
        // Ruaj përdoruesin që është kyçur
        await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));

        console.log("U kyç me sukses:", foundUser);
        router.push("/profile"); // drejto përdoruesin te profili
      } else {
        alert("Emaili ose fjalëkalimi janë të pasakta!");
      }
    } catch (error) {
      console.error("Gabim gjatë hyrjes:", error);
      alert("Ndodhi një gabim gjatë hyrjes.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.title}>Hyrje</Text>

      <TextInput
        style={styles.input}
        placeholder="Emaili"
        placeholderTextColor="#2e7d32"
        value={emaili}
        onChangeText={setEmaili}
      />

      <TextInput
        style={styles.input}
        placeholder="Fjalëkalimi"
        placeholderTextColor="#2e7d32"
        secureTextEntry={!show}
        value={fjalekalimi}
        onChangeText={setFjalekalimi}
      />
      <Text
        onPress={() => setShow(!show)}
        style={{ color: "#2e7d32", alignSelf: "flex-end", marginTop: 5 }}
      >
        {show ? "Fshih" : "Shfaq"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>HYR</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 15, color: "#2e7d32" }}>
        S'keni një llogari?{" "}
        <Text onPress={() => router.push("/signup")} style={{ fontWeight: "bold" }}>
          Regjistrohu
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e6f2e6",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: "#2e7d32",
    borderWidth: 1,
    color: "#2e7d32",
  },
  button: {
    width: "100%",
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#e6f2e6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
