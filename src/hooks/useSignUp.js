import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });

    return { data: result.data };
  };

  return [signUp, result];
};

export default useSignUp;
