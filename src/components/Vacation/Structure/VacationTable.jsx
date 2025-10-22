
import { Button, Card, Flex, Table, Typography, Dropdown, Menu } from "antd";
import { useState } from "react";
import { ModuleTopHeading } from "../../PageComponent";
import { CustomPagination, DeleteModal } from "../../Ui";
import AddVacationModal from "../../Modal/AddModal";
import EditVacationModal from "../../Modal/EditModal";



const { Text } = Typography;

const VacationTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  // Modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleSave = (data) => {
    console.log("Vacation Data Saved:", data);
    setIsAddOpen(false);
    setIsEditOpen(false);
    setEditRecord(null);
  };

  // Table columns
  const columns = [
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let style = {};
        if (status === "Approved") {
          style = { color: "#22C55E", backgroundColor: "#22C55E1A" };
        } else if (status === "Rejected") {
          style = { color: "#D93025", backgroundColor: "#FDECEA" };
        } else {
          style = { color: "#1A73E8", backgroundColor: "#E8F0FE" };
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
                setEditRecord(record);
                setIsEditOpen(true);
              }
              if (info.key === "2") {
                setDeleteRecord(record);
                setIsDeleteOpen(true);
            
              }
              if (info.key === "3") {
                console.log("Inactive clicked for:", record);
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
    { key: 1, startDate: "5/30/14", endDate: "2/11/12", status: "Pending" },
    { key: 2, startDate: "4/2/12", endDate: "8/30/14", status: "Approved" },
    { key: 3, startDate: "7/27/13", endDate: "9/23/16", status: "Rejected" },
    { key: 4, startDate: "1/3/14", endDate: "8/15/17", status: "Approved" },
    { key: 5, startDate: "8/21/15", endDate: "10/6/13", status: "Approved" },
    { key: 6, startDate: "8/2/19", endDate: "6/2/19", status: "Approved" },
    { key: 7, startDate: "1/15/12", endDate: "5/19/12", status: "Approved" },
    { key: 8, startDate: "6/16/14", endDate: "4/4/18", status: "Approved" },
    { key: 9, startDate: "12/10/13", endDate: "8/16/13", status: "Rejected" },
    { key: 10, startDate: "9/23/16", endDate: "12/10/13", status: "Approved" },
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
            <ModuleTopHeading level={4} name="My Vacations" />
            <Text className="text-gray fs-14">Manage your vacation.</Text>
          </Flex>

          {/* Add Vacation Button */}
          <Flex justify="end" gap={20}>
            <Button className="btncancel fs-13" onClick={() => setIsAddOpen(true)}>
              <img
                src="/assets/icons/plus.png"
                alt="icon"
                style={{ width: 13, height: 13, marginRight: 8 }}
              />
              Add Vacation
            </Button>
          </Flex>
        </Flex>

             <Flex className='mt-3 mb-2 gap-12'> 
            <img src="/assets/images/newcust-ar.png" alt="icon" 
            style={{ width: 32, height: 32, marginRight: 8, }} 
            /> 
            <Flex vertical> 
                <Text className='text-gray fs-12' > 
                    Total vacations (this month)
                     </Text> 
                     <Text className=' fs-20' >
                         19
                          </Text> 
                          </Flex>
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

      {/* Add Vacation Modal */}
      <AddVacationModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSave}
        staffName="Mohammad Taha"
      />

      {/* Edit Vacation Modal */}
      <EditVacationModal
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditRecord(null);
        }}
        onSave={handleSave}
        staffName="Mohammad Taha"
        record={editRecord}
      />
      <DeleteModal
       open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteRecord(null);
        }}
        onSave={handleSave}
        record={deleteRecord}
      />
      </>

  );
};

export { VacationTable };
