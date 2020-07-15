/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  FlatList,
  requireNativeComponent,
} from "react-native";
// import { Navigation } from "react-native-navigation";
// import LinearGradient from "react-native-linear-gradient";
import HeaderMessage from "../components/general/HeaderMessage";
import EntryItem from "../components/general/EntryItem";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import diary from "../mock/diary.json";
import Screen from "../components/Screen.js";
// import NewPost from "../components/NewPost.js";
import ActionButton from "../components/general/ActionButton";
// import Navigation from "../utils/Navigation";
// import { Navigation as RNN } from "react-native-navigation";
import NewPostScreen from "../components/home/NewPostScreen";
// import Fade from "../components/animations/Fade";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

let props = {
  radius: 12,
  height: viewportWidth - 48 * 2,
};

const Diary = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={diary}
        initialNumToRender={3}
        ListHeaderComponent={() => <HeaderMessage />}
        keyExtractor={(item, index) => item.id}
        // onRefresh={onRefresh}
        // refreshing={refreshing}
        style={[styles.container, { marginTop: 15, paddingHorizontal: 15 }]}
        renderItem={({ item, index }) => {
          return <EntryItem key={item.id} {...item} />;
        }}
      />
      {/* <Fab onPress={() => Navigation.showModal()} /> */}
    </View>
    // <View style={[styles.container, { marginTop: 20, marginHorizontal: 15 }]}>

    //   <View style={{ height: 20 }} />

    // </View>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      openNewPost: false,
      routes: [
        { key: "myDiary", title: "My Diary" },
        { key: "calendar", title: "Calendar" },
        { key: "memories", title: "Memories" },
      ],
    };
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = (a) => {
    let index = a.route.key;

    switch (index) {
      case "myDiary":
        return <Diary />;
      case "calendar":
        return <></>;
      case "memories":
        return <></>;
    }
  };

  _renderHeader = (props) => (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "rgba(0,0,0,2)",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: "white",
      }}
    >
      <TabBar
        labelStyle={{
          textTransform: "capitalize",
        }}
        activeColor={"#157DE6"}
        inactiveColor={"#91A1A9"}
        tabStyle={{
          width: (viewportWidth - 60 - 16 * 2) / 3,
          paddingHorizontal: 0,
        }}
        style={{
          elevation: 0,
          flex: 1,
          backgroundColor: "#fff",
          shadowOpacity: 0,
        }}
        indicatorStyle={{
          height: 4,
          borderRadius: 2,
          backgroundColor: "#157DE6",
        }}
        {...props}
      />
      <View
        style={{
          width: 60,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons name="settings" size={24} color="#000" />
      </View>
    </View>
  );

  render() {
    return (
      <Screen noContainer>
        <TabView
          onIndexChange={this._handleIndexChange}
          renderTabBar={this._renderHeader}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={(index) => {
            console.log("index", index);
            this.setState({ index });
          }}
        />
        {!this.state.openNewPost && (
          <ActionButton
            icon="add"
            onPress={
              () => this.setState({ openNewPost: true }) //Navigation.showModal("bb.NewPostScreen")
              // Navigation.push(this.props.componentId, {
              //   component: {
              //     name: "bb.NewPostScreen"
              //   }
              // })
            }
          />
        )}
        <NewPostScreen
          visible={this.state.openNewPost}
          onClose={() => this.setState({ openNewPost: false })}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

{
  /* <View
          style={{
            margin: 20,
            marginHorizontal: 48,
            alignItems: "stretch",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "100%",
              height: props.height,
              alignItems: "stretch"
            }}
          >
            <Image
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                resizeMode: "cover",
                borderRadius: props.radius
              }}
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2017/08/12/18/59/snack-2635035_1280.jpg"
              }}
            />
            <View
              style={{
                height: 100,
                borderRadius: props.radius,
                position: "absolute",
                top: 0,
                right: 0,
                left: 0
              }}
            >
              <LinearGradient
                colors={["black", "transparent"]}
                style={{ flex: 1, borderRadius: props.radius }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                margin: 12,
                borderWidth: 1,
                borderColor: "red"
              }}
            >
              <View>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: "gray"
                  }}
                />
              </View>
              <View
                style={{
                  flexGrow: 1,
                  borderWidth: 1,
                  borderColor: "blue",
                  marginLeft: 8
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexGrow: 1 }}>
                    <Text style={{ color: "white" }}>Bugi Bar</Text>
                    <View>
                      <Text style={{ color: "white" }}>4.0</Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 20,
                        backgroundColor: "blue"
                      }}
                    />
                  </View>
                </View>
                <View>
                  <Text>asd adadsa </Text>
                </View>
              </View>
              <View />
            </View>
          </View>
        </View>
        <TouchableHighlight
          onPress={() =>
            Navigation.push(this.props.componentId, {
              component: {
                name: "bb.home2",
                passProps: {
                  asd: "lol"
                },
                options: {
                  topBar: {
                    title: {
                      text: "LOGIN"
                    }
                  }
                }
              }
            })
          }
        >
          <Text>Change Route</Text>
        </TouchableHighlight> */
}
