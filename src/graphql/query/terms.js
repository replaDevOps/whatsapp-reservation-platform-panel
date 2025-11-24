import { gql } from "@apollo/client";

const GET_TERMS = gql`
    query GetTermsCondition {
        getTermsCondition {
            id
            content
        }
    }
`;

export {GET_TERMS}