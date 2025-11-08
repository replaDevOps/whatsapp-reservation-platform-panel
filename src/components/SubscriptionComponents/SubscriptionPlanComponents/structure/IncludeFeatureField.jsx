import { Row, Col, Space, Flex, Typography, Switch, Select } from "antd";
import { useState, useEffect } from "react";
import { MyInput } from "../../../Forms";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
export const IncludeFeatureField = ({
    title,
    fields = [],
    form, // optional AntD form instance
    dayKey,
    defaultSwitch = false,
    editable = true,
    withSelect = false,
    selectOptions = [], // global fallback options
    disabledKeys = [], // 👈 new prop
    onSwitchChange,
    onSelectChange,
    onValueChange, // callback for all row values
    }) => {
        
    const [localValues, setLocalValues] = useState({});
    const {t} = useTranslation()

    useEffect(() => {
        if (Object.keys(localValues).length === 0 && fields.length > 0) {
            const initialValues = fields.reduce((acc, f) => {
                const fieldSelectOptions = f.selectOptions || selectOptions;
                acc[f.key] = {
                    value: "",
                    select: fieldSelectOptions?.[0]?.value || "",
                    active: defaultSwitch,
                };
                return acc;
            }, {});
            setLocalValues(initialValues);
        }
    }, [fields, selectOptions, defaultSwitch]);

    
    const handleRowSwitchChange = (key, checked) => {
        const updated = {
            ...localValues,
            [key]: { ...localValues[key], active: checked },
        };
        setLocalValues(updated);
        onSwitchChange?.(checked, key);
        onValueChange?.(updated);
    };

  
    const handleInputChange = (key, value) => {
        const updated = {
            ...localValues,
            [key]: { ...localValues[key], value },
        };
        setLocalValues(updated);
        onValueChange?.(updated);
    };

    
    const handleSelectChange = (key, value) => {
        const updated = {
            ...localValues,
            [key]: { ...localValues[key], select: value },
        };
        setLocalValues(updated);
        onSelectChange?.(value, key);
        onValueChange?.(updated);
    };

    return (
        <Space direction="vertical" className="w-100 mb-3">
            <Row gutter={[16, 16]}>
                {
                    title &&
                    <Col span={24}>
                        <Title level={5} className="fw-500 m-0">{t(title)}</Title>
                    </Col>
                }

                {
                    fields.map(({ key, name, placeholder = "Enter value", selectOptions: fieldOptions }) => {
                        const current = localValues[key] || {};
                        const isActive = current.active;
                        const isRowDisabled = disabledKeys.includes(key);

                        const options = fieldOptions || selectOptions;
                        return (
                            <Col key={key} span={24}>
                                <Flex align="center" gap={10}>
                                    <Switch
                                        size="small"
                                        checked={!!isActive}
                                        disabled={isRowDisabled}
                                        onChange={(checked) => handleRowSwitchChange(key, checked)}
                                    />
                                    <MyInput
                                        withoutForm={!form}
                                        name={form ? [dayKey, name, "name"] : undefined}
                                        placeholder={t(placeholder)}
                                        required
                                        message={t("Please enter value")}
                                        disabled={!editable || !isActive || isRowDisabled}
                                        value={form ? undefined : current.value}
                                        onChange={(e) =>
                                            form ? null : handleInputChange(key, e.target.value)
                                        }
                                        addonAfter={
                                            withSelect && (
                                            <Select
                                                value={current.select}
                                                disabled={!isActive || isRowDisabled}
                                                // className="w-100px"
                                                onChange={(value) => handleSelectChange(key, value)}
                                            >
                                                {options.map((opt) => (
                                                    <Select.Option key={opt.value} value={opt.value}>
                                                        {t(opt.label)}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                            )
                                        }
                                    />
                                </Flex>
                            </Col>
                        );
                    })
                }
            </Row>
        </Space>
    );
};
