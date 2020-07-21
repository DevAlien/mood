import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function Fade({
  visible = false,
  duration,
  style,
  children,
  ...rest
}) {
  const [stateVisible, setStateVisible] = useState(visible);
  const visibility = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible === false) {
      Animated.timing(visibility, {
        useNativeDriver: true,
        toValue: visible ? 1 : 0,
        duration: duration || 3000,
      }).start(() => {
        setStateVisible(visible);
      });
    } else {
      setStateVisible(visible);
      Animated.timing(visibility, {
        useNativeDriver: true,
        toValue: visible ? 1 : 0,
        duration: duration || 3000,
      }).start();
    }
  }, [visible]);

  const containerStyle = {
    opacity: visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const combinedStyle = [containerStyle, style];
  return (
    <Animated.View
      style={stateVisible ? combinedStyle : containerStyle}
      {...rest}
    >
      {stateVisible ? children : null}
    </Animated.View>
  );
}
