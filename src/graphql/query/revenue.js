import { gql } from "@apollo/client";

const GET_REVENUE = gql`
  query GetSubscriberSubscriptions($search: String, $type: BusinessType, $plan: SubscriptionType, $limit: Int, $offDet: Int, $startDate: DateTime, $endDate: DateTime) {
    getSubscriberSubscriptions(search: $search, type: $type, plan: $plan, limit: $limit, offDet: $offDet, startDate: $startDate, endDate: $endDate) {
      totalCount
      thisMonthRevenue
      totalRevenue
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
          discountPrice
          discountYearlyPrice
          price
          yearlyPrice
        }
        applicableDiscount {
          id
          code
        }
        validity
        createdAt
      }
    }
  }
`

const GET_REVENUE_COUNT = gql`
  query GetSubscriberSubscriptions {
    getSubscriberSubscriptions {
      thisMonthRevenue
      totalRevenue
    }
  }
`

export {GET_REVENUE,GET_REVENUE_COUNT}