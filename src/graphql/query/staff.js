import { gql } from "@apollo/client";

const GET_STAFFS = gql`
    query GetStaffMembers($limit: Int!, $offset: Int!, $filter: StaffFilter) {
    getStaffMembers(limit: $limit, offset: $offset, filter: $filter) {
        totalCount
        users {
            id
            firstName
            lastName
            phone
            email
            role
            createdAt
        }
    }
}
`;

const GET_STAFFS_BY_ID = gql`
    query GetUser($getUserId: ID) {
        getUser(id: $getUserId) {
            id
            firstName
            lastName
            phone
            email
            role
            createdAt
        }
    }
`

export {
    GET_STAFFS,
    GET_STAFFS_BY_ID,
}