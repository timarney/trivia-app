import React from "react";
import { View, Text } from "react-native";
import { mergeStyles } from "../styles/index";

class Header extends React.Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{this.props.children}</Text>
      </View>
    );
  }
}

export default Header;

const styles = mergeStyles();
