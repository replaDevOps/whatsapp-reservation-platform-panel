

import { Breadcrumb, Card } from "antd";

const BookingManagement = () => {
  return (
    <Card style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Booking Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>My Vacations</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export default BookingManagement;




