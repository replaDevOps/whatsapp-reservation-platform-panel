import { gql } from "@apollo/client";

const GET_DISCOUNTS = gql`
    query GetDiscounts($offset: Int!, $limit: Int!, $filter: DiscountFilter) {
        getDiscounts(offset: $offset, limit: $limit, filter: $filter) {
            totalCount
            discounts {
                id
                code
                group
                discountType
                value
                applicableSubscriptions {
                    id
                    type
                }
                usageLimit
                remainingLimit
                startDate
                expiryDate
                status
                createdAt
            }
        }
    }
`;

const GET_PLANS_LOOKUPS = gql`
    query GetSubscriptions {
        getSubscriptions {
            id
            type
        }
    }
`

export {GET_DISCOUNTS,GET_PLANS_LOOKUPS}