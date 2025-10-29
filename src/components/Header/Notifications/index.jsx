import React, { useState } from "react"
import { Avatar, Badge, Button, Card, Divider, Dropdown, Flex, Image, List, Typography } from "antd"
import NotificationsDrawer from "./NotificationsDrawer"
import { NavLink } from "react-router-dom"
// import {GET_NOTIFICATIONS} from '../../../graphql/query'
// import {NEW_NOTIFICATION_SUBSCRIPTION} from '../../../graphql/subscription'
// import { useQuery,useSubscription } from '@apollo/client';

const { Text } = Typography
export const Notifications = () => {
    const userId = localStorage.getItem("userId"); 

     // State to keep track of notifications
    const [notifications, setNotifications] = useState([]);
    const [visible, setVisible] = useState(false);

    // Fetch existing notifications
    // const { data, loading: isLoading, refetch } = useQuery(GET_NOTIFICATIONS, {
    //     variables: { userId },
    //     skip: !userId,
    //     fetchPolicy: "network-only",
    //     onCompleted: (fetchedData) => {
    //         if (fetchedData?.getNotifications?.notifications) {
    //             setNotifications(fetchedData.getNotifications.notifications);
    //         }
    //     }
    // });

    // Subscribe to new notifications
    // const { data: subscriptionData } = useSubscription(NEW_NOTIFICATION_SUBSCRIPTION, {
    //     onSubscriptionData: ({ subscriptionData }) => {
    //         const newNotif = subscriptionData.data?.newNotification;
    //         if (newNotif) {
    //             setNotifications((prev) => [newNotif, ...prev]);
    //         }
    //     }
    // });
    // Count unread notifications
    // const count = data?.getNotifications?.count

    const data = [
        {
            title: 'You’ve received a Requested Proposal for your service from CreativeBuyer93!',
        },
        {
            title: 'Your service received a 5-star review from CreativeBuyer93!',
        },
        {
            title: 'Your service received a 5-star review from CreativeBuyer93!',
        },
        {
            title: 'Your service received a 5-star review from CreativeBuyer93!',
        },
    ];

    const dropdownContent = (
        <Card className='radius-12 shadow-c card-cs size-notify'>
            <Text>Notification (10)</Text>
            <Divider className="bg-divider my-3" />
            <List
                itemLayout="horizontal"
                dataSource={data}
                className="overflowstyle overflow-scroll"
                renderItem={(item, index) => (
                <List.Item key={index}>
                    <List.Item.Meta
                        avatar={<Avatar src={`/assets/icons/notify-ic.webp`} size={30} />}
                        title={<NavLink to={''} className={'fw-500'}>{item.title}</NavLink>}
                        description={<Flex gap={5} align="center">
                            <Text className="fs-12 text-gray">1 hour ago</Text>
                            <Text className="fs-12 text-gray">12:24 AM</Text>
                        </Flex>}
                    />
                </List.Item>
                )}
            />
        </Card>
    );

    return (
        <>

            <Dropdown
                popupRender={()=>dropdownContent}
                trigger={['click']}
                className='p-0'
            >
                <Badge count={9} overflowCount={9} className="">
                    <Button shape='circle' size='large' className='bg-transparent p-0' onClick={()=> setVisible(true)}>
                        <Image 
                            src='/assets/icons/notify.webp' 
                            width={'20px'} 
                            preview={false}
                            alt="notification icon" 
                            className="up"
                            fetchPriority="high"
                        />
                    </Button>
                </Badge>
            </Dropdown>
        </>
    )
}