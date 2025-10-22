import React, { useState } from "react";
import { Modal, Button, Form, Select } from "antd";
import ReactCountryFlag from "react-country-flag";

const { Option } = Select;

const LanguageModal = ({ open, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [language, setLanguage] = useState("English");

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { ...values, language };
        onSave(data); // parent function call
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Vacation"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      centered
    >
      <Form form={form} layout="vertical">
        {/* Language Selector */}
        <Form.Item label="Select Language" name="language" style={{ marginBottom: 10 }}>
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: "100%" }}
            optionLabelProp="label"
          >
            {/* English */}
            <Option
              value="English"
              label={
                <span>
                  <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{ fontSize: "20px", marginRight: 7 }}
                  />
                  English
                </span>
              }
            >
              <ReactCountryFlag countryCode="US" svg style={{ marginRight: 8 }} />
              English
            </Option>

            {/* Urdu */}
            <Option
              value="Urdu"
              label={
                <span>
                  <ReactCountryFlag
                    countryCode="PK"
                    svg
                    style={{ fontSize: "20px", marginRight: 7 }}
                  />
                  Urdu
                </span>
              }
            >
              <ReactCountryFlag countryCode="PK" svg style={{ marginRight: 8 }} />
              Urdu
            </Option>

            {/* Arabic */}
            <Option
              value="Arabic"
              label={
                <span>
                  <ReactCountryFlag
                    countryCode="SA"
                    svg
                    style={{ fontSize: "20px", marginRight: 7 }}
                  />
                  Arabic
                </span>
              }
            >
              <ReactCountryFlag countryCode="SA" svg style={{ marginRight: 8 }} />
              Arabic
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LanguageModal;