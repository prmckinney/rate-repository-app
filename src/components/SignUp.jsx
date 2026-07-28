import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  input: {
    alignContent: "center",
    borderColor: theme.colors.backgroundColor,
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
  },
  error: {
    color: theme.colors.error,
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
  password2: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  password2: yup
    .string()
    .min(5)
    .max(50)
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
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
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password confirmation"
        value={formik.values.password2}
        onChangeText={formik.handleChange("password2")}
      />
      {formik.touched.password2 && formik.errors.password2 && (
        <Text style={styles.error}>{formik.errors.password2}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
