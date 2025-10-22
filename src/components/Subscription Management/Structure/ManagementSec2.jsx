
import { Breadcrumb, Card, Flex } from "antd";

const ManageSubscription = () => {
  return (
    <Flex vertical>
      <Card className="card-cs" style={{ borderRadius: "8px"  }}>
        <Breadcrumb separator="">
          <Breadcrumb.Item>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "600" }} className="fs-18">
                Subscription Management
                </span>
              <span style={{ color: "#888" }} className="fs-15">
               Manage all the subscription in your system
              </span>
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
    </Flex>
  );
};

export default ManageSubscription 


