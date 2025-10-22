import React, { useState, useMemo } from "react";
import { Table, Input, Select, DatePicker, Button, Flex } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { revenueData } from "../../../data/RevenueData";
import { CustomPagination } from "../../Ui"; // 👈 same as your other tables

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const RevenueTable = () => {
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [dateRange, setDateRange] = useState(null);

  // pagination states
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const typeOptions = [
    ...new Set(
      revenueData
        .map((it) => (it.type ? String(it.type).trim() : ""))
        .filter(Boolean)
    ),
  ];
  const planOptions = [
    ...new Set(
      revenueData
        .map((it) =>
          it.subscriptionPlan ? String(it.subscriptionPlan).trim() : ""
        )
        .filter(Boolean)
    ),
  ];

  const equalsCI = (a, b) =>
    String(a || "")
      .trim()
      .toLowerCase() ===
    String(b || "")
      .trim()
      .toLowerCase();

  const parsePurchaseDate = (value) => {
    if (!value) return dayjs(null);
    const formats = ["DD/MM/YYYY", "DD/MM/YY", "YYYY-MM-DD", "MM/DD/YYYY"];
    let d = dayjs(value, formats, true);
    if (!d.isValid()) d = dayjs(value);
    return d;
  };

  const filteredData = useMemo(() => {
    return revenueData.filter((item) => {
      const matchName = String(item.businessName || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchType = typeFilter ? equalsCI(item.type, typeFilter) : true;
      const matchPlan = planFilter
        ? equalsCI(item.subscriptionPlan, planFilter)
        : true;

      let matchDate = true;
      if (
        Array.isArray(dateRange) &&
        dateRange.length === 2 &&
        dateRange[0] &&
        dateRange[1]
      ) {
        const start = dateRange[0];
        const end = dateRange[1];
        const purchase = parsePurchaseDate(item.purchasingDate);
        if (!purchase.isValid()) {
          matchDate = false;
        } else {
          const afterOrSame =
            purchase.isAfter(start.startOf("day")) ||
            purchase.isSame(start, "day");
          const beforeOrSame =
            purchase.isBefore(end.endOf("day")) || purchase.isSame(end, "day");
          matchDate = afterOrSame && beforeOrSame;
        }
      }

      return matchName && matchType && matchPlan && matchDate;
    });
  }, [searchText, typeFilter, planFilter, dateRange]);

  // sliced data for current page
  const pagedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, current, pageSize]);

  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  const columns = [
    {
      title: "Business ID",
      dataIndex: "businessId",
      key: "businessId",
      width: 120,
      align: "start",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 80,
      render: (logo) => (
        <img
          src={logo}
          alt="logo"
          style={{ width: 40, height: 40, borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      width: 200,
      align: "start",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      align: "start",
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
      width: 180,
      align: "start",
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      width: 120,
      align: "start",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      align: "start",
    },
    {
      title: "Purchasing Date",
      dataIndex: "purchasingDate",
      key: "purchasingDate",
      width: 160,
      align: "start",
    },
  ];

  const handleExport = () => {
    if (!filteredData.length) return;
    const header = Object.keys(filteredData[0]).join(",");
    const rows = filteredData.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "revenue_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <style>{`
        .table-row-light td { background-color: #f9f9f9 !important; }
        .table-row-white td { background-color: #ffffff !important; }
      `}</style>

      {/* Table */}
      <div
        style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#00bcd4 transparent",
          marginTop: "16px",
          backgroundColor: "white",
          padding: "16px",
        }}
      >
        {/* Filters */}
        <Flex justify="space-between" wrap style={{ marginBottom: 16 }}>
          <div>
            <Input
              placeholder="Search Business Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <Select
              placeholder="Filter by Type"
              allowClear
              value={typeFilter || undefined}
              onChange={(val) => setTypeFilter(val || "")}
              style={{ width: 150, marginLeft: "8px" }}
            >
              {typeOptions.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Filter by Plan"
              allowClear
              value={planFilter || undefined}
              onChange={(val) => setPlanFilter(val || "")}
              style={{ width: 180, marginLeft: "8px" }}
            >
              {planOptions.map((plan) => (
                <Select.Option key={plan} value={plan}>
                  {plan}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <Button
              style={{ marginRight: "8px" }}
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export CSV
            </Button>
            <RangePicker
              onChange={(dates) => setDateRange(dates)}
              style={{ width: 220 }}
              allowClear
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
          dataSource={pagedData}
          scroll={{ x: "max-content" }}
          pagination={false}
          rowKey="businessId"
        />
      <CustomPagination
        total={filteredData.length}
        current={current}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      </div>

    </div>
  );
};

export default RevenueTable;
