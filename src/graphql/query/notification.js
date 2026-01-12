import { gql } from "@apollo/client";

const GET_NOTIFICATIONS = gql`
  query GetAlerts($limit: Int!, $offset: Int!) {
    getAlerts(limit: $limit, offset: $offset) {
      totalCount
      alerts {
        id
        activity
        action
        isRead
        userName
        createdAt
        userId
        userRole
      }
      unreadCount
    }
  }
`

const ALERTS_BY_USERID = gql`
  query GetUserAlerts($userId: ID!, $limit: Int!, $offset: Int!) {
    getUserAlerts(userId: $userId, limit: $limit, offset: $offset) {
      totalCount
      unreadCount
      alerts {
        id
        isRead
        activity
        action
        userName
        createdAt
      }
    }
  }
`

export { GET_NOTIFICATIONS, ALERTS_BY_USERID }