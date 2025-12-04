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

const CHANGE_BUSINESS_STATUS = gql`
    mutation UpdateBusiness($input: UpdateBusinessInput!) {
        updateBusiness(input: $input) {
            id
        }
    }
`
export {
  CREATE_BUSINESS,
  DELETE_BUSINESS,
  CHANGE_BUSINESS_STATUS
}
