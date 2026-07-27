import { Pressable, Image, View, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useQuery } from "@apollo/client/react";
import { GET_URL } from "../graphql/queries";
import RepositoryItemCount from "./RepositoryItemCount";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexHeader: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  flexDetails: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 5,
    padding: 5,
    alignSelf: "flex-start",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
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

const RepositoryItem = ({ repo, singleView = false }) => {
  const { loading, error, data } = useQuery(GET_URL, {
    variables: { id: repo.id }, // Parameters match the names defined in gql string
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View testID="repositoryItem">
      <View style={styles.flexHeader}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: repo.ownerAvatarUrl,
          }}
        />
        <View>
          <Text bold>{repo.fullName}</Text>
          <Text color="textSecondary">{repo.description}</Text>
          <Text style={styles.language}>{repo.language}</Text>
        </View>
      </View>
      <View style={styles.flexDetails}>
        <RepositoryItemCount count={repo.stargazersCount} label="Stars" />
        <RepositoryItemCount count={repo.forksCount} label="Forks" />
        <RepositoryItemCount count={repo.reviewCount} label="Reviews" />
        <RepositoryItemCount count={repo.ratingAverage} label="Rating" />
      </View>
      {singleView ? (
        <Pressable onPress={() => Linking.openURL(data.repository.url)}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
