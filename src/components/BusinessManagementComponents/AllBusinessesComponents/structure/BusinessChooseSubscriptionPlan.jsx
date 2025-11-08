import { Col, Flex, Row, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { BusinessSubscriptionPackagesCard } from './BusinessSubscriptionPackagesCard';
import { PlanCard } from './PlanCard';
import { subplanData } from '../../../../data';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const BusinessChooseSubscriptionPlan = () => {
    const {t} = useTranslation()
    const [selectedValue, setSelectedValue] = useState('1');
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const currentPlanGroup = subplanData?.find((item) => item?.id === selectedValue);
    const planDetails = currentPlanGroup?.details || [];

    useEffect(() => {
        if (planDetails?.length > 0) {
            setSelectedPlanId(planDetails[0].id);
        }
    }, [selectedValue, planDetails]);

    const singleData = planDetails?.find((plan) => plan?.id === selectedPlanId);


    const handleTabChange = (key) => {
        setSelectedValue(key);
        setSelectedPlanId(null);
    };

    const handlePlanSelect = (id) => {
        setSelectedPlanId(id);
        console.log('selected id',id)
    };

    return (
        <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 16 }}>
                <Flex vertical gap={16}>
                    <Flex justify="space-between" align="center">
                        <Text className="fw-600">{t("Select Subscription Plan")}</Text>
                        <Tabs
                            activeKey={selectedValue}
                            onChange={handleTabChange}
                            items={[
                                { key: '1', label: t("Monthly") },
                                { key: '2', label: t("Yearly") },
                            ]}
                            className="tab-fill"
                        />
                    </Flex>

                    <BusinessSubscriptionPackagesCard
                        selectedvalue={selectedValue}
                        data={planDetails}
                        onSelect={handlePlanSelect}
                    />
                </Flex>
            </Col>

            <Col span={24} lg={{ span: 8 }}>
                <PlanCard selectedvalue={selectedValue} singledata={singleData} />
            </Col>
        </Row>
    );
};

export { BusinessChooseSubscriptionPlan };
