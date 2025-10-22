import React, { useMemo, useState } from "react";
import { Card, Flex, DatePicker } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { customersData } from "../../../data/homepageData";
import downarrow from "/assets/icons/down-ar.png";
import dayjs from "dayjs";
// import needed plugins 👇
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

const CustomersChart = () => {
  const [dateRange, setDateRange] = useState([]);

  // filter data
  const filteredData = useMemo(() => {
    if (!dateRange || dateRange.length === 0) return customersData;

    const [start, end] = dateRange;
    return customersData.filter((item) => {
      // parse your string with correct format
      const d = dayjs(item.date, "YYYY-MM-DD");
      return (
        d.isValid() &&
        d.isSameOrAfter(start, "day") &&
        d.isSameOrBefore(end, "day")
      );
    });
  }, [dateRange]);

  const totalCustomers = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return 0;
    return filteredData[filteredData.length - 1].customers;
  }, [filteredData]);

  const previousTotal = useMemo(() => {
    if (!filteredData || filteredData.length < 2) return 0;
    return filteredData[filteredData.length - 2].customers;
  }, [filteredData]);

  const percentageChange = useMemo(() => {
    if (previousTotal === 0) return 0;
    return (((totalCustomers - previousTotal) / previousTotal) * 100).toFixed(1);
  }, [totalCustomers, previousTotal]);

  const isNegative = Number(percentageChange) < 0;

  return (
    <Card
      style={{ borderRadius: 8, width: "100%" }}
      className="card-cs"
      // bodyStyle={{ padding: "16px 0" }}
    >
      <Flex justify="space-between" align="center" >
        <div>
          <h3>Customers</h3>
          <p style={{ color: "gray" }}>Total registered customers in system</p>
          <h3 style={{ marginBottom: 0 }}>
            {totalCustomers}{" "}
            <span
              style={{
                color: isNegative ? "#EF4444" : "#22C55E",
                fontSize: "13px",
                fontWeight: 300,
              }}
            >
              {isNegative ? "" : "+"}
              {percentageChange}% then last month{" "}
              <img
                src={downarrow}
                width={10}
                height={10}
                style={{
                  transform: isNegative ? "rotate(0deg)" : "rotate(180deg)",
                  marginLeft: 2,
                }}
                alt="trend"
              />
            </span>
          </h3>
        </div>

        <RangePicker onChange={(values) => setDateRange(values)} />
      </Flex>

      <div style={{ width: "100%", height: 220, marginTop: "16px",marginLeft:"-26px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ecececff"/>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="customers" stroke="#00BCD4"  dot={false} // hide normal dots
  activeDot={{ r: 6, fill: "#00BCD4", strokeWidth: 2, stroke: "#fff" }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CustomersChart;
