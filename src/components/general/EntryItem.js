import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import FullWidthImage from "./FullWidthImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EntryItem = ({ image, title }) => {
  console.log("image", image);
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>Today, 10 May 2018</Text>
          <Text style={styles.infoText}>{title}</Text>
        </View>
        <View>
          <Text>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#A5A5A5"
            />
          </Text>
        </View>
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <FullWidthImage
            style={styles.image}
            resizeMode={"contain"}
            source={require("../../../assets/friends.png")}
          />
        </View>
      )}
      <View style={styles.postContainer}>
        <Text style={styles.postText}>
          Nam porttitor blandit accumsan. Ut vel dictum sem, a pretium dui. In
          malesuada enim in dolor euismod, id commodo mi consectetur.
        </Text>
      </View>
      <Text style={styles.tagText}>{"\u2022"} Happy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#DCDDDD",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
  },
  viewContainer: {
    padding: 10,
    paddingRight: 0,
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
    color: "#A5A5A5",
  },
  infoText: {
    fontFamily: "Manrope3-Semibold",
    color: "#1A1B22",
    fontSize: 18,
  },
  imageContainer: {
    marginVertical: 15,
  },
  image: {
    borderRadius: 6,
  },
  postContainer: {
    paddingHorizontal: 10,
  },
  postText: {
    color: "#232324",
    fontFamily: "Manrope3",
    fontSize: 13,
  },
  tagText: {
    padding: 10,
    color: "#157DE6",
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
  },
});

export default EntryItem;
