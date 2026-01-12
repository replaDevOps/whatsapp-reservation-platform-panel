import { useEffect, useMemo, useState } from "react";
import { Avatar,Badge, Button, Card, Divider, Dropdown, Flex, Image, List,Typography,} from "antd";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { utcDateTimeToLocal } from "../../../shared";
import { NEW_NOTIFICATION_SUBSCRIPTION,USER_CREATED_NOTIFICATION,SUBSCRIPTION_EXPIRY_NOTIFICATION } from "../../../graphql/subscription/notification";
import { ALERTS_BY_USERID } from "../../../graphql/query";
import { MARK_AS_READ,MARK_AS_ALLREAD } from "../../../graphql/mutation/mutations";
import { getUserID } from "../../../utils/auth";

const { Text } = Typography;
const Notifications = () => {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState({
        totalCount: 0,
        unreadCount: 0,
        alerts: [],
    });
    const [markAsRead] = useMutation(MARK_AS_READ);
    const [markAllRead] = useMutation(MARK_AS_ALLREAD);
    const { data, refetch } = useQuery(ALERTS_BY_USERID, {
        variables: { limit: 100, offset: 0, userId: getUserID() },
        fetchPolicy: "network-only",
        onCompleted: (incomingData) => {
            if (incomingData?.getUserAlerts) {
                setNotifications(incomingData.getUserAlerts);
            }
        }
    });

    useSubscription(NEW_NOTIFICATION_SUBSCRIPTION, {
        onData: () => {
            refetch();
        }
    });

    useSubscription(USER_CREATED_NOTIFICATION, {
        onData: () => {
            refetch();
        },
    });

    useSubscription(SUBSCRIPTION_EXPIRY_NOTIFICATION, {
        onData: () => {
            refetch();
        },
    });

    const handleMarkAsRead = async (id) => {
        await markAsRead({ variables: { markAlertAsReadId: id } });
        refetch();
    };

    const handleMarkAllRead = async () => {
        await markAllRead();
        refetch();
    };

    const badgeCount = useMemo(() => notifications.unreadCount, [notifications.unreadCount]);

    useEffect(() => {
        if (data?.getUserAlerts) {
            setNotifications(data.getUserAlerts);
        }
    }, [data]);

    const dropdownContent = (
        <Card className="radius-12 shadow-c card-cs size-notify">
            <Flex justify="space-between" align="center">
                <Text>
                    {t("Notification")} ( {notifications?.totalCount || 0} )
                </Text>
                <Button className="fs-10" type="link" size="small" onClick={handleMarkAllRead}>
                    {t("Mark all read")}
                </Button>
            </Flex>
            <Divider />
            <List
                dataSource={notifications?.alerts}
                className="overflowstyle overflow-scroll"
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src="/assets/icons/notify-ic.webp" />}
                            title={<NavLink className={!item.isRead ? 'fw-600':'fw-400'} to="">{item.activity}</NavLink>}
                            description={
                                <Flex justify="space-between">
                                    <Text className="fs-12 text-gray">
                                        {utcDateTimeToLocal(item.createdAt)}
                                    </Text>
                                    {!item.isRead && (
                                        <Button
                                            type="text"
                                            size="small"
                                            className="fs-10"
                                            onClick={() => handleMarkAsRead(item.id)}
                                        >
                                            {t("Mark read")}
                                        </Button>
                                    )}
                                </Flex>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );

    return (
        <Dropdown
            popupRender={() => dropdownContent}
            trigger={["click"]}
        >
            <Badge count={badgeCount} overflowCount={99}>
                <Button shape="circle" size="large" className="bg-transparent p-0">
                    <Image
                        src="/assets/icons/notify.webp"
                        width={20}
                        preview={false}
                        alt="notification"
                    />
                </Button>
            </Badge>
        </Dropdown>
    );
};

export { Notifications };