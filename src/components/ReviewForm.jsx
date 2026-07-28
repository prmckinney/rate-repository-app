import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import theme from "../theme";
import useReview from "../hooks/useReview";
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
  repoOwner: "",
  repoName: "",
  repoRating: 0,
  repoReview: "",
};

const validationSchema = yup.object().shape({
  repoOwner: yup.string().required("Repository owner name is required"),
  repoName: yup.string().required("Repository name is required"),
  repoRating: yup
    .number()
    .typeError("Rating must be numeric")
    .min(0)
    .max(100)
    .integer("Rating must be a whole number")
    .required("Rating is required"),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Repository owner name"
        value={formik.values.repoOwner}
        onChangeText={formik.handleChange("repoOwner")}
      />
      {formik.touched.repoOwner && formik.errors.repoOwner && (
        <Text style={styles.error}>{formik.errors.repoOwner}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Repository name"
        value={formik.values.repoName}
        onChangeText={formik.handleChange("repoName")}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={styles.error}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Rating between 0 and 100"
        value={formik.values.repoRating}
        onChangeText={formik.handleChange("repoRating")}
      />
      {formik.touched.repoRating && formik.errors.repoRating && (
        <Text style={styles.error}>{formik.errors.repoRating}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Review"
        multiline
        value={formik.values.repoReview}
        onChangeText={formik.handleChange("repoReview")}
      />
      {formik.touched.repoReview && formik.errors.repoReview && (
        <Text style={styles.error}>{formik.errors.repoReview}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("values ==> ", values);
    const { repoOwner, repoName, repoRating, repoReview } = values;

    try {
      const { data } = await review({
        ownerName: repoOwner,
        repositoryName: repoName,
        rating: parseInt(repoRating),
        text: repoReview,
      });
      console.log(data);
      navigate(`/repo/${data}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
