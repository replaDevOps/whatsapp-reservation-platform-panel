
import { Breadcrumb, Card } from "antd";

const Packages = () => {
  return (
    <Card className="card-cs" style={{ borderRadius: "8px" }} classNames='card-cs'>
      <Breadcrumb>
        <Breadcrumb.Item  className="fs-12">Package Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }} className="fs-12">All Package</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export default Packages;




