import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import AnimatedButton from "../components/general/AnimatedButton";
import useApi from "../hooks/useAPI";

const LoginScreen = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const apiClient = useApi();

  const handleSubmitPress = () => {
    if (!userEmail) {
      return setErrortext("E-Mail is mandatory");
    }
    if (!userPassword) {
      return setErrortext("Password is mandatory");
    }
    setErrortext("");
    setLoading(true);
    apiClient
      .login(userEmail, userPassword)
      .then((response) => {
        return props.navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((e) => {
        console.log("err", e);
        setErrortext(e.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri:
                    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9b2f152157575.59075366924b0.png",
                }}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <View style={styles.sectionStyle}>
              <AnimatedButton
                style={{ flex: 1 }}
                onPress={handleSubmitPress}
                title={"Continue"}
                isLoading={loading}
              />
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate("Register")}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

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
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DCDDDD",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 14,
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
    color: "#232324",
  },
  registerTextStyle: {
    color: "#232324",
    textAlign: "center",
    fontFamily: "Manrope3-Semibold",
    fontSize: 14,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
