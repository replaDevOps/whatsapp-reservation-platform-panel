import { useState } from 'react';
import { Card, Col, Flex, Radio, Row, Space, Typography } from 'antd';
import { MyInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../../shared';

const { Text, Title } = Typography;

const BusinessSubscriptionPackagesCard = ({ data, selectedvalue, onSelect }) => {
    const [selectedId, setSelectedId] = useState(1);
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const handleSelect = (id) => {
        setSelectedId(id);
        onSelect?.(id);
        console.log('Selected Package ID:', id);
    };

    const period = selectedvalue === '1' ? "mon" : selectedvalue === '2' ? 'yr' : "year";

    return (
        <Row gutter={[12, 12]}>
            <Col span={24}>
                <Radio.Group value={selectedId} onChange={(e) => handleSelect(e.target.value)} className="w-100">
                    <Row gutter={[24, 12]}>
                        {data?.map((item) => (
                            <Col span={24} key={item.id}>
                                <Card
                                    hoverable
                                    className={`border-gray bg-transparent card-cs ${
                                        item.id === selectedId ? 'active-radio' : ''
                                    }`}
                                    onClick={() => handleSelect(item.id)}
                                >
                                    <Flex gap={10} align="center" justify="space-between" wrap>
                                        <Flex align="flex-start" gap={6}>
                                            <Radio value={item.id} />
                                            <Flex vertical gap={0}>
                                                <Text
                                                    className={`fw-500 ${
                                                        item?.id === selectedId ? 'text-brand' : ''
                                                    }`}
                                                >
                                                    {t(item.title)}
                                                </Text>
                                                <Text type="secondary">{t(item.subtitle)}</Text>
                                            </Flex>
                                        </Flex>

                                        <Title level={5} className="m-0">
                                            <Space size={8}>
                                                <sup className="fs-14 fw-600 text-grey">{t("SAR")}</sup>
                                                {isArabic ? toArabicDigits(item.amount):item.amount}
                                                <span className="fs-14 fw-500 text-gray">/{t(period)}</span>
                                            </Space>
                                        </Title>
                                    </Flex>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Radio.Group>
            </Col>

            {selectedId === 4 && (
                <>
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
                    <Col span={24}>
                        <MyInput
                            label={t("Discount Code")}
                            name="discountCode"
                            placeholder={t("Enter discount code (if any)")}
                            className="w-100"
                        />
                    </Col>
                </>
            )}
        </Row>
    );
};

export { BusinessSubscriptionPackagesCard };
