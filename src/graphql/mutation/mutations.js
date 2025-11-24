import { gql } from "@apollo/client";

const CREATE_SUBSCRIBER_CUSTOMER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const UPDATE_TERMS = gql`
  mutation UpdateTermsCondition($input: UpdateTermsConditionInput!) {
    updateTermsCondition(input: $input) {
      id
    }
  }
`
const CREATE_DISCOUNTS = gql`
  mutation AddDiscount($input: AddDiscountInput!) {
    addDiscount(input: $input) {
      id
    }
  }
`
const UPDATE_DISCOUNTS = gql`
  mutation EditDiscount($editDiscountId: ID!, $input: EditDiscountInput!) {
    editDiscount(id: $editDiscountId, input: $input) {
      id
    }
  }
`

export {
  CREATE_SUBSCRIBER_CUSTOMER,
  UPDATE_TERMS,
  CREATE_DISCOUNTS,
  UPDATE_DISCOUNTS,
}
