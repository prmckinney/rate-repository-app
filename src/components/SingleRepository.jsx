import { View } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import { GET_REPO } from "../graphql/queries";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPO, {
    variables: { id: id }, // Parameters match the names defined in gql string
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  console.log(data);

  return (
    <View testID="singleRepository">
      <RepositoryItem repo={data.repository} singleView="true" />
    </View>
  );
};

export default SingleRepository;
