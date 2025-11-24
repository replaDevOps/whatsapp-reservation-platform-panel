import { gql } from "@apollo/client";

const CREATE_BUSINESS = gql`
    mutation CreateBusiness($input: CreateBusinessInput!) {
        createBusiness(input: $input) {
            id
        }
    }
`

export {
  CREATE_BUSINESS,
}
