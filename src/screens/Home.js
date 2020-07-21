import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import Calendar from "../components/home/Calendar";
import Diary from "../components/home/Diary";
import Screen from "../components/Screen.js";

const { width: viewportWidth } = Dimensions.get("window");

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
        return <Diary navigation={this.props.navigation} />;
      case "calendar":
        return <Calendar />;
      case "memories":
        return <Diary navigation={this.props.navigation} special />;
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
        <MaterialCommunityIcons
          name="settings"
          size={24}
          color="#000"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
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
      </Screen>
    );
  }
}
