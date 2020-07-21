import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, title, style = {} }) => (
  <TouchableOpacity style={[styles.fullWidthButton, style]} onPress={onPress}>
    <Text style={styles.fullWidthButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fullWidthButton: {
    height: 36,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#157DE6",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 8 },
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  fullWidthButtonText: {
    fontFamily: "Manrope3",
    fontSize: 14,
    color: "white",
  },
});
