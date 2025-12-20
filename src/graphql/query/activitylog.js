import { gql } from "@apollo/client";


const ACTIVITY_LOG = gql`
    query GetAlerts($limit: Int!, $offset: Int!, $filters: AlertFilters) {
        getAlerts(limit: $limit, offset: $offset, filters: $filters) {
            totalCount
            alerts {
                id
                userName
                userRole
                action
                activity
                createdAt
                userId
            }
        }
    }
`

const GET_DISCOUNT_LOG = gql`
    query GetAllSubscriptionDiscountLogs($limit: Int, $offset: Int, $search: String, $group: DiscountGroup, $startDate: DateTime, $endDate: DateTime, $code: String) {
        getAllSubscriptionDiscountLogs(limit: $limit, offset: $offset, search: $search, group: $group, startDate: $startDate, endDate: $endDate, code: $code) {
            totalCount
            discountlogs {
                id
                discountCode
                appliedAt
                discount {
                    group
                }
                subscriberSubscription {
                    subscriber {
                        firstName
                        lastName
                    }
                    business {
                        id
                        name
                    }
                }
            }
        }
    }
`

// const GET_DISCOUNT_LOOKUP =gql`
    
// `

export { ACTIVITY_LOG, GET_DISCOUNT_LOG }