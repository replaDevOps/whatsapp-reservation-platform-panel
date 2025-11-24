import { gql } from "@apollo/client";

const CREATE_SUBSCRIBER_CUSTOMER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export {
  CREATE_SUBSCRIBER_CUSTOMER,
}
