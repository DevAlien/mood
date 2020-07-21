import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { timeToDateToday } from "../../utils/date";

const HeaderMessage = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{timeToDateToday()}</Text>
          <Text style={styles.infoText}>How was your day, Today?</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
});

export default HeaderMessage;
