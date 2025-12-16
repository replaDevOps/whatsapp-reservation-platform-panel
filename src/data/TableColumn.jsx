import { DownOutlined, HolderOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Tag, Tooltip, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { capitalizeTranslated, toArabicDigits, utcDateTimeToLocal } from "../shared";
import dayjs from "dayjs";

const { Text } = Typography
const BookingDashboardColumn = ({t,i18n})=> [
    {
        title: t("Business Name"),
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
        title: t("Type"),
        dataIndex: 'type',
        render: (type) => capitalizeTranslated(t(type))
    },
    {
        title: t("Total Bookings"),
        dataIndex: "totalBookings",
        render: (totalBookings) =>
            i18n.language === "ar" ? toArabicDigits(totalBookings) : totalBookings
    },
];

const customerColumn = ({t,i18n})=> [
    {
        title: t("First Name"),
        dataIndex: 'firstName',
    },
    {
        title: t("Last Name"),
        dataIndex: 'lastName',
    },
    {
        title: t("Email Address"),
        dataIndex: 'email', 
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phone',
        render: (phoneNo) => {
        if (!phoneNo) return '';
        
        const prefix = '+966 ';
        return i18n.language === "ar" 
            ? `${prefix}${toArabicDigits(phoneNo)}`
            : `${prefix}${phoneNo}`;
        }
    },
    {
        title: t("Joined At"),
        dataIndex: 'createdAt',
        render: (createdAt) => i18n.language === "ar" ? toArabicDigits(createdAt) : utcDateTimeToLocal(createdAt)
    },
];

const stafftableColumn = ({navigate, setDeleteItem, setStatusChange,t,i18n}) => [
    {
        title: t("Image"),
        dataIndex: 'imageUrl',
        render:(imageUrl) => <Avatar src={imageUrl} size={40} />,
        width: 100
    },
    {
        title: t("Staff Name"),
        dataIndex: 'staffName',
        render:(_,row) => row?.firstName + ' ' + row?.lastName
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phone',
        render: (phone) => {
        if (!phone) return '';
        const prefix = '+';
        return i18n.language === "ar" 
            ? `${prefix}${toArabicDigits(phone)}`
            : `${prefix}${phone}`;
        }
    },
    {
        title: t("Email Address"),
        dataIndex: 'email',
    },
    {
        title: t("Role"),
        dataIndex: 'role',
        render:(role) => {
            return (
                role === 'SUPER_ADMIN' ? (
                    <Text>{t("Super Admin")}</Text>
                ) : role === 'TECHNICAL_ADMIN' ? (
                    <Text>{t("Technical Admin")}</Text>
                ) : role === 'DEMO_ADMIN' ? (
                    <Text>{t("Demo Admin")}</Text>
                ) : {role}
            );
        }
    },
    {
        title: t("Status"),
        dataIndex: 'isActive',
        render: (isActive) => {
            return (
                isActive === true ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Inactive")}</Text>
                )
            );
        }
    },
    {
        title: t("Action"),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/staff/staffmanagement/editstaff/'+row?.id)}}>{t("Edit")}</NavLink>, key: '1' },
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>{t("Inactive")}</NavLink>, key: '2' },
                        row?.status === 'Inactive' && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange(true) }}>{t("Active")}</NavLink>, key: '2a' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(row?.id) }}>{t("Delete")}</NavLink>, key: '3' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];



const bookingColumn = ({t,i18n})=> [
    {
        title: t("Bookings ID"),
        dataIndex: 'bookingId',
    },
    {
        title: t("Business Name"),
        dataIndex: 'businessName',
    },
    {
        title: t("Branch Name"),
        dataIndex: 'branchName',
    },
    {
        title: t("Customer Name"),
        dataIndex: 'customer',
        render: (customer) => {
            const phone = customer?.phone || "";

            return (
                <Flex align="center" gap={5}>
                {customer?.name}
                <img src="/assets/icons/cr.webp" alt="circle" width={4} height={4} />
                {i18n.language === "ar"
                    ?toArabicDigits(`+966 ${phone}`)
                    :`+966 ${phone}`}
                </Flex>
            );
        }
    },
    {
        title: t("Services"),
        dataIndex: 'services',
        render: (services) => {
            return(
               <Tag className="sm-pill radius-20 fs-12">{services}</Tag>
            )
        } 
    },
    {
        title: t("Service Provider"),
        dataIndex: 'serviceProvider',
    },
    {
        title: t("Date & Time"),
        dataIndex: 'dateTime',
        render: (dateTime) => {
            if (!dateTime) return '';

            if (i18n?.language === 'ar') {
            let arabicDate = toArabicDigits(dateTime)
                .replace('AM', 'ص')
                .replace('PM', 'م')
                .replace('am', 'ص')
                .replace('pm', 'م');
                return arabicDate;
            }
            return dateTime;
        }
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'completed' ? (
                    <Text className='btnpill fs-12 success'>{t("Completed")}</Text>
                ) : status === 'cancelled' ? (
                    <Text className='btnpill fs-12 inactive'>{t("Cancelled")}</Text>
                ) : status === 'pending' ? (
                    <Text className='btnpill fs-12 pending-brown'>{t("Pending")}</Text>
                ) : status === 'in-progress' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>{t("In-Progress")}</Text>
                ) : (
                    <Text className='btnpill fs-12 branded'>{t("No Show")}</Text>
                )
            );
        }
    },
]

