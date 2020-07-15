import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import NewPost from "../NewPost";
import Fade from "../animations/Fade";

const NewPostScreen = ({ visible, onClose, onSave }) => {
  return (
    <Fade
      visible={visible}
      duration={visible ? 300 : 800}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <NewPost onClose={onClose} onPress={onSave} visible={visible} />
    </Fade>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
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
  },
  afterInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
});

export default NewPostScreen;
