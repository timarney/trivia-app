import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo";
import { mainBkdGradient, mergeStyles } from "../styles/index";

export default class Wrap extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={mainBkdGradient} style={styles.bkdGradient}>
          <View style={styles.wrap}>{this.props.children}</View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = mergeStyles();
