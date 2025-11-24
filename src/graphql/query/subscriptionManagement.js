import { gql } from "@apollo/client"

const GET_SUBSCRIBERS_SUBSCRIPTIONS = gql`
  query GetSubscriberSubscriptions($search: String, $type: BusinessType, $plan: SubscriptionType, $validity: SubscriptionValidity, $limit: Int, $offDet: Int) {
    getSubscriberSubscriptions(search: $search, type: $type, plan: $plan, validity: $validity, limit: $limit, offDet: $offDet) {
      totalCount
      subscribersubscriptions {
        id
        business {
          id
          image
          name
          businessType
        }
        subscription {
          type
        }
        validity
        startDate
        endDate
      }
    }
  }
`
export {
  GET_SUBSCRIBERS_SUBSCRIPTIONS
}
