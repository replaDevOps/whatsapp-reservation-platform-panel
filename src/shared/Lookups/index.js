const rolestaffopt = [
    {
        id: 'SUPER_ADMIN',
        name: 'Super Admin'
    },
    {
        id: 'TECHNICAL_ADMIN',
        name: 'Technical Admin'
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
    { key: 'NEW', label: 'New' },
    { key: 'OLD', label: 'Old' },
];

const statusitemsCust = [
    // { key: '', label: 'All Status' },
    { key: true, label: 'Active' },
    { key: false, label: 'Inactive' },
];

const statusItem = [
    // { key: '', label: 'All Status' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'NO_SHOW', label: 'No-Show' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'SCHEDULED', label: 'In-Progress' },
    { key: 'CANCELLED', label: 'Cancelled' },
]

const typeItems = [
    // { key: '', label: 'All Types' },
    { key: 'GENERAL', label: 'General' },
    { key: 'BARBER', label: 'Barber' },
    { key: 'CLINIC', label: 'Clinic' },
    { key: 'SPA', label: 'Spa' },
];

const typeOp = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Barber' },
    { id: 3, name: 'Clinic' },
    { id: 4, name: 'Spa' },
];

const subscriptionItems = [
    { key: 'BASIC', label: 'Basic Plan' },
    { key: 'STANDARD', label: 'Standard Plan' },
    { key: 'PRO', label: 'PRO Plan' },
    { key: 'ENTERPRISE', label: 'Enterprise Plan' },
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

const validityOp = [
    {
        id: 'MONTHLY',
        name: 'Monthly'
    },
    {
        id: 'YEARLY',
        name: 'Yearly'
    },
]

const typeamountItem = [
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
    { key: 'SUPER_ADMIN', label: "Super Admin" },
    { key: 'TECHNICAL_ADMIN', label: "Technical Admin" },
    { key: 'DEMO_ADMIN', label: "Demo Admin" },
];

const statusItems = [
    // { key: '', label: 'All Status' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'CONTACTED', label: 'Contacted' },
];

const servicetypeItems = [
    // { key: '', label: 'All Types' },
    { key: 'GENERAL', label: 'General' },
    { key: 'BARBER', label: 'Barber' },
    { key: 'CLINIC', label: 'Clinic' },
    { key: 'SPA', label: 'Spa' },
];

const actionItems = [
    { key: 'CREATE', label: 'Add' },
    { key: 'EDIT', label: 'Edit' },
    { key: 'DELETE', label: 'Delete' },
    { key: 'CHANGE_STATUS', label: 'Inactive' },
    { key: 'EXPORT', label: 'Export' },
    { key: 'LOGIN', label: 'Login' },
    { key: 'LOGOUT', label: 'Logout' },
    { key: 'REQUEST', label: 'Request' },
    { key: 'CONTACTED', label: 'Contacted' },
    { key: 'RENEW', label: 'Renew' },
    { key: 'UPDATE', label: 'Update' },
    { key: 'MAINTENANCE_MODE', label: 'Maintenance Mode' },
];

const statusbusinessItem = [
    // { key: "", label: 'All Status' },
    { key: "ACTIVE", label: 'Active' },
    { key: "INACTIVE", label: 'Deactive' },
];

const periodItems = [
    // { key: '', label: 'All Periods' },
    { key: 'MONTHLY', label: 'Monthly' },
    { key: 'YEARLY', label: 'Yearly' }, 
]

 const groupItem = [
    { key: 'NEW', label: 'New' },
    { key: 'OLD', label: 'Old' },
];

const typeOps = [
    {id: 'SPA',  name: 'Spa'},
    {id: 'CLINIC',  name: 'Clinic'},
    {id: 'BARBER',  name: 'Barber'},
    {id: 'GENERAL',  name: 'General'},
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
    actionItems,
    statusbusinessItem,
    periodItems,
    groupItem,
    typeOps,
    validityOp,
}