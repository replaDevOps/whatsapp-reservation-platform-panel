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
  query GetBusinesses($limit: Int, $offSet: Int, $search: String, $status: BusinessStatus, $startDate: String, $endDate: String, $type: BusinessType) {
    getBusinesses(limit: $limit, offSet: $offSet, search: $search, status: $status, startDate: $startDate, endDate: $endDate, type: $type){
      totalCount
      businesses {
        id
        image
        name
        businessType
        status
        businessId
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

const GET_BUSINESSES_BY_ID = gql`
  query GetBusiness($getBusinessId: ID!) {
    getBusiness(id: $getBusinessId) {
      id
      image
      name
      subscriber {
        id
        firstName
        lastName
        email
        phone
      }
      websiteLink
      subscription {
        id
        type
        createdAt
      }
      status
      subscriptionValidity
      businessType
    }
  }
`

const GET_BRANCH_BY_BUSINESS = gql`
  query GetBusinessBranches($businessId: ID!) {
    getBusinessBranches(businessId: $businessId) {
      id
      name
      phone
      location
      status
    }
  }
`

export {
  GET_SUBSCRIBER_CUSTOMERS_LOOKUP,
  GET_SUBSCRIPTIONS_STATS,
  GET_BUSINESSES,
  GET_BUSINESSES_BY_ID,
  GET_BRANCH_BY_BUSINESS
}
