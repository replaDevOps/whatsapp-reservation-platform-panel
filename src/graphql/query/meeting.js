import { gql } from "@apollo/client";

const GETMEETINGSCOUNT = gql`
query GetAdminMeetingCounts {
  getAdminMeetingCounts {
    todayMeetings
    totalPendingMeetings
    totalScheduleMeetings
  }
}
`
const GETADMINPENDINGMEETINGS = gql`
  query GetAdminPendingMeetings($search: String, $status: MeetingFilterType, $limit: Int, $offset: Int) {
    getAdminPendingMeetings(search: $search, status: $status, limit: $limit, offset: $offset) {
      totalCount
      items {
        id
        business {
          businessTitle
          price
          seller {
            id
            name
            email
            phone
          }
        }
        requestedTo {
          name
          email
          phone
          id
        }
        requestedBy {
          name
          email
          phone
          id
        }
        requestedDate
        requestedEndDate
        receiverAvailabilityDate
        offer {
          price
        }
        status
      }
    }
  }
`

const GETADMINSCHEDULEMEETINGS = gql`
query GetAdminScheduledMeetings($search: String, $status: MeetingFilterType,$limit: Int, $offset: Int) {
  getAdminScheduledMeetings(search: $search, status: $status,limit: $limit, offset: $offset) {
    totalCount
    items {
      id
      meetingLink
      business {
<<<<<<< HEAD
        id
        businessTitle
        price
        seller {
          id
=======
        businessTitle
        price
        
        seller {
>>>>>>> 903e56b17904e77d6703aee1babfdbf9665b0898
          name
          email
          phone
        }
      }
<<<<<<< HEAD
      adminAvailabilityDate
=======
>>>>>>> 903e56b17904e77d6703aee1babfdbf9665b0898
      requestedTo {
        id
        name
        email
        phone
      }
<<<<<<< HEAD
      requestedBy {
        name
        email
        phone
        id
      }
=======
>>>>>>> 903e56b17904e77d6703aee1babfdbf9665b0898
      requestedDate
      offer {
        id
        price
        commission
      }
      status
    }
  }
}
`
const GETDEALS = gql`
query GetDeals($limit: Int, $offset: Int, $search: String, $status: String, $isCompleted: Boolean) {
  getDeals(limit: $limit, offset: $offset, search: $search, status: $status, isCompleted: $isCompleted) {
    totalCount
    deals {
    id
      business {
      businessTitle
      seller {
        name
      }
    }
    isBuyerCompleted
    isCommissionUploaded
    isCommissionVerified
    isDocVedifiedBuyer
    isDsaBuyer
    isDsaSeller
    isPaymentVedifiedSeller
    isSellerCompleted
    buyer {
      name
    }
    createdAt
    status
    offer {
      price
    }
    }
  }
}
`

export {
  GETMEETINGSCOUNT,
  GETADMINSCHEDULEMEETINGS,
  GETADMINPENDINGMEETINGS,
  GETDEALS
}
