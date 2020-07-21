import React from "react";
import { StyleSheet, Text } from "react-native";
import { tags } from "../../utils/tags";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tag = ({ name, isActive, onPress }) => {
  const tag = tags[name];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tagContainer,
        {
          borderColor: tag.color,
          backgroundColor: isActive ? tag.color + "22" : undefined,
        },
      ]}
    >
      <Text style={[styles.tagText, { color: tag.color }]}>{tag.text}</Text>
    </TouchableOpacity>
  );
};
export default Tag;

const styles = StyleSheet.create({
  tagContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  tagText: {
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
  },
});
