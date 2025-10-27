const subscriptionplanData = [
    {
        id: 1,
        title: 'Basic',
        description: 'Simple start for small setups',
        amount: 200,
        features:[
            {
                title:'1 Branch'
            },
            {
                title:'1 Admin'
            },
            {
                title:'2 Receptionists'
            },
            {
                title:'WhatsApp Bot'
            },
            {
                title:'Manual Reminders'
            },
            {
                title:'Basic Dashboard'
            },
        ]
    },
    {
        id: 2,
        title: 'Standard',
        description: 'Simple start for small setups',
        amount: 300,
        features:[
            {
                title:'2 Branch'
            },
            {
                title:'2 Admin'
            },
            {
                title:'1 Receptionists'
            },
            {
                title:'WhatsApp Bot'
            },
        ]
    },
    {
        id: 3,
        title: 'Pro',
        description: 'Simple start for small setups',
        amount: 500,
        features:[
            {
                title:'10 Branch'
            },
            {
                title:'10 Admin'
            },
            {
                title:'20 Receptionists'
            },
            {
                title:'WhatsApp Bot'
            },
            {
                title:'Manual Reminders'
            },
            {
                title:'Basic Dashboard'
            },
        ]
    },
    {
        id: 4,
        title: 'Enterprise',
        description: 'Simple start for small setups',
        amount: 600,
        features:[
            {
                title:'12 Branch'
            },
            {
                title:'12 Admin'
            },
            {
                title:'24 Receptionists'
            },
            {
                title:'WhatsApp Bot'
            },
            {
                title:'Manual Reminders'
            },
            {
                title:'Basic Dashboard'
            },
        ]
    },
]

const submanageData = [
    {
        key: 1,
        businessId: 'BIZ-1001',
        businessLogo: '/assets/images/1.png',
        businessName: 'Serenity Spa & Wellness',
        type: 'Spa',
        email: 's@gmail.com',
        subscriptionPlan: 'bp',
        subscription: 'Basic',
        period: 'Yearly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Active'
    },
    {
        key: 2,
        businessId: 'BIZ-1002',
        businessLogo: '/assets/images/1.png',
        businessName: 'Zenith Fitness Studio',
        type: 'Gym',
        email: 'ab@gmail.com',
        subscriptionPlan: 'PP',
        subscription: 'Pro',
        period: 'Monthly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Expires'
    },
    {
        key: 3,
        businessId: 'BIZ-1003',
        businessLogo: '/assets/images/1.png',
        businessName: 'Glow Beauty Lounge',
        type: 'Salon',
        email: 'a@gmail.com',
        subscriptionPlan: 'sp',
        subscription: 'Standard',
        period: 'Yearly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Expires'
    },
    {
        key: 4,
        businessId: 'BIZ-1004',
        businessLogo: '/assets/images/1.png',
        businessName: 'Revive Health Hub',
        type: 'Clinic',
        email: 'b@gmail.com',
        subscriptionPlan: 'EP',
        subscription: 'Enterprise',
        period: 'Monthly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Active'
    },
    {
        key: 5,
        businessId: 'BIZ-1005',
        businessLogo: '/assets/images/1.png',
        businessName: 'Urban Yoga Studio',
        type: 'Wellness',
        email: 'susan@gmail.com',
        subscriptionPlan: 'bp',
        subscription: 'Basic',
        period: 'Yearly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Expires'
    },
    {
        key: 6,
        businessId: 'BIZ-1006',
        businessLogo: '/assets/images/1.png',
        businessName: 'Tranquil Touch Spa',
        type: 'Spa',
        email: 'wd@gmail.com',
        subscriptionPlan: 'PP',
        subscription: 'Pro',
        period: 'Monthly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Expires'
    },
    {
        key: 7,
        businessId: 'BIZ-1007',
        businessLogo: '/assets/images/1.png',
        businessName: 'FitZone Gym & Training',
        type: 'Gym',
        email: 'zy@gmail.com',
        subscriptionPlan: 'sp',
        subscription: 'Standard',
        period: 'Yearly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Active'
    },
    {
        key: 8,
        businessId: 'BIZ-1008',
        businessLogo: '/assets/images/1.png',
        businessName: 'Holistic Care Center',
        type: 'Clinic',
        email: 'da@gmail.com',
        subscriptionPlan: 'EP',
        subscription: 'Enterprise',
        period: 'Monthly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Active'
    },
    {
        key: 9,
        businessId: 'BIZ-1009',
        businessLogo: '/assets/images/1.png',
        businessName: 'Mind & Body Studio',
        type: 'Wellness',
        email: 'ds@gmail.com',
        subscriptionPlan: 'PP',
        subscription: 'Pro',
        period: 'Yearly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Active'
    },
    {
        key: 10,
        businessId: 'BIZ-1010',
        businessLogo: '/assets/images/1.png',
        businessName: 'Elite Therapy Center',
        type: 'Clinic',
        email: 'gf@gmail.com',
        subscriptionPlan: 'sp',
        subscription: 'Standard',
        period: 'Monthly',
        startDate: '18/09/2016',
        expiryDate: '18/09/2016',
        status: 'Expires'
    },
];

