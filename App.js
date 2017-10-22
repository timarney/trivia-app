import React from "react";
import HomeScreen from "./screens/HomeScreen";
import TriviaScreen from "./screens/TriviaScreen";
import { StackNavigator } from "react-navigation";

export default (App = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Triva: { screen: TriviaScreen }
  },
  {
    headerMode: "none"
  }
));
