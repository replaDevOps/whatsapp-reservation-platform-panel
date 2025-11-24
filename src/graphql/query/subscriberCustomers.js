import { gql } from "@apollo/client";


const GET_SUBSCRIBER_CUSTOMERS = gql`
  query GetUsers($limit: Int!, $offset: Int!, $role: UserRole, $isActive: Boolean!) {
    getUsers(limit: $limit, offset: $offset, role: $role, isActive: $isActive) {
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
