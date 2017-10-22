import React, { Component } from "react";
import { TouchableWithoutFeedback, Animated, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { mainBtnGradient, mergeStyles } from "../styles/index";

class AppButton extends Component {
  constructor() {
    super();
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn(cb) {
    if (this.props.loading) return;

    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  }

  handlePressOut(cb = () => {}) {
    if (this.props.loading) return;
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 9,
      tension: 60
    }).start(cb);
  }

  render() {
    const { onPress } = this.props;
    const animatedStyle = { transform: [{ scale: this.animatedValue }] };

    return (
      <LinearGradient colors={mainBtnGradient} style={styles.btnGradient}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={() => {
            this.handlePressOut(onPress);
          }}
        >
          <Animated.View style={animatedStyle}>
            <Text style={styles.btnText}>{this.props.children}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

export default AppButton;

const styles = mergeStyles();
