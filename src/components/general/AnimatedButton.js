import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  View,
} from "react-native";

export default ({ onPress, title, isLoading, style = {} }) => {
  const buttonAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.timing(buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(buttonAnimated, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isLoading]);

  const changeWidth = buttonAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "10%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: changeWidth }}>
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.fullWidthButton, style]}
          onPress={onPress}
        >
          {!isLoading && (
            <Text style={styles.fullWidthButtonText}>{title}</Text>
          )}
          {isLoading && <ActivityIndicator color="white" />}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  fullWidthButton: {
    flex: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#157DE6",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 8 },
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  fullWidthButtonText: {
    fontFamily: "Manrope3",
    fontSize: 14,
    color: "white",
  },
});