const revenueColumns = ({t,i18n})=> [
    {
        title: t("Business ID"),
        dataIndex: 'businessId',
        render: (businessId) => `${businessId ? `#${ businessId?.slice(0, 5)}` : '-'}`
    },
    {
        title: t("Business Logo"),
        dataIndex: 'business',
        render: (business) => {
            return (
                <Avatar src={business?.image} size={40} />
            )
        }
    },
    {
        title: t("Business Name"),
        dataIndex: 'business',
        render: (business) => business?.name ? business?.name : '-'
    },
    {
        title: t("Type"),
        dataIndex: 'business',
        render: (business) => 
            business?.businessType ?
            business?.businessType?.charAt(0)?.toUpperCase() + business?.businessType?.slice(1)?.toLowerCase()
            :
            '-'
    },
    {
        title: t("Subscription Plan"),
        dataIndex: 'subscription',
        render: (subscription) => {
            return (
                subscription?.type === 'BASIC' ? (
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>{t("BP")}</Text>
                ) : subscription?.type === 'PRO' ? (
                    <Text className='sm-pill text-white fs-12 bg-red'>{t("PP")}</Text>
                ) : subscription?.type === 'STANDARD' ? (
                    <Text className='sm-pill text-white fs-12 bg-violet'>{t("SP")}</Text>
                ) : subscription?.type === 'ENTERPRISE' ? (
                    <Text className='sm-pill text-white fs-12 bg-apple-green'>{t("EP")}</Text>
                ) : null
            );
        }
    },
    {
        title: t("Period"),
        dataIndex: 'validity',
        render:(validity)=> t(validity)?.charAt(0)?.toUpperCase() + t(validity)?.slice(1)?.toLowerCase()
    },
    {
        title: t("Discount"),
        dataIndex: 'discount',
        render: (discount) => discount === null ? '--' : discount
    },
    {
        title: t("Price"),
        dataIndex: 'price',
        render: (price) => {
            const isArabic = i18n.language === "ar"
            return (
                <Flex align="flex-end" gap={5}>
                    {t("SAR")} {isArabic ? toArabicDigits(price): price} 
                    {/* <sup><Text className="fs-12" delete>{isArabic ? toArabicDigits(price?.original): price?.original}</Text></sup> */}
                </Flex>
            )
        }
    },
    {
        title: t("Purchasing Date"),
        dataIndex: 'createdAt',
        render: (createdAt) => i18n.language === "ar" ? toArabicDigits(createdAt) : dayjs.utc(createdAt).local().format("YYYY-MM-DD hh:mm A")
    },
]

