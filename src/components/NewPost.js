import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useApi from "../hooks/useAPI";
import { tagsArray } from "../utils/tags";
import AnimatedButton from "./general/AnimatedButton";
import LightButton from "./general/LightButton";
import Tag from "./general/Tag";

const NewPost = ({ onClose, onSave }) => {
  const apiClient = useApi();
  const [formState, setFormState] = useState({
    data: {
      special: false,
      title: "",
      content: "",
      media: "",
      tags: [],
    },
    errors: {},
    isLoading: false,
  });

  const changeState = (val) => {
    return setFormState((old) => ({
      ...old,
      ...val,
    }));
  };

  const onChangeHandler = (name) => (value) =>
    setFormState((old) => ({ ...old, data: { ...old.data, [name]: value } }));

  const changeTag = (name) => {
    const changeTags = onChangeHandler("tags");
    const index = data.tags.indexOf(name);
    const finalTags = [...data.tags];
    if (index === -1) {
      finalTags.push(name);
    } else {
      finalTags.splice(index, 1);
    }
    changeTags(finalTags);
  };

  const handleSubmitPress = () => {
    changeState({ errors: {}, info: false, error: false, isLoading: true });
    let { data } = formState;
    let errors = {};
    if (!data.title || data.title.length < 3) {
      errors.title = "You must add a title";
    }

    if (!data.content || data.content.length < 3) {
      errors.content = "You must provide some content";
    }

    if (Object.keys(errors).length > 0) {
      return changeState({
        errors: errors,
        isLoading: false,
      });
    }

    apiClient
      .api("/moods", "post", data)
      .then((response) => {
        console.log("response", response);
        changeState({ isLoading: false });
        onSave();
      })
      .catch((e) => {
        console.log("err", e);
        changeState({ isLoading: false });
      });
  };

  const { data, errors, isLoading, error, info } = formState;

  return (
    <View style={[styles.container]}>
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
        onChangeText={onChangeHandler("title")}
        value={data.title}
      />
      <TextInput
        style={[styles.textInput, styles.postInput]}
        placeholder={"Write anything that you feel is worthy mentionting."}
        multiline
        onChangeText={onChangeHandler("content")}
        value={data.content}
      />
      <View style={styles.afterInputs}>
        <LightButton title={"Add Image"} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>Special Memory</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#157DE6" }}
            thumbColor={data.special ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onChangeHandler("special")}
            value={data.special}
          />
        </View>
      </View>
      <View style={styles.tagsContainer}>
        {tagsArray.map((t) => (
          <View key={t.name} style={styles.tag}>
            <Tag
              name={t.name}
              onPress={() => changeTag(t.name)}
              isActive={data.tags.indexOf(t.name) !== -1}
            />
          </View>
        ))}
      </View>
      <AnimatedButton
        title={"Continue"}
        isLoading={isLoading}
        onPress={handleSubmitPress}
      />
    </View>
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
    opacity: 1,
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
  infoText: {
    fontFamily: "Manrope3-Semibold",
    color: "#1A1B22",
    fontSize: 18,
  },
  image: {
    borderRadius: 6,
    width: "100%",
    resizeMode: "contain",
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    margin: 10,
  },
});

export default NewPost;
