// components/CustomerTable.jsx
import React, { useState } from "react";
import { Table, Input, Button, Select, Flex } from "antd";
import { customerData } from "../../../data/CustomerData";
import AddCustomerModal from "./AddCustomerModal";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { CustomPagination } from "../../Ui";

const { Option } = Select;

const CustomerTable = () => {
  const [data, setData] = useState(customerData);
  const [modalVisible, setModalVisible] = useState(false);

  // pagination states (like DemoRequestsTable)
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // if you have filtering/search in future:
  const filteredData = data;

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "left",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "left",
    },
    { title: "Email Address", dataIndex: "email", key: "email", align: "left" },
    { title: "Phone Number", dataIndex: "phone", key: "phone", align: "left" },
    {
      title: "Joined At",
      dataIndex: "joinedAt",
      key: "joinedAt",
      align: "left",
    },
  ];

  const handleAddCustomer = (newCustomer) => {
    setData([
      ...data,
      {
        ...newCustomer,
        key: Date.now().toString(),
        joinedAt: new Date().toLocaleDateString(),
      },
    ]);
    setModalVisible(false);
  };

  const handleExport = () => {
    if (!data || data.length === 0) return;
    const headers = columns.map((col) => col.title).join(",");
    const rows = data
      .map((row) =>
        [row.firstName, row.lastName, row.email, row.phone, row.joinedAt]
          .map((value) => `"${value ?? ""}"`)
          .join(",")
      )
      .join("\n");

    const csvContent = [headers, rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  const paginatedData = filteredData.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <Flex justify="space-between" align="center">
        <div>
          <h3>Customers</h3>
          <p style={{ color: "gray", marginTop: "5px" }}>
            Manage all the customers in your system.
          </p>
        </div>
        <div>
          <Button
            type="primary"
            style={{
              backgroundColor: "#F9FAFB",
              padding: "19px",
              color: "black",
              border: "1px solid #0E10251A",
              boxShadow: "none",
            }}
            onClick={() => setModalVisible(true)}
          >
            <PlusOutlined /> Add Customer
          </Button>
        </div>
      </Flex>

      <Flex
        justify="space-between"
        style={{ marginBottom: 16, marginTop: 16 }}
        wrap
      >
        <div>
          <Input.Search
            placeholder="Search by Customer Name"
            style={{ width: 280 }}
            allowClear
          />
          <Select
            placeholder="Status"
            style={{ width: 120, marginLeft: 8 }}
            allowClear
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </div>
        <div>
          <Button onClick={handleExport}>
            <UploadOutlined style={{ color: "gray", fontSize: "18px" }} /> Export
          </Button>
        </div>
      </Flex>

      <Table
        bordered
        className="custom-table"
        columns={columns}
        dataSource={paginatedData} 
        pagination={false}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-white"
        }
      />

      <CustomPagination
        total={filteredData.length}
        current={current}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <AddCustomerModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleAddCustomer}
      />
    </div>
  );
};

export default CustomerTable;
