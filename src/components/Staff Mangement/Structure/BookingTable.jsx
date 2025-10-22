import { useState } from "react";
import {
  Card,
  Flex,
  Table,
  Typography,
  Input,
  Select,
  Space,
  Tag,
  Rate,
  Button,
  Avatar,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

import { CustomPagination } from "../../Ui";
import {
  SearchOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const BookingTable = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "ID", key: "ID" },
    { title: "Service Name", dataIndex: "service", key: "service" },
    { title: "Customer Name", dataIndex: "CustomerName", key: "CustomerName" },
    { title: "Booking Date & Time", dataIndex: "Booking", key: "Booking" },
    {
      title: "Booking Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let style = {};
        if (status === "In-Progress") {
          style = { color: "#054DBA", backgroundColor: "#054DBA1A" };
        } else if (status === "Cancelled") {
          style = { color: "#EF4444", backgroundColor: "#EF44441A" };
        } else if (status === "No-show") {
          style = { color: "#05BAB5", backgroundColor: "#05BAB51A" };
        } else if (status === "Completed") {
          style = { color: "#22C55E", backgroundColor: "#22C55E1A" };
        } else if (status === "Pending") {
          style = { color: "#BA4A05", backgroundColor: "#BA4A051A" };
        }
        return (
          <span
            style={{
              ...style,
              padding: "3px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "Rating",
      render: (value) => (
        <Rate
          disabled
          defaultValue={value}
          style={{ color: "#F7CB46", fontSize: 15 }}
        />
      ),
    },
  ];

  const data = [
    {
      key: 1,
      ID: "1153",
      CustomerName: "Fayez Ali",
      service: "Pedicure",
      Booking: "26/02/2020 5:12 AM",
      Rating: 5,
      status: "In-Progress",
    },
    {
      key: 2,
      ID: "1161",
      CustomerName: "Mohammad Darwaish",
      service: "Advanced Moisturising",
      Booking: "27/02/2020 11:02 AM",
      Rating: 2,
      status: "Cancelled",
    },
    {
      key: 3,
      ID: "1160",
      CustomerName: "Jihad Bakir",
      service: "Straightening",
      Booking: "27/02/2020 4:18 AM",
      Rating: 5,
      status: "No-show",
    },
    {
      key: 4,
      ID: "1154",
      CustomerName: "Fahd Bakir",
      service: "Beard Styling",
      Booking: "27/02/2020 8:03 AM",
      Rating: 3,
      status: "Completed",
    },
    {
      key: 5,
      ID: "1148",
      CustomerName: "Salim Al Tajir",
      service: "Perming",
      Booking: "27/02/2020 2:48 AM",
      Rating: 5,
      status: "Pending",
    },
  ];

  // Pagination change
  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  return (
    <Card className="radius-12 border-gray h-100 card-cs">
      {/* Header */}
      <div
        className="card-header mb-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            type="text"
            onClick={() => navigate("/")}
            icon={<ArrowLeftOutlined />}
            className="back-button"
          />

          {/* Avatar + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar size={40} src="https://via.placeholder.com/150" />
            <Title level={4} className="card-title" style={{ margin: 0 }}>
              Fayaz Ali
            </Title>
          </div>
        </div>

        {/* Right side */}
        <Tag color="green" className="active-tag">
          Active
        </Tag>
      </div>

      {/* Filters */}
      <Flex gap={10}  className="mb-2">
        <Space size="middle" align="center">
          <Input
            placeholder="Search by Service Name"
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            style={{ width: 300 }}
            allowClear
          />
          <Select placeholder="Status" style={{ width: 150 }} allowClear>
            <Option value="in-progress">In-Progress</Option>
            <Option value="pending">Pending</Option>
            <Option value="no-show">No-Show</Option>
            <Option value="completed">Completed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Space>
        <Flex flex="auto" justify="end">

        <Space >
          <RangePicker
            format="DD/MM/YYYY"
            defaultValue={[
              dayjs("01/01/2025", "DD/MM/YYYY"),
              dayjs("31/01/2025", "DD/MM/YYYY"),
            ]}
            style={{ height: 32, width: 260, fontSize: 14, borderRadius: 6 }}
            allowClear={false}
            suffixIcon={<CalendarOutlined style={{ color: "#070101ff" }} />}
          />
        </Space>
        </Flex>
      </Flex>

      {/* Table */} 
      <Flex vertical gap={20}>
        <Table
          size="large"
          columns={columns}
          dataSource={data}
          className="pagination table-cs table"
          pagination={false}
          scroll={{ x: 700 }}
          rowHoverable={false}
        />

        <CustomPagination
          total={data.length}
          current={current}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Flex>
    </Card>
  );
};

export { BookingTable };
