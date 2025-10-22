import { Avatar, Space, Typography } from "antd";

const { Text } = Typography;

const dashboardtableData = [
  {
    key: 1,
    employee: "Ajit Kumar",
    totalBooking: 24,
    avatar: "/assets/images/ajit.png",
  },
  {
    key: 2,
    employee: "Priya Mehta",
    totalBooking: 23,
    avatar: "/assets/images/priya.png",
  },
  {
    key: 3,
    employee: "Rohan Verma",
    totalBooking: 22,
    avatar: "/assets/images/rohan.png",
  },
  {
    key: 4,
    employee: "Kavita Nair",
    totalBooking: 21,
    avatar: "/assets/images/kavita.png",
  },
  {
    key: 5,
    employee: "Ajit Kumar",
    totalBooking: 24,
    avatar: "/assets/images/ajit.png",
  },
  {
    key: 6,
    employee: "Priya Mehta",
    totalBooking: 23,
    avatar: "/assets/images/priya.png",
  },
  {
    key: 7,
    employee: "Rohan Verma",
    totalBooking: 22,
    avatar: "/assets/images/rohan.png",
  },
];

const bookerserviceData = [
  {
    id: 1,
    icon: "/assets/images/butterfly.png",
    title: "Bob Haircut",
    subtitle: 34,
    per: 55,
    color: "var(--pill-color-1)",
  },
  {
    id: 2,
    icon: "/assets/images/butterfly.png",
    title: "Layer Cut",
    subtitle: 31,
    per: 45,
    color: "var(--pill-color-2)",
  },
  {
    id: 3,
    icon: "/assets/images/butterfly.png",
    title: "Wavy Cut",
    subtitle: 23,
    per: 35,
    color: "var(--pill-color-3)",
  },
  {
    id: 4,
    icon: "/assets/images/butterfly.png",
    title: "Wolf Cut",
    subtitle: 21,
    per: 24,
    color: "var(--pill-color-4)",
  },
  {
    id: 5,
    icon: "/assets/images/butterfly.png",
    title: "Wolf Cut",
    subtitle: 25,
    per: 24,
    color: "var(--pill-color-4)",
  },
];

// ✅ Columns must match data fields
const booking = [
  {
    title: "Total Bookings",
    dataIndex: "totalBooking",
    key: 1,
    
  },
  {
    title: "Employee",
    dataIndex: "employee",
    key: 2,
  },
];
const doctors = [
  {
    key: 1,
    name: "Dr. Sarah Khan",
    bookings: 120,
    avatar: "/assets/images/butterfly.png",
  },
  {
    key: 2,
    name: "Dr. Ali Raza",
    bookings: 98,
    avatar: "/assets/images/butterfly.png",
  },
  {
    key: 3,
    name: "Dr. Ayesha Malik",
    bookings: 87,
    avatar: "/assets/images/butterfly.png",
  },
];


export { dashboardtableData, bookerserviceData, booking,doctors };
