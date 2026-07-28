import { useApolloClient, useMutation } from "@apollo/client/react";
import { CREATEREVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATEREVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const result = await mutate({
      variables: { ownerName, repositoryName, rating, text },
    });
    console.log("id ==> ", result.data.createReview.repository.id);
    apolloClient.resetStore();

    return { data: result.data.createReview.repository.id };
  };

  return [createReview, result];
};

export default useReview;
