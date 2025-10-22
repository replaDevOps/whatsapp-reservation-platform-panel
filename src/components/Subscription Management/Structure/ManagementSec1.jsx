
import { Breadcrumb, Card } from "antd";

const Management = () => {
  return (
    <Card className="card-cs" style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item  className="fs-12">Package Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }} className="fs-12">Subscription Management</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export default Management;



