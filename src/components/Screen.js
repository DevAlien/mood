import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
} from "react-native";

export default ({
  noToolbar,
  noContainer,
  children,
  containerStyle,
  scrollView,
  style,
}) => (
  <SafeAreaView style={[styles.safe, style || {}]}>
    {!noContainer &&
      (scrollView ? (
        <ScrollView>
          <View
            style={[
              { flex: 1, paddingHorizontal: 15, backgroundColor: "white" },
              containerStyle || {},
            ]}
          >
            {children}
          </View>
        </ScrollView>
      ) : (
        <View
          style={[
            { flex: 1, paddingHorizontal: 15, backgroundColor: "white" },
            containerStyle || {},
          ]}
        >
          {children}
        </View>
      ))}
    {noContainer && children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.select({
      ios: undefined,
      android: 24,
    }),
  },
});
