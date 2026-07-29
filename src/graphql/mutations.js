import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGNUP = gql`
  mutation ($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`;

export const CREATEREVIEW = gql`
  mutation (
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      repository {
        id
      }
    }
  }
`;

export const DELETEREVIEW = gql`
  mutation ($id: ID!) {
    deleteReview(id: $id)
  }
`;
