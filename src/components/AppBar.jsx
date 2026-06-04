import { View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  text: {
    backgroundColor: theme.colors.background,
    color: theme.colors.lightBackground,
    fontSize: 18,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/SignIn">
        <Text style={styles.text}>Sign-In</Text>
      </Link>
    </View>
  );
};

export default AppBar;
