import { gql } from "@apollo/client";

const GET_DEMO_REQUEST = gql`
    query GetBookDemos($limit: Int!, $offset: Int!) {
    getBookDemos(limit: $limit, offset: $offset) {
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