import React from "react";
import CustomerTable from "../../components/Customers/Structure/CustomersTable";
import { Breadcrumb, Card } from "antd";

const Cunstomers = () => {
  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }} className="card-cs">
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "600" }}>Customers</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <CustomerTable />
    </div>
  );
};

export default Cunstomers;
