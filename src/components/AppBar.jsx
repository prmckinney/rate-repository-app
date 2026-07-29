import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import useUsername from "../hooks/useUsername";
import useSignOut from "../hooks/useSignOut";

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
    padding: 10,
  },
});

const AppBar = () => {
  const signOut = useSignOut();
  const { username } = useUsername();
  console.log("username ==> ", username);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {username && (
          <Link to="/Review">
            <Text style={styles.text}>Create a Review</Text>
          </Link>
        )}
        {username && (
          <Link to="/MyReviews">
            <Text style={styles.text}>My Reviews</Text>
          </Link>
        )}
        {username && (
          <Pressable onPress={signOut}>
            <Text style={styles.text}>Sign-Out</Text>
          </Pressable>
        )}
        {!username && (
          <Link to="/SignIn">
            <Text style={styles.text}>Sign-In</Text>
          </Link>
        )}
        {!username && (
          <Link to="/SignUp">
            <Text style={styles.text}>Sign-Up</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
