import React, { use, useState } from "react";
import {
  Form,
  Input,
  Radio,
  Tabs,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Upload,
  Select,
  Flex,
  Modal,
} from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import AddBusinessModal from "../Modal/AddBusinessModal";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const plans = [
  {
    key: "basic",
    name: "Basic",
    description: "Simple start for small setups",
    price: { monthly: 200, yearly: 2000 },
    features: [
      "1 Branch",
      "10 Doctor/Support Accounts",
      "2 Reception Accounts",
      "WhatsApp Bot",
      "Manual Reminders",
      "Basic Dashboard",
    ],
  },
  {
    key: "standard",
    name: "Standard",
    description: "For growing & scaling clinics",
    price: { monthly: 300, yearly: 3000 },
    features: [
      "2 Branches",
      "20 Doctor/Support Accounts",
      "5 Reception Accounts",
      "WhatsApp Bot",
      "Smart Reminders",
      "Advanced Dashboard",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    description: "Advanced tools for large teams",
    price: { monthly: 500, yearly: 5000 },
    features: [
      "5 Branches",
      "50 Doctor/Support Accounts",
      "10 Reception Accounts",
      "WhatsApp Bot",
      "AI Reminders",
      "Pro Dashboard",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "Custom workflow for full control",
    price: { monthly: "Custom", yearly: "Custom" },
    features: [
      "Unlimited Branches",
      "Unlimited Accounts",
      "Dedicated Support",
      "Custom Integrations",
    ],
  },
];

const AddBusinessForm = () => {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isModalVisible, setIsModalVisible] = useState(false);


  const plan = plans.find((p) => p.key === selectedPlan);

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

  const navigate = useNavigate();
  function cancelSaving() {
    navigate(-1);
  }

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "5px",
            paddingTop: "20px",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ fontSize: "20px" }} />}
            onClick={() => navigate(-1)}
          />
          <span>Add Business</span>
        </div>
      }
      bordered={false}
      style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 0,
      }}
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
              label="Business Name"
              rules={[{ required: true, message: "Please enter a name!" }]}
            >
              <Input placeholder="Enter business name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone_number"
              label="Customer Name"
              rules={[{ required: true, message: "Please Choose Customer" }]}
            >
              <Select placeholder="Choose customer">
                <Select.Option>Dummy</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="businessType"
              label="Business Type"
              rules={[
                { required: true, message: "Please Choose Business Type" },
              ]}
            >
              <Select placeholder="Choose business type">
                <Select.Option>Dummy</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="username" label="Website Link (optional)">
              <Input placeholder="Enter Website Link" />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ padding: "10px" }}>
          <Flex
            justify="space-between"
            
            style={{ width: "50%" }}
          >
            <div>
              <Title level={4}>
                Choose Packages <span style={{ color: "red" }}>*</span>
              </Title>
              <Text>Select Package</Text>
            </div>

            {/* Tabs for Monthly/Yearly */}
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => setBilling("monthly")}
                style={{
                  padding: "6px 12px",
                  marginRight: "8px",
                  border:
                    billing === "monthly"
                      ? "2px solid #00BFA6"
                      : "1px solid #ccc",
                  borderRadius: "6px",
                  background: billing === "monthly" ? "#00BFA6" : "transparent",
                  color: billing === "monthly" ? "#fff" : "#000",
                  cursor: "pointer",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                style={{
                  padding: "6px 12px",
                  border:
                    billing === "yearly"
                      ? "2px solid #00BFA6"
                      : "1px solid #ccc",
                  borderRadius: "6px",
                  background: billing === "yearly" ? "#00BFA6" : "transparent",
                  color: billing === "yearly" ? "#fff" : "#000",
                  cursor: "pointer",
                }}
              >
                Yearly
              </button>
            </div>
          </Flex>

          <Row gutter={24}>
            {/* Left Side - Plan Selection */}
            <Col span={12}>
              <Radio.Group
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                style={{ width: "100%",marginTop:"20px" }}
              >
                {plans.map((p) => (
                  <Card
                    key={p.key}
                    style={{
                      marginBottom: 16,
                      border:
                        selectedPlan === p.key
                          ? "2px solid #00BFA6"
                          : "1px solid #ddd",
                      borderRadius: "10px",
                    }}
                  >
                    <Radio value={p.key} style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Title level={5} style={{ margin: 0 }}>
                            {p.name}
                          </Title>
                          <Text type="secondary">{p.description}</Text>
                        </div>
                        <div>
                          <Text strong>
                            SAR{" "}
                            {p.price[billing] !== "Custom"
                              ? `${p.price[billing]}/mo`
                              : "Custom Price"}
                          </Text>
                        </div>
                      </div>
                    </Radio>
                  </Card>
                ))}
              </Radio.Group>
            </Col>

            {/* Right Side - Plan Details */}
            <Col span={12}>
              <Card
                title={plan.name}
                style={{
                  border: "2px solid #00BFA6",
                  borderRadius: "10px",
                  marginTop:"20px",
                  background: "#F7FFFD",
                }}
              >
                <Text>{plan.description}</Text>
                <Title level={2} style={{ marginTop: 10 }}>
                  {plan.price[billing] !== "Custom" ? (
                    <>
                      SAR {plan.price[billing]}
                      <Text type="secondary" style={{ fontSize: "16px" }}>
                        /mo
                      </Text>
                    </>
                  ) : (
                    "Custom Price"
                  )}
                </Title>

                <Title level={5} style={{ marginTop: 20 }}>
                  Included Features:
                </Title>
                <ul style={{ paddingLeft: "20px" }}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      <CheckOutlined
                        style={{ color: "#00BFA6", marginRight: "8px" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          </Row>

          {/* Buttons */}
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Button onClick={cancelSaving} style={{ marginRight: 10 }}>Cancel</Button>
            <AddBusinessModal/>
          </div>

        </div>
      </Form>
    </Card>
  );
};

export default AddBusinessForm;
