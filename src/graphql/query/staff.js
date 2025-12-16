import { gql } from "@apollo/client";

const GET_STAFFS = gql`
    query GetSuperAdminPanelUsers($superAdminId: ID, $limit: Int, $offset: Int, $filter: SuperAdminUserFilter) {
        getSuperAdminPanelUsers(superAdminId: $superAdminId, limit: $limit, offset: $offset, filter: $filter) {
            totalCount
            users {
                id
                imageUrl
                firstName
                lastName
                phone
                email
                role
                createdAt
                isActive
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
            imageUrl
        }
    }
`

export {
    GET_STAFFS,
    GET_STAFFS_BY_ID,
}