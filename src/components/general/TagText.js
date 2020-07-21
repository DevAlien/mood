import React from "react";
import { StyleSheet, Text } from "react-native";
import { tags } from "../../utils/tags";

const TagText = ({ name }) => {
  const tag = tags[name];
  return (
    <Text style={[styles.tagText, { color: tag.color }]}>
      {"\u2022"} {tag.text}
    </Text>
  );
};
export default TagText;

const styles = StyleSheet.create({
  tagText: {
    padding: 10,
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
  },
});
