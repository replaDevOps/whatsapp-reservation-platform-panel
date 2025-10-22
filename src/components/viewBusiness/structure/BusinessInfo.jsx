import {
  ArrowLeftOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Flex, Button, Image, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const BranchInfo = ({ business }) => {
  const navigate = useNavigate();
  const planColor =
    business.subscriptionPlan === "Pro Plan"
      ? "#FF3D3A"
      : business.subscriptionPlan === "Standard Plan"
      ? "#7D40FF"
      : business.subscriptionPlan === "Enterprise Plan"
      ? "#74B500"
      : "#019F8B";

  const image = `/assets/businessesLogos/${business.logo}`;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Flex vertical>
        <Card style={{ borderRadius: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Flex align="top" gap={4}>
              <Button
                type="text"
                onClick={goBack}
                icon={<ArrowLeftOutlined style={{ fontSize: 20 }} />}
              />
              <div>
                <Flex align="center" gap={12}>
                  <Image
                    src={image}
                    alt="Logo"
                    width={35}
                    height={35}
                    preview={false}
                    style={{ borderRadius: "50%" }}
                  />
                  <h3>{business.businessName}</h3>
                  <Tag style={{ fontWeight: 300 }}>{business.type}</Tag>
                </Flex>
                <Flex
                  style={{ marginTop: "10px", color: "gray" }}
                  align="center"
                  gap={1}
                >
                  <Flex align="center" gap={5}>
                    <UserOutlined style={{ marginRight: 2, fontSize: 20 }} />
                    <p style={{ fontSize: "13px" }}>{business.customerName}</p>
                  </Flex>
                  <Flex align="center" gap={5} style={{ marginLeft: 8 }}>
                    <PhoneOutlined
                      style={{
                        marginRight: 2,
                        marginLeft: 1,
                        fontSize: 20,
                      }}
                    />
                    <p style={{ fontSize: "13px" }}>{business.phoneNumber}</p>
                  </Flex>
                  <Flex align="center" gap={5} style={{ marginLeft: 8 }}>
                    <MailOutlined
                      style={{
                        marginRight: 2,
                        marginLeft: 1,
                        fontSize: 20,
                      }}
                    />
                    <p style={{ fontSize: "13px" }}>{business.email}</p>
                  </Flex>
                  <Flex align="center" gap={5} style={{ marginLeft: 8 }}>
                    <GlobalOutlined
                      style={{
                        marginRight: 2,
                        marginLeft: 1,
                        fontSize: 20,
                      }}
                    />
                    <p style={{ fontSize: "13px" }}>{business.website}</p>
                  </Flex>
                </Flex>
              </div>
            </Flex>

            {/* Right side: Another action (if needed) */}
            {/* Example extra button */}
            {/* <Button type="primary" icon={<PlusOutlined />}>Add</Button> */}
            <Flex align="center" gap={1} vertical>
              <div
                style={{
                  textAlign: "right",
                  margin: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <h3 style={{ margin: 0, color: "black" }}>Subscription Plan</h3>
                <Tag
                  style={{
                    backgroundColor: `${planColor}`,
                    border: "none",
                    color: "white",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  {business.subscriptionPlan}
                </Tag>
              </div>
              <div
                style={{
                  // textAlign: "right",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <p style={{ color: "gray", fontSize: 15, marginLeft: 50 }}>
                  Expires on {business.Expirydate}
                </p>
              </div>
            </Flex>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default BranchInfo;
