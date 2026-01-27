import { DownOutlined, HolderOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Tag, Tooltip, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { capitalizeTranslated, FieldMerger, getInitials, toArabicDigits, utcDateTimeToLocal, utcDateToLocal } from "../shared";
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
        render: (type) => t(capitalizeTranslated(type))
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
        width: 250,
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phone',
        isPhone: true,
        render: (phoneNo) => {
        if (!phoneNo) return '';
        
        const prefix = '+966 ';
        return i18n.language === "ar" 
            ? `${prefix}${toArabicDigits(phoneNo)}`
            : `${prefix}${phoneNo}`;
        },
        width: 250,
    },
    {
        title: t("Joined At"),
        dataIndex: 'createdAt',
        width: 200,
        isDate: true,
        render: (createdAt) => i18n.language === "ar" ? toArabicDigits(utcDateToLocal(createdAt)) : utcDateToLocal(createdAt)
    },
];

const stafftableColumn = ({navigate, setDeleteItem, setStatusChange,t,i18n}) => [
    {
        title: t("Image"),
        dataIndex: 'imageUrl',
        render: (_,row) => {
            return (
                <>
                    {
                        row?.imageUrl ? 
                        <Avatar src={row?.imageUrl} size={40} />
                        : <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>{getInitials(row?.firstName) + getInitials(row?.lastName)}</Avatar>
                    }
                </>
            )
        },
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
        const prefix = '+996 ';
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
                        row?.isActive === true && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange({id: row?.id, status:row?.isActive}) }}>{t("Inactive")}</NavLink>, key: '2' },
                        row?.isActive === false && { label: <NavLink onClick={(e) => {e.preventDefault(); setStatusChange({id: row?.id, status:row?.isActive}) }}>{t("Active")}</NavLink>, key: '2a' },
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
        dataIndex: 'appointmentNumber',
    },
    {
        title: t("Business Name"),
        dataIndex: 'branch',
        render: (branch) => branch?.business?.name
    },
    {
        title: t("Branch Name"),
        dataIndex: 'branch',
        render: (branch)=> branch?.name
    },
    {
        title: t("Customer Name"),
        dataIndex: 'consumer',
        render: (consumer) => {
            const phone = consumer?.phone || "";
            const name = consumer?.firstName + ' ' + consumer?.lastName || ""
            return (
                <Flex align="center" gap={5}>
                {name}
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
        dataIndex: 'service',
        render: (service) => {
            return(
               <Tag className="sm-pill radius-20 fs-12">{service?.name}</Tag>
            )
        } 
    },
    {
        title: t("Service Provider"),
        dataIndex: 'serviceProvider',
        render: (serviceProvider)=> serviceProvider?.firstName + ' ' + serviceProvider?.lastName
    },
    {
        title: t("Date & Time"),
        dataIndex: 'appointmentDate',
        render: (appointmentDate) => {
            if (!appointmentDate) return '';

            // if (i18n?.language === 'ar') {
            // let arabicDate = toArabicDigits(appointmentDate)
            //     .replace('AM', 'ص')
            //     .replace('PM', 'م')
            //     .replace('am', 'ص')
            //     .replace('pm', 'م');
            //     return arabicDate;
            // }
            return utcDateTimeToLocal(appointmentDate);
        }
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === 'COMPLETED' ? (
                    <Text className='btnpill fs-12 success'>{t("Completed")}</Text>
                ) : status === 'CANCELLED' ? (
                    <Text className='btnpill fs-12 inactive'>{t("Cancelled")}</Text>
                ) : status === 'PENDING' ? (
                    <Text className='btnpill fs-12 pending-brown'>{t("Pending")}</Text>
                ) : status === 'SCHEDULED' ? (
                    <Text className='btnpill fs-12 dsasellerpending'>{t("In-Progress")}</Text>
                ) : (
                    <Text className='btnpill fs-12 branded'>{t("No Show")}</Text> //NO_SHOW
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
                <>
                    {
                        business?.image ? 
                        <Avatar src={business?.image} size={40} />
                        : <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>{getInitials(business?.name)}</Avatar>
                    }
                </>
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
            t(business?.businessType?.charAt(0)?.toUpperCase() + business?.businessType?.slice(1)?.toLowerCase())
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
        render:(validity)=> t((validity)?.charAt(0)?.toUpperCase() + (validity)?.slice(1)?.toLowerCase())
    },
    {
        title: t("Discount"),
        dataIndex: 'applicableDiscount',
        render: (applicableDiscount) =>
            applicableDiscount?.code != null
                ? <>{t("SAV")} <Text className="fs-12">{applicableDiscount?.code}</Text></>
                : '--'
                },
    {
        title: t("Price"),
        dataIndex: 'subscription',
        render: (_,row) => {
            const isArabic = i18n.language === "ar"
            return (
                <Flex align="flex-end" gap={5}>
                    {t("SAR")} {
                            row?.validity === "MONTHLY" ?(
                                (row?.subscription?.discountPrice > 0) ?(
                                    <>
                                        {isArabic ? toArabicDigits(row?.subscription?.discountPrice): row?.subscription?.discountPrice} 
                                        <sup><Text className="fs-12" delete>{isArabic ? toArabicDigits(row?.subscription?.price): row?.subscription?.price}</Text></sup>
                                    </>
                                ):(
                                    <>
                                        {isArabic ? toArabicDigits(row?.subscription?.price): row?.subscription?.price} 
                                    </>
                                )
                            )
                            :
                            (row?.subscription?.discountYearlyPrice > 0 ) ?(
                                <>
                                    {isArabic ? toArabicDigits(row?.subscription?.discountYearlyPrice): row?.subscription?.discountYearlyPrice}
                                    <sup><Text className="fs-12" delete>{isArabic ? toArabicDigits(row?.subscription?.yearlyPrice): row?.subscription?.yearlyPrice}</Text></sup> 
                                </>
                            ):(
                                <>
                                    {isArabic ? toArabicDigits(row?.subscription?.yearlyPrice): row?.subscription?.yearlyPrice} 
                                </>
                            )

                        }
                </Flex>
            )
        }
    },
    {
        title: t("Purchasing Date"),
        dataIndex: 'createdAt',
        render: (createdAt) => i18n.language === "ar" ? toArabicDigits(utcDateTimeToLocal(createdAt)) : utcDateTimeToLocal(createdAt)
    },
]

const demoreqColumns = ({setVisible,setEditItem,t,i18n}) => [
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
            render: (businessType) => t(capitalizeTranslated(businessType))
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
            render: (createdAt) => i18n.language === "ar" ? toArabicDigits(utcDateToLocal(createdAt)) : utcDateToLocal(createdAt)
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
                                                // handleStatusChange('Contacted', row);
                                                setVisible(true)
                                                setEditItem(row?.id)
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
                        <Flex gap={0} justify="space-between" className="btnpill fs-12 dsasellerpending cursor w-100px">
                            {t(capitalizeTranslated(formattedStatus))}
                            <DownOutlined />
                        </Flex>
                    </Dropdown>
                ) : (
                    <Text className="btnpill fs-12 success">{t(capitalizeTranslated(formattedStatus))}</Text>
                )
            );
        },
    }
]


