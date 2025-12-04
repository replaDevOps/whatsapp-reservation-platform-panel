import { gql } from "@apollo/client";


const GET_SUBSCRIBER_CUSTOMERS = gql`
  query GetSubscribers($limit: Int!, $offset: Int!, $filter: UserFilter) {
    getSubscribers(limit: $limit, offset: $offset, filter: $filter) {
      totalCount
      subscribers {
        id
        firstName
        lastName
        email
        phone
        createdAt
      }
    }
  }
`;

export {
  GET_SUBSCRIBER_CUSTOMERS
};
