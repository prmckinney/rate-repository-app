import { Image, View, StyleSheet } from "react-native";
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
});

const RepositoryItem = ({ repo }) => {
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
    </View>
  );
};

export default RepositoryItem;
