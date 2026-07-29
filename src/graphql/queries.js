import { gql } from "@apollo/client";
import { NODEINFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
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

export const GET_REVIEWS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const USERNAME = gql`
  query ($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            repository {
              fullName
            }
            createdAt
          }
        }
      }
    }
  }
`;
