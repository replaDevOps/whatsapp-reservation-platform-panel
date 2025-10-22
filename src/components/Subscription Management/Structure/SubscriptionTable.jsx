

import { useState, useMemo } from "react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Tag,
  Flex,
  Pagination,
  Dropdown,
  Menu,
} from "antd";
import { businessData } from "./SubscriptionData";
import { MoreOutlined } from "@ant-design/icons";
import ChangePlanModal from "../../Ui/UpgradeModal";
import RenewModal from "../../Ui/RenewModal"; 
import EditPackageModal from "../../Ui/EditPackageModal"; // ✅ Import EditPackageModal

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BusinessTable = () => {
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ✅ Modal States
  const [isUpgradeVisible, setIsUpgradeVisible] = useState(false);
  const [isRenewVisible, setIsRenewVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false); // ✅ Edit state

  // ✅ Filtered data logic
  const filteredData = useMemo(() => {
    return businessData.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        String(item.id).includes(searchText);

      const matchType = typeFilter ? item.type === typeFilter : true;
      const matchPeriod = periodFilter ? item.period === periodFilter : true;
      const matchPlan = planFilter ? item.plan === planFilter : true;

      let matchDate = true;
      if (dateRange && dateRange.length === 2) {
        const start = new Date(item.startDate);
        matchDate =
          start >= new Date(dateRange[0].startOf("day")) &&
          start <= new Date(dateRange[1].endOf("day"));
      }

      return matchSearch && matchType && matchPeriod && matchPlan && matchDate;
    });
  }, [searchText, typeFilter, periodFilter, planFilter, dateRange]);

  // ✅ Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // ✅ Action Menu
  const actionMenu = (
    <Menu
      items={[
        { key: "renew", label: "Renew" },
        { key: "upgrade", label: "Upgrade" },
        { key: "edit", label: "Edit Package" },
        { key: "download", label: "Download Invoice" },
      ]}
      onClick={(e) => {
        if (e.key === "upgrade") {
          setIsUpgradeVisible(true);
        }
        if (e.key === "renew") {
          setIsRenewVisible(true);
        }
        if (e.key === "edit") {
          setIsEditVisible(true); 
        }
        console.log("Selected Action:", e.key);
      }}
    />
  );

  
  const columns = [
    { title: "Business ID", dataIndex: "id", key: "id", width: 120, fixed: "left" },
    {
      title: "Business Logo",
      dataIndex: "logo",
      key: "logo",
      width: 120,
      render: (logo) => (
        <img
          src={logo}
          alt="logo"
          style={{ width: 32, height: 32, borderRadius: "50%" }}
        />
      ),
    },
    { title: "Business Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Type", dataIndex: "type", key: "type", width: 150 },
    {
      title: "Subscription Plan",
      dataIndex: "plan",
      key: "plan",
      width: 180,
      render: (plan) => {
        const colors = { BP: "#019F8B", SP: "#7D40FF", PP: "#FF3D3A", EP: "#74B500" };
        return <Tag color={colors[plan]}>{plan}</Tag>;
      },
    },
    { title: "Period", dataIndex: "period", key: "period", width: 120 },
    { title: "Start Date", dataIndex: "startDate", key: "startDate", width: 160 },
    { title: "Expiry Date", dataIndex: "ExpiryDate", key: "ExpiryDate", width: 160 },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 120,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: () => (
        <Dropdown overlay={actionMenu} trigger={["click"]} placement="bottomRight">
          <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div
      className="custom-scroll"
      style={{
        overflowX: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#0ABAB5 #f0f0f0",
        marginTop: "16px",
        backgroundColor: "white",
        padding: "16px",
      }}
    >
      
      <Flex justify="space-between" wrap style={{ marginBottom: 16 }}>
        <div>
          <Search
            placeholder="Search by Business Name/ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220, marginRight: 8 }}
          />
          <Select
            placeholder="Type"
            allowClear
            value={typeFilter || undefined}
            onChange={(val) => setTypeFilter(val || "")}
            style={{ width: 140, marginRight: 8 }}
          >
            <Option value="Barber">Barber</Option>
            <Option value="Spa">Spa</Option>
            <Option value="Clinic">Clinic</Option>
            <Option value="General">General</Option>
          </Select>
          <Select
            placeholder="Period"
            allowClear
            value={periodFilter || undefined}
            onChange={(val) => setPeriodFilter(val || "")}
            style={{ width: 140, marginRight: 8 }}
          >
            <Option value="Monthly">Monthly</Option>
            <Option value="Yearly">Yearly</Option>
          </Select>
          <Select
            placeholder="Subscription Plan"
            allowClear
            value={planFilter || undefined}
            onChange={(val) => setPlanFilter(val || "")}
            style={{ width: 160, marginRight: 8 }}
          >
            <Option value="BP">BP</Option>
            <Option value="SP">SP</Option>
            <Option value="PP">PP</Option>
            <Option value="EP">EP</Option>
          </Select>
        </div>

        <div>
          <RangePicker
            onChange={(dates) => setDateRange(dates)}
            style={{ width: 240 }}
          />
        </div>
      </Flex>

      
      <Table
        bordered
        className="custom-table"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-white"
        }
        columns={columns}
        dataSource={paginatedData}
        scroll={{ x: "max-content" }}
        pagination={false}
        rowKey="id"
      />

     
      <Flex justify="space-between" align="center" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
          Rows per page:{" "}
          <Select
            value={pageSize}
            onChange={(val) => {
              setPageSize(val);
              setCurrentPage(1);
            }}
            style={{ width: 80, marginLeft: 8 }}
          >
            {[1, 2, 3, 4, 5, 10, 20, 50].map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </Flex>

      {/*  Upgrade Modal */}
      <ChangePlanModal
        visible={isUpgradeVisible}
        onCancel={() => setIsUpgradeVisible(false)}
        onSave={(values) => {
          console.log("Saved Data:", values);
          setIsUpgradeVisible(false);
        }}
      />

      {/*  Renew Modal */}
      <RenewModal
        visible={isRenewVisible}
        onCancel={() => setIsRenewVisible(false)}
        onSave={(values) => {
          console.log("Saved Data (Renew):", values);
          setIsRenewVisible(false);
        }}
      />

      {/*  Edit Package Modal */}
      <EditPackageModal
        visible={isEditVisible}
        onCancel={() => setIsEditVisible(false)}
        onRenew={(values) => {
          console.log("Saved Data (Edit Package):", values);
          setIsEditVisible(false);
        }}
      />

      {/*  Custom Styles */}
      <style>
        {`
          .table-row-light td {
            background-color: #F4F7FE !important;
          }
          .table-row-white td {
            background-color: #fff !important;
          }
          .ant-table-thead > tr > th {
            background-color: #0ABAB5 !important;
            color: #fff !important;
            font-weight: 600 !important;
            border-right: none !important;
          }
          .ant-table-tbody > tr > td {
            border-right: none !important;
          }
          .ant-table-container {
            border-left: none !important;
            border-right: none !important;
          }
          .ant-table-tbody > tr:hover > td {
            background: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default BusinessTable;
