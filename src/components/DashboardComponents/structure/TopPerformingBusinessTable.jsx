import { Card, Table, Avatar, Flex, Button } from "antd";
import { topBusinesses } from "../../../data/homepageData";

const TopPerformingBusinesses = () => {
  const columns = [
    {
      title: "Business Name",
      dataIndex: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar
            src={record.image || "/assets/icons/dummy.png"} // fallback if no image
            size={38}
            style={{margin:"5px"}}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "start",
    },
    {
      title: "Total Bookings",
      dataIndex: "total",
      align: "start",
    },
  ];

  return (
    <Card style={{ borderRadius: 8}} className="card-cs">
      <Flex justify="space-between">
        <div>
          <h3 style={{ marginBottom: 2 }}>Top Performing Businesses</h3>
          <p style={{ marginBottom: 12, color: "gray" }}>Top Ranked</p>
        </div>
        <div>
          <Button>This Month</Button>
        </div>
      </Flex>
      <Table
        bordered
        className="custom-table"
        columns={columns}
        dataSource={topBusinesses}
        pagination={false}
        rowKey="name"
        size="small"
        style={{marginTop:"9px"}}
      />
    </Card>
  );
};

export default TopPerformingBusinesses;
