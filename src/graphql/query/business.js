import { gql } from "@apollo/client"

const GET_SUBSCRIBER_CUSTOMERS_LOOKUP = gql`
  query GetUsers($limit: Int!, $offset: Int!, $roles: [UserRole!], ) {
    getUsers(limit: $limit, offset: $offset, roles: $roles, ) {
      totalCount
      users {
        id
        firstName
        lastName
        createdAt
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
      totalBookingsCount
      todayBookingsCount
      totalActiveBranches
      totalActiveServiceProviders
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
  query GetBusinessBranches($businessId: ID!, $limit: Int, $offset: Int, $filter: BranchFilter) {
    getBusinessBranches(businessId: $businessId, limit: $limit, offset: $offset, filter: $filter) {
      totalCount
      branches {
        id
        name
        phone
        location
        status
        appointments {
          id
        }
      }
      
    }
  }
`

const GET_SERVICES_BY_BRANCHID = gql`
  query GetServicesByBranch($branchId: ID!, $limit: Int, $offset: Int) {
    getServicesByBranch(branchId: $branchId, limit: $limit, offset: $offset) {
      totalCount
      services {
        id
        name
        duration
        bufferTime
        price
        status
      }
    }
  }
`

const GET_STAFF_BY_BRANCHID = gql`
  query GetStaffByBranch($branchId: ID!, $limit: Int, $offset: Int) {
    getStaffByBranch(branchId: $branchId, limit: $limit, offset: $offset) {
      totalCount
      users {
        id
        imageUrl
        firstName
        lastName
        phone
        role
        services {
          id
          name
        }
      }
    }
  }
`

export {
  GET_SUBSCRIBER_CUSTOMERS_LOOKUP,
  GET_SUBSCRIPTIONS_STATS,
  GET_BUSINESSES,
  GET_BUSINESSES_BY_ID,
  GET_BRANCH_BY_BUSINESS,
  GET_SERVICES_BY_BRANCHID,
  GET_STAFF_BY_BRANCHID,
}
