import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screens from "./src/screens";
import { useFonts } from "expo-font";
export default function App() {
  const [loaded] = useFonts({
    Manrope3: require("./assets/fonts/manrope-regular.ttf"),
    "Manrope3-Semibold": require("./assets/fonts/manrope-semibold.ttf"),
  });
  if (!loaded) return null;
  return <Screens />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
