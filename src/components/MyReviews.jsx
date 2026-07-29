import { Alert, FlatList, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";
import Text from "./Text";
import useMyReviews from "../hooks/useMyReviews";
import useDeleteReview from "../hooks/useDeleteReview";
import theme from "../theme";

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexButtons: {
    flexDirection: "row",
    flexGrow: 1,
    gap: 10,
  },
  flex: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
    gap: 10,
  },
  rating: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightBackground,
  },
  button: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    color: theme.colors.lightBackground,
    borderRadius: 5,
    margin: 0,
    padding: 10,
    flexGrow: 1,
  },
  red_button: {
    textAlign: "center",
    backgroundColor: theme.colors.error,
    color: theme.colors.lightBackground,
    borderRadius: 5,
    margin: 0,
    padding: 10,
    flexGrow: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const processDeleteReview = async (id, deleteReview, refetch) => {
  console.log(`Deleting ${id}`);
  await deleteReview({ id });
  await refetch();
};

const confirmDelete = (id, deleteReview, refetch) => {
  Alert.alert("Delete review", "Are you sure you want to delete this review?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      onPress: () => processDeleteReview(id, deleteReview, refetch),
    },
  ]);
};

const ReviewItem = ({ review, deleteReview, refetch }) => {
  const navigate = useNavigate();
  return (
    <View style={styles.flex}>
      <View style={styles.flexRow}>
        <View style={styles.rating}>
          <Text bold color="primary" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.flex}>
          <Text bold>{review.repository.fullName}</Text>
          <Text>{format(review.createdAt, "dd MMM yyyy")}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.flexButtons}>
        <Pressable
          style={styles.flexButtons}
          onPress={() => navigate(`/repo/${review.repository.id}`)}
        >
          <Text style={styles.button}>View repository</Text>
        </Pressable>
        <Pressable
          style={styles.flexButtons}
          onPress={() => {
            confirmDelete(review.id, deleteReview, refetch);
            //refetch();
          }}
        >
          <Text style={styles.red_button}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { reviews, refetch } = useMyReviews();
  const [deleteReview] = useDeleteReview();
  const myReviews = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={myReviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          deleteReview={deleteReview}
          refetch={refetch}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
