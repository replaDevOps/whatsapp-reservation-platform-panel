import { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Button,
  Typography,
  Dropdown,
  Space,
  Flex,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import EditPackages from "../../EditPackages/structure/EditPackages";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const packagesData = {
  basic: {
    name: "Basic",
    description: "Simple start for small setups",
    price: 200,
    billing: "mo",
    features: [
      "1 Branch",
      "1 Admin",
      "2 Receptionists",
      "WhatsApp Bot",
      "Manual Reminders",
      "Basic Dashboard",
    ],
  },
  standard: {
    name: "Standard",
    description: "Perfect for growing businesses",
    price: 500,
    billing: "mo",
    features: [
      "3 Branches",
      "3 Admins",
      "5 Receptionists",
      "WhatsApp Bot",
      "Email Reminders",
      "Advanced Dashboard",
      "Priority Support",
    ],
  },
  pro: {
    name: "Pro",
    description: "Advanced features for professionals",
    price: 1000,
    billing: "mo",
    features: [
      "10 Branches",
      "10 Admins",
      "20 Receptionists",
      "WhatsApp Bot",
      "Email & SMS Reminders",
      "Analytics Dashboard",
      "Dedicated Support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    description: "Custom solutions for large companies",
    price: 2500,
    billing: "mo",
    features: [
      "Unlimited Branches",
      "Unlimited Admins",
      "Unlimited Receptionists",
      "Full Automation",
      "Dedicated Account Manager",
      "Enterprise Dashboard",
      "24/7 Support",
    ],
  },
};

const PackageManagement = () => {
  const [selectedKey, setSelectedKey] = useState("basic");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [showEdit, setShowEdit] = useState(false); 

  const packageInfo = packagesData[selectedKey];

  const handleMenuClick = (e) => setSelectedKey(e.key);

  const billingMenu = {
    items: [
      { label: "Monthly", key: "Monthly" },
      { label: "Yearly", key: "Yearly" },
    ],
    onClick: ({ key }) => setBillingCycle(key),
  };

  // 👇 agar edit mode on hai to sirf EditPackages show hoga
  if (showEdit) {
    return (
      <div style={{ padding: 20 }}>
        {/* <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => setShowEdit(false)}
          style={{ marginBottom: 16 }}
        >
          Back to Packages
        </Button> */}
        <EditPackages />
      </div>
    );
  }

  return (
    <Layout
      style={{
        minHeight: "80vh",
        borderRadius: 8,
        padding: 0,
        gap: 20,
        background: "transparent",
      }}
    >
      {/* Sidebar */}
      <Sider
        width={220}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          borderRadius: 8,
          padding: "15px 0",
          height: "fit-content",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
          items={[
            { key: "basic", label: "Basic Package" },
            { key: "standard", label: "Standard Package" },
            { key: "pro", label: "Pro Package" },
            { key: "enterprise", label: "Enterprise Package" },
          ]}
        />
      </Sider>

      {/* Content */}
      <Content
        style={{
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background: "transparent",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0, fontSize: 16 }}>
            {packageInfo.name} Package
          </Title>

          {/* 👇 This button now opens EditPackages */}
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => setShowEdit(true)}
          >
            Edit Package
          </Button>
        </div>

        {/* Details Section */}
        <Card style={{ borderRadius: 12, padding: "18px" }}>
          {/* Title + Description */}
          <Flex style={{ marginBottom: 16, justifyContent: "space-between" }}>
            <div>
              <Title level={3} style={{ marginBottom: 4 }}>
                {packageInfo.name}
              </Title>
              <Text type="secondary">{packageInfo.description}</Text>
            </div>

            <Dropdown menu={billingMenu} placement="bottomRight">
              <Button style={{ borderRadius: 8 }}>
                {billingCycle} <DownOutlined />
              </Button>
            </Dropdown>
          </Flex>

          {/* Price */}
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <Title level={2} style={{ margin: 0 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: "normal",
                    marginRight: 4,
                    verticalAlign: "super",
                  }}
                >
                  SAR
                </span>
                {billingCycle === "Monthly"
                  ? packageInfo.price
                  : packageInfo.price * 10}
                <span style={{ fontSize: 16, fontWeight: "normal" }}>
                  /{billingCycle === "Monthly" ? "mo" : "yr"}
                </span>
              </Title>
            </div>
          </Space>

          {/* Border Line */}
          <div
            style={{
              borderBottom: "1px solid #f0f0f0",
              margin: "16px 0",
            }}
          />

          {/* Features */}
          <div>
            <Title level={5}>Included Features:</Title>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
              {packageInfo.features.map((feature, index) => (
                <li
                  key={index}
                  style={{
                    margin: "8px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckOutlined style={{ color: "green", marginRight: 8 }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default PackageManagement;
