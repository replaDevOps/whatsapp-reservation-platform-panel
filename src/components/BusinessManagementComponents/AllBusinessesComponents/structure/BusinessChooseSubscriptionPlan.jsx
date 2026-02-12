import { Col, Flex, Row, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { BusinessSubscriptionPackagesCard } from './BusinessSubscriptionPackagesCard';
import { PlanCard } from './PlanCard';
import { useTranslation } from 'react-i18next';
import { GET_SUBSCRIPTION_PLANS } from '../../../../graphql/query';
import { useLazyQuery } from '@apollo/client/react';

const { Text } = Typography;

const BusinessChooseSubscriptionPlan = ({subscriptionValidity, setSubscriptionValidity, selectedSubscriptionPlan, setSelectedSubscriptionPlan, discountData}) => {

    const {t} = useTranslation()
    const [subscriptionPlans, setSubscriptionPlans]= useState([]) 
    const [getSubscriptionPlans, { data, loading }] = useLazyQuery(GET_SUBSCRIPTION_PLANS, {
        fetchPolicy: "network-only",
    })

    useEffect(()=>{
        if(getSubscriptionPlans)
            getSubscriptionPlans()
    }, [getSubscriptionPlans])

    useEffect(()=>{
        if(data?.getSubscriptions?.length){
            setSubscriptionPlans(data?.getSubscriptions)
            setSelectedSubscriptionPlan({...data?.getSubscriptions?.find(plan => plan?.type === 'BASIC')})
        }
    }, [data])
    return (
        <Row gutter={[10, 24]}>
            <Col span={24} lg={{ span: 16 }}> 
                <Flex vertical gap={16}>
                    <Flex justify="space-between" align="center">
                        <Text className="fw-600">{t("Select Subscription Plan")}</Text>
                        <Tabs
                            activeKey={subscriptionValidity}
                            onChange={(key) => {
                                setSubscriptionValidity(key)
                            }}
                            items={[
                                { key: 'MONTHLY', label: t("Monthly") },
                                { key: 'YEARLY', label: t("Yearly") },
                            ]}
                            className="tab-fill"
                        />
                    </Flex>

                    <BusinessSubscriptionPackagesCard
                        {...{subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity,discountData}}
                    />
                </Flex>
            </Col>

            <Col span={24} lg={{ span: 8 }}>
                <PlanCard
                    subscriptionPlan={selectedSubscriptionPlan}
                    subscriptionValidity={subscriptionValidity}
                    discountData={discountData}
                />
            </Col>
        </Row>
    );
};

export { BusinessChooseSubscriptionPlan };