const submanageColumns = ({ setVisible, setEditItem, setUpgradePlan, setIsRenew, t, i18n  }) => [
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
        render:(business)=> t(capitalizeTranslated(business?.businessType))
    },
    {
        title: t("Subscription Plan"),
        dataIndex: 'type',
        render: (type) => {
            return (
                type === 'BASIC' ? 
                    <Text className='sm-pill text-white fs-12 bg-basic-color'>{t("BP")}</Text>
                : type === 'STANDARD' ? 
                   <Text className='sm-pill text-white fs-12 bg-violet'>{t("SP")}</Text>
                : type === 'PRO' ? 
                     <Text className='sm-pill text-white fs-12 bg-red'>{t("PP")}</Text>
                :   <Text className='sm-pill text-white fs-12 bg-apple-green'>{t("EP")}</Text>
                
            );
        }
    },
    {
        title: t('Period'),
        dataIndex: 'validity',
        render:(validity)=> t(capitalizeTranslated(validity))
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
        dataIndex: 'isActive',
        render: (isActive) => {
            return (
                isActive === true ? (
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
                        row?.isActive === true && { label: <NavLink onClick={(e) => {e.preventDefault(); setVisible(true); setEditItem(row) }}>{t("Edit Package")}</NavLink>, key: '1' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setIsRenew(true); setEditItem(row)}}>{t("Renew Package")}</NavLink>, key: '2' },
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setUpgradePlan(true); setEditItem(row) }}>{t("Upgrade Package")}</NavLink>, key: '3' },
                        { label: <NavLink onClick={(e) => {e.preventDefault();  }}>{t("Download Invoice")}</NavLink>, key: '4' },
                        // { label: <NavLink onClick={(e) => {e.preventDefault(); }}>{t("Send Reminder")}</NavLink>, key: '5' },
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
        dataIndex: 'applicableSubscriptions',
        render: (applicableSubscriptions) => {
            return (
                <Flex gap={5} wrap>
                    {
                        applicableSubscriptions?.map((items)=>
                            <Tag className="sm-pill radius-20 fs-12" key={items?.id}>
                                {t(
                                    items?.type?.charAt(0)?.toUpperCase() + items?.type?.slice(1).toLowerCase()
                                )}
                            </Tag>       
                        )
                    }
                </Flex>
            );
        }
    },
    {
        title: t('Used / Limit'),
        dataIndex: 'usedLimit',
        render: (_,row) => i18n.language === "ar" ? toArabicDigits(row?.usageLimit+ '/' + row?.remainingLimit) : row?.usageLimit+ '/' +row?.remainingLimit
    },
    {
        title: t('Validity'),
        dataIndex: 'validity',
        render: (validity) => {
            return (
                <Flex gap={5} wrap>
                    {
                        validity?.map((items,index)=>
                            <Tag className="sm-pill radius-20 fs-12" key={index}>
                                {t(capitalizeTranslated(items))}
                            </Tag>       
                        )
                    }
                </Flex>
            );
        }
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

            // const now = new Date();
            // const startExpired = new Date(row.startDate) < now;
            // const endExpired = new Date(row.expiryDate) < now;
            // const allowActions = startExpired && endExpired;
            const allowActions = row?.status === 'ACTIVE'

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
                    disabled={!allowActions}
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
        render: (userRole) => (
            <Text>
                {userRole.includes("SUPER_ADMIN")
                ? t("Super Admin")
                : userRole.includes("SERVICE_PROVIDER")
                ? t("Service Provider")
                : userRole.includes("STAFF_MEMBER")
                ? t("Staff Manager")
                : t(capitalizeTranslated(userRole))}
            </Text>
        )
    },
    {
        title: t('Action'),
        dataIndex: 'action',
        render:(action) => t(capitalizeTranslated(action))
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
                return utcDateTimeToLocal(arabicDate);
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
        dataIndex: 'subscriberSubscription',
        render: (subscriberSubscription) => <FieldMerger 
                object={subscriberSubscription?.subscriber}
                fields={['firstName', 'lastName']}
        />
    },
    {
        title: t('Business Name'),
        dataIndex: 'subscriberSubscription',
        render: (subscriberSubscription) => subscriberSubscription?.business?.name
    },
    {
        title: t('Group'),
        dataIndex: 'discount',
        render:(discount) => t(capitalizeTranslated(discount?.group))
    },
    {
        title: 'Date & Time',
        dataIndex: 'appliedAt',
        render: (appliedAt) => {
            if (!appliedAt) return '';

            if (i18n?.language === 'ar') {
            let arabicDate = toArabicDigits(appliedAt)
                .replace('AM', 'ص')
                .replace('PM', 'م')
                .replace('am', 'ص')
                .replace('pm', 'م');
                return utcDateTimeToLocal(arabicDate);
            }
            return utcDateTimeToLocal(appliedAt);
        }
    },
]


