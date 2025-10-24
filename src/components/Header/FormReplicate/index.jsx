import { Row, Col, Form, Space, Flex } from "antd";
import { useEffect } from "react";
import { MyInput, MySelect } from "../../Forms";
import { MinusCircleFilled } from "@ant-design/icons";
import { ModuleTopHeading } from "../../PageComponent";

const FormReplicate = ({ dayKey, title, form, fieldsConfig = [] }) => {
  useEffect(() => {
    const fields = form.getFieldValue(dayKey) || [];
    if (fields.length === 0) {
      const defaultItem = {};
      fieldsConfig.forEach((f) => {
        defaultItem[f.name] = null;
      });
      form.setFieldsValue({ [dayKey]: [defaultItem] });
    }
  }, [dayKey, form, fieldsConfig]);

  return (
    <Form.List name={dayKey}>
      {(fields, { add, remove }) => (
        <Space direction="vertical" className="w-100">
          <Row gutter={[16, 16]} align="middle">
            <Col span={24}>
              <ModuleTopHeading level={5} name={title} onClick={() => add()} shape="round" />
            </Col>
            <Col span={24}>
              {fields.map(({ key, name }) => (
                <Row
                  key={key}
                  gutter={[16, 0]}
                  align="middle"
                  className="mb-1 bg-light-white p-2 rounded-8 mb-2"
                >
                  <Col span={24}>
                    <Flex justify="end">
                      <MinusCircleFilled className="text-red" onClick={() => remove(name)} />
                    </Flex>
                  </Col>

                  {fieldsConfig.map((field, index) => (
                    <Col key={index} xs={24} sm={24} md={24} lg={field.col || 6}>
                      {field.type === "input" ? (
                        <MyInput
                          label={field.label}
                          name={[name, field.name]}
                          placeholder={field.placeholder}
                          required={field.required}
                          message={field.message}
                          addonBefore={field.addonBefore}
                          className={field.className || ""}
                        />
                      ) : field.type === "select" ? (
                        <MySelect
                          label={field.label}
                          name={[name, field.name]}
                          placeholder={field.placeholder}
                          required={field.required}
                          message={field.message}
                          options={field.options || []}
                        />
                      ) : null}
                    </Col>
                  ))}
                </Row>
              ))}
            </Col>
          </Row>
        </Space>
      )}
    </Form.List>
  );
};

export { FormReplicate };
