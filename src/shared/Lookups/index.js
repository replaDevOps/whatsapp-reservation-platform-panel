const planoption = [
    {
        id: 1,
        name: 'Basic Plan'
    },
    {
        id: 2,
        name: 'Standard Plan'
    },
    {
        id: 3,
        name: 'Pro Plan'
    },
    {
        id: 4,
        name: 'Enterprise Plan'
    },
]

const periodoption = [
    {
        id: 1,
        name: 'Monthly'
    },
    {
        id: 2,
        name: 'Yearly'
    },
]

const rolestaffopt = [
    {
        id: 1,
        name: 'Supper Admin'
    },
    {
        id: 2,
        name: 'Techincal Admin'
    },
    {
        id: 3,
        name: 'Demo Admin'
    },
]

const languageopt = [
    {
        id: 1,
        name: 'English'
    },
    {
        id: 2,
        name: 'Arabic'
    },
]

const promoType = [
    {
        id: 1,
        name: 'Fixed'
    },
    {
        id: 2,
        name: 'Percentage'
    },
]

const customertypeOp = [
    {
        id: 1,
        name: 'Old'
    },
    {
        id: 2,
        name: 'New'
    },
]


const typeitemsCust = [
    { key: 'new', label: 'New' },
    { key: 'old', label: 'Old' },
];

const statusitemsCust = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
];
const freqitemsCust = [
    { key: 'mostbook', label: 'Most Bookings' },
    { key: 'leastbook', label: 'Least Bookings' },
];

const branchCust = [
    { key: 'branch01', label: 'Branch 01'},
    { key: 'branch02', label: 'Branch 02'}
]

const requestuserOpt = [
    {
        id: 1,
        name: 'Name'
    },
    {
        id: 2,
        name: 'Phone number'
    },
    {
        id: 3,
        name: 'Date'
    },
    {
        id: 4,
        name: 'Time'
    },
    {
        id: 5,
        name: 'Note'
    },
]

const whatsappflowOp = [
    {
        id: 1,
        name: 'Google Link'
    },
    {
        id: 2,
        name: 'Error Message'
    },
    {
        id: 3,
        name: 'Save to Calendar'
    },
    {
        id: 4,
        name: 'Reminder'
    },
    {
        id: 5,
        name: 'Rescheduling'
    },
    {
        id: 6,
        name: 'Talk to Receptionist'
    },
    {
        id: 7,
        name: 'New Customer Instructions'
    },
]

const statusItem = [
    { key: 'completed', label: 'Completed' },
    { key: 'noshow', label: 'No-Show' },
    { key: 'pending', label: 'Pending' },
    { key: 'inprogress', label: 'In-Progress' },
    { key: 'cancelled', label: 'Cancelled' },
]

const typeItems = [
    { key: 'general', label: 'General' },
    { key: 'barber', label: 'Barber' },
    { key: 'clinic', label: 'Clinic' },
    { key: 'spa', label: 'Spa' },
];

const typeOp = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Barber' },
    { id: 3, name: 'Clinic' },
    { id: 4, name: 'Spa' },
];

const subscriptionItems = [
    { key: 'bp', label: 'BP' },
    { key: 'sp', label: 'SP' },
    { key: 'pp', label: 'PP' },
    { key: 'ep', label: 'EP' },
];

const subscriptionplanOp = [
    {
        id: 1,
        name: 'Basic'
    },
    {
        id: 2,
        name: 'Standard'
    },
    {
        id: 3,
        name: 'Pro'
    },
    {
        id: 4,
        name: 'Enterprise'
    },
]

const periodOp = [
    {
        id: 1,
        name: 'Monthly'
    },
    {
        id: 2,
        name: 'Yearly'
    },
]

const typeamountItem = [
    {
        key: 'fixed',
        label: 'Fixed'
    },
    {
        key: 'percentage',
        label: 'Percentage'
    },
]


export { 
    planoption, 
    periodoption, 
    rolestaffopt,
    languageopt, 
    promoType, 
    customertypeOp, 
    typeitemsCust, 
    statusitemsCust, 
    freqitemsCust,
    branchCust,  
    requestuserOpt,
    whatsappflowOp,

    statusItem,
    typeItems,
    typeOp,
    subscriptionItems,
    subscriptionplanOp,
    periodOp,
    typeamountItem
}