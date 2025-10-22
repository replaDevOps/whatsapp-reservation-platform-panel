import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import EditPassword from "../../Modal/EditPassword";

const { Title } = Typography;

const PasswordManager = () => {
  const [form] = Form.useForm();
  const [isEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "15px",
        width: "100%", // 👈 fixed width
        margin: "10px auto", // 👈 center align with spacing
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          oldPassword: "myOldPassword123",
          newPassword: "myNewPassword456",
          confirmPassword: "myNewPassword456",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 10 }}
        >
          <Col>
            <h4 level={6} style={{ margin: 0 }} className="fs-13">
              Password Manager
            </h4>
          </Col>
          <Col>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
              Edit
            </Button>
          </Col>
        </Row>

        {/* 3 inputs in one row */}
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              style={{ marginBottom: 10 }}
            >
              <Input.Password disabled={!isEditing} visibilityToggle={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="New Password"
              name="newPassword"
              style={{ marginBottom: 10 }}
            >
              <Input.Password disabled={!isEditing} visibilityToggle={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Re-type Password"
              name="confirmPassword"
              style={{ marginBottom: 10 }}
            >
              <Input.Password disabled={!isEditing} visibilityToggle={true} />
            </Form.Item>
          </Col>
        </Row>

        {isEditing && (
          <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">
              Save Password
            </Button>
          </Form.Item>
        )}
      </Form>
      <EditPassword open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};

export default PasswordManager;
