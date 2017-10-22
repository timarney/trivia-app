import React from "react";
import { numQuestions, welcomeTitle, errorText } from "../config";
import Trivia from "../lib/Trivia";
import { Wrap, Header, Footer, AppButton } from "../components";
import { Text, View, Animated, Easing } from "react-native";
import { mergeStyles } from "../styles/index";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trivia: new Trivia({ amount: numQuestions }),
      content: "",
      count: 0,
      error: false
    };
  }

  componentWillMount() {
    this.animatedOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const trivia = this.state.trivia;
    trivia.load(response => {
      if (response.status === "error") {
        this.setState({ error: true });
        return;
      }

      this.setState(
        {
          loading: false,
          count: this.state.trivia.getTotalQuestions()
        },
        () => {
          Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.in
          }).start();
        }
      );
    });
  }

  renderError() {
    return (
      <Wrap>
        <Header>{welcomeTitle}</Header>

        <View style={styles.mainContainer}>
          <Text style={styles.intro}>{errorText}</Text>
        </View>

        <Footer>
          <View style={styles.multiButton} />
        </Footer>
      </Wrap>
    );
  }

  render() {
    const { count, error, loading } = this.state;
    const { navigate } = this.props.navigation;
    const animatedStyle = { opacity: this.animatedOpacity };
    const btnPress = () => navigate("Triva", { trivia: this.state.trivia });

    if (error) {
      return this.renderError();
    }

    return !loading ? (
      <Wrap>
        <Header>{welcomeTitle}</Header>

        <Animated.View style={[styles.mainContainer, animatedStyle]}>
          <Text style={styles.intro}>
            You will be presented {count} with True or False questions.
          </Text>
          <Text style={styles.challenge}>Can you score 100%?</Text>
        </Animated.View>

        <Footer>
          <View style={styles.multiButton}>
            <AppButton onPress={btnPress}>Begin</AppButton>
          </View>
        </Footer>
      </Wrap>
    ) : null;
  }
}

const screenStyles = {
  intro: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff"
  },
  challenge: {
    fontSize: 18,
    color: "#fff"
  }
};

const styles = mergeStyles(screenStyles);
