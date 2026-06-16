import { gql } from "@apollo/client";

export const NODEINFO = gql`
  fragment NodeInfo on Node {
    id
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
  }
`;
