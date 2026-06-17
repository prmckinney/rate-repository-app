import { useMutation } from "@apollo/client/react";
import { SIGNIN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { username, password } });
    console.log("result ==> ", result.data);
    return { data: result.data };
  };

  return [signIn, result];
};

export default useSignIn;
