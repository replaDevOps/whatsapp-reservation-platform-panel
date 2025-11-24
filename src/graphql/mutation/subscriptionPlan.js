import { gql } from "@apollo/client";

const UPDATE_SUBSCRIPTION_PLAN = gql`
    mutation UpdateSubscription($input: updateSubscriptionInput!) {
        updateSubscription(input: $input) {
            id
        }
    }
`

export {
  UPDATE_SUBSCRIPTION_PLAN,
}
