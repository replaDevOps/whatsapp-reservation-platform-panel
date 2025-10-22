"use client";
import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Card,
  Pagination,
  Flex,
} from "antd";
import dayjs from "dayjs";
import { bookingsData } from "../../../data/BookingsData";
import { CustomPagination } from "../../Ui";

const { Option } = Select;
const { RangePicker } = DatePicker;

const BookingTable = () => {
  const [searchText, setSearchText] = useState("");
  const [businessFilter, setBusinessFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const [pageSize, setPageSize] = useState(10); // rows per page
  const [currentPage, setCurrentPage] = useState(1); // current page

  // --- filter data ---
  const filteredData = bookingsData.filter((item) => {
    const bookingMatch = item.bookingId
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const businessMatch = businessFilter
      ? item.businessName === businessFilter
      : true;
    const branchMatch = branchFilter ? item.branchName === branchFilter : true;
    const statusMatch = statusFilter ? item.status === statusFilter : true;
    const dateMatch = dateRange.length
      ? dayjs(item.dateTime, "DD/MM/YY hh:mma").isAfter(dateRange[0]) &&
        dayjs(item.dateTime, "DD/MM/YY hh:mma").isBefore(dateRange[1])
      : true;
    return (
      bookingMatch && businessMatch && branchMatch && statusMatch && dateMatch
    );
  });

  // --- table columns ---
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      fixed: "left",
      width: 120,
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      align: "start",
      width: 180,
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      align: "start",
      width: 180,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "start",
      width: 200,
      render: (text, record) => (
        <div>
          {text}
          <br />
          <small>{record.customerPhone}</small>
        </div>
      ),
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      align: "start",
      width: 150,
    },
    {
      title: "Service Provider",
      dataIndex: "serviceProvider",
      key: "serviceProvider",
      align: "start",
      width: 180,
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      width: 160,
      align: "start",
      render: (text) =>
        dayjs(text, "DD/MM/YY hh:mma").format("DD/MM/YY hh:mma"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "start",
      width: 140,
      render: (status) => {
        const normKey = status.toLowerCase().replace(/[\s-]/g, "");
        const colorMap = {
          completed: "green",
          cancelled: "red",
          canceled: "red",
          pending: "orange",
          inprogress: "blue",
          noshow: "cyan",
          confirmed: "geekblue",
        };
        const color = colorMap[normKey] || "default";
        const label = status
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return (
          <Tag
            color={color}
            style={{
              borderRadius: 999,
              padding: "2px 12px",
              textTransform: "none",
            }}
          >
            {label}
          </Tag>
        );
      },
    },
  ];

  const businessOptions = [...new Set(bookingsData.map((b) => b.businessName))];
  const branchOptions = [...new Set(bookingsData.map((b) => b.branchName))];
  const statusOptions = [...new Set(bookingsData.map((b) => b.status))];

  // --- pagination slice ---
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <Card className="card-cs" >
      {/* filters */}
      <Flex style={{ marginBottom: 16 }} gap={5} justify="space-between">
        <Flex gap={3}>
          <Input
            placeholder="Search Booking ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260 }}
          />
          <Select
            placeholder="Filter by Business"
            value={businessFilter || undefined}
            onChange={setBusinessFilter}
            allowClear
            style={{ width: 153 }}
          >
            {businessOptions.map((b) => (
              <Option key={b} value={b}>
                {b}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by Branch"
            value={branchFilter || undefined}
            onChange={setBranchFilter}
            allowClear
            style={{ width: 141 }}
          >
            {branchOptions.map((b) => (
              <Option key={b} value={b}>
                {b}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            allowClear
            style={{ width: 96 }}
          >
            {statusOptions.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        </Flex>
        <div>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="DD/MM/YY"
            style={{ width: 230 }}
          />
        </div>
      </Flex>

      {/* table */}
      <div
        style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#00bcd4 transparent",
          backgroundColor: "white",
        }}
      >
        <Table
          bordered
          className="custom-table"
          columns={columns}
          dataSource={paginatedData}
          pagination={false} // disable built-in
          scroll={{ x: "max-content" }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-white"
          }
          rowKey={(record) => record.bookingId}
        />

        <CustomPagination
          total={filteredData.length}
          current={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </Card>
  );
};

export default BookingTable;
