import { useState, useMemo } from "react";
import {
  Card,
  Flex,
  Table,
  Select,
  Space,
  Tag,
  DatePicker,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { CustomPagination } from "../../Ui";
import { CalendarOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DemoRequestsTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Filters states
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  // Style for cells
  const cellStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 200,
  };

  // Status colors
  const statusColors = {
    Pending: "cyan",
    Contacted: "green",
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      align: "start",
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "EmailAddress",
      align: "start",
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phoneNumber",
      align: "start",
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
      align: "start",
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      align: "start",
      render: (text) => (
        <Tooltip title={text}>
          <div style={cellStyle}>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Booking Date & Time",
      dataIndex: "Booking",
      key: "Booking",
      align: "start",
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      align: "start",
      render: (text) => (
        <Tooltip title={text}>
          <div style={cellStyle}>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      CustomerName: "Ali Khan",
      email: "ali.khan@example.com",
      phone: "+92 300 1234567",
      businessType: "Salon",
      message: "Requesting a massage session. hello hello hello hello hello hello hello hello hello",
      notes: "Customer prefers morning appointments.",
      status: "Pending",
      Booking: "2025-09-21 14:30",
    },
    {
      key: "2",
      CustomerName: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      phone: "+92 322 9876543",
      businessType: "Gym",
      message: "Interested in a free trial.",
      notes: "Wants a discount voucher.",
      status: "Contacted",
      Booking: "2025-09-22 11:00",
    },
    {
      key: "3",
      CustomerName: "Zeeshan Malik",
      email: "zeeshan.malik@example.com",
      phone: "+92 345 1112233",
      businessType: "Restaurant",
      message: "Need a table for 4.",
      notes: "Requested window seating.",
      status: "Pending",
      Booking: "2025-09-22 19:00",
    },
    {
      key: "4",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "5",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "6",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "7",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "8",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "9",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "10",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session.",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
    {
      key: "11",
      CustomerName: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 331 4567890",
      businessType: "Spa",
      message: "Requesting a massage session. hello hello hello hello hello hello hello hello hello",
      notes: "Allergic to lavender oil.",
      status: "Contacted",
      Booking: "2025-09-23 15:00",
    },
  ];

  // FILTERED DATA
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchType = selectedType
        ? item.businessType.toLowerCase() === selectedType.toLowerCase()
        : true;

      const matchStatus = selectedStatus
        ? item.status.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      const matchDate = dateRange.length
        ? dayjs(item.Booking).isAfter(dayjs(dateRange[0]).startOf("day")) &&
          dayjs(item.Booking).isBefore(dayjs(dateRange[1]).endOf("day"))
        : true;

      return matchType && matchStatus && matchDate;
    });
  }, [selectedType, selectedStatus, dateRange]);

  // Pagination change
  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  const pagedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, current, pageSize]);

  return (
    <Card className="radius-12 border-gray h-100 card-cs">
      <div
        className="card-header mb-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "3px",
          }}
        >
          <h3>Demo Requests</h3>
          <p>Manage all the Customers who contacted you via Book a Demo</p>
        </div>
      </div>

      {/* Filters */}
      <Flex gap={10} className="mb-2">
        <Space size="middle" align="center">
          <Select
            placeholder="Business Type"
            style={{ width: 150 }}
            allowClear
            value={selectedType}
            onChange={setSelectedType}
          >
            <Option value="Salon">Salon</Option>
            <Option value="Gym">Gym</Option>
            <Option value="Restaurant">Restaurant</Option>
            <Option value="Spa">Spa</Option>
            <Option value="Car Wash">Car Wash</Option>
          </Select>
          <Select
            placeholder="Status"
            style={{ width: 150 }}
            allowClear
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Contacted">Contacted</Option>
          </Select>
        </Space>
        <Flex flex="auto" justify="end">
          <Space>
            <RangePicker
              format="DD/MM/YYYY"
              style={{
                height: 32,
                width: 260,
                fontSize: 14,
                borderRadius: 6,
              }}
              allowClear
              suffixIcon={<CalendarOutlined style={{ color: "#070101ff" }} />}
              onChange={(values) => setDateRange(values || [])}
            />
          </Space>
        </Flex>
      </Flex>

      {/* Table */}
      <Flex vertical  >
        <div
          style={{
            overflowX: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#00bcd4 transparent",
          }}
        >
          <Table
            size="large"
            rowClassName={(_, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-white"
            }
            columns={columns}
            dataSource={pagedData}
            className="pagination table-cs table"
            pagination={false}
            scroll={{ x: "max-content" }}
            rowHoverable={false}
          />
        </div>

        <CustomPagination
          total={filteredData.length}
          current={current}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Flex>
    </Card>
  );
};

export { DemoRequestsTable };