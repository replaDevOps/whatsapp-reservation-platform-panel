import { useEffect, useState } from 'react';
import { Button, Col, Divider, Dropdown, Flex, List, Row, Space, Typography } from 'antd';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { useTranslation } from 'react-i18next';
import { capitalizeTranslated, toArabicDigits } from '../../../../shared';

const { Title,Text,Paragraph } = Typography;
const SubscriptionPlanCard = ({subscriptionPlan}) => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [features, setFeatures]= useState([])
    const [planDuration, setPlanDuration ] = useState('Monthly')
    const [expanded, setExpanded] = useState(false);
    const handleDurationClick = ({ key }) => {
        setPlanDuration(key)
    }
    useEffect(()=>{
        if(subscriptionPlan){
            setFeatures(extractPlanFeatures(subscriptionPlan))
            setPlanDuration(subscriptionPlan?.duration || 'Monthly')
        }
    }, [subscriptionPlan])

    function extractPlanFeatures(plan) {
        const ignoreKeys = ["price", "__typename", "id", "type", "description"]
        const labels = {
            noOfBranches: "Branch",
            noOfAdmins: "Admin",
            noOfStaffManagers: "Staff Manager",
            noOfServiceProviders: "Service Provider",
            noOfReceptionists: "Receptionist",
            whatsappBot: "WhatsApp Bot",
            manualReminder: "Manual Reminders",
            automatedReminder: "Automated Reminders",
            googleReviewLink: "Google Review Link",
            promotions: "Promotions",
            selfServiceTablet: "Self Service Tablet",
            basicDashboard: "Basic Dashboard",
            fullAccessDashboard: "Full Access Dashboard",
        }
        const features = [];
        for (let key in plan) {
            if (ignoreKeys.includes(key)) continue;

            const value = plan[key];
            const label = labels[key];

            if (!label) continue;

            // Number features
            if (typeof value === "number" && value > 0) {
            features.push({
                title: `${value} ${label}${value > 1 ? "s" : ""}`
            });
            }

            // Boolean features
            if (typeof value === "boolean" && value === true) {
            features.push({
                title: label
            });
            }
        }
        return features
    }
 


    return (
        <Flex vertical gap={20}>
            <Row gutter={[24,10]} justify='space-between' align='center'>
                <Col span={24} md={16} lg={16} xl={18}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name={t(capitalizeTranslated(subscriptionPlan?.title))} />
                        <Paragraph
                            className={`fs-14 text-gray w-100`}
                            ellipsis={{
                                rows: 1,
                                expandable:'collapsible',
                                symbol: expanded ? <Text className="text-brand fs-12">less</Text> : <Text className="text-brand fs-12">more</Text>,
                                onExpand: (_, info) => setExpanded(info.expanded),
                            }}
                        >
                            {t(subscriptionPlan?.description)}
                        </Paragraph>
                    </Flex>
                </Col>
                <Col span={24} md={8} lg={8} xl={6}>
                   <Flex justify="end">
                        <Dropdown
                            menu={{
                                items: [
                                    { key: 'Monthly', label: 'Monthly' },
                                    { key: 'Yearly', label: 'Yearly' },
                                ],
                                onClick: handleDurationClick
                            }}
                        >
                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                <Flex justify="space-between" align="center" gap={30}>
                                    {t(planDuration)}
                                    <DownOutlined />
                                </Flex>
                            </Button>
                        </Dropdown>
                   </Flex>
                </Col>
            </Row>
            <Title className={`m-0`}>
                <Space size={8}>
                    <sup className={`fs-16 fw-600`}>{t("SAR")}</sup>
                    {
                        planDuration === 'Yearly' ? (
                            subscriptionPlan?.yearlyPrice
                        ) : (
                            subscriptionPlan?.price
                        )
                    }
                    <span className='fs-16 fw-500 text-gray'>/{t(planDuration)}</span>
                </Space> 
            </Title>
            <Divider className='my-2 bg-divider' />
            <Flex vertical gap={10}>
                <Title level={5} className='m-0 fw-500'>{t("Included Features")}:</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={features}
                    size='small'
                    renderItem={(item, _) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CheckOutlined className='text-green'/>}
                            description={isArabic ? toArabicDigits(t(item?.title)):t(item?.title)}
                        />
                    </List.Item>
                    )}
                />
            </Flex>
        </Flex>
    );
};

export { SubscriptionPlanCard };