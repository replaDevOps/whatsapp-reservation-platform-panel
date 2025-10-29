import { Row, Col, Form, Space, Flex, Typography, Switch } from "antd";
import { useState, useEffect } from "react";
import { MyDatepicker } from "../Forms";

const { Text } = Typography;
const TimeForm = ({ dayKey, title, form, editactive }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(dayKey !== "Friday");

    const isEditable = editactive ?? true;
    const handleSwitchChange = (checked) => {
        setIsSwitchOn(checked);
    };

    useEffect(() => {
        const fields = form.getFieldValue(dayKey) || [];
        if (fields.length === 0) {
            form.setFieldsValue({ [dayKey]: [{ fromTime: null, toTime: null }] });
        }
    }, [dayKey, form]);

    return (
        <Form.List name={dayKey}>
            {(fields) => (
                <Space direction="vertical" className="w-100 mb-3">
                    <Row gutter={[16, 16]} className="mb-3" align="middle">
                        <Col
                            lg={{ span: 6 }}
                            md={{ span: 24 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                        >
                            <Flex align="center" gap={10}>
                                <Switch
                                    size="small"
                                    checked={isSwitchOn}
                                    onChange={handleSwitchChange}
                                />
                                <Text className="fw-500">{title}</Text>
                            </Flex>
                        </Col>
                        <Col
                            lg={{ span: 18 }}
                            md={{ span: 24 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                        >
                            {fields.map(({ key, name }) => (
                                <Row
                                    key={key}
                                    gutter={[16, 16]}
                                    align="middle"
                                    className="mb-1"
                                >
                                    {
                                        isSwitchOn ? 
                                        <>
                                            <Col xs={24} sm={24} md={12} lg={12}>
                                                <MyDatepicker
                                                    withoutForm
                                                    name={[name, "fromTime"]}
                                                    placeholder="From"
                                                    required
                                                    message="Please enter from time"
                                                    disabled={!isEditable}
                                                    value={form.getFieldValue([
                                                        dayKey,
                                                        name,
                                                        "fromTime",
                                                    ])}
                                                    use12Hours format="h:mm A"
                                                />
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12}>
                                                <MyDatepicker
                                                    withoutForm
                                                    name={[name, "toTime"]}
                                                    placeholder="To"
                                                    required
                                                    message="Please enter to time"
                                                    disabled={!isEditable}
                                                    value={form.getFieldValue([
                                                        dayKey,
                                                        name,
                                                        "toTime",
                                                    ])}
                                                    use12Hours format="h:mm A"
                                                />
                                            </Col>
                                        </>
                                        :
                                        <Col span={24}>
                                            <Flex className="offday" gap={5} align="center">
                                                <img src="/assets/icons/off.webp" width={20} alt='not allow icon' fetchPriority="high" />
                                                <Text italic className="text-gray">Day Off</Text>
                                            </Flex>
                                        </Col>
                                    }
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </Space>
            )}
        </Form.List>
    );
};

export { TimeForm };
