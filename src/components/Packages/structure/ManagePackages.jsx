


import { Breadcrumb, Card, Flex } from "antd";

const ManagePackages = () => {
  return (
    <Flex vertical>
      <Card className="card-cs" style={{ borderRadius: "8px" }}>
        <Breadcrumb separator="">
          <Breadcrumb.Item>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "600" }} className="fs-18">
                All Package
                </span>
              <span style={{ color: "#888" }} className="fs-15">
               Manage all the packages in your system
              </span>
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
    </Flex>
  );
};

export default ManagePackages;


