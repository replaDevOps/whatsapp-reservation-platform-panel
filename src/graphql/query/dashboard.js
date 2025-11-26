import { gql } from "@apollo/client";

const GET_DASHBOARD_STATS = gql`
    query GetDashboardCountApi {
        getDashboardCountApi {
            basicPlanBusinesses
            enterprisePlanBusinesses
            proPlanBusinesses
            standardPlanBusinesses
            totalBusinesses
        }
    }
`
const GET_CUSTOMER_ANALYTICS_STATS = gql`
    query GetCustomersAnalyticsApi($startDate: String!, $endDate: String!) {
        getCustomersAnalyticsApi(startDate: $startDate, endDate: $endDate) {
            chartData {
            count
            date
            }
            percentageChange
            totalCustomers
            isPositiveTrend
        }
    }
`

const GET_REGISTERED_BUSINESSES = gql`
    query GetBusinessTypeCount($startDate: String, $endDate: String) {
        getBusinessTypeCount(startDate: $startDate, endDate: $endDate) {
            counts {
                count
                type
            }
            totalCount
        }
    }
`

export {
    GET_DASHBOARD_STATS,
    GET_CUSTOMER_ANALYTICS_STATS,
    GET_REGISTERED_BUSINESSES,
}