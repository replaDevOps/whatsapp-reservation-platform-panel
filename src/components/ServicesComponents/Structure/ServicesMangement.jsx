

import { Breadcrumb, Card } from "antd";

const ServiceManagement = () => {
  return (
    <Card style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Service Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Services</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export  {ServiceManagement};




