import { Card, Button } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { topBusinesses } from "../../../data/homepageData";
import "../styles/registerBusinesses.css";

const COLORS = ["#009688", "#00BFA6", "#26C6DA", "#80DEEA"];

// Custom Tooltip Component (dot + value )
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    // slice color comes from data.payload.fill or data.color depending on recharts version
    const sliceColor = data.color || data.payload.fill;
    return (
      <div
        style={{
          background: "#fff",
          padding: "8px 12px",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* colored dot */}
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: sliceColor,
          }}
        ></span>
        {/* value */}
        <span style={{ fontWeight: 500 }}>{data.value}</span>
      </div>
    );
  }
  return null;
};


const RegisteredBusinesses = () => {
  const total = topBusinesses.reduce((acc, item) => acc + item.total, 0);

  return (
    <Card className="registered-card card-cs">
      <div className="header">
        <div>
          <h3 className="title">Top Businesses</h3>
          <p className="subtitle">Total Registered</p>
          <h2 className="total">{total.toLocaleString()}</h2>
        </div>
        <Button className="month-btn">This Month</Button>
      </div>

      <div className="content">
        <div className="chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={topBusinesses}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                stroke="none"
              >
                {topBusinesses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* custom tooltip */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="legend">
          {topBusinesses.map((item, idx) => (
            <div className="legend-item" key={idx}>
              <span
                className="legend-icon"
                style={{
                  backgroundColor: COLORS[idx % COLORS.length],
                  padding: 10,
                }}
              />
              <div className="legend-text">
                <span className="plan">{item.name}</span>
                <span className="value">{item.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RegisteredBusinesses;
