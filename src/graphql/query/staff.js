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

export {GET_STAFFS}