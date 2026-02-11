import { Card, Divider, Flex, List, Space, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { useTranslation } from 'react-i18next';
import { capitalizeTranslated, toArabicDigits } from '../../../../shared';
import { useEffect, useState } from 'react';

const { Title,Text } = Typography;
const PlanCard = ({subscriptionPlan,subscriptionValidity}) => {
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [features, setFeatures]= useState([])
    // const [planDuration, setPlanDuration ] = useState(null)
    // const handleDurationClick = ({ key }) => {
    //     setPlanDuration(key)
    // }
    useEffect(()=>{
        if(subscriptionPlan){
            setFeatures(extractPlanFeatures(subscriptionPlan))
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
         <Card className='bg-brand-light border-brand card-cs radius-12 h-100'>
            <Flex vertical gap={20}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={t(capitalizeTranslated(subscriptionPlan?.type))} />
                    <Text className='text-gray fs-14'>{t(subscriptionPlan?.description)}</Text>
                </Flex>
                <Title className={`m-0`} level={3}>
                    <Space size={8} wrap>
                        <sup className={`fs-13 fw-600 text-grey`}>{t("SAR")}</sup>
                        {
                            subscriptionValidity === 'YEARLY' ? (
                                // subscriptionPlan?.discountYearlyPrice > 0 ? (
                                // <>
                                //     <Text delete className="fs-16 text-gray">
                                //         {subscriptionPlan?.yearlyPrice}
                                //     </Text>
                                //     {subscriptionPlan?.discountYearlyPrice}
                                // </>
                                // ) : (
                                    
                                // )
                                subscriptionPlan?.yearlyPrice
                            ) :(
                                subscriptionPlan?.price
                            )
                        }
                        <span className='fs-13 fw-500 text-gray'>/{t(capitalizeTranslated(subscriptionValidity))}</span>
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
                                description={item?.title}
                            />
                        </List.Item>
                        )}
                    />
                </Flex>
            </Flex>
        </Card>
    );
};

export { PlanCard };