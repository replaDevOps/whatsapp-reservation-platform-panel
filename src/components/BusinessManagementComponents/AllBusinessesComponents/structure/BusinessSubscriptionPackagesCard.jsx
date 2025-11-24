import { Card, Col, Flex, Radio, Row, Space, Typography } from 'antd';
import { MyInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const BusinessSubscriptionPackagesCard = ({ subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity}) => {
    const {t} = useTranslation()

    return (
        <Row gutter={[12, 12]}>
            <Col span={24}>
                <Radio.Group value={selectedSubscriptionPlan?.type} className="w-100">
                    <Row gutter={[24, 12]}>
                        {
                            subscriptionPlans?.map((plan) => (
                                <Col span={24} key={plan.id}>
                                    <Card
                                        hoverable
                                        className={`border-gray bg-transparent card-cs ${
                                            plan?.type === selectedSubscriptionPlan?.type ? 'active-radio' : ''
                                        }`}
                                        onClick={() => setSelectedSubscriptionPlan(plan)}
                                    >
                                        <Flex gap={10} align="center" justify="space-between" wrap>
                                            <Flex align="flex-start" gap={6}>
                                                <Radio value={plan?.type} />
                                                <Flex vertical gap={0}>
                                                    <Text
                                                        className={`fw-500 ${
                                                            plan?.type === selectedSubscriptionPlan?.type ? 'text-brand' : ''
                                                        }`}
                                                    >
                                                        {t(plan?.type)}
                                                    </Text>
                                                    <Text type="secondary">{t(plan?.description)}</Text>
                                                </Flex>
                                            </Flex>

                                            <Title level={5} className="m-0">
                                                <Space size={8}>
                                                    <sup className="fs-14 fw-600 text-grey">{t("SAR")}</sup>
                                                    {
                                                        subscriptionValidity === 'ENTERPRISE' ? "Custom Price" :
                                                        subscriptionValidity === 'YEARLY' ? plan?.price*12 : plan?.price
                                                    }
                                                    <span className="fs-14 fw-500 text-gray">/{t(subscriptionValidity)}</span>
                                                </Space>
                                            </Title>
                                        </Flex>
                                    </Card>
                                </Col>
                        ))}
                    </Row>
                </Radio.Group>
            </Col>

            {
                selectedSubscriptionPlan?.type === 'ENTERPRISE' && 
                <Col span={24}>
                    <MyInput
                        label={t("Custom Price")}
                        name="customPrice"
                        required
                        message={t("Please enter a price")}
                        addonBefore={t("SAR")}
                        placeholder={t("Enter price")}
                        className="w-100"
                    />
                </Col>
            }
            <Col span={24}>
                <MyInput
                    label={t("Discount Code")}
                    name="discountCode"
                    placeholder={t("Enter discount code (if any)")}
                    className="w-100"
                />
            </Col>
        </Row>
    );
};

export { BusinessSubscriptionPackagesCard };
