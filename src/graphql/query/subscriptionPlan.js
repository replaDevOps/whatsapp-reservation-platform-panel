
import { gql } from "@apollo/client";


const GET_SUBSCRIPTION_PLANS = gql`
    query GetSubscriptions {
        getSubscriptions {
            type
            description
            price
            yearlyPrice
            discountPrice
            discountYearlyPrice
            noOfBranches
            noOfAdmins
            noOfStaffManagers
            noOfServiceProviders
            noOfReceptionists
            whatsappBot
            manualReminder
            automatedReminder
            googleReviewLink
            promotions
            selfServiceTablet
            basicDashboard
            fullAccessDashboard
            id
        }
    }
`;

export {
  GET_SUBSCRIPTION_PLANS
};
