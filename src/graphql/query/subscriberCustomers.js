import { gql } from "@apollo/client";


const GET_SUBSCRIBER_CUSTOMERS = gql`
  query GetUsers($limit: Int!, $offset: Int!, $role: UserRole) {
    getUsers(limit: $limit, offset: $offset, role: $role) {
      totalCount
      users {
        id
        firstName
        lastName
        phone
        email
        isActive
        createdAt
      }
    }
  }
`;

export {
  GET_SUBSCRIBER_CUSTOMERS
};
