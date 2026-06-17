import { useQuery } from "@apollo/client/react";
import { USERNAME } from "../graphql/queries";

const useUsername = () => {
  const { data, loading, refetch } = useQuery(USERNAME, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  const username = loading ? undefined : data.me ? data.me.username : undefined;

  return { username, loading, refetch };
};

export default useUsername;
