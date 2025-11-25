import { gql } from "@apollo/client";

const GET_DEMO_REQUEST = gql`
    query GetBookDemos($limit: Int!, $offset: Int!, $filter: BookDemoFilter) {
        getBookDemos(limit: $limit, offset: $offset, filter: $filter) {
            totalCount
            bookDemos {
                id
                name
                email
                phone
                businessType
                message
                createdAt
                note
                status
            }
        }
    }
`

export {
    GET_DEMO_REQUEST
}