const demoreqColumns = ({setVisible,handleStatusChange,t,i18n}) => [
        {
            title: t("Customer Name"),
            dataIndex: 'name',
        },
        {
            title: t("Email Address"),
            dataIndex: 'email',
        },
        {
            title: t("Phone Number"),
            dataIndex: 'phone',
            render: (phone) => {
            if (!phone) return '';
            
            const prefix = '+';
            return i18n.language === "ar" 
                ? `${prefix}${toArabicDigits(phone)}`
                : `${prefix}${phone}`;
            }
        },
        {
            title: t("Business Type"),
            dataIndex: 'businessType',
        },
        {
            title: t("Message"),
            dataIndex: 'message',
            render: (message) => {
                if (!message) {
                    return '--';
                }

                const words = message.split(' ');
                const previewText = words.slice(0, 5).join(' ');
                const showEllipsis = words.length > 5;

                return (
                    <Tooltip title={message}>
                        <Text>
                            {previewText}{showEllipsis ? '...' : ''}
                        </Text>
                    </Tooltip>
                );
            }
        },
        {
            title: t("Date"),
            dataIndex: 'createdAt',
            render: (createdAt) => i18n.language === "ar" ? toArabicDigits(createdAt) : utcDateTimeToLocal(createdAt)
        },
        {
            title: t("Note"),
            dataIndex: 'note',
            render: (note) => {
                if (!note) {
                    return '--';
                }

                const words = note.split(' ');
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
        title: t("Status"),
        dataIndex: 'status',
        render: (status, row) => {
            const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

            return (
                status === 'PENDING' ? (
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
                                            {t("Contacted")}
                                        </NavLink>
                                    ),
                                    key: 'CONTACTED',
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <Flex gap={5} justify="space-between" className="btnpill fs-12 dsasellerpending cursor">
                            {t(formattedStatus)}
                            <DownOutlined />
                        </Flex>
                    </Dropdown>
                ) : (
                    <Text className="btnpill fs-12 success">{t(formattedStatus)}</Text>
                )
            );
        },
    }
]


const submanageColumns = ({ setVisible, setEditItem, setUpgradePlan, setIsRenew, t, i18n  }) => [
    // {
    //     title: t('Business ID'),
    //     dataIndex: 'business',
    //     render:(business)=> '-'
    // },
    {
        title: t('Business Logo'),
        dataIndex: 'business',
        render: (business) => {
            return (
                <Avatar src={business?.image} size={40} />
            )
        }
    },
    {
        title: t('Business Name'),
        dataIndex: 'business',
        width: 200,
        render:(business)=> business?.name
    },
    {
        title: t('Type'),
        dataIndex: 'business',
        render:(business)=> business?.businessType
    },
    {
        title: t("Subscription Plan"),
        dataIndex: 'subscription',
        render: (subscription) => {
            return (
                subscription?.type === 'BASIC' ? 
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>{t("BP")}</Text>
                : subscription?.type === 'STANDARD' ? 
                   <Text className='sm-pill text-white fs-12 bg-red'>{t("SP")}</Text>
                : subscription?.type === 'PRO' ? 
                     <Text className='sm-pill text-white fs-12 bg-red'>{t("PP")}</Text>
                :   <Text className='sm-pill text-white fs-12 bg-apple-green'>{t("EP")}</Text>
                
            );
        }
    },
    {
        title: t('Period'),
        dataIndex: 'validity',
        render:(validity)=> t(validity)
    },
    {
        title: t('Start Date'),
        dataIndex: 'startDate',
        render: (startDate) => utcDateTimeToLocal(startDate),
        width: '180px'
    },
    {
        title: t('Expiry Date'),
        dataIndex: 'endDate',
        render: (expiryDate) => utcDateTimeToLocal(expiryDate),
        width: '180px'
    },
    {
        title: t('Status'),
        dataIndex: 'status',
        render: (status) => {
            return (
                true ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Expires")}</Text>
                )
            );
        }
    },
    {
        title: t('Action'),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        row?.status === 'Active' && { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>{t("Edit Package")}</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setIsRenew(true); setEditItem(row)}}>{t("Renew Package")}</NavLink>, key: '2' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setUpgradePlan(true); setEditItem(row) }}>{t("Upgrade Package")}</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault();  }}>{t("Download Invoice")}</NavLink>, key: '4' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); }}>{t("Send Reminder")}</NavLink>, key: '5' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const discountColumns = ({ setVisible, setEditItem, setExpireItem,t,i18n }) => [
    {
        title: t('Discount Code'),
        dataIndex: 'code',
    },
    {
        title: t('Group'),
        dataIndex: 'group',
        render: (group) => {
            return (
                <Tag className="sm-pill radius-20 fs-12">
                    {t(
                        group?.charAt(0)?.toUpperCase() + group?.slice(1).toLowerCase()
                    )}
                </Tag>
            )
        }
    },
    {
        title: t('Type'),
        dataIndex: 'discountType',
        render: (discountType) => 
            t(
                discountType?.charAt(0)?.toUpperCase() + discountType?.slice(1).toLowerCase()
            )
        
    },
    {
        title: t('Value'),
        dataIndex: 'value',
        render: (value) => i18n.language === "ar" ? toArabicDigits(value) : value
    },
    {
        title: t('Subscription Plan'),
        dataIndex: 'packageType',
        render: (subscriptionPlan) => {
            return (
                <Flex gap={5} wrap>
                    {/* {
                        subscriptionPlan?.map((items,index)=>
                            
                        )
                    } */}
                    <Tag className="sm-pill radius-20 fs-12">
                        {t(
                            subscriptionPlan?.charAt(0)?.toUpperCase() + subscriptionPlan?.slice(1).toLowerCase()
                        )}
                    </Tag>
                </Flex>
            );
        }
    },
    {
        title: t('Used / Limit'),
        dataIndex: 'usedLimit',
        render: (_,row) => i18n.language === "ar" ? toArabicDigits(row?.usageLimit) : row?.remainingLimit
    },
    {
        title: t('Start Date'),
        dataIndex: 'startDate',
        render: (startDate) => i18n.language === "ar"  ? 
            toArabicDigits(dayjs(startDate).format("YYYY-MM-DD"))
            : dayjs(startDate).format("YYYY-MM-DD")
    },
    {
        title: t('End Date'),
        dataIndex: 'expiryDate',
        render: (expiryDate) => 
            i18n.language === "ar"  ? 
            toArabicDigits(dayjs(expiryDate).format("YYYY-MM-DD"))
            : dayjs(expiryDate).format("YYYY-MM-DD")
    },
    {
        title: t('Status'),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'ACTIVE' ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Expire")}</Text>
                )
            );
        }
    },
    {
        title: t('Action'),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_, row) => {

            const now = new Date();
            const startExpired = new Date(row.startDate) < now;
            const endExpired = new Date(row.expiryDate) < now;
            const allowActions = startExpired && endExpired;

            const items = allowActions
                ? [
                    {
                        label: (
                            <NavLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVisible(true);
                                    setEditItem(row);
                                }}
                            >
                                {t("Edit")}
                            </NavLink>
                        ),
                        key: "1",
                    },
                    {
                        label: (
                            <NavLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    setExpireItem(row?.id);
                                }}
                            >
                                {t("Expire")}
                            </NavLink>
                        ),
                        key: "2",
                    },
                ]
                : [];

            return (
                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    disabled={!allowActions} // disable dropdown
                >
                    <Button
                        disabled={!allowActions}
                        className="bg-transparent border-0 p-0"
                    >
                        <img
                            src={
                                !allowActions
                                    ? "/assets/icons/disable-dot.webp"
                                    : "/assets/icons/dots.webp"
                            }
                            alt='dots icon'
                            width={16}
                        />
                    </Button>
                </Dropdown>
            );
        },
    }
]