const discountData = [
    {
        key: 1,
        discountCode: 'Sale Shopee 0101',
        group: 'Old',
        type: 'Fixed',
        value: 134,
        limit: 100,
        subscriptionPlan: ['Basic Plan','Standard Plan'],
        usedLimit:'0/100',
        startDate: '18/09/2016',
        endDate: '18/09/2016',
        status: 'Active',
    },
    {
        key: 2,
        discountCode: 'Sale 12 12',
        group: 'New',
        type: 'Percentage',
        value: 120,
        limit: 14,
        subscriptionPlan: ['Pro Plan'],
        usedLimit:'10/14',
        startDate: '12/12/2016',
        endDate: '12/12/2016',
        status: 'Expire',
    },
    {
        key: 3,
        discountCode: 'Mega Discount 2020',
        group: 'Old',
        type: 'Percentage',
        value: 45,
        limit: 14,
        subscriptionPlan: ['Standard Plan','Pro Plan'],
        usedLimit:'14/14',
        startDate: '01/02/2020',
        endDate: '01/03/2020',
        status: 'Active',
    },
    {
        key: 4,
        discountCode: 'Festive Offer',
        group: 'New',
        type: 'Fixed',
        value: 250,
        limit: 14,
        subscriptionPlan: ['Enterprise Plan'],
        usedLimit:'5/14',
        startDate: '15/11/2021',
        endDate: '30/11/2021',
        status: 'Expire',
    },
    {
        key: 5,
        discountCode: 'Welcome Bonus',
        group: 'New',
        type: 'Percentage',
        value: 10,
        limit: 14,
        subscriptionPlan: ['Basic Plan'],
        usedLimit:'5/14',
        startDate: '01/01/2022',
        endDate: '31/01/2022',
        status: 'Active',
    },
    {
        key: 6,
        discountCode: 'VIP Reward 2022',
        group: 'Old',
        type: 'Fixed',
        value: 500,
        limit: 14,
        subscriptionPlan: ['Standard Plan'],
        usedLimit:'5/14',
        startDate: '10/03/2022',
        endDate: '10/06/2022',
        status: 'Expire',
    },
    {
        key: 7,
        discountCode: 'Holiday Saver',
        group: 'New',
        type: 'Percentage',
        value: 25,
        limit: 14,
        subscriptionPlan: ['Pro Plan','Basic Plan'],
        usedLimit:'5/14',
        startDate: '20/12/2022',
        endDate: '02/01/2023',
        status: 'Active',
    },
    {
        key: 8,
        discountCode: 'Flash Deal',
        group: 'Old',
        type: 'Fixed',
        value: 150,
        limit: 14,
        subscriptionPlan: ['Enterprise Plan'],
        usedLimit:'5/14',
        startDate: '05/05/2023',
        endDate: '10/05/2023',
        status: 'Expire',
    },
    {
        key: 9,
        discountCode: 'Anniversary Offer',
        group: 'New',
        type: 'Percentage',
        value: 30,
        limit: 14,
        subscriptionPlan: ['Basic Plan'],
        usedLimit:'5/14',
        startDate: '01/08/2023',
        endDate: '15/08/2023',
        status: 'Active',
    },
    {
        key: 10,
        discountCode: 'Black Friday Deal',
        group: 'Old',
        type: 'Fixed',
        value: 300,
        limit: 14,
        subscriptionPlan: ['Standard Plan'],
        usedLimit:'5/14',
        startDate: '24/11/2023',
        endDate: '26/11/2023',
        status: 'Expire',
    },
];



export { subscriptionplanData, submanageData, discountData }