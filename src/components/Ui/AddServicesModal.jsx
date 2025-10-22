import React, {  } from "react";
import { Modal, Button, Input, Form, Typography } from "antd";

const { Title } = Typography;

const AddServiceModal = ({ open, onClose, onSave}) => {
 


  

  return (
    <>
      

      <Modal
        title={null}
        open={open}
        onCancel={onClose}
        footer={
 <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: "10px",
          }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </div>
        }
        centered
        width={600}
      >
        {/* Modal Heading */}
        <Title level={4} style={{ marginBottom: 20 }}>
            Hair cut
        </Title>

        {/* Form */}
        <Form layout="vertical">
          <Form.Item label="Service Name">
            <Input placeholder="Add service name" />
          </Form.Item>

          <Form.Item label="Duration">
            <Input placeholder="Add duration" suffix="Min" />
          </Form.Item>

          <Form.Item label="Buffer Time">
            <Input placeholder="Add buffer time" suffix="SAR" />
          </Form.Item>

          <Form.Item label="Assigned Branches">
            <Input placeholder="Branch Name of service provider" />
          </Form.Item>
        </Form>

        {/* Footer Buttons */}
       
      </Modal>
    </>
  );
};

export default AddServiceModal;
