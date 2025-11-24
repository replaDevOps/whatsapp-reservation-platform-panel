import { gql } from "@apollo/client";

const CREATE_BUSINESS = gql`
    mutation CreateBusiness($input: CreateBusinessInput!) {
        createBusiness(input: $input) {
            id
        }
    }
`
const DELETE_BUSINESS= gql `
    mutation DeleteBusiness($deleteBusinessId: ID!, $deletedBy: String!) {
        deleteBusiness(id: $deleteBusinessId, deletedBy: $deletedBy) {
            id
        }
    }
`
export {
  CREATE_BUSINESS,
  DELETE_BUSINESS
}
