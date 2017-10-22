import React from "react";
import { View } from "react-native";
import { mergeStyles } from "../styles/index";

class Footer extends React.Component {
  render() {
    return <View style={styles.footerContainer}>{this.props.children}</View>;
  }
}

export default Footer;

const styles = mergeStyles();
