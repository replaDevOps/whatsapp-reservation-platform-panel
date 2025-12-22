import { gql } from "@apollo/client";

const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription AlertCreated {
    alertCreated {
      alert {
        id
        updatedAt
        action
        activity
        createdAt
        isRead
        userId
        userName
        userRole
      }
      message
    }
  }
`;

const USER_CREATED_NOTIFICATION = gql`
  subscription UserCreated {
    userCreated {
      message
      user {
        id
        firstName
        lastName
        createdAt
      }
    }
  }
`

const SUBSCRIPTION_EXPIRY_NOTIFICATION = gql`
  subscription SubscriptionExpiryNotification {
    subscriptionExpiryNotification {
      expiresAt
      message
      subscriberId
      subscriptionId
    }
  }
`

export {
    NEW_NOTIFICATION_SUBSCRIPTION,
    USER_CREATED_NOTIFICATION,
    SUBSCRIPTION_EXPIRY_NOTIFICATION,
}