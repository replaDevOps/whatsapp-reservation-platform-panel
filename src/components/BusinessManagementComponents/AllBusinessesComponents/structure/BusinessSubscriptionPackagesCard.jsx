import { Card, Col, Flex, Radio, Row, Typography } from 'antd';
import { MyInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';
import { capitalizeTranslated } from '../../../../shared';
import { useState } from 'react';

const { Text, Title, Paragraph } = Typography;

const BusinessSubscriptionPackagesCard = ({ subscriptionPlans, selectedSubscriptionPlan, setSelectedSubscriptionPlan, subscriptionValidity, discountData}) => {
    const {t} = useTranslation()
    const [expanded, setExpanded] = useState(false);
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
                                            (plan?.type) === selectedSubscriptionPlan?.type ? 'active-radio' : ''
                                        }`}
                                        onClick={() => setSelectedSubscriptionPlan(plan)}
                                    >
                                        <Row gutter={[12,12]} align="center" justify="space-between">
                                            <Col span={24} md={12} lg={14} xl={16}>
                                                <Flex align="flex-start" gap={6}>
                                                    <Radio value={plan?.type} />
                                                    <Flex vertical gap={0}>
                                                        <Text
                                                            className={`fw-500 fs-16 ${
                                                                plan?.type === selectedSubscriptionPlan?.type ? 'text-brand' : ''
                                                            }`}
                                                        >
                                                            {t(capitalizeTranslated(plan?.type))}
                                                        </Text>
                                                        <Paragraph
                                                            type="secondary"
                                                            className={`fs-13`}
                                                            ellipsis={{
                                                                rows: 1,
                                                                expandable:'collapsible',
                                                                symbol: expanded ? <Text className="text-brand">less</Text> : <Text className="text-brand">more</Text>,
                                                                onExpand: (_, info) => setExpanded(info.expanded),
                                                            }}
                                                        >
                                                            {t(plan?.description)}
                                                        </Paragraph>
                                                    </Flex>
                                                </Flex>
                                            </Col>
                                            <Col span={24} md={12} lg={10} xl={8}>     
                                                <Title level={4} className="m-0">
                                                    <Flex justify='end' gap={4} wrap>
                                                        <sup className="fs-12 fw-600 text-grey">{t("SAR")}</sup>
                                                        {
                                                            subscriptionValidity === 'ENTERPRISE' ? (
                                                                "Custom Price"
                                                            ) : subscriptionValidity === 'YEARLY' ? (
                                                                discountData?.discount?.packageType === plan?.type ? discountData?.finalPrice ?? plan?.yearlyPrice : plan?.yearlyPrice
                                                            ) : (
                                                                discountData?.discount?.packageType === plan?.type ? discountData?.finalPrice ?? plan?.price : plan?.price
                                                            )
                                                        }
                                                        <span className="fs-12 fw-500 text-gray">/{t(capitalizeTranslated(subscriptionValidity))}</span>
                                                    </Flex>
                                                </Title>           
                                            </Col>
                                        </Row>
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
                        type={'number'}
                    />
                </Col>
            }
        </Row>
    );
};

export { BusinessSubscriptionPackagesCard };
