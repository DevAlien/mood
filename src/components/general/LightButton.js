import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, title }) => (
  <TouchableOpacity style={styles.fullWidthButton} onPress={onPress}>
    <Text style={styles.fullWidthButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fullWidthButton: {
    height: 32,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(21, 125, 230, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  fullWidthButtonText: {
    fontFamily: "Manrope3",
    fontSize: 14,
    color: "#157DE6",
  },
});
