import { gql } from "@apollo/client"

const GET_DASHBOARD_STATS = gql`
  query GetDashboardCountApi {
    getDashboardCountApi {
      totalBusinesses
      basicPlanBusinesses
      standardPlanBusinesses
      proPlanBusinesses
      enterprisePlanBusinesses
    }
  }
`
const GET_CUSTOMER_ANALYTICS = gql`
  query GetCustomersAnalyticsApi($startDate: String!, $endDate: String!) {
    getCustomersAnalyticsApi(startDate: $startDate, endDate: $endDate) {
      totalCustomers
      percentageChange
      isPositiveTrend
      chartData {
        count
        date
      }
    }
  }
`

export {
  GET_DASHBOARD_STATS,
  GET_CUSTOMER_ANALYTICS
}
