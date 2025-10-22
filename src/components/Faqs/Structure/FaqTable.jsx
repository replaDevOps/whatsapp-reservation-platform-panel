import { useState, useMemo } from "react";
import { Table, Tag, Dropdown, Space, Button, Modal } from "antd";
import { DeleteFilled, MoreOutlined, QuestionCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { CustomPagination } from "../../Ui";
import { useNavigate } from "react-router-dom";
import dashboardData from "../../../data/businessListData.js";

const FaqTable = () => {
  const [data, setData] = useState(dashboardData);

  // pagination state
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // modals state
  const [isInactiveModalOpen, setInactiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();

  // dropdown menu actions
  const handleMenuClick = (key, record) => {
    if (key === "1") {
      navigate(`/businesses/${record.businessId}`);
    } else if (key === "2") {
      setSelectedRecord(record);
      setInactiveModalOpen(true);
    } else if (key === "3") {
      setSelectedRecord(record);
      setDeleteModalOpen(true);
    }
  };

  const getMenuItems = (record) => [
    { key: "1", label: "View" },
    { key: "2", label: "Inactive" },
    { key: "3", label: "Delete" },
  ];

  const confirmInactive = () => {
    console.log("Marked as Inactive:", selectedRecord);
    setInactiveModalOpen(false);
  };

  const confirmDelete = () => {
    console.log("Deleted:", selectedRecord);
    setDeleteModalOpen(false);
  };

  // table columns
  const headerStyle = {
    fontWeight: 500,
    fontSize: 14,
    color: "#333",
    background: "#f5f5f5",
  };

  const columns = [
    {
      title: "Business ID",
      dataIndex: "businessId",
      key: "businessId",
      onHeaderCell: () => ({ style: headerStyle }),
    },
    {
      title: "Business Logo",
      dataIndex: "logo",
      key: "logo",
      onHeaderCell: () => ({ style: headerStyle }),
      render: (logo) => (
        <img
          src={`/assets/businessesLogos/${logo}`}
          alt="logo"
          style={{ width: 35, height: 35, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      onHeaderCell: () => ({ style: headerStyle }),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      onHeaderCell: () => ({ style: headerStyle }),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      onHeaderCell: () => ({ style: headerStyle }),
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
      onHeaderCell: () => ({ style: headerStyle }),
      render: (plan, record) => (
        <Tag
          color={
            record.subscriptionPlan === "Pro Plan"
              ? "#FF3D3A"
              : record.subscriptionPlan === "Standard Plan"
              ? "#7D40FF"
              : record.subscriptionPlan === "Enterprise Plan"
              ? "#74B500"
              : "#019F8B"
          }
          style={{ fontWeight: 500 }}
        >
          {plan}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      onHeaderCell: () => ({ style: headerStyle }),
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
          style={{ fontWeight: 500 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onHeaderCell: () => ({ style: headerStyle }),
    },
    {
      title: "Actions",
      key: "actions",
      onHeaderCell: () => ({ style: headerStyle }),
      render: (_, record) => (
        <Dropdown
          menu={{
            items: getMenuItems(record),
            onClick: ({ key }) => handleMenuClick(key, record),
          }}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // current page slice
  const paginatedData = useMemo(() => {
    const startIndex = (current - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, current, pageSize]);

  return (
    <div style={{ padding: 15, background: "#fff", borderRadius: 8 }}>
      {/* Table */}
      <Table
        bordered
        className="custom-table"
        size="middle"
        columns={columns}
        rowKey={"businessId"}
        dataSource={paginatedData}
        pagination={false}
        scroll={{ x: 700 }}
        rowHoverable={false}
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-white"
        }
      />

      {/* Pagination */}
      <CustomPagination
        total={data.length}
        current={current}
        pageSize={pageSize}
        onPageChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />

      {/* Inactive Modal */}
      <Modal
        open={isInactiveModalOpen}
        onCancel={() => setInactiveModalOpen(false)}
        footer={null}
        centered
        width={400}
        closable
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <QuestionCircleFilled
            style={{
              fontSize: 48,
              color: "#FF7A00",
              background: "#FFF3E6",
              borderRadius: "50%",
              padding: 10,
            }}
          />
        </div>
        <h3
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: 8,
          }}
        >
          Are you sure?
        </h3>
        <p style={{ textAlign: "center", color: "#6B6B6B", marginBottom: 24 }}>
          Please confirm that all business details are correct and a subscription
          plan is assigned before proceeding.
        </p>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginRight: 8, borderRadius: 6, padding: "4px 18px" }}
            onClick={() => setInactiveModalOpen(false)}
          >
            Back
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "#FF7A00",
              borderColor: "#FF7A00",
              borderRadius: 6,
              padding: "4px 18px",
            }}
            onClick={confirmInactive}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        centered
        width={400}
        closable
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <DeleteFilled
            style={{
              fontSize: 48,
              color: "#FF4D4F",
              background: "#FFF2F0",
              borderRadius: "50%",
              padding: 10,
            }}
          />
        </div>
        <h3
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "18px",
            marginBottom: 8,
          }}
        >
          Are you sure?
        </h3>
        <p style={{ textAlign: "center", color: "#6B6B6B", marginBottom: 24 }}>
          Are you sure you want to <b>delete</b>{" "}
          <b>{selectedRecord?.businessName}</b> permanently?
        </p>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{ marginRight: 8, borderRadius: 6, padding: "4px 18px" }}
            onClick={() => setDeleteModalOpen(false)}
          >
            Back
          </Button>
          <Button
            danger
            type="primary"
            style={{ borderRadius: 6, padding: "4px 18px" }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FaqTable;
