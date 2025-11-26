import { gql } from "@apollo/client"

const GET_SUBSCRIBER_CUSTOMERS_LOOKUP = gql`
  query GetUsers($limit: Int!, $offset: Int!, $role: UserRole) {
    getUsers(limit: $limit, offset: $offset, role: $role) {
      totalCount
      users {
        id
        firstName
        lastName
      }
    }
  }
`
const GET_SUBSCRIPTIONS_STATS = gql`
  query GetBusinesses {
    getBusinesses {
      basicPlanCount
      standardPlanCount
      proPlanCount
      enterprisePlanCount
    }
  }
`
const GET_BUSINESSES = gql`
  query GetBusinesses {
    getBusinesses {
      totalCount
      businesses {
        id
        image
        name
        businessType
        subscriber {
          firstName
          lastName
        }
        subscription {
          id
          type
        }
        createdAt
      }
    }
  }
`
export {
  GET_SUBSCRIBER_CUSTOMERS_LOOKUP,
  GET_SUBSCRIPTIONS_STATS,
  GET_BUSINESSES
}
