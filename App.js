import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, YellowBox } from "react-native";
import { SWRConfig } from "swr";
import apiClient, { checkIfLoggedIn } from "./src/ApiClient";
import { AppProvider } from "./src/context/AppContext";
import Screens from "./src/screens";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  const [selectedScreen, setSelectedScreen] = useState(false);
  const [loaded] = useFonts({
    Manrope3: require("./assets/fonts/manrope-regular.ttf"),
    "Manrope3-Semibold": require("./assets/fonts/manrope-semibold.ttf"),
  });

  useEffect(() => {
    async function check() {
      const loggedIn = await checkIfLoggedIn();
      if (loggedIn) {
        console.log("home");
        setSelectedScreen("Home");
      } else {
        console.log("login");
        setSelectedScreen("Login");
      }
    }

    check();
  }, []);

  if (!loaded || !selectedScreen) return <ActivityIndicator size="large" />;

  return (
    <AppProvider value={{ api: apiClient }}>
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher: (...args) => apiClient.api(...args),
        }}
      >
        <Screens defaultScreen={selectedScreen} />
      </SWRConfig>
    </AppProvider>
  );
}
