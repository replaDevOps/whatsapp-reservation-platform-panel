"use client";
import React, { useState } from "react";
import { Table, Input, Select, DatePicker } from "antd";
import activityLogData from "../../../data/activityLogData.js";
import { CustomPagination } from "../../Ui/CustomPagination.jsx";
// import CustomPagination from "./CustomPagination";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ActivityLogTable = () => {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // filter logic
  const filteredData = activityLogData.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesRole = roleFilter ? item.role === roleFilter : true;
    const matchesAction = actionFilter ? item.action === actionFilter : true;
    let matchesDate = true;
    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      const itemDate = new Date(
        item.dateTime.split(" ")[0].split("/").reverse().join("-")
      );
      matchesDate = itemDate >= start && itemDate <= end;
    }
    return matchesName && matchesRole && matchesAction && matchesDate;
  });

  const columns = [
    { title: "Name", dataIndex: "name", key: "name",align:"start" },
    { title: "Role", dataIndex: "role", key: "role",align:"start" },
    { title: "Action", dataIndex: "action", key: "action",align:"start" },
    { title: "Activity", dataIndex: "activity", key: "activity",align:"start" },
    { title: "Date & Time", dataIndex: "dateTime", key: "dateTime",align:"start" },
  ];

  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 8 }}>Activity Log</h3>
      <p style={{ marginBottom: 16 }}>
        Manage all the activities in your system
      </p>
      <div
        style={{ display: "flex",justifyContent:"space-between", marginBottom: 16, flexWrap: "wrap" }}
      >
        <div style={{display:"flex",gap:5}}>
          <Input
            placeholder="Search by Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Role"
            allowClear
            onChange={(value) => setRoleFilter(value)}
            style={{ width: 160 }}
          >
            <Option value="Technical Admin">Technical Admin</Option>
            <Option value="Super Admin">Super Admin</Option>
            <Option value="Demo Admin">Demo Admin</Option>
          </Select>
          <Select
            placeholder="Action"
            allowClear
            onChange={(value) => setActionFilter(value)}
            style={{ width: 160 }}
          >
            <Option value="Add">Add</Option>
            <Option value="Edit">Edit</Option>
            <Option value="Delete">Delete</Option>
            <Option value="Inactivate">Inactivate</Option>
            <Option value="Export">Export</Option>
            <Option value="Renew">Re-new</Option>
            <Option value="Up-Grade">Up grade</Option>
            <Option value="Maintenance Mode">Maintenance Mode</Option>
          </Select>
        </div>
        <div>
          <RangePicker onChange={(dates) => setDateRange(dates)} />
        </div>
      </div>

      <Table
        bordered
        className="custom-table"
        columns={columns}
        dataSource={filteredData.slice(
          (current - 1) * pageSize,
          current * pageSize
        )}
        pagination={false}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        scroll={{ x: "max-content" }}
      />

      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CustomPagination
          total={filteredData.length}
          current={current}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>

      {/* custom row colors */}
      <style>
        {`
          .table-row-light td {
            background: #ffffff;
          }
          .table-row-dark td {
            background: #ffffffff;
          }
        `}
      </style>
    </div>
  );
};

export default ActivityLogTable;
