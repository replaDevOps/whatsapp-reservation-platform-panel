import { gql } from "@apollo/client";

const GET_REVENUE = gql`
    query GetSubscriberSubscriptions($search: String, $type: BusinessType, $plan: SubscriptionType, $limit: Int, $offDet: Int) {
  getSubscriberSubscriptions(search: $search, type: $type, plan: $plan, limit: $limit, offDet: $offDet) {
    totalCount
    subscribersubscriptions {
      id
      businessId
      business {
        id
        image
        name
        businessType
      }
      price
      type
      subscription {
        type
      }
      validity
      createdAt
    }
  }
}
`

export {GET_REVENUE}