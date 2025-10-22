import { Flex, Form, Input, Select, Button, Upload, Row, Col,Breadcrumb,Card} from 'antd'
import React from 'react'
import { StaffManagement } from './StaffMangment'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { TimeForm } from '../../Forms/TimeForm';

const { Option } = Select;

function Editstaff() {

     const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Replace with your upload URL
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };


  return (
    <div>

<Flex vertical gap={24}>
         <Card style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Staff Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Staffs</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Edit</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
      </Flex>
      <div className="add-staff-container">
      <div className="header">
        <ArrowLeftOutlined />
        <span className="title">Edit Staff</span>
      </div>
      
      <div className="form-upload-container">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} className="upload-btn">
            Upload Image
          </Button>
        </Upload>
      </div>

      <Form
        name="add_staff_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter a name!' }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter a phone number!' }]}
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
              rules={[{ required: true, message: 'Please enter a email!' }]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password!' }]}
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
              rules={[{ required: true, message: 'Please choose services!' }]}
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
              rules={[{ required: true, message: 'Please choose a role!' }]}
            >
              <Select placeholder="Choose role">
                <Option value="role1">Role 1</Option>
                <Option value="role2">Role 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Flex vertical gap={10}>
        <TimeForm/>
      </Flex>
    </div>
    </div>
  )
}

export default Editstaff
