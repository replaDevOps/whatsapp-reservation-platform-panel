"use client";

import React, { useMemo, useState } from "react";
import { Table, Tag, Input, Select, Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import dashboardData from "../../../data/businessListData.js";

const { Search } = Input;

const BusinessBranchesTable = ({ businessId }) => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(undefined);
  const navigate = useNavigate(); // ✅

  // find the current business
  const business = useMemo(
    () => dashboardData.find((b) => b.businessId === businessId),
    [businessId]
  );

  // If no branches, return null (don't render anything)
  if (!business?.branches || business.branches.length === 0) {
    return null;
  }

  // filter branches
  const filteredBranches = business.branches.filter((branch) => {
    const matchName = branch.branchName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = statusFilter ? branch.status === statusFilter : true;
    return matchName && matchStatus;
  });

  const handleMenuClick = (record) => {
    navigate(`/businesses/${record.businessId}/branches/${record.branchId}`);
    console.log(record);
  };

  // columns for the table
  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      render: (branchName) => (
        <p style={{ padding: "2px 1px", textAlign: "left" }}>{branchName}</p>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => (
        <p style={{ padding: "2px 1px", textAlign: "left" }}>{phoneNumber}</p>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <p style={{ padding: "2px 1px", textAlign: "left" }}>{location}</p>
      ),
    },
    {
      title: "Total Bookings",
      dataIndex: "totalBookings",
      key: "totalBookings",
      render: (bookings) => (
        <p style={{ padding: "2px 1px", textAlign: "left" }}>{bookings}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
          style={{ borderRadius: "9999px", padding: "2px 12px" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "view",
            label: "View",
            onClick: () => handleMenuClick(record), // ✅ pass record here
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px",
        marginTop: "16px",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Search
            placeholder="Search by Branch Name"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 120 }}
            onChange={(value) => setStatusFilter(value)}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </div>
        <Button danger style={{ backgroundColor: "red", color: "white" }}>
          Deactivate business
        </Button>
      </div>

      <Table
        bordered
        className="custom-table"
        columns={columns}
        dataSource={filteredBranches}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
        rowKey={(record) => record.branchId}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-white"
        }
      />
    </div>
  );
};

export default BusinessBranchesTable;
