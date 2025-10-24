import { Avatar, Button, Dropdown, Flex, Rate, Tag, Tooltip, Typography } from "antd";
import { NavLink } from "react-router-dom";

const { Text } = Typography
const BookingDashboardColumn = [
    {
        title: 'Business Name',
        dataIndex: 'businessName',
        render: (businessName) => {
            const words = businessName?.split(' ') || [];
            const previewText = words.slice(0, 5).join(' ');
            const showEllipsis = words.length > 5;

            return (
                <Tooltip title={businessName}>
                    <Flex gap={5} align="center">
                        <Avatar src={'/assets/images/av-1.webp'} size={30} />
                        <Text>
                            {previewText}{showEllipsis ? '...' : ''}
                        </Text>
                    </Flex>
                </Tooltip>
            );
        }
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
      title: "Total Bookings",
      dataIndex: "totalBooking",
    },
];

const customerColumn = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
    },
    {
        title: 'Email Address',
        dataIndex: 'email', 
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
    },
    {
        title: 'Joined At',
        dataIndex: 'joinedAt',
    },
];

const customerhistoryColumn = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
    },
    {
        title: 'Service Provider',
        dataIndex: 'serviceProvider',
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
    },
    {
        title: 'Booking Date',
        dataIndex: 'datetime',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
    },
    {
        title: 'Note',
        dataIndex: 'note',
        render: (note) => {
            const words = note?.split(' ') || [];
            const previewText = words.slice(0, 5).join(' ');
            const showEllipsis = words.length > 5;

            return (
                <Tooltip title={note}>
                    <Text>
                        {previewText}{showEllipsis ? '...' : ''}
                    </Text>
                </Tooltip>
            );
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Completed' ? (
                    <Text className='btnpill fs-12 success'>Completed</Text>
                ) : status === 'Cancelled' ? (
                    <Text className='btnpill fs-12 inactive'>Cancelled</Text>
                ) : (
                    <Text className='btnpill fs-12 branded'>No Show</Text>
                )
            );
        }
    },
];


const branchColumn = ({navigate, setDeleteItem, setStatusChange}) => [
    {
        title: 'Branch Name',
        dataIndex: 'branchName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
        render:(phoneNo) => `+966 ${phoneNo}`
    },
    {
        title: 'Location',
        dataIndex: 'location',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Inactive</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/branch/editbranch/'+row?.key)}}>Edit</NavLink>, key: '1' },
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Inactive</NavLink>, key: '2' },
                        row?.status === 'Inactive' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Active</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true) }}>Delete</NavLink>, key: '4' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];

const serviceColumn = ({setVisible, setEditItem, setDeleteItem, setStatusChange}) => [
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
    },
    {
        title: 'Duration (min)',
        dataIndex: 'duration',
    },
    {
        title: 'Buffer Time (min)',
        dataIndex: 'bufferTime',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => `SAR ${price}`
    },
    {
        title: 'Assigned To',
        dataIndex: 'assign',
        render: (assign) => {
            return(
                <Flex gap={5} wrap align="center">
                    {
                        assign?.map((list,i)=>
                            <Text key={i} className="sm-pill radius-20 border-gray fs-12 text-black">{list}</Text>
                        )
                    }
                </Flex>
            )
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Inactive</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true), setEditItem(row)}}>Edit</NavLink>, key: '1' },
                        row?.status === 'Active' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Inactive</NavLink>, key: '2' },
                        row?.status === 'Inactive' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Active</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true) }}>Delete</NavLink>, key: '4' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];


