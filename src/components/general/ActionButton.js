import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default ({ onPress, icon, text }) => (
  <TouchableOpacity style={styles.fullWidthButton} onPress={onPress}>
    <View style={styles.view}>
      <MaterialIcons name={icon} size={22} color={"white"} />
      {text && <Text style={styles.button}>{text}</Text>}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButton: {
    zIndex: 9,
    height: 58,
    width: 58,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 29,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#157DE6",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 8 },
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    color: "white",

    paddingHorizontal: 13,
  },
});
