import { useQuery } from "@apollo/client/react";
import { USERNAME } from "../graphql/queries";

const useMyReviews = () => {
  const { data, loading, refetch } = useQuery(USERNAME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const reviews = loading ? undefined : data.me ? data.me.reviews : undefined;

  return { reviews, loading, refetch };
};

export default useMyReviews;
