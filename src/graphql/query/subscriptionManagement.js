import { gql } from "@apollo/client"

const GET_SUBSCRIBERS_SUBSCRIPTIONS = gql`
  query GetSubscriberSubscriptions($search: String, $type: BusinessType, $plan: SubscriptionType, $validity: SubscriptionValidity, $limit: Int, $offDet: Int, $startDate: DateTime, $endDate: DateTime) {
    getSubscriberSubscriptions(search: $search, type: $type, plan: $plan, validity: $validity, limit: $limit, offDet: $offDet, startDate: $startDate, endDate: $endDate) {
      totalCount
      subscribersubscriptions {
        id
        business {
          id
          image
          name
          businessType
        }
        type
        validity
        startDate
        endDate
        isActive
        subscriber {
          email
        }
        features
      }
    }
  }
`
export {
  GET_SUBSCRIBERS_SUBSCRIPTIONS
}