const subscribetableColumn = ({setVisible, setEditItem, setRenewVisible, setRenewState }) => [
    // {
    //     title: 'Invoice #',
    //     dataIndex: 'invoice',
    //     render:(invoice) => `#${invoice}`
    // },
    {
        title: 'Subscription Plan',
        dataIndex: 'subplan',
        render: (subplan) => {
            return (
                subplan === 'Basic Plan' ? (
                    <Text className='sm-pill fs-12 bg-basic-color text-white'>{subplan}</Text>
                ) : subplan === 'Standard Plan' ? (
                    <Text className='sm-pill fs-12 bg-violet text-white'>{subplan}</Text>
                ) : subplan === 'Pro Plan' ? (
                    <Text className='sm-pill fs-12 bg-red text-white'>{subplan}</Text>
                ) : (
                    <Text className='sm-pill fs-12 bg-apple-green text-white'>{subplan}</Text>
                )
            );
        }
    },
    {
        title: 'Period',
        dataIndex: 'period',
    },
    {
        title: 'Issued On',
        dataIndex: 'issuedon',
    },
    {
        title: 'Expires On',
        dataIndex: 'expireon',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => `SAR ${price}`
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Active' ? (
                    <Text className='btnpill fs-12 success'>{status}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{status}</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setRenewVisible(true), setRenewState(row)}}>Renew Package</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true), setEditItem(row)}}>Upgrade Package</NavLink>, key: '2' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); }}>Download Invoice</NavLink>, key: '3' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];

const stafftableColumn = ({navigate, setDeleteItem, setStatusChange}) => [
    {
        title: 'Image',
        dataIndex: 'img',
        render:(img) => <Avatar src={img} size={40} />,
        width: 100
    },
    {
        title: 'Staff Name',
        dataIndex: 'staffName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
    },
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Branch Assigned',
        dataIndex: 'branchAssign',
    },
    {
        title: 'Services',
        dataIndex: 'services',
        render: (services) => {
            return(
                <Flex gap={5} wrap align="center">
                    {
                        services?.map((list,i)=>
                            <Text key={i} className="sm-pill radius-20 border-gray fs-12 text-black">{list}</Text>
                        )
                    }
                </Flex>
            )
        } 
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Inactive</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staffmanagement/editstaff/'+row?.key)}}>Edit</NavLink>, key: '1' },
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Inactive</NavLink>, key: '2' },
                        row?.status === 'Inactive' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Active</NavLink>, key: '2a' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true) }}>Delete</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staffmanagement/managevacations/'+row?.key)}}>Manage Vacations</NavLink>, key: '4' },
                        // { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staffmanagement/staff/viewbookinghistory/'+row?.key)}}>View Booking History</NavLink>, key: '5' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staffmanagement/staff/viewdetail/'+row?.key)}}>View Staff</NavLink>, key: '5' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];

const managervacationtableColumn = ({setVisible, setRejectVacation}) => [
    {
        title: 'Start Date',
        dataIndex: 'startDate',
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
    },
    // {
    //     title: 'Added By',
    //     dataIndex: 'addedBy',
    // },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Approved' ? (
                    <Text className='btnpill fs-12 success'>Approved</Text>
                ) :  status === 'Pending' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>Pending</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Rejected</Text>
                )
            );
        }
    },
    // {
    //     title: 'Action',
    //     key: "action",
    //     fixed: "right",
    //     width: 100,
    //     render: (_,row) => (
    //         row?.status === 'Pending' ? 
    //         <Dropdown
    //             menu={{
    //                 items: [
    //                     row?.status === 'Pending' && { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true) }}>Approved</NavLink>, key: '1' },
    //                     row?.status === 'Pending' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setRejectVacation(true) }}>Rejected</NavLink>, key: '2' },
    //                 ],
    //             }}
    //             trigger={['click']}
    //         >
    //             <Button className="bg-transparent border-0 p-0">
    //                 <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
    //             </Button>
    //         </Dropdown>
    //         :
    //         row?.status === 'Approved' ? 
    //         <img src="/assets/icons/approved.png" width={16} alt='approved icon' fetchPriority="high" /> 
    //         : 
    //         <img src="/assets/icons/rejected.png" width={20} alt='rejected icon' fetchPriority="high" />
    //     ),
    // },
]

