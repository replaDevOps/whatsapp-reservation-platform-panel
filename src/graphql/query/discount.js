import { gql } from "@apollo/client";

const GET_DISCOUNTS = gql`
  query GetDiscounts($offset: Int!, $limit: Int!, $filter: DiscountFilter) {
    getDiscounts(offset: $offset, limit: $limit, filter: $filter) {
      totalCount
      discounts {
        id
        code
        group
        discountType
        value
        applicableSubscriptions {
          id
          type
        }
        usageCount
        usageLimit
        startDate
        expiryDate
        status
        createdAt
        validity
      }
    }
  }
`;

const GET_PLANS_LOOKUPS = gql`
  query GetSubscriptions {
    getSubscriptions {
      id
      type
    }
  }
`;

const VERIFY_PROMOTION_CODE = gql`
  query VerifyPromotion($name: String!) {
    verifyPromotion(name: $name) {
      id
      status
    }
  }
`;

const VERIFY_DISCOUNT = gql`
  query CheckDiscountCode(
    $code: String!
    $subscriberId: ID!
    $subscriptionId: ID!
  ) {
    checkDiscountCode(
      code: $code
      subscriberId: $subscriberId
      subscriptionId: $subscriptionId
    ) {
      isValid
      message
      discount {
        code
        id
      }
      subscriptionId
      selectedPackageType
      originalPrice
      discountAmount
      finalPrice
      yearlyOriginalPrice
      yearlyDiscountAmount
      yearlyFinalPrice
    }
  }
`;

export {
  GET_DISCOUNTS,
  GET_PLANS_LOOKUPS,
  VERIFY_PROMOTION_CODE,
  VERIFY_DISCOUNT,
};
