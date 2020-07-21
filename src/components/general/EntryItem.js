import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Popover from "react-native-popover-view";
import { timeToDate } from "../../utils/date";
import FullWidthImage from "./FullWidthImage";
import TagText from "./TagText";

const EntryItem = ({ image, title, content, tags, _metadata: { created } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{timeToDate(created)}</Text>
          <Text style={styles.infoText}>{title}</Text>
        </View>
        <View>
          <Popover
            backgroundStyle={{ backgroundColor: "transparent" }}
            popoverStyle={{
              backgroundColor: "rgb(245, 245, 245)",
            }}
            verticalOffset={
              Platform.OS === "android" ? -StatusBar.currentHeight : 0
            }
            from={(sourceRef, showPopover) => (
              <TouchableOpacity
                onPress={showPopover}
                style={{ padding: 5, marginTop: -5 }}
              >
                <MaterialCommunityIcons
                  ref={sourceRef}
                  name="dots-vertical"
                  size={24}
                  color="#A5A5A5"
                />
              </TouchableOpacity>
            )}
          >
            <View>
              <TouchableOpacity
                style={{ paddingHorizontal: 20, paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 16 }}>Special</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 20, paddingVertical: 10 }}
              >
                <Text style={{ color: "red", fontSize: 16 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Popover>
        </View>
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <FullWidthImage
            style={styles.image}
            resizeMode={"contain"}
            source={{ uri: image }}
          />
        </View>
      )}
      <View style={styles.postContainer}>
        <Text style={styles.postText}>{content}</Text>
      </View>
      {tags && tags.length > 0 && (
        <View style={styles.tags}>
          {tags.map((t) => (
            <TagText key={t} name={t} />
          ))}
        </View>
      )}
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
    paddingBottom: 10,
  },
  postText: {
    color: "#232324",
    fontFamily: "Manrope3",
    fontSize: 13,
  },
  tags: {
    flexDirection: "row",
  },
});

export default EntryItem;
