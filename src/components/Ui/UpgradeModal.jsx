
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

const ChangePlanModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form Submitted:", values);
    if (onSave) onSave(values);
  };

  return (
    <Modal
      title="Change Subscription Plan"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      height={700}
    >
      <p style={{ marginBottom: 15, color: "#555" }}>
        Assign a new package to a business or switch from its current plan.
      </p>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          businessName: "Medicine",
          businessType: "Spa",
          businessEmail: "abc@gmail.com",
          subscriptionPlan: "Basic",
          period: "Monthly",
          expiryDate: "12/02/2025",
        }}
      >
        {/* Business Name */}
        <Form.Item style={{marginBottom:5}}  label="Business Name" name="businessName">
          <Input disabled />
        </Form.Item>

        {/* Business Type */}
        <Form.Item style={{marginBottom:5}} label="Business Type" name="businessType">
          <Select disabled>
            <Option value="Spa">Spa</Option>
            <Option value="Clinic">Clinic</Option>
            <Option value="Barber">Barber</Option>
            <Option value="General">General</Option>
          </Select>
        </Form.Item>

        {/* Business Email */}
        <Form.Item style={{marginBottom:5}} label="Business Email" name="businessEmail">
          <Input disabled />
        </Form.Item>

        {/* Subscription Plan */}
        <Form.Item style={{marginBottom:5}} label="Subscription Plan" name="subscriptionPlan">
          <Select>
            <Option value="Basic">Basic</Option>
            <Option value="Standard">Standard</Option>
            <Option value="Premium">Premium</Option>
            <Option value="Enterprise">Enterprise</Option>
          </Select>
        </Form.Item>

        {/* Period */}
        <Form.Item style={{marginBottom:5}} label="Period" name="period">
          <Select>
            <Option value="Monthly">Monthly</Option>
            <Option value="Yearly">Yearly</Option>
          </Select>
        </Form.Item>

        {/* Start Date */}
        <Form.Item style={{marginBottom:5}} label="Start Date" name="startDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Expiry Date */}
        <Form.Item  label="Expiry Date" name="expiryDate">
          <Input disabled />
        </Form.Item>

        {/* Footer Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Confirm & Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePlanModal;
