
import { Button, Card, Flex, Table, Typography, Dropdown, Menu,Input, Select, Space } from "antd";
import {  useState } from "react";
import { CustomPagination, DeleteModal } from "../../Ui";
import { ModuleTopHeading } from "../../PageComponent"
import { SearchOutlined } from "@ant-design/icons"; 
import AddServiceModal from "../../Ui/AddServicesModal";
import EditServiceModal from "../../Ui/EditServicesModal";
import { StatusModal } from "../../Ui/StatusModal";



// import AddVacationModal from "../../Ui/AddModal";
// import EditVacationModal from "../../Ui/EditModal";
const { Option } = Select;
const { Text } = Typography;

const ServiceTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Modal state
const [isAddOpen, setIsAddOpen] = useState(false);
const [isEditOpen, setIsEditOpen] = useState(false);
const [editRecord, setEditRecord] = useState(null);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [deleteRecord, setDeleteRecord] = useState(null);
const [IsActiveOpen, setIsActiveOpen] = useState(false);
const [activeRecord, setActiveRecord] = useState(null);
// //   const [ setEditRecord] = useState(null); 
const handleSave = (data) => {
  console.log("Vacation Data Saved:", data);
  setIsAddOpen(false);
  setIsEditOpen(false);
  setEditRecord(null);
  setIsDeleteOpen(false);
  setDeleteRecord(null);
  setIsActiveOpen(false);
  setActiveRecord(null);
};
//  const [open, setOpen] = useState(false);

//   const showModal = () => setOpen(true);
//   const handleCancel = () => setOpen(false);
//   const handleSave = () => {
//     console.log("Service saved!");
//     setOpen(false);
//   };
  // Table columns
  const columns = [
    { title: " Service Name", dataIndex: "servicename", key: "servicename" },
    { title: "Duration (minutes)", dataIndex: "duration", key: "duration" },
    { title: "Buffer Time (minutes)", dataIndex: "buffer", key: "buffer" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let style = {};
        if (status === "Active") {
          style = { color: "#22C55E", backgroundColor: "#22C55E1A" };
        } else if (status === "Inactive") {
          style = { color: "#D93025", backgroundColor: "#FDECEA" };
        }
        return (
          <span
            style={{
              ...style,
              padding: "3px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={(info) => {
            if (info.key === "1") {
              // Edit clicked
              setEditRecord(record);
              setIsEditOpen(true);
            }
              if (info.key === "2") {
                 setDeleteRecord(record);
              setIsDeleteOpen(true);
              }
              if (info.key === "3") {
                setActiveRecord(record);
              setIsActiveOpen(true);
              }
            }}
            items={[
              { key: "1", label: "Edit" },
              { key: "2", label: "Delete" },
              { key: "3", label: "Inactive" },
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

  // Table Data
  const data = [
    { key: 1, servicename: "Perming", duration: "20",buffer:'10', status: "Active" },
    { key: 1, servicename: "Advanced Moisturising", duration: "30",buffer:'15', status: "Inactive" },
    { key: 1, servicename: "Clean Ups", duration: "25",buffer:'20', status: "Active" },
    { key: 1, servicename: "Smoothening", duration: "40",buffer:'25', status: "Inactive" },
    
  ];

  // Pagination change
  const handlePageChange = (page, size) => {
    setCurrent(page);
    setPageSize(size);
  };

  return (
    <>
      <Card className="radius-12 border-gray h-100 card-cs">
        {/* Header Section */}
        <Flex justify="space-between" align="flex-start" wrap gap={10} className="mb-2">
          <Flex vertical>
            <ModuleTopHeading level={4} name="Services" />
            <Text className="text-gray fs-14">Manage all the services in your system</Text>
          </Flex>

          {/* Add Vacation Button */}
          <Flex justify="end" gap={20}>
            <Button className="btncancel fs-13" onClick={()=> setIsAddOpen(true)} >
              <img
                src="/assets/icons/plus.png"
                alt="icon"
                style={{ width: 13, height: 13, marginRight: 8 }}
              />
              Add Services
            </Button>
          </Flex>
        </Flex>
        <Flex gap={10} className="mb-2">

 <Space size="middle" align="center">
      {/* Search Input */}
      <Input
        placeholder="Search by Service Name"
        prefix={<SearchOutlined style={{ color: "#aaa" }} />}
        style={{ width: 300 }}
        allowClear
      />

      {/* Status Dropdown */}
      <Select
        placeholder="Status"
        style={{ width: 150 }}
        allowClear
      >
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
        <Option value="pending">Pending</Option>
      </Select>
    </Space>
        </Flex>
        {/* Table Section */}
        <Flex vertical gap={20}>
          <Table
            size="large"
            columns={columns}
            dataSource={data}
            className="pagination table-cs table"
            pagination={false}
            scroll={{ x: 700 }}
            rowHoverable={false}
          />

          <CustomPagination
            total={data.length}
            current={current}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </Flex>
      </Card>
      {/* <AddServiceModal
      open={open} 
      onCancel={handleCancel} 
      onSave={handleSave}
      /> */}

      <AddServiceModal
       open={isAddOpen}
  onClose={() => setIsAddOpen(false)}
  onSave={handleSave}
  // staffName="Mohammad Taha"
      />
      <EditServiceModal
     open={isEditOpen}
  onClose={() => {
    setIsEditOpen(false);
    setEditRecord(null);
  }}
  onSave={handleSave}
  // staffName="Mohammad Taha"
  record={editRecord}
      />
      <DeleteModal
     open={isDeleteOpen}
  onClose={() => {
    setIsDeleteOpen(false);
    setDeleteRecord(null);
  }}
  onSave={handleSave}
  // staffName="Mohammad Taha"
  record={deleteRecord}
      />
      <StatusModal
     open={IsActiveOpen}
  onClose={() => {
    setIsActiveOpen(false);
    setActiveRecord(null);
  }}
  onSave={handleSave}
  // staffName="Mohammad Taha"
  record={activeRecord}
      />
    </>
  );
};

export { ServiceTable };