const viewbookinghistorystaffColumn = [
    {
        title: 'Booking ID',
        dataIndex: 'bookingId',
    },
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
        render:(phoneNo) => `+966 ${phoneNo}`
    },
    {
        title: 'Booking Date & Time',
        dataIndex: 'bookingDateTime',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Completed' ? (
                    <Text className='btnpill fs-12 success'>Completed</Text>
                ) : status === 'No-Show' ? (
                    <Text className='btnpill fs-12 branded'>No-Show</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Cancelled</Text>
                )
            );
        }
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        width: 200,
        render: (rating) => (
            <>
                {
                    rating ?
                    <Rate disabled defaultValue={rating} className="fs-16" />
                    :
                    '-'
                }
            </>
        ),
    },
    {
        title: 'Review',
        dataIndex: 'review',
        render: (review) => {
            const words = review?.split(' ') || [];
            const previewText = words.slice(0, 5).join(' ');
            const showEllipsis = words.length > 5;

            return (
                <Tooltip title={review}>
                    <Text>
                        {previewText}{showEllipsis ? '...' : ''}
                    </Text>
                </Tooltip>
            );
        }
    },
]

const activitylogColumn = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
    {
        title: 'Activity',
        dataIndex: 'activity',
    },
    {
        title: 'Date & Time',
        dataIndex: 'dateTime',
    },
]

const promotionColumn = ({setVisible, setEditItem, setStatusChange, setDeleteItem}) => [
    {
        title: 'Image',
        dataIndex: 'img',
        render:(img) => <Avatar src={img} size={50} shape="square" />,
        width: 100
    },
    {
        title: 'Promo Name',
        dataIndex: 'name',
        render:(name)=> name?.toUpperCase()
    },
    {
        title: 'Promo Type',
        dataIndex: 'promoType',
    },
    {
        title: 'Value',
        dataIndex: 'value',
    },
    {
        title: 'Used/Limit',
        dataIndex: 'limit',
    },
    {
        title: 'Assigned To',
        dataIndex: 'assigned',
        render: (assigned) => {
            return(
                <Flex gap={5} wrap align="center">
                    {
                        assigned?.map((list,i)=>
                            <Text key={i} className="sm-pill radius-20 border-gray fs-12 text-black">{list}</Text>
                        )
                    }
                </Flex>
            )
        } 
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Expires</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>Edit</NavLink>, key: '1' },
                        row?.status === 'Active' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Expire</NavLink>, key: '2' },
                        row?.status !== 'Active' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true)}}>Delete</NavLink>, key: '3' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const bookingColumn = [
    {
        title: 'Bookings ID',
        dataIndex: 'bookingId',
    },
    {
        title: 'Business Name',
        dataIndex: 'businessName',
    },
    {
        title: 'Branch Name',
        dataIndex: 'branchName',
    },
    {
        title: 'Customer Name',
        dataIndex: 'customer',
        render: (customer) => {
            return (
                <Flex align="center" gap={5}>
                    {customer?.name }
                    <img src="/assets/icons/cr.png" alt="circle" width={4} height={4} />
                    { `+996`+customer?.phone}
                </Flex>
            )
        }
    },
    {
        title: 'Services',
        dataIndex: 'services',
        render: (services) => {
            return(
               <Tag className="sm-pill radius-20 fs-12">{services}</Tag>
            )
        } 
    },
    {
        title: 'Service Provider',
        dataIndex: 'serviceProvider',
    },
    {
        title: 'Date & Time',
        dataIndex: 'dateTime'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'completed' ? (
                    <Text className='btnpill fs-12 success'>Completed</Text>
                ) : status === 'cancelled' ? (
                    <Text className='btnpill fs-12 inactive'>Cancelled</Text>
                ) : status === 'pending' ? (
                    <Text className='btnpill fs-12 pending-brown'>Pending</Text>
                ) : status === 'in-progress' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>In-Progress</Text>
                ) : (
                    <Text className='btnpill fs-12 branded'>No Show</Text>
                )
            );
        }
    },
]

