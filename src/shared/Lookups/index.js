const rolestaffopt = [
    {
        id: 'SUPER_ADMIN',
        name: 'Supper Admin'
    },
    {
        id: 'TECHNICAL_ADMIN',
        name: 'Techincal Admin'
    },
    {
        id: 'DEMO_ADMIN',
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
        id: 'FIXED',
        name: 'Fixed'
    },
    {
        id: 'PERCENTAGE',
        name: 'Percentage'
    },
]

const customertypeOp = [
    {
        id: 'OLD',
        name: 'Old'
    },
    {
        id: 'NEW',
        name: 'New'
    },
]


const typeitemsCust = [
    { key: '', label: 'All' },
    { key: 'NEW', label: 'New' },
    { key: 'OLD', label: 'Old' },
];

const statusitemsCust = [
    { key: true, label: 'Active' },
    { key: false, label: 'Inactive' },
];

const statusItem = [
    { key: 'completed', label: 'Completed' },
    { key: 'noshow', label: 'No-Show' },
    { key: 'pending', label: 'Pending' },
    { key: 'inprogress', label: 'In-Progress' },
    { key: 'cancelled', label: 'Cancelled' },
]

const typeItems = [
    { key: '', label: 'All Type' },
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
    { key: '', label: 'All' },
    { key: 'BASIC', label: 'BP' },
    { key: 'STANDARD', label: 'SP' },
    { key: 'PRO', label: 'PP' },
    { key: 'ENTERPRISE', label: 'EP' },
];

const subscriptionplanOp = [
    {
        id: 'BASIC',
        name: 'Basic'
    },
    {
        id: 'STANDARD',
        name: 'Standard'
    },
    {
        id: 'PRO',
        name: 'Pro'
    },
    {
        id: 'ENTERPRISE',
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
    { key: '', label: 'All' },
    {
        key: 'FIXED',
        label: 'Fixed'
    },
    {
        key: 'PERCENTAGE',
        label: 'Percentage'
    },
]

const roleItems = [
    { key: '', label: 'All' },
    { key: 'SUPER_ADMIN', label: "Super Admin" },
    { key: 'TECHNICAL_ADMIN', label: "Technical Admin" },
    { key: 'DEMO_ADMIN', label: "Demo Admin" },
];

const statusItems = [
    { key: '', label: 'All' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'CONTACTED', label: 'Contacted' },
];

const servicetypeItems = [
    { key: '', label: 'All Type' },
    { key: 'GENERAL', label: 'General' },
    { key: 'BARBER', label: 'Barber' },
    { key: 'CLINIC', label: 'Clinic' },
    { key: 'SPA', label: 'Spa' },
];

export { 
    rolestaffopt,
    languageopt, 
    promoType, 
    customertypeOp, 
    typeitemsCust, 
    statusitemsCust, 
    statusItem,
    typeItems,
    typeOp,
    subscriptionItems,
    subscriptionplanOp,
    periodOp,
    typeamountItem,
    roleItems,
    statusItems,
    servicetypeItems,
}