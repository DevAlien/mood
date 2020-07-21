import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AnimatedButton from "../components/general/AnimatedButton";
import useApi from "../hooks/useAPI";

const SettingsScreen = (props) => {
  const apiClient = useApi();

  const handleLogoutPress = () => {
    apiClient.logout().then(() => {
      return props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <View style={styles.sectionStyle}>
            <AnimatedButton
              style={{ flex: 1 }}
              onPress={handleLogoutPress}
              title={"Logout"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  sectionStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});

export default SettingsScreen;
