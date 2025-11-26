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

export { ACTIVITY_LOG }