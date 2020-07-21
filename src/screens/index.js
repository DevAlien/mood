import * as React from "react";
import HomeScreen from "./Home";
import LoginScreen from "./Login";
import SettingsScreen from "./Settings";
import RegisterScreen from "./Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewPostScreen from "./NewPost";
import { Animated } from "react-native";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const { add, multiply } = Animated;

function forModalPresentationIOS({
  index,
  current,
  next,
  inverted,
  layouts: { screen },
}) {
  const topOffset = 0;
  const aspectRatio = screen.height / screen.width;

  const progress = add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  const translateY = multiply(
    progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        screen.height,
        index === 0 ? 0 : topOffset,
        (index === 0 ? 0 : 0) - topOffset * aspectRatio,
      ],
    }),
    inverted
  );

  return {
    cardStyle: {
      overflow: "hidden",
      opacity: current.progress,
      transform: [{ translateY }],
    },
    overlayStyle: { opacity: 0 },
  };
}

function Screens({ defaultScreen }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={defaultScreen} mode="modal">
        <Stack.Screen
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              borderBottomWidth: 0,
            },
          }}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="Login"
          path="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="MyModal"
          component={NewPostScreen}
          options={{
            headerShown: false,
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: "rgba(0,0,0,0.4)" },
            cardStyleInterpolator: forModalPresentationIOS,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Screens;
