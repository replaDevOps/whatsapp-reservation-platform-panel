

import { Breadcrumb, Card } from "antd";

const StaffManagement = () => {
  return (
    <Card style={{ borderRadius: "8px" }} className="card-cs">
      <Breadcrumb>
        <Breadcrumb.Item>Staff Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Staffs</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export  {StaffManagement};




