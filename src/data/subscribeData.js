const subscribetableData = [
    {
        key: 1,
        invoice: 696589,
        subplan:'Basic Plan',
        period:'Monthly',
        issuedon:'7/18/17',
        expireon:'5/7/16',
        price: 200,
        status: 'Active'
    },
    {
        key: 2,
        invoice: 526587,
        subplan:'Standard Plan',
        period:'Monthly',
        issuedon:'11/7/16',
        expireon:'9/4/12',
        price: 120,
        status: 'Expires'
    },
    {
        key: 3,
        invoice: 526534,
        subplan:'Pro Plan',
        period:'Yearly',
        issuedon:'6/19/14',
        expireon:'8/15/17',
        price: 230,
        status: 'Expires'
    },
    {
        key: 4,
        invoice: 105986,
        subplan:'Enterprise Plan',
        period:'Monthly',
        issuedon:'9/18/16',
        expireon:'1/15/12',
        price: 120,
        status: 'Expires'
    },
]

const pricingData = [
    {
        id: 1,
        title: 'Credit & Debit Card',
        cards:['/assets/icons/visa.png','/assets/icons/mastercard.png']
    },
    {
        id: 2,
        title: 'Stripe',
        cards: '/assets/icons/stripe.png'
    }
]

export { subscribetableData, pricingData }