import React, { Component } from "react";
import { Animated } from "react-native";

export default class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }

    if (nextProps.visible === false) {
      return setTimeout(() => {
        Animated.timing(this._visibility, {
          toValue: nextProps.visible ? 1 : 0,
          duration: this.props.duration || 300,
        }).start(() => {
          this.setState({ visible: nextProps.visible });
        });
      }, 300);
    }

    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: this.props.duration || 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View
        useNativeDriver
        style={this.state.visible ? combinedStyle : containerStyle}
        {...rest}
      >
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}
