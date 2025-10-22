"use client";
import { useState } from "react";
import { Table, Button, Tag, Tooltip } from "antd";
import {
  DownloadOutlined,
  ArrowLeftOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BranchDetailsTable = ({
  branchName,
  branches,
  services,
  staffs,
  hasTabletAccess = false, // pass true/false from props
}) => {
  const [activeTab, setActiveTab] = useState("services");
  const navigate = useNavigate()

  // CSV export for current tab
  const handleExport = () => {
    const currentData = activeTab === "services" ? services : staffs;
    if (!currentData || currentData.length === 0) return;

    const headers =
      activeTab === "services"
        ? [
            "Service Name",
            "Duration (min)",
            "Buffer Time (min)",
            "Price",
            "Status",
          ]
        : ["Staff Name", "Role", "Phone Number", "Service", "Status"];

    const rows = currentData
      .map((row) =>
        activeTab === "services"
          ? [
              row.serviceName,
              row.duration,
              row.bufferTime,
              row.price,
              row.status,
            ]
              .map((val) => `"${val ?? ""}"`)
              .join(",")
          : [row.name, row.role, row.phoneNumber, row.service, row.status]
              .map((val) => `"${val ?? ""}"`)
              .join(",")
      )
      .join("\n");

    const csvContent = [headers.join(","), rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${branchName}-${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function onBack() {
    if (branches<=1) {
      navigate("/businesses")
    }else{
      navigate(-1)
    }
  }

  // Table columns
  const serviceColumns = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      align: "start",
    },
    {
      title: "Duration (min)",
      dataIndex: "duration",
      key: "duration",
      align: "start",
    },
    {
      title: "Buffer Time (min)",
      dataIndex: "bufferTime",
      key: "bufferTime",
      align: "start",
    },
    { title: "Price", dataIndex: "price", key: "price", align: "start" },
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
  ];

  const staffColumns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 70,
      render: (image) => (
        <img
          src={`/assets/staffImages/${image}`}
          alt="Image"
          style={{ width: 35, height: 35, borderRadius: "50%" }}
        />
      ),
    },
    { title: "Staff Name", dataIndex: "name", key: "name", align: "start" },
    { title: "Role", dataIndex: "role", key: "role", align: "start" },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "start",
    },
    {
      title: "Service",
      dataIndex: "services",
      key: "services",
      align: "start",
    },
  ];

  // custom button style like screenshot
  const tabButtonStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#00B9B9" : "#fff",
    color: activeTab === tab ? "#fff" : "#000",
    border: `1px solid ${activeTab === tab ? "#00B9B9" : "#d9d9d9"}`,
    borderRadius: 6,
    padding: "6px 16px",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 16,
        minHeight: "80vh",
        marginTop: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button icon={<ArrowLeftOutlined />} type="text" onClick={onBack} />
          <h3
            style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
          >
            {branchName}
            {hasTabletAccess && (
              <Tooltip title="This branch have self booking tablet access">
                <TabletOutlined style={{ fontSize: 18 }} />
              </Tooltip>
            )}
          </h3>
        </div>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
          style={{ border: "1px solid #ccc" }}
        >
          Export Data
        </Button>
      </div>

      {/* Buttons instead of Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button
          style={tabButtonStyle("services")}
          onClick={() => setActiveTab("services")}
        >
          Services
        </Button>
        <Button
          style={tabButtonStyle("staffs")}
          onClick={() => setActiveTab("staffs")}
        >
          Staffs
        </Button>
      </div>

      {/* Table */}
      {activeTab === "services" ? (
        <Table
          bordered
          className="custom-table"
          columns={serviceColumns}
          dataSource={services}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          rowKey={(record) => record.id || record.serviceName}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-white"
          }
        />
      ) : (
        <Table
          bordered
          className="custom-table"
          columns={staffColumns}
          dataSource={staffs}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          rowKey={(record) => record.id || record.name}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-white"
          }
        />
      )}
    </div>

    
  );
};

export default BranchDetailsTable;
