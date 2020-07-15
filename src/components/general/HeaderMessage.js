import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default class HeaderMessage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.dateText}>Today, 10 May 2020</Text>
            <Text style={styles.infoText}>How was your day, Today?</Text>
          </View>
          <View>
            <Text>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="white"
              />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#157DE6",
    padding: 20,
    paddingRight: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  viewContainer: {
    flexDirection: "row",
  },
  textContainer: {
    paddingRight: 20,
    flex: 1,
  },
  dateText: {
    marginBottom: 10,
    fontFamily: "Manrope3",
    fontSize: 12,
    color: "#D8D8D8",
  },
  infoText: {
    fontFamily: "Manrope3-Semibold",
    color: "white",
    fontSize: 16,
  },

  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