const allbusinessColumns = ({ setDeleteItem,setStatusChange,navigate,t }) => [
    {
        title: t("Business ID"),
        dataIndex: 'businessId',
        width:140,
    },
    {
        title: t("Business Logo"),
        dataIndex: 'image',
        width: 140,
        render: (_,row) => {
            return (
                <>
                    {
                        row?.image ? 
                        <Avatar src={row?.image} size={40} />
                        : <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>{getInitials(row?.name)}</Avatar>
                    }
                </>
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
        render: (businessType) => t(capitalizeTranslated(businessType))
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
                    <Text className='sm-pill text-white fs-12 bg-violet'>{t("Standard Plan")}</Text>
                : subscription?.type === 'PRO' ? 
                    <Text className='sm-pill text-white fs-12  bg-red'>{t("PRO Plan")}</Text>
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
        render: (date) => utcDateToLocal(date),
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
                        row?.status === 'ACTIVE' && {label: <NavLink onClick={(e) => {e.preventDefault(); navigate('/allbusiness/viewbusiness/'+row?.id) }}>{t("View")}</NavLink>, key: '1' },
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
        dataIndex: 'name',
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phone',
    },
    {
        title: t("Location"),
        dataIndex: 'location',
    },
    {
        title: t("Total Bookings"),
        dataIndex: 'appointments',
        render: (appointments) => {
            const count = appointments?.length ?? 0;
            return i18n.language === "ar" ? toArabicDigits(count) : count;
        }
    },
    {
        title: t("Status"),
        dataIndex: 'status',
        render: (status) => {
            return (
                status === true ? (
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
                        { label: <NavLink onClick={(e) => {e.preventDefault();setViewItem(row)}}>{t("View")}</NavLink>, key: '1' }
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
        dataIndex: 'name',
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
                status === true ? (
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
        dataIndex: 'imageUrl',
        render:(imageUrl) => <Avatar src={imageUrl} size={40} />,
        width: 100
    },
    {
        title: t("Staff Name"),
        dataIndex: 'firstName',
        render: (_,row)=> <FieldMerger 
                    object={row}
                    fields={['firstName', 'lastName']}
            />
    },
    {
        title: t("Phone Number"),
        dataIndex: 'phone',
    },
    {
        title: t("Role"),
        dataIndex: 'role',
        render:(role) => {
            return (
                role === 'SERVICE_PROVIDER' ? (
                    <Text>{t("Service Provider")}</Text>
                ) : role === 'RECEPTIONIST' ? (
                    <Text>{t("Receptionist")}</Text>
                ) : role === 'STAFF_MEMBER' ? (
                    <Text>{t("Staff Manager")}</Text>
                ) : {role}
            );
        }
    },
    {
        title: t("Services"),
        dataIndex: 'services',
        render: (services) => {
            return (
                <Flex gap={5} wrap>
                    {
                        services?.map((items,index)=>
                            <Tag key={index} className="sm-pill radius-20 fs-12">{items?.name}</Tag>
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