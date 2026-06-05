import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    alignContent: "center",
    borderColor: theme.colors.backgroundColor,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
  },
  button: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: theme.colors.lightBackground,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
