import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import useMyReviews from "../hooks/useMyReviews";
import theme from "../theme";

const styles = StyleSheet.create({
  flexHeader: {
    flexDirection: "row",
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
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.flexHeader}>
      <View style={styles.rating}>
        <Text bold color="primary" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View>
        <Text bold>{review.repository.fullName}</Text>
        <Text>{format(review.createdAt, "dd MMM yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { reviews } = useMyReviews();
  const myReviews = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={myReviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
