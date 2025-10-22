import React from 'react';
import { Card, Tag, Typography, Button, Table, Avatar, Breadcrumb  } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate

const { Title, Text } = Typography;

const Viewstaff = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const staffData = {
    staffName: 'Fayez Ali',
    role: 'Service Provider',
    phoneNumber: '+234 654 543 432',
    assignedBranch: 'Branch 1',
    services: ['Service Name', 'Service Name', 'Service Name', 'Service Name'],
    email: 'abc@gmail.com',
    workingHours: {
      Monday: '09:00 am - 06:00 pm',
      Tuesday: '09:00 am - 06:00 pm',
      Wednesday: '09:00 am - 06:00 pm',
      Thursday: '09:00 am - 06:00 pm',
      Friday: 'Day Off',
      Saturday: '09:00 am - 06:00 pm',
      Sunday: '09:00 am - 06:00 pm',
    },
  };

  // ✅ Table rows
  const tableData = [
    { key: '1', field: 'Staff Name', value: staffData.staffName },
    { key: '2', field: 'Role', value: staffData.role },
    { key: '3', field: 'Phone Number', value: staffData.phoneNumber },
    { key: '4', field: 'Assigned Branch', value: staffData.assignedBranch },
    { 
      key: '5', 
      field: 'Services', 
      value: staffData.services.map((service, i) => <Tag key={i}>{service}</Tag>) 
    },
    { key: '6', field: 'email', value: staffData.email },
    { 
      key: '7', 
      field: 'Working Hours', 
      value: (
        <div>
          {Object.entries(staffData.workingHours).map(([day, hours]) => (
            <div key={day} style={{ display: 'flex', gap: 8 }}>
              <Text strong>{day}:</Text>
              <Text className={hours === 'Day Off' ? 'day-off' : ''}>{hours}</Text>
            </div>
          ))}
        </div>
      ) 
    },
  ];

  // ✅ Columns
  const columns = [
    { 
      title: 'Type', 
      dataIndex: 'field', 
      key: 'field', 
      width: '30%', 
      render: text => <Text strong>{text}</Text> 
    },
    { title: 'Detail', dataIndex: 'value', key: 'value' },
  ];

  return (
    <>
    <Card className='mb-3 card-cs' style={{ borderRadius: "8px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>Staff Management</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>Staffs</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }}>View</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
    <div className="profile-container">



      <Card className="profile-card">
        
        {/* Header Section */}
        <div 
          className="card-header mb-3" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Left side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button 
              type="text" 
              onClick={() => navigate("/staffs")} 
              icon={<ArrowLeftOutlined />} 
              className="back-button" 
            />

            {/* Avatar + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar 
                size={40} 
                src="https://via.placeholder.com/150" 
                alt={staffData.staffName} 
              />
              <Title level={4} className="card-title" style={{ margin: 0 }}>
                {staffData.staffName}
              </Title>
            </div>
          </div>

          {/* Right side */}
          <Tag color="green" className="active-tag">Active</Tag>
        </div>

        {/* ✅ Staff Details Table */}
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          bordered
          // size="middle"
          
        />
      </Card>
    </div>
    </>
  );
};

export { Viewstaff };
