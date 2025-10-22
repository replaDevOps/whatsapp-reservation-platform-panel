import React, { useState } from "react";
import { Modal, Button, Form, Row,Col,Input } from "antd";



const EditPassword = ({ open, onClose, onSave }) => {
 
  const [form] = Form.useForm();

  return (
    <Modal
      title="Edit Password"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={onSave}>
          Save
        </Button>,
      ]}
      centered
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
      

        {/* 3 inputs in one row */}
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Old Password" name="oldPassword" style={{ marginBottom: 10 }}>
              <Input.Password  visibilityToggle={true} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="New Password" name="newPassword" style={{ marginBottom: 10 }}>
              <Input.Password  visibilityToggle={true} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Re-type Password" name="confirmPassword" style={{ marginBottom: 10 }}>
              <Input.Password  visibilityToggle={true} />
            </Form.Item>
          </Col>
        </Row>

        
         
       
      </Form>
      
    </Modal>
  );
};

export default EditPassword;