import MachinableClient from "../libs/machinable";
import AsyncStorage from "@react-native-community/async-storage";

async function onSetTokens(tokens) {
  try {
    const jsonValue = JSON.stringify(tokens);
    await AsyncStorage.setItem("@tokens", jsonValue);
  } catch (e) {}
}

async function onLogout() {
  try {
    const jsonValue = JSON.stringify({});
    await AsyncStorage.setItem("@tokens", jsonValue);
  } catch (e) {}
}

const machinableClient = new MachinableClient("mood", {
  onLogout: onLogout,
  onSetTokens: onSetTokens,
});

export async function checkIfLoggedIn() {
  try {
    let jsonValue = await AsyncStorage.getItem("@tokens");
    jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
    machinableClient.setTokens(jsonValue);
    return jsonValue && jsonValue.access_token ? true : false;
  } catch (e) {
    return false;
  }
}

export default machinableClient;
