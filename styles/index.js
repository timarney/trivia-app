import { TouchableOpacity, StyleSheet, Button, Text, View } from "react-native";

const mainBkdGradient = ["#82a2f5", "#9780f4"];
const mainBtnGradient = ["#f46d74", "#ec4a83"];

const globalStyles = {
  container: {
    flex: 1
  },
  bkdGradient: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    margin: 0
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent"
  },
  mainText: {
    fontSize: 18,
    color: "#ced0f7",
    textAlign: "center",
    fontWeight: "bold"
  },
  headerContainer: {
    marginTop: 100,
    width: "100%",
    backgroundColor: "transparent"
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Kailasa-Bold"
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
    width: "100%",
    backgroundColor: "transparent"
  },
  multiButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  }
};

const buttonStyles = {
  btnGradient: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    alignSelf: "center",
    maxWidth: 150
  },
  btn: {
    backgroundColor: "#ec4f82",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20
  }
};

const mergeStyles = function(screenStyles = {}) {
  return StyleSheet.create(
    Object.assign(globalStyles, buttonStyles, screenStyles)
  );
};

module.exports = { mergeStyles, mainBkdGradient, mainBtnGradient };