const faqColumns = ({ setVisible, setEditItem, setDeleteItem,t }) => [
    {
        title: t('Question'),
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
        title: t('Answer'),
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
        title: t('Action'),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>{t("Edit")}</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(row?.id)}}>{t("Delete")}</NavLink>, key: '2' },
                    ]
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src={"/assets/icons/dots.webp"} alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]


const activitylogColumn = ({t,i18n})=> [
    {
        title: t('Name'),
        dataIndex: 'userName',
    },
    {
        title: t('Role'),
        dataIndex: 'userRole',
        render:(role) => t(role)?.charAt(0)?.toUpperCase() + t(role)?.slice(1).toLowerCase()
    },
    {
        title: t('Action'),
        dataIndex: 'action',
        render:(action) => t(action)?.charAt(0)?.toUpperCase() + t(action)?.slice(1).toLowerCase()
    },
    {
        title: t('Activity'),
        dataIndex: 'activity',
    },
    {
        title: t('Date & Time'),
        dataIndex: 'createdAt',
        render: (createdAt) => {
            if (!createdAt) return '';

            if (i18n?.language === 'ar') {
            let arabicDate = toArabicDigits(createdAt)
                .replace('AM', 'ص')
                .replace('PM', 'م')
                .replace('am', 'ص')
                .replace('pm', 'م');
                return arabicDate;
            }
            return utcDateTimeToLocal(createdAt)
        }
    }
]


const discountactivityColumn = ({t,i18n})=> [
    {
        title: t('Discount Code'),
        dataIndex: 'discountCode',
    },
    {
        title: t('Customer Name'),
        dataIndex: 'customerName',
    },
    {
        title: t('Business Name'),
        dataIndex: 'businessName',
    },
    {
        title: t('Group'),
        dataIndex: 'group',
        render:(group) => t(group)
    },
    {
        title: 'Date & Time',
        dataIndex: 'dateTime',
        render: (dateTime) => {
            if (!dateTime) return '';

            if (i18n?.language === 'ar') {
            let arabicDate = toArabicDigits(dateTime)
                .replace('AM', 'ص')
                .replace('PM', 'م')
                .replace('am', 'ص')
                .replace('pm', 'م');
                return arabicDate;
            }
            return dateTime;
        }
    },
]


