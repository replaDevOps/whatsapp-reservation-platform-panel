// import React from "react";
// import { Table, Card, Tag } from "antd";

// const staffMembers = ["Sameh Amin", "Ajit Kumar"];

// const appointments = [
//   {
//     time: "00:00 - 01:00",
//     staff: "Sameh Amin",
//     service: "Hair Cut",
//     status: "Completed",
//     start: "00:00",
//     end: "01:00",
//   },
//   {
//     time: "00:00 - 01:00",
//     staff: "Sameh Amin",
//     service: "Hair Cut",
//     status: "Cancelled",
//     start: "00:00",
//     end: "01:00",
//   },
//   {
//     time: "04:00 - 06:00",
//     staff: "Sameh Amin",
//     service: "Hair Cut",
//     status: "Progress",
//     start: "04:00",
//     end: "06:00",
//   },
//   {
//     time: "07:00 - 08:00",
//     staff: "Ajit Kumar",
//     service: "Hair Cut",
//     status: "Pending",
//     start: "07:00",
//     end: "08:00",
//   },
// ];

// const statusColors = {
//   Completed: "green",
//   Cancelled: "red",
//   Pending: "orange",
//   Progress: "blue",
// };

// const Scheduler = () => {
//   const timeSlots = [
//     "00:00 - 01:00",
//     "01:00 - 02:00",
//     "02:00 - 03:00",
//     "04:00 - 05:00",
//     "05:00 - 06:00",
//     "06:00 - 07:00",
//     "07:00 - 08:00",
//   ];

//   // Build columns dynamically
//   const columns = [
//     {
//       title: "Time",
//       dataIndex: "time",
//       width: 120,
//       fixed: "left",
//     },
//     ...staffMembers.map((staff) => ({
//       title: staff,
//       dataIndex: staff,
//       render: (cellAppointments) => (
//         <>
//           {cellAppointments?.map((app, idx) => (
//             <Card
//               key={idx}
//               size="small"
//               style={{
//                 marginBottom: 6,
//                 backgroundColor: "#fff",
//                 borderLeft: `4px solid ${statusColors[app.status]}`,
//               }}
//             >
//               <div style={{ fontWeight: 600 }}>{app.service}</div>
//               <div style={{ fontSize: 12, color: "#888" }}>
//                 {app.start} - {app.end}
//               </div>
//               <Tag color={statusColors[app.status]}>{app.status}</Tag>
//             </Card>
//           ))}
//         </>
//       ),
//     })),
//   ];

//   // Create rows: (time × staff)
//   const dataSource = timeSlots.map((time) => {
//     const row = { key: time, time };
//     staffMembers.forEach((staff) => {
//       row[staff] = appointments.filter(
//         (a) => a.time === time && a.staff === staff
//       );
//     });
//     return row;
//   });

//   return (
//     <Table
//       bordered
//       columns={columns}
//       dataSource={dataSource}
//       pagination={false}
//       scroll={{ x: "max-content" }}
//     />
//   );
// };

// export default Scheduler;


import React, { useState } from "react";
import { Table, Card, Tag, Popover, Button, Space, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const staffMembers = ["Sameh Amin", "Ajit Kumar"];

// Demo appointment dataset with different dates
const allAppointments = [
  {
    date: "2025-08-30",
    time: "00:00 - 01:00",
    staff: "Sameh Amin",
    service: "Hair Cut",
    status: "Completed",
    start: "00:00",
    end: "01:00",
    customer: "John Doe",
  },
  {
    date: "2025-08-30",
    time: "04:00 - 06:00",
    staff: "Sameh Amin",
    service: "Hair Cut",
    status: "Progress",
    start: "04:00",
    end: "06:00",
    customer: "Mark Tailor",
  },
  {
    date: "2025-08-31",
    time: "07:00 - 08:00",
    staff: "Ajit Kumar",
    service: "Hair Cut",
    status: "Pending",
    start: "07:00",
    end: "08:00",
    customer: "Sophia Green",
  },
  {
    date: "2025-08-31",
    time: "00:00 - 01:00",
    staff: "Sameh Amin",
    service: "Hair Cut",
    status: "Cancelled",
    start: "00:00",
    end: "01:00",
    customer: "Alice Smith",
  },
];

const statusColors = {
  Completed: "green",
  Cancelled: "red",
  Pending: "orange",
  Progress: "blue",
};

const Scheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const timeSlots = [
    "00:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
  ];

  // Navigation
  const prevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toDateString();
  const formattedKey = currentDate.toISOString().split("T")[0];

  // Filter appointments for the current date
  const appointments = allAppointments.filter(
    (a) => a.date === formattedKey
  );

  // Columns
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      width: 120,
      fixed: "left",
    },
    ...staffMembers.map((staff) => ({
      title: staff,
      dataIndex: staff,
      render: (cellAppointments) => (
        <>
          {cellAppointments?.map((app, idx) => {
            const popoverContent = (
              <div>
                <p><b>Service:</b> {app.service}</p>
                <p><b>Customer:</b> {app.customer}</p>
                <p><b>Time:</b> {app.start} - {app.end}</p>
                <p><b>Status:</b> {app.status}</p>
              </div>
            );

            return (
              <Popover
                key={idx}
                content={popoverContent}
                title="Appointment Details"
                trigger="click"
              >
                <Card
                  size="small"
                  style={{
                    marginBottom: 6,
                    backgroundColor: "#fff",
                    borderLeft: `4px solid ${statusColors[app.status]}`,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{app.service}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {app.start} - {app.end}
                  </div>
                  <Tag color={statusColors[app.status]}>{app.status}</Tag>
                </Card>
              </Popover>
            );
          })}
        </>
      ),
    })),
  ];

  // Rows
  const dataSource = timeSlots.map((time) => {
    const row = { key: time, time };
    staffMembers.forEach((staff) => {
      row[staff] = appointments.filter(
        (a) => a.time === time && a.staff === staff
      );
    });
    return row;
  });

  return (
    <div>
      {/* Top navigation bar */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Space>
          <Button shape="circle" icon={<LeftOutlined />} onClick={prevDay} />
          <Title level={4} style={{ margin: 0 }}>
            {formattedDate}
          </Title>
          <Button shape="circle" icon={<RightOutlined />} onClick={nextDay} />
        </Space>
      </div>

      {/* Table */}
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default Scheduler;
