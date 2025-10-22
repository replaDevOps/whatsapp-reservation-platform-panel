"use client";
import React, { useMemo } from "react";
import dashboardData from "../../../data/businessListData"; // you already told me about this data
// import { min } from "moment";

const Headline = ({ businessId }) => {
  // find current business
  const business = useMemo(
    () => dashboardData.find((b) => b.businessId === businessId),
    [businessId]
  );

  // fallback dummy values if business not found
  const totalBookings = business?.totalBookings ?? 50;
  const todaysBookings = business?.todaysBookings ?? 8;
  const totalActiveBranches = business?.branches
    ? business.branches.filter((br) => br.status === "Active").length
    : 3;
  const totalActiveServiceProviders =
    business?.totalActiveServiceProviders ?? 16;

  const cardStyle = {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "10px",
    minHeight: "143px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const iconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#00B9B9",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    marginRight: "15px",
  };

  const textContainer = {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#333",
    marginBottom: "4px",
  };

  const valueStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
  };

  const cards = [
    { label: "Total Bookings", value: totalBookings },
    { label: "Today's Bookings", value: todaysBookings },
    { label: "Total Active Branches", value: totalActiveBranches },
    {
      label: "Total Active Service Providers",
      value: totalActiveServiceProviders,
    },
  ];

  return (
    <div style={{ display: "flex", gap: "15px",minHeight: "80px", marginTop: "16px" }}>
      {cards.map((card, idx) => (
        <div key={idx} style={cardStyle}>
          <div style={iconStyle}>Icon</div>
          <div style={textContainer}>
            <span style={labelStyle}>{card.label}</span>
            <span style={valueStyle}>{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Headline;
