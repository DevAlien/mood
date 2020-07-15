import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./general/Button";
import LightButton from "./general/LightButton";
import { useAnimation } from "react-native-animation-hooks";
var { height: screenH } = Dimensions.get("window");
const NewPost = ({ image, onClose, visible }) => {
  const [h, setHeight] = useState(false);

  console.log("hh", {
    type: "timing",
    initialValue: 0,
    toValue: 1,
    duration: 400,
    useNativeDriver: false,
  });

  const animatedValue = useAnimation({
    type: "timing",
    initialValue: 0,
    toValue: visible ? 1 : 0,
    duration: 400,
    useNativeDriver: true,
  });

  return (
    <Animated.View
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        console.log("height", height);
        setHeight(height);
      }}
      style={[
        styles.container,
        {
          opacity: animatedValue,
          //top: 0
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [h ? h : 1, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.viewContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.infoText}>How was your day, Today?</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.iconPress} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#A5A5A5" />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={[styles.textInput, styles.titleInput]}
        placeholder={"Title of the day"}
      />
      <TextInput
        style={[styles.textInput, styles.postInput]}
        placeholder={"Write anything that you feel is worthy mentionting."}
        multiline
      />
      <View style={styles.afterInputs}>
        <LightButton title={"Add Image"} />
        <Text>ASD</Text>
      </View>
      <Button title={"Continue"} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderColor: "#DCDDDD",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconPress: {
    padding: 8,
  },
  viewContainer: {
    padding: 10,
    paddingTop: 20,
    paddingRight: 0,
    flexDirection: "row",
  },
  textContainer: {
    paddingRight: 20,
    paddingLeft: 10,
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
    width: "100%",
    resizeMode: "contain",
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

  textInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DCDDDD",
    borderRadius: 10,
    padding: 20,
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
    color: "#232324",
  },
  titleInput: {
    marginBottom: 10,
    fontSize: 18,
  },
  postInput: {
    height: 120,
    paddingTop: 20,
    textAlignVertical: "top",
  },
  afterInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
});

export default NewPost;
