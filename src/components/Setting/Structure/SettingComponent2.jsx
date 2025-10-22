


import { Breadcrumb, Card, Flex } from "antd";

const SettingComponent2 = () => {
  return (
    <Flex vertical>
      <Card style={{ borderRadius: "8px", padding: "12px",  }} className="card-cs">
        <Breadcrumb separator="">
          <Breadcrumb.Item>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "600" }} className="fs-18">
                Setting
                </span>
              <span style={{ color: "#888" }} className="fs-15">
                Manage all the admin setting in your system
              </span>
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
    </Flex>
  );
};

export default SettingComponent2;


