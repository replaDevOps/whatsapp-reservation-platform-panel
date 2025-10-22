
import { Breadcrumb, Card } from "antd";

const FaqBreadcrumb = () => {
  return (
    <Card className="card-cs" style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item  className="fs-12">Website Pages</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }} className="fs-12">FAQs</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export default FaqBreadcrumb;



