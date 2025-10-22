// components/AddCustomerModal.jsx
import React from "react";
import { Modal, Form, Input, Button } from "antd";

const AddCustomerModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Add Customer"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" requiredMark={false} >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter First Name" style={{ padding: "9px" }} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Last Name" style={{ padding: "9px" }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter Email Address" style={{ padding: "9px" }} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          initialValue="+966"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter Phone Number" style={{ padding: "9px" }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password
            placeholder="Enter Password"
            style={{ padding: "9px" }}
          />
        </Form.Item>
        <Form.Item
          justify="end"
          style={{ textAlign: "right", marginBottom: 0 }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSave}
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
