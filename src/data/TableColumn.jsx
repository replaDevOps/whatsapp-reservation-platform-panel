import { DownOutlined, HolderOutlined } from "@ant-design/icons";
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
        title: 'Email Address',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
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
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staff/staffmanagement/editstaff/'+row?.key)}}>Edit</NavLink>, key: '1' },
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Inactive</NavLink>, key: '2' },
                        row?.status === 'Inactive' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Active</NavLink>, key: '2a' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true) }}>Delete</NavLink>, key: '3' },
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

const demoreqColumns = ({setVisible,handleStatusChange}) => [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
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
        title: 'Business Type',
        dataIndex: 'type',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        render: (message) => {
            const words = message?.split(' ') || [];
            const previewText = words.slice(0, 5).join(' ');
            const showEllipsis = words.length > 5;

            return (
                message === null ? '--' :
                <Tooltip title={message}>
                    <Text>
                        {previewText}{showEllipsis ? '...' : ''}
                    </Text>
                </Tooltip>
            );
        }
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Note',
        dataIndex: 'note',
        render: (note) => {
            const words = note.split(' ') || [];
            const previewText = words.slice(0,5).join(' ');
            const showEllipsis = words.length > 5;
            return (
                note === null ? '--' :
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
    render: (status, row) => {
        const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

        return (
            status === 'pending' ? (
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <NavLink
                                        className="fs-12"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleStatusChange('Contacted', row);
                                            setVisible(true)
                                        }}
                                    >
                                        Contacted
                                    </NavLink>
                                ),
                                key: 'contacted',
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <Flex gap={5} justify="space-between" className="btnpill fs-12 dsasellerpending cursor">
                        {formattedStatus}
                        <DownOutlined />
                    </Flex>
                </Dropdown>
            ) : (
                <Text className="btnpill fs-12 success">{formattedStatus}</Text>
            )
        );
    },
}

]


const submanageColumns = ({ setVisible, setEditItem, setUpgradePlan, setIsRenew  }) => [
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
        width: 200
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
        title: 'Start Date',
        dataIndex: 'startDate',
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
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
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>Edit Package</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setIsRenew(true); setEditItem(row)}}>Renew Package</NavLink>, key: '2' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setUpgradePlan(true); setEditItem(row) }}>Upgrade Package</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault();  }}>Download Invoice</NavLink>, key: '4' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); }}>Send Reminder</NavLink>, key: '5' },
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

const discountColumns = ({ setVisible, setEditItem, setExpireItem }) => [
    {
        title: 'Discount Code',
        dataIndex: 'discountCode',
    },
    {
        title: 'Group',
        dataIndex: 'group',
        render: (group) => {
            return (
                <Tag className="sm-pill radius-20 fs-12">{group}</Tag>
            )
        }
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Value',
        dataIndex: 'value',
    },
    {
        title: 'Subscription Plan',
        dataIndex: 'subscriptionPlan',
        render: (subscriptionPlan) => {
            return (
                <Flex gap={5} wrap>
                    {
                        subscriptionPlan?.map((items,index)=>
                            <Tag key={index} className="sm-pill radius-20 fs-12">{items}</Tag>
                        )
                    }
                </Flex>
            );
        }
    },
    {
        title: 'Used / Limit',
        dataIndex: 'usedLimit',
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
                    <Text className='btnpill fs-12 inactive'>Expire</Text>
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
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>Edit</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setExpireItem(true)}}>Expire</NavLink>, key: '2' },
                    ]
                }}
                trigger={['click']}
            >
                <Button disabled={row?.status === 'Expire' && true} className="bg-transparent border-0 p-0">
                    <img src={row?.status === 'Expire'? "/assets/icons/disable-dot.webp":"/assets/icons/dots.png"} alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const faqColumns = ({ setVisible, setEditItem, setDeleteItem }) => [
    {
        title: 'Question',
        dataIndex: 'question',
        width: 300,
        render: (question) => {
            return (
                <Flex gap={15} align="flex-start">
                    <HolderOutlined className="mt-2" /> {question}
                </Flex>
            )
        }
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        render: (answer) => {
            const words = answer?.split(' ') || [];
            const previewText = words.slice(0, 20).join(' ');
            const showEllipsis = words.length > 20;

            return (
                <Tooltip title={answer}>
                    <Text>
                        {previewText}{showEllipsis ? '...' : ''}
                    </Text>
                </Tooltip>
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
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>Edit</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(true)}}>Delete</NavLink>, key: '2' },
                    ]
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src={"/assets/icons/dots.png"} alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
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


const discountactivityColumn = [
    {
        title: 'Discount Code',
        dataIndex: 'discountCode',
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
    },
    {
        title: 'Business Name',
        dataIndex: 'businessName',
    },
    {
        title: 'Group',
        dataIndex: 'group',
    },
    {
        title: 'Date & Time',
        dataIndex: 'dateTime',
    },
]


const allbusinessColumns = ({ setDeleteItem,setStatusChange,navigate }) => [
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
        width: 200
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
    },
    {
        title: 'Subscription Plan',
        dataIndex: 'subscriptionPlan',
        render: (subscriptionPlan) => {
            return (
                subscriptionPlan === 'basicplan' ? (
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>Basic Plan</Text>
                ) : subscriptionPlan === 'proplan' ? (
                    <Text className='sm-pill text-white fs-12 bg-red'>Pro Plan</Text>
                ) : subscriptionPlan === 'standardplan' ? (
                    <Text className='sm-pill text-white fs-12 bg-violet'>Standard Plan</Text>
                ) : (
                    <Text className='sm-pill text-white fs-12 bg-apple-green'>Enterprise Plan</Text>
                )
            );
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Deactive</Text>
                )
            );
        }
    },
    {
        title: 'Date',
        dataIndex: 'date',
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
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/allbusiness/viewbusiness/'+row?.key) }}>View</NavLink>, key: '1' },
                        row?.status === 'active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Inactive</NavLink>, key: '2' },
                        row?.status === 'deactive' &&{ label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>Active</NavLink>, key: '3' },
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
]

const singleviewColumns = ({ setViewItem }) => [
    {
        title: 'Branch Name',
        dataIndex: 'branchName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
    },
    {
        title: 'Location',
        dataIndex: 'location',
    },
    {
        title: 'Total Bookings',
        dataIndex: 'totalBooking',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'active' ? (
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
                        { label: <NavLink onClick={(e) => {e.preventDefault();setViewItem(true)}}>View</NavLink>, key: '1' }
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

const businessserviceColumns = [
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
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'active' ? (
                    <Text className='btnpill fs-12 success'>Active</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>Inactive</Text>
                )
            );
        }
    },
]

const businessstaffColumns = [
    {
        title: 'Image',
        dataIndex: 'image',
        render:(image) => <Avatar src={image} size={40} />,
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
        title: 'Services',
        dataIndex: 'services',
        render: (services) => {
            return (
                <Flex gap={5} wrap>
                    {
                        services?.map((items,index)=>
                            <Tag key={index} className="sm-pill radius-20 fs-12">{items}</Tag>
                        )
                    }
                </Flex>
            );
        }
    },
]

export { 
    BookingDashboardColumn,
    customerColumn, 
    bookingColumn,
    revenueColumns,
    demoreqColumns,
    stafftableColumn,
    submanageColumns,
    discountColumns,
    faqColumns,
    activitylogColumn,
    discountactivityColumn,
    allbusinessColumns,
    singleviewColumns,
    businessserviceColumns,
    businessstaffColumns
}