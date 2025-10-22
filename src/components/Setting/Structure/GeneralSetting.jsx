import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Space,
  Tag,
  Typography,
  Button,
  Upload,
   Select,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const GeneralSettings = () => {
  

  const defaultAvailability = {
    Monday: ["09:00 am", "06:00 pm"],
    Tuesday: ["09:00 am", "06:00 pm"],
    Wednesday: ["09:00 am", "06:00 pm"],
    Thursday: ["09:00 am", "06:00 pm"],
    Friday: [],
    Saturday: ["09:00 am", "06:00 pm"],
    Sunday: ["09:00 am", "06:00 pm"],
  };
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
    <Card
      title="General Settings"
      bordered={false}
      style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 20,
      }}
      className="card-cs"
    >
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
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter a username!" }]}
            >
              <Input placeholder="Enter username" />
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
      
      </Form>
          <Row>

        <Col span={24}>
  <Title level={5} style={{ marginBottom: 8 }}>
    Services
  </Title>
  <Card
    style={{
      width: "100%",
      height: "auto",
      backgroundColor: "#F4F5F6",
      padding: "6px", // 👈 padding kam kar di
    }}
    bodyStyle={{ padding: "8px" }} // 👈 andar ka padding bhi kam kar di
  >
    <Space wrap size={[4, 8]}> {/* 👈 size se gap control */}
      <Tag className="bg-white br-10">Service Name</Tag>
      <Tag className="bg-white br-10">Service Name</Tag>
      <Tag className="bg-white br-10">Service Name</Tag>
      <Tag className="bg-white br-10">Service Name</Tag>
    </Space>
  </Card>
</Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <h6 className="fs-14">My Availability</h6>
            <br />
            {Object.entries(defaultAvailability).map(([day, times]) => (
              <p
                key={day}
                style={{ marginBottom: "8px", fontSize: "15px" }}
              >
                <strong>{day}:</strong>{" "}
                {times.length ? `${times[0]} - ${times[1]}` : "Day Off"}
              </p>
            ))}
          </Col>
          </Row>
        
    </Card>
  );
};

export default GeneralSettings;
