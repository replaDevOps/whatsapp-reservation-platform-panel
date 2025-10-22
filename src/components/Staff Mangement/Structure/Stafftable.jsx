import {
  Button,
  Card,
  Flex,
  Table,
  Typography,
  Dropdown,
  Menu,
  Input,
  Select,
  Space,
  Avatar,
  Tag,
} from "antd";
import { useState, useMemo } from "react";
import { CustomPagination, DeleteModal } from "../../Ui";
import { ModuleTopHeading } from "../../PageComponent";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { StatusModal } from "../../Ui/StatusModal";

const { Option } = Select;
const { Text } = Typography;

const StaffTable = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [isActiveOpen, setIsActiveOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);

  // Save handler (for all modals)
  const handleSave = (data) => {
    console.log("Data Saved:", data);
    setIsDeleteOpen(false);
    setDeleteRecord(null);
    setIsActiveOpen(false);
    setActiveRecord(null);
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "start",
      render: (image) => <Avatar src={image} />,
    },
    {
      title: "Staff Name",
      dataIndex: "name",
      align: "start",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      align: "start",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "start",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "start",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "start",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
          style={{ fontWeight: 500 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={(info) => {
              switch (info.key) {
                case "1":
                  navigate(`/staff/view`); // View Page
                  break;
                case "2":
                  navigate(`/staff/edit`); // Edit Page
                  break;
                case "3":
                  setActiveRecord(record);
                  setIsActiveOpen(true);
                  break;
                case "4":
                  setDeleteRecord(record);
                  setIsDeleteOpen(true);
                  break;
                case "5":
                  navigate(`/staff/history`); // Booking History
                  break;
                case "6":
                  navigate(`/staff/mange`); // Manage Vacation
                  break;
                default:
                  console.log("Other Action:", info.key, record);
              }
            }}
            items={[
              { key: "1", label: "View" },
              { key: "2", label: "Edit" },
              { key: "3", label: "Inactive" },
              { key: "4", label: "Delete" },
              { key: "5", label: "Booking History" },
              { key: "6", label: "Manage Vacation" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
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

  // Table Data with Status
  const data = [
    {
      key: 1,
      name: "Fayaz Ali",
      phone: "+968 324 464 252",
      email: "abc@gmail.com",
      role: "Receptionist",
      status: "Active",
      image: "/assets/avatar1.png",
    },
    {
      key: 2,
      name: "Mohammed Darwish",
      phone: "+968 337 108 252",
      email: "abc@gmail.com",
      role: "Service Provider",
      status: "Inactive",
      image: "/assets/avatar2.png",
    },
    {
      key: 3,
      name: "Jihad Bakir",
      phone: "+968 637 033 252",
      email: "abc@gmail.com",
      role: "Staff Manager",
      status: "Active",
      image: "/assets/avatar3.png",
    },
    {
      key: 4,
      name: "Saim Al Tajir",
      phone: "+968 391 418 758",
      email: "abc@gmail.com",
      role: "Admin",
      status: "Inactive",
      image: "/assets/avatar4.png",
    },
    {
      key: 5,
      name: "Nadeem Abbas",
      phone: "+968 137 633 326",
      email: "abc@gmail.com",
      role: "Receptionist",
      status: "Active",
      image: "/assets/avatar5.png",
    },
    {
      key: 6,
      name: "Samarh Amin",
      phone: "+968 642 933 321",
      email: "abc@gmail.com",
      role: "Service Provider",
      status: "Inactive",
      image: "/assets/avatar6.png",
    },
  ];

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchName = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchStatus = statusFilter
        ? item.status.toLowerCase() === statusFilter.toLowerCase()
        : true;
      return matchName && matchStatus;
    });
  }, [searchText, statusFilter, data]);

  return (
    <>
      <Card className="radius-12 border-gray h-100 card-cs">
        {/* Header Section */}
        <Flex
          justify="space-between"
          align="flex-start"
          wrap
          gap={10}
          className="mb-2"
        >
          <Flex vertical>
            <ModuleTopHeading level={4} name="Staffs" />
            <Text className="text-gray fs-14">
              Staff members added to his (staff manager) branch
            </Text>
          </Flex>

          {/* Add Staff Button */}
          <Button
            className="btncancel fs-13"
            onClick={() => navigate("/addstaff")}
          >
            <img
              src="/assets/icons/plus.png"
              alt="icon"
              style={{ width: 13, height: 13, marginRight: 8 }}
            />
            Add Staff
          </Button>
        </Flex>

        {/* Filter Section */}
        <Flex gap={10} className="mb-2">
          <Space size="middle" align="center">
            {/* Search Input */}
            <Input
              placeholder="Search by Staff Name"
              prefix={<SearchOutlined style={{ color: "#aaa" }} />}
              style={{ width: 300 }}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Status Dropdown */}
            <Select
              placeholder="Status"
              style={{ width: 150 }}
              allowClear
              value={statusFilter || undefined}
              onChange={(val) => setStatusFilter(val || "")}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Space>
        </Flex>

        {/* Table Section */}
        <Flex vertical gap={20}>
          <Table
            size="large"
            columns={columns}
            dataSource={filteredData}
            className="pagination table-cs table"
            pagination={false}
            scroll={{ x: 700 }}
            rowHoverable={false}
            rowKey="key"
          />

          <CustomPagination
            total={filteredData.length}
            current={current}
            pageSize={pageSize}
            onPageChange={(page, size) => {
              setCurrent(page);
              setPageSize(size);
            }}
          />
        </Flex>
      </Card>

      {/* Delete Modal */}
      <DeleteModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteRecord(null);
        }}
        onSave={handleSave}
        record={deleteRecord}
      />

      {/* Status Modal */}
      <StatusModal
        open={isActiveOpen}
        onClose={() => {
          setIsActiveOpen(false);
          setActiveRecord(null);
        }}
        onSave={handleSave}
        record={activeRecord}
      />
    </>
  );
};

export { StaffTable };
