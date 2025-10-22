import { Breadcrumb, Card } from "antd";

const Business = () => {
  return (
    <Card style={{ borderRadius: "8px", }} className="card-cs">
      <Breadcrumb>
        <Breadcrumb.Item>Business Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>All Businesses</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export  {Business};




