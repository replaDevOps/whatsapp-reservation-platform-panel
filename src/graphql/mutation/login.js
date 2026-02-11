import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
      user {
        id
        imageUrl
        firstName
        lastName
        role
        email
      }
    }
  }
`



export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      refreshToken
      user {
        id
        status
      }
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`


