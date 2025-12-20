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

const EXPIRE_DISCOUNT = gql`
  mutation ExpireDiscount($expireDiscountId: ID!) {
    expireDiscount(id: $expireDiscountId) {
      id
    }
  }
`

const CREATE_STAFF = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const UPDATE_STAFF = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`
const DELETE_STAFF = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`

const CREATE_FAQS = gql`
  mutation AddFaq($input: CreateFAQInput!) {
    addFaq(input: $input) {
      id
    }
  }
`
const UPDATE_FAQS = gql`
  mutation UpdateFaq($updateFaqId: ID!, $input: UpdateFAQInput!) {
    updateFaq(id: $updateFaqId, input: $input) {
      id
    }
  }
`

const DELETE_FAQS = gql`
  mutation DeleteFaq($deleteFaqId: ID!) {
    deleteFaq(id: $deleteFaqId) {
      id
    }
  }
`

const CHANGE_PASSWORD_USER =  gql`
  mutation ChangedPassword($changedPasswordId: ID!, $oldPassword: String!, $newPassword: String!) {
    changedPassword(id: $changedPasswordId, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`

const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String, $role: UserRole!) {
    loginUser(email: $email, password: $password, role: $role) {
      token
      user {
        id
        email
      }
    }
  }
`

const UPDATE_PRIVACY_POLICY = gql`
  mutation UpdatePrivacyPolicy($input: UpdatePrivacyPolicyInput!) {
    updatePrivacyPolicy(input: $input) {
      id
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

export {
  CREATE_SUBSCRIBER_CUSTOMER,
  UPDATE_TERMS,
  CREATE_DISCOUNTS,
  UPDATE_DISCOUNTS,
  CREATE_STAFF,
  UPDATE_STAFF,
  DELETE_STAFF,
  EXPIRE_DISCOUNT,
  CREATE_FAQS,
  CHANGE_PASSWORD_USER,
  LOGIN_USER,
  UPDATE_FAQS,
  DELETE_FAQS,
  UPDATE_PRIVACY_POLICY,
  UPDATE_USER,
}
