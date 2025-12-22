import { gql } from "@apollo/client";

const GET_TERMS = gql`
    query GetTermsCondition {
        getTermsCondition {
            id
            content
        }
    }
`;

const GETPRIVACYPOLICY = gql`
  query GetPrivacyPolicy {
    getPrivacyPolicy {
      id
      content
    }
  }
`

const GET_USERS_BY_ID = gql`
  query GetUser($getUserId: ID) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      phone
      email
      fb
      instagram
      x
      whatsapp
    }
  }
`

const GET_MAINTENANCE_STATUS = gql`
  query GetMaintenanceStatus {
    getMaintenanceStatus {
      id
      isEnabled
    }
  }
`

// const GET_NOTIFICATIONS = gql`

// `

export {
  GET_TERMS,
  GETPRIVACYPOLICY,
  GET_USERS_BY_ID,
  GET_MAINTENANCE_STATUS,
}