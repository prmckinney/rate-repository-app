import { useApolloClient, useMutation } from "@apollo/client/react";
import { SIGNIN } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    console.log("token ==> ", result.data.authenticate.accessToken);
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();

    return { data: result.data };
  };

  return [signIn, result];
};

export default useSignIn;
