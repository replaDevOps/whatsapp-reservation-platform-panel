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

const GET_REVENUE_STATS = gql`
    query GetRevenueChart($year: Int!) {
        getRevenueChart(year: $year) {
            isPositiveTrend
            percentageChange
            totalRevenue
            previousYearRevenue
            monthlyData {
                label
                month
                currentYearAmount
                previousYearAmount
            }
            year
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

const GET_TOP_PERFORMING_BUSINESS = gql`
    query GetTopPerformingBusinesses($limit: Int) {
        getTopPerformingBusinesses(limit: $limit) {
            businessName
            type
            totalBookings
            logo
        }
    }
`

export {
    GET_DASHBOARD_STATS,
    GET_CUSTOMER_ANALYTICS_STATS,
    GET_REGISTERED_BUSINESSES,
    GET_REVENUE_STATS,
    GET_TOP_PERFORMING_BUSINESS,
}
