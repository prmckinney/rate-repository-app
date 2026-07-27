import { gql } from "@apollo/client";
import { NODEINFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...NodeInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
  ${NODEINFO}
`;

export const GET_REPO = gql`
  query ($id: ID!) {
    repository(id: $id) {
      ...NodeInfo
    }
  }
  ${NODEINFO}
`;

export const GET_URL = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;

export const USERNAME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// other queries...
