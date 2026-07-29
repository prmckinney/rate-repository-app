import { useApolloClient, useMutation } from "@apollo/client/react";
import { DELETEREVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETEREVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async ({ id }) => {
    console.log("Deleting id", id);
    const result = await mutate({
      variables: { id },
    });
    apolloClient.resetStore();

    return result;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
