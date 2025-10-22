import { Breadcrumb, Card } from "antd";

const AddBusinessCrumb = () => {
  return (
    <Card style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Business Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Add Businesses</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export  {AddBusinessCrumb};

