import React, { Component } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { mergeStyles } from "../styles/index";
import { Wrap, Header, Footer, AppButton } from "./";

class Summary extends React.Component {
  componentWillMount() {
    this.animatedOpacityStagger = new Animated.Value(0);
    this.animatedMoveStagger = new Animated.ValueXY({ x: 0, y: 0 });
    this.animatedOpacity = new Animated.Value(0);
    this.animatedPos = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.stagger(100, [
      Animated.timing(this.animatedMoveStagger, {
        toValue: { x: 0, y: 50 },
        duration: 500
      }),
      Animated.timing(this.animatedOpacityStagger, {
        toValue: 1,
        duration: 200
      })
    ]).start();

    Animated.timing(this.animatedOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 700,
      easing: Easing.in
    }).start();

    Animated.spring(this.animatedPos, {
      toValue: 1,
      friction: 10,
      tension: 70,
      delay: 1500
    }).start();
  }

  render() {
    const animatedStyle = { opacity: this.animatedOpacity };
    const animatedPos = { transform: [{ scale: this.animatedPos }] };
    const { navigate, score } = this.props;

    return (
      <Wrap>
        <Animated.View
          style={{
            opacity: this.animatedOpacityStagger,
            transform: this.animatedMoveStagger.getTranslateTransform()
          }}
        >
          <Header>
            <Text>
              You Scored{"\n"}
              {score}
            </Text>
          </Header>
        </Animated.View>

        <Animated.View style={[styles.mainContainer, animatedStyle]}>
          <Text style={styles.retryText}> Want to try again? </Text>
        </Animated.View>

        <Footer>
          <Animated.View style={[styles.multiButton, animatedPos]}>
            <AppButton onPress={() => navigate("Home")}>Play Again</AppButton>
          </Animated.View>
        </Footer>
      </Wrap>
    );
  }
}

const screenStyles = {
  retryText: {
    fontSize: 24,
    color: "#fff"
  }
};

const styles = mergeStyles(screenStyles);

export default Summary;
