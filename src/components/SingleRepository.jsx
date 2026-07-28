import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { GET_REPO } from "../graphql/queries";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightBackground,
  },
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
        <Text bold>{review.user.username}</Text>
        <Text>{format(review.createdAt, "dd MMM yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { id: id }, // Parameters match the names defined in gql string
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repo={data.repository} singleView="true" />
      )}
    />
  );
};

export default SingleRepository;
