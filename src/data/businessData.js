const allbusinessData = [
    {
        key: 1,
        businessId: 'BIZ-1001',
        businessLogo: '/assets/images/1.png',
        businessName: 'Serenity Spa & Wellness',
        type: 'Spa',
        customerName: 'Fayez Ali',
        email: 's@gmail.com',
        subscriptionPlan: 'basicplan',
        date: '18/09/2016',
        status: 'active'
    },
    {
        key: 2,
        businessId: 'BIZ-1002',
        businessLogo: '/assets/images/1.png',
        businessName: 'Zenith Fitness Studio',
        type: 'Gym',
        customerName: 'Fayez Ali',
        email: 'ab@gmail.com',
        subscriptionPlan: 'proplan',
        date: '18/09/2016',
        status: 'deactive'
    },
    {
        key: 3,
        businessId: 'BIZ-1003',
        businessLogo: '/assets/images/1.png',
        businessName: 'Glow Beauty Lounge',
        type: 'Salon',
        customerName: 'Fayez Ali',
        email: 'a@gmail.com',
        subscriptionPlan: 'standardplan',
        date: '18/09/2016',
        status: 'Expires'
    },
    {
        key: 4,
        businessId: 'BIZ-1004',
        businessLogo: '/assets/images/1.png',
        businessName: 'Revive Health Hub',
        type: 'Clinic',
        customerName: 'Fayez Ali',
        email: 'b@gmail.com',
        subscriptionPlan: 'enterpriseplan',
        date: '18/09/2016',
        status: 'Active'
    },
    {
        key: 5,
        businessId: 'BIZ-1005',
        businessLogo: '/assets/images/1.png',
        businessName: 'Urban Yoga Studio',
        type: 'Wellness',
        customerName: 'Fayez Ali',
        email: 'susan@gmail.com',
        subscriptionPlan: 'basicplan',
        date: '18/09/2016',
        status: 'active'
    },
];

const subplanData = [
    {
        id: '1',
        details:[
            {
                id: 1,
                title:'Basic',
                subtitle:'Simple start for small setups',
                amount: '200',
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
                ]                
            },
            {
                id: 2,
                title:'Standard',
                subtitle:'For growing & scaling clinics',
                amount: '300',
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
                ] 
            },
            {
                id: 3,
                title:'Pro',
                subtitle:'Advanced tools for large teams',
                amount: '500',
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
                ] 
            },
            {
                id: 4,
                title:'Enterprise',
                subtitle:'Custom workflow for full control',
                amount: 'Custom Price',
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
        ]
    },
    {
        id: '2',
        details:[
            {
                id: 1,
                title:'Basic',
                subtitle:'Simple start for small setups',
                amount: '1200',
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
                title:'Standard',
                subtitle:'For growing & scaling clinics',
                amount: '1500',
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
                id: 3,
                title:'Pro',
                subtitle:'Advanced tools for large teams',
                amount: '2000',
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
                id: 4,
                title:'Enterprise',
                subtitle:'Custom workflow for full control',
                amount: 'Custom Price',
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
        ]
    }
]

export { allbusinessData,subplanData }