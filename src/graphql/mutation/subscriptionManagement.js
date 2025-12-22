import { gql } from "@apollo/client";

const UPDATE_SUBSCRIBER_SUBSCRIPTION = gql`
    mutation UpdateSubscriberSubscription($input: UpdateSubscriberSubscriptionInput!, $updateSubscriberSubscriptionId: ID!) {
        updateSubscriberSubscription(input: $input, id: $updateSubscriberSubscriptionId) {
            id
        }
    }
`
const RENEW_SUBSCRIBER_SUBSCRIPTION = gql`
    mutation RenewSubscriberSubscription($renewSubscriberSubscriptionId: ID!) {
        renewSubscriberSubscription(id: $renewSubscriberSubscriptionId) {
            id
        }
    }
`
export {
  UPDATE_SUBSCRIBER_SUBSCRIPTION,
  RENEW_SUBSCRIBER_SUBSCRIPTION
}