const allbusinessColumns = ({ setDeleteItem,setStatusChange,navigate,t }) => [
    {
        title: t("Business ID"),
        dataIndex: 'businessId',
        render: (businessId)=>  <Text>#{businessId}</Text>
    },
    {
        title: t("Business Logo"),
        dataIndex: 'image',
        render: (businessLogo) => {
            return (
                <Avatar src={businessLogo} size={40} />
            )
        }
    },
    {
        title: t("Business Name"),
        dataIndex: 'name',
        width: 200
    },
    {
        title: t("Type"),
        dataIndex: 'businessType',
        render: (businessType) => capitalizeTranslated(businessType)
    },
    {
        title: t("Customer Name"),
        dataIndex: 'subscriber',
        render: (subscriber)=>  <Text>{subscriber?.firstName + " " + subscriber?.lastName}</Text>
    },
    {
        title: t("Subscription Plan"),
        dataIndex: 'subscription',
        render: (subscription) => {
            return (
                subscription?.type === 'BASIC' ? 
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>{t("Basic Plan")}</Text>
                : subscription?.type === 'STANDARD' ? 
                    <Text className='sm-pill text-white fs-12 bg-red'>{t("Standard Plan")}</Text>
                : subscription?.type === 'PRO' ? 
                    <Text className='sm-pill text-white fs-12 bg-violet'>{t("PRO Plan")}</Text>
                : <Text className='sm-pill text-white fs-12 bg-apple-green'>{t("Enterprise Plan")}</Text>
                
            );
        }
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'ACTIVE' ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Deactive")}</Text>
                )
            );
        }
    },
    {
        title: t("Date"),
        dataIndex: 'createdAt',
        render: (date) => utcDateTimeToLocal(date),
        width: '200px',
    },
    {
        title: t("Action"),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/allbusiness/viewbusiness/'+row?.id) }}>{t("View")}</NavLink>, key: '1' },
                        row?.status !== 'ACTIVE' ? { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange({id: row?.id, status: 'ACTIVE'})}}>{t("Active")}</NavLink>, key: '3' } : { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange({id: row?.id, status: 'INACTIVE'})}}>{t("Inactive")}</NavLink>, key: '2' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setDeleteItem(_?.id) }}>{t("Delete")}</NavLink>, key: '4' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const singleviewColumns = ({ setViewItem,t,i18n }) => [
    {
        title: t("Branch Name"),
        dataIndex: 'branchName',
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phoneNo',
    },
    {
        title: t("Location"),
        dataIndex: 'location',
    },
    {
        title: t("Total Bookings"),
        dataIndex: 'totalBooking',
        render: (totalBooking) =>
            i18n.language === "ar" ? toArabicDigits(totalBooking) : totalBooking
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'active' ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Inactive")}</Text>
                )
            );
        }
    },
    {
        title: t("Action"),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault();setViewItem(true)}}>{t("View")}</NavLink>, key: '1' }
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
]

const businessserviceColumns = ({t,i18n}) => [
    {
        title: t("Service Name"),
        dataIndex: 'serviceName',
    },
    {
        title: t("Duration (min)"),
        dataIndex: 'duration',
        render: (duration) =>
            i18n.language === "ar" ? toArabicDigits(duration) : duration
    },
    {
        title: t("Buffer Time (min)"),
        dataIndex: 'bufferTime',
        render: (bufferTime) =>
            i18n.language === "ar" ? toArabicDigits(bufferTime) : bufferTime
    },
    {
        title: t("Price"),
        dataIndex: 'price',
        render: (price) =>
            i18n.language === "ar" ? toArabicDigits(price) : price
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'active' ? (
                    <Text className='btnpill fs-12 success'>{t("Active")}</Text>
                ) : (
                    <Text className='btnpill fs-12 inactive'>{t("Inactive")}</Text>
                )
            );
        }
    },
]

const businessstaffColumns = ({t})=> [
    {
        title: t("Image"),
        dataIndex: 'image',
        render:(image) => <Avatar src={image} size={40} />,
        width: 100
    },
    {
        title: t("Staff Name"),
        dataIndex: 'staffName',
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phoneNo',
    },
    {
        title: t("Role"),
        dataIndex: 'role',
    },
    {
        title: t("Services"),
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