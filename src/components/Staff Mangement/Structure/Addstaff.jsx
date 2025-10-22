import { Flex, Form, Input, Select, Button, Upload, Row, Col } from "antd";
import React from "react";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { TimeForm } from "../../Forms/TimeForm";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function Addstaff() {
  const navigate = useNavigate(); // ✅ Hook must be called inside component

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // Replace with your upload URL
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="add-staff-container">
      {/* Header */}
      <div className="header" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/staffs")}
        />
        <span className="title" style={{ fontSize: "18px", fontWeight: 600 }}>
          Add Staff
        </span>
      </div>

      {/* Upload Section */}
      <div className="form-upload-container" style={{ marginBottom: "20px" }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} className="upload-btn">
            Upload Image
          </Button>
        </Upload>
      </div>

      {/* Form */}
      <Form name="add_staff_form" onFinish={onFinish} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter a name!" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter a phone number!" }]}
            >
              <Input addonBefore="+966" placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter a email!" }]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter a password!" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="services"
              label="Services"
              rules={[{ required: true, message: "Please choose services!" }]}
            >
              <Select placeholder="Choose services">
                <Option value="service1">Service 1</Option>
                <Option value="service2">Service 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please choose a role!" }]}
            >
              <Select placeholder="Choose role">
                <Option value="role1">Role 1</Option>
                <Option value="role2">Role 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Staff
          </Button>
        </Form.Item>
      </Form>

      {/* TimeForm Section */}
      <Flex vertical gap={10} style={{ marginTop: "20px" }}>
        <TimeForm />
      </Flex>
    </div>
  );
}

export default Addstaff;