const whatsappadsColumn = ({ navigate, setDeleteItem}) => [
    {
        title: 'Image',
        dataIndex: 'img',
        render:(img) => <Avatar src={img} size={50} shape="square" />,
        width: 100
    },
    {
        title: 'Ad Text',
        dataIndex: 'adtext',
        render: (adtext) => {
            const words = adtext?.split(' ') || [];
            const previewText = words.slice(0, 5).join(' ');
            const showEllipsis = words.length > 5;

            return (
                <Tooltip title={adtext}>
                    <Text>
                        {previewText}{showEllipsis ? '...' : ''}
                    </Text>
                </Tooltip>
            );
        }
    },
    {
        title: 'Customer Type',
        dataIndex: 'customerType',
    },
    {
        title: 'Assigned To',
        dataIndex: 'assigned',
        render: (assigned) => {
            return(
                <Flex gap={5} wrap align="center">
                    {
                        assigned?.map((list,i)=>
                            <Text key={i} className="sm-pill radius-20 border-gray fs-12 text-black">{list}</Text>
                        )
                    }
                </Flex>
            )
        } 
    },
    {
        title: 'Target Date',
        dataIndex: 'targetDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'Pending' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>{status}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{status}</Text>
                )
            );
        }
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        row?.status === 'Pending' && { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/whatsappads/editwhatsappads/'+row?.key)}}>Edit</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault();navigate('/whatsappads/detailview/'+row?.key)  }}>View</NavLink>, key: '2' },
                        row?.status === 'Pending' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true)}}>Delete</NavLink>, key: '3' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.png" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const customersearchColumn = [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        render:(phoneNumber) => `+966 ${phoneNumber}`
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
        render: (branch) => {
            return(
               <Tag className="sm-pill radius-20 fs-12">{branch}</Tag>
            )
        } 
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: (type) => {
            return (
                type === 'New' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>{type}</Text>
                ) : (
                    <Text className='btnpill fs-12 branded'>{type}</Text>
                )
            );
        }
    },
]

const revenueColumns = [
    {
        title: 'Business ID',
        dataIndex: 'businessId',
    },
    {
        title: 'Business Logo',
        dataIndex: 'businessLogo',
        render: (businessLogo) => {
            return (
                <Avatar src={businessLogo} size={40} />
            )
        }
    },
    {
        title: 'Business Name',
        dataIndex: 'businessName',
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Subscription Plan',
        dataIndex: 'subscriptionPlan',
        render: (subscriptionPlan) => {
            return (
                subscriptionPlan === 'bp' ? (
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>BP</Text>
                ) : subscriptionPlan === 'PP' ? (
                    <Text className='sm-pill text-white fs-12 bg-red'>PP</Text>
                ) : subscriptionPlan === 'sp' ? (
                    <Text className='sm-pill text-white fs-12 bg-violet'>SP</Text>
                ) : (
                    <Text className='sm-pill text-white fs-12 bg-apple-green'>EP</Text>
                )
            );
        }
    },
    {
        title: 'Period',
        dataIndex: 'period',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        render: (discount) => discount === null ? '--' : discount
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => {
            return (
                <Flex align="flex-end" gap={5}>
                    {price?.current} <sup><Text className="fs-12" delete>{price?.original}</Text></sup>
                </Flex>
            )
        }
    },
    {
        title: 'Purchasing Date',
        dataIndex: 'purchasingDate'
    },
]


export { 
    BookingDashboardColumn,
    customerColumn, 
    customerhistoryColumn, 
    branchColumn, 
    serviceColumn, 
    subscribetableColumn,
    stafftableColumn,
    managervacationtableColumn,
    viewbookinghistorystaffColumn,
    activitylogColumn,
    promotionColumn,
    bookingColumn,
    whatsappadsColumn,
    customersearchColumn,
    revenueColumns
}