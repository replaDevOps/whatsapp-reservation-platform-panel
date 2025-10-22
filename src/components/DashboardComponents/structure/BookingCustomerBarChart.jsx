import { Card, Select, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { revenueData } from "../../../data/homepageData";
import arrowUp from "/assets/icons/arrowUp.png"

const { Title, Text } = Typography;

const BookingCustomerBarChart = () => (
  <Card style={{ borderRadius: 8}}>
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div>
        <Title level={5} style={{ margin: 0 }}>Revenue</Title>
        <Text type="secondary">Total Revenue</Text>
        <div style={{ fontSize: 20, fontWeight: 600 }}>SAR 68,200 <span style={{ color: "#07B021", fontSize: 12 }}>+9% then last year <img src={arrowUp} alt="Up"/></span></div>
      </div>
      <Select defaultValue="2024" style={{ width: 100 }}>
        <Select.Option value="2024">2024</Select.Option>
        <Select.Option value="2025">2025</Select.Option>
      </Select>
    </div>

    {/* Chart */}
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={revenueData}
        barGap={10}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#8C8C8C", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(value) => `SAR ${value / 1000}K`}
          tick={{ fill: "#8C8C8C", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          
        />
        <Tooltip
          formatter={(value) => `SAR ${value.toLocaleString()}`}
          contentStyle={{ borderRadius: 8 }}
        />
        <Bar
          dataKey="current"
          fill="#045D5D"
          radius={[6, 6, 0, 0]}
          barSize={22}
        />
        <Bar
          dataKey="previous"
          fill="rgba(4, 93, 93, 0.2)"
          radius={[6, 6, 0, 0]}
          barSize={22}
        />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default BookingCustomerBarChart;
