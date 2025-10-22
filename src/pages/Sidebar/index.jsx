import { useState, useEffect, useMemo } from "react";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import { Layout, Menu, Image, Space, Divider, Button } from "antd";
import { Notifications, UserDropdown } from "../../components/Header";
import { Dashboard } from "../Dashboard";
import { SearchInput } from "../../components/Forms";
import Services from "../Services";
import Staffs from "../Staffs";
import Addstaff from "../../components/Staff Mangement/Structure/Addstaff";
import Editstaff from "../../components/Staff Mangement/Structure/Editstaff";
import { Viewstaff } from "../../components/Staff Mangement/Structure/Viewstaff";
import ManageVacations from "../../components/Staff Mangement/Structure/MangeVacation";
import Vacations from "../Vacations";
import Settings from "../Settings";
import Booking from "../Booking";
import { BookingTable } from "../../components/Staff Mangement/Structure/BookingTable";
import Businesses from "../businesses";
import AddBusiness from "../Add Business";
import ViewBusiness from "../viewBuisness";
import BranchDetails from "../branchDetails.jsx";
import Cunstomers from "../Customers/index.jsx";
import Bookings from "../Bookings/index.jsx";
import Revenue from "../Revenue/index.jsx";
import DemoRequests from "../DemoRequests/index.jsx";
import Activity from "../activityLog/index.jsx";
import Terms from "../Terms/index.jsx";
import PrivacyPolicy from "../PrivacyPolicy/index.jsx";
import Subscription from "../Subscription/index.jsx";
import Package from "../Packages";
import EditPackages from "../../components/EditPackages/structure/EditPackages";
import Faqs from "../Faqs/index.jsx";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [openKeys, setOpenKeys] = useState([]);

  // ✅ Path → Menu Key mapping
  const tabMap = {
    "": "1",
    businesses: "2",
    customers: "3",
    bookings: "4",
    revenue: "5",
    demo: "6",
    staffs: "7",
    packages: "8",
    subscription: "9",
    terms: "10",
    faqs: "11",
    privacy: "12",
    setting: "13",
    activity: "14",
  };

  useEffect(() => {
    const tab = location?.pathname?.split("/")[1] || "";
    setCurrentTab(tabMap[tab] || "1");
  }, [location]);

  const getItem = (label, key, icon, children) => ({
    key,
    icon,
    children,
    label,
  });

  // ✅ Antd Menu items
  const menuItems = useMemo(
    () => [
      { type: "group", label: "DASHBOARD", key: "header" },
      getItem(
        "Dashboard Overview",
        "1",
        <img src="/assets/icons/dashboard.png" width={20} alt="" />
      ),

      { type: "divider", key: "divider-1" },
      { type: "group", label: "BUSINESS MANAGEMENT", key: "header-1" },
      getItem(
        "All Businesses",
        "2",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Customers",
        "3",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Bookings",
        "4",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Revenue",
        "5",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Demo Requests",
        "6",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Staffs",
        "7",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),

      { type: "divider", key: "divider-2" },
      { type: "group", label: "PACKAGES MANAGEMENT", key: "header-2" },
      getItem(
        "All Packages",
        "8",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Subscription Management",
        "9",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),

      { type: "divider", key: "divider-3" },
      { type: "group", label: "WEBSITE PAGES", key: "header-3" },
      getItem(
        "Terms & Condition",
        "10",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "FAQs",
        "11",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Privacy Policy",
        "12",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),

      { type: "divider", key: "divider-4" },
      { type: "group", label: "PROFILE SETTING", key: "header-4" },
      getItem(
        "Setting",
        "13",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
      getItem(
        "Activity Log",
        "14",
        <img src="/assets/icons/layout.png" width={20} alt="" />
      ),
    ],
    []
  );

  // ✅ Handle navigation
  const handleMenuClick = ({ key }) => {
    const paths = {
      1: "/",
      2: "/businesses",
      3: "/customers",
      4: "/bookings",
      5: "/revenue",
      6: "/demo",
      7: "/staffs",
      8: "/packages",
      9: "/subscription",
      10: "/terms",
      11: "/faqs",
      12: "/privacy",
      13: "/setting",
      14: "/activity",
    };
    navigate(paths[key], { replace: true });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        width={240}
        onBreakpoint={(broken) => setCollapsed(broken)}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={collapsed ? "addclass overflowstyle" : "overflowstyle"}
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollbarColor: "auto",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{ width: collapsed ? "60px" : "42px" }}
              height="auto"
              src="/assets/images/logo.png"
              alt="Jusoor Admin Panel"
              preview={false}
            />
            <h2 style={{ marginLeft: "5px", color: "#616161" }}>Qloop</h2>
          </div>
          <Button
            type="text"
            className="bg-transparent border-0 p-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Image
              src="/assets/icons/collapse.png"
              width={25}
              preview={false}
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Button>
        </div>
        <Divider className="m-0 bg-divider" />
        <Menu
          selectedKeys={[currentTab]}
          mode="inline"
          onClick={handleMenuClick}
          onOpenChange={setOpenKeys}
          openKeys={openKeys}
          items={menuItems}
          className="listitem"
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="site-layout">
        {/* Header */}
        <Header
          className="site-layout-background header-mbl-cs"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <div
            style={{
              width: "98%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Space className="mbl-space">
              <Button
                type="text"
                className="bg-transparent border-0 p-0"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Image
                  src="/assets/icons/collapse.png"
                  width={25}
                  preview={false}
                  style={{
                    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                    display: collapsed ? "block" : "none",
                  }}
                />
              </Button>
              <SearchInput
                prefix={
                  <img src="/assets/icons/search.png" width={20} alt="search" />
                }
                placeholder="Search"
              />
            </Space>
            <Space size={15} align="center">
              <Notifications />
              <UserDropdown />
            </Space>
          </div>
        </Header>

        <Divider className="border-gray m-0" />

        {/* Page Content */}
        <Content
          className="scroll-bar"
          style={{
            margin: "24px 5px 0 10px",
            padding: "0 14px",
            minHeight: 280,
            overflowY: "auto",
            paddingTop: 24,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/services" element={<Services />} /> */}
            {/* <Route path="/vacations" element={<Vacations />} /> */}
            <Route path="/setting" element={<Settings />} />

            {/* BusinessesRoutes */}
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/addbusiness" element={<AddBusiness />} />
            <Route path="/businesses/:id" element={<ViewBusiness />} />
            <Route
              path="/businesses/:id_business/branches/:id_branch"
              element={<BranchDetails />}
            />

            {/* Customers Routes */}
            <Route path="/customers" element={<Cunstomers />} />

            {/* revenue Routes */}
            <Route path="/revenue" element={<Revenue />} />

            {/* demo Requests routes */}
            <Route path="/demo" element={<DemoRequests />} />

            {/* bookings Routes */}
            <Route path="/bookings" element={<Bookings />} />

            {/* Packages */}
            <Route path="/packages" element={<Package />} />
            <Route path="/packages/editpackages" element={<EditPackages />} />

            {/* subscription */}
            <Route path="/subscription" element={<Subscription />} />

            {/* Staff Routes */}
            <Route path="/staffs" element={<Staffs />} />
            <Route path="/staff/history" element={<BookingTable />} />
            <Route path="/addstaff" element={<Addstaff />} />
            <Route path="/staff/edit" element={<Editstaff />} />
            <Route path="/staff/view" element={<Viewstaff />} />
            <Route path="/staff/mange" element={<ManageVacations />} />

            {/* term & conditions */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/faqs" element={<Faqs />} />

            {/* Privacy Policy */}
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* activity logs routes */}
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export { Sidebar };
