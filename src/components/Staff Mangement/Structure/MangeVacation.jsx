import React from "react";
import {
  Card,
  Button,
  Table,
  Tag,
  Typography,
  Dropdown,
  Flex,
  Breadcrumb
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import { ModuleTopHeading } from "../../PageComponent";

const { Title,Text } = Typography;

const columns = [
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
 
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color;
      if (status === "Pending") {
        color = "blue";
      } else if (status === "Approved") {
        color = "green";
      } else {
        color = "red";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => {
      const items = [
        { key: "1", label: "Accept" },
        { key: "2", label: "Reject" },
      ];

      return (
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <img
            src="/assets/icons/dots.png"
            alt="action"
            style={{ width: 18, cursor: "pointer" }}
          />
        </Dropdown>
      );
    },
  },
];

const data = [
  { key: "1", startDate: "5/30/14", endDate: "2/1/12", status: "Pending" },
  { key: "2", startDate: "4/2/12", endDate: "8/30/14", status: "Approved" },
  { key: "3", startDate: "7/27/13", endDate: "9/23/16", status: "Rejected" },
  { key: "4", startDate: "1/31/14", endDate: "8/15/17", status: "Approved" },
  { key: "5", startDate: "8/2/15", endDate: "10/8/13", status: "Approved" },
  { key: "6", startDate: "8/2/19", endDate: "6/21/19", status: "Approved" },
  { key: "7", startDate: "1/6/12", endDate: "5/10/12", status: "Approved" },
  { key: "8", startDate: "6/13/14", endDate: "4/4/18", status: "Approved" },
  { key: "9", startDate: "12/10/13", endDate: "1/15/13", status: "Rejected" },
  { key: "10", startDate: "9/23/15", endDate: "12/12/13", status: "Approved" },
];

const ManageVacations = () => {
  const navigate = useNavigate(); // ✅ call navigate hook

  return (
    <>
 <Card className='mb-3' style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Staff Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Staffs</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Abdullah</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Manage Vacations</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>


    <Card className="radius-12 border-gray h-100 card-cs">
      <div
        className="card-header mb-3"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            type="text"
            onClick={() => navigate("/staffs")}
            icon={<ArrowLeftOutlined />}
            className="back-button"
          />

          {/* Avatar + Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            <Flex vertical>
            <ModuleTopHeading level={4} name="Manage Vacation" />
            <Text className="text-gray fs-14">Manage all the services in your system</Text>
          </Flex>

            
          </div>
        </div>

        {/* Right side */}
       
      </div>

      <Table
        columns={columns}
        dataSource={data}
        className="pagination table-cs table"
        pagination={false}
        scroll={{ x: 700 }}
        rowHoverable={false}
      />
    </Card>
    </>
  );
};

export default ManageVacations;
