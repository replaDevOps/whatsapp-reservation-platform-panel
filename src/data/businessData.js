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
        businessLogo: '/assets/images/av-1.webp',
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
        businessLogo: '/assets/images/prom-1.png',
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
        businessLogo: '/assets/images/prom-1.png',
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


const singleviewData = [
    {
        key: 1,
        branchName: 'Mirava Spine Clinic',
        phoneNo: '+966 110 113 087',
        location: 'Great Falls, Maryland',
        totalBooking: '5',
        status: 'active'
    },
    {
        key: 2,
        branchName: 'Zerwyn Movement Lab',
        phoneNo: '+966 324 464 232',
        location: 'Stockton, New Hampshire',
        totalBooking: '10',
        status: 'Inactive'
    },
    {
        key: 3,
        branchName: 'Northrel Therapy Dept',
        phoneNo: '+966 324 464 232',
        location: 'Pasadena, Oklahoma',
        totalBooking: '74',
        status: 'Active'
    },
    {
        key: 4,
        branchName: 'Solvane Rehab Dept',
        phoneNo: '+966 629 267 736',
        location: 'Syracuse, Connecticut',
        totalBooking: '24',
        status: 'Inactive'
    },
];

const businessserviceData = [
    {
        key: 1,
        serviceName: 'Perming',
        duration: 20,
        bufferTime: 20,
        price: 200,
        status: 'active'
    },
    {
        key: 2,
        serviceName: 'Advanced Moisturising',
        duration: 30,
        bufferTime: 30,
        price: 120,
        status: 'inactive'
    },
    {
        key: 3,
        serviceName: 'Clean Ups',
        duration: 25,
        bufferTime: 25,
        price: 230,
        status: 'active'
    },
    {
        key: 4,
        serviceName: 'Smoothening',
        duration: 20,
        bufferTime: 20,
        price: 150,
        status: 'inactive'
    },
];

const businessstaffData = [
    {
        key: 1,
        image: '/assets/images/1.png',
        staffName: 'Fayez Ali',
        phoneNo: '+966 324 464 232',
        role: 'Service Provider',
        services: ['Service Name','Service Name']
    },
    {
        key: 2,
        image: '/assets/images/av-1.webp',
        staffName: 'Mohammed Darwish',
        phoneNo: '+966 324 464 232',
        role: 'Service Provider',
        services: null
    },
    {
        key: 3,
        image: '/assets/images/prom-1.png',
        staffName: 'Jihad Bakir',
        phoneNo: '+966 324 464 232',
        role: 'Staff Manager',
        services: ['Service Name','Service Name']
    },
    {
        key: 4,
        image: '/assets/images/1.png',
        staffName: 'Fahd Bakir',
        phoneNo: '+966 324 464 232',
        role: 'Admin',
        services: ['Service Name','Service Name']
    },
];

export { allbusinessData,subplanData,singleviewData,businessserviceData,businessstaffData }