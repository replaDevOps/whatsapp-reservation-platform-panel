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
                packageType
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

export {GET_DISCOUNTS}