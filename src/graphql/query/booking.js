import { gql } from "@apollo/client";

const GET_BOOKING = gql`
    query GetAppointments($limit: Int, $offset: Int, $search: String, $branchId: String, $businessId: String, $status: AppointmentStatus, $startDate: DateTime, $endDate: DateTime) {
        getAppointments(limit: $limit, offset: $offset, search: $search, branchId: $branchId, businessId: $businessId, status: $status, startDate: $startDate, endDate: $endDate) {
            totalCount
            appointments {
                id
                appointmentNumber
                branch {
                    name
                    business {
                        name
                    }
                }
                service {
                    name
                }
                consumer {
                    firstName
                    lastName
                    phone
                }
                serviceProvider {
                    firstName
                    lastName
                }
                appointmentDate
                appointmentTime
                status
            }
        }
    }
`

const BRACH_LOOKUP = gql`
    query Branches {
        getBranches {
            branches {
                id
                name
            }
        }
    }
`

const BUSINESS_LOOKUP = gql`
    query Businesses {
        getBusinesses {
            businesses {
                id
                name
            }
        }
    }
`

export { GET_BOOKING, BRACH_LOOKUP, BUSINESS_LOOKUP }