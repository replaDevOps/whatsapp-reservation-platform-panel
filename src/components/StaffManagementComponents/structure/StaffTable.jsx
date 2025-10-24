import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../Ui';
import { stafftableColumn, stafftableData } from '../../../data';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../Forms';

const { Text } = Typography;

const StaffTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedRole, setselectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedBranch, setselectedBranch] = useState('');
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)

    const roleItems = [
        { key: 'serviceprovider', label: 'Service Provider' },
        { key: 'staffmanager', label: 'Staff Manager' },
        { key: 'admin', label: 'Admin' },
        { key: 'receptionist', label: 'Receptionist' },
    ];

    const statusItems = [
        { key: 'active', label: 'Active' },
        { key: 'inactive', label: 'Inactive' },
    ];
    const branchItems = [
        { key: 'branchone', label: 'Branch 01' },
        { key: 'branchtwo', label: 'Branch 02' },
    ];


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleRoleClick = ({ key }) => {
        setselectedRole(key);
    };

    const handleStatusClick = ({ key }) => {
        setSelectedStatus(key);
    };

    const handleBranchClick = ({ key }) => {
        setselectedBranch(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='Staffs' />
                            <Text className='text-gray fs-13'>Manage all the staffs in your system</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>navigate('/addstaff')}> 
                          <PlusOutlined /> Add Staff
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={24} lg={7}>
                                <SearchInput
                                    name='name'
                                    placeholder='Search by Staff Name'
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
                                    prefix={<img src='/assets/icons/search.png' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <Flex gap={5}>
                                    <Dropdown
                                        menu={{
                                            items: roleItems.map((item) => ({
                                                key: String(item.key),
                                                label: item.label
                                            })),
                                            onClick: handleRoleClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {roleItems.find((i) => i.key === selectedRole)?.label || "Role"}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: branchItems.map((item) => ({
                                                key: String(item.key),
                                                label: item.label
                                            })),
                                            onClick: handleBranchClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {branchItems.find((i) => i.key === selectedBranch)?.label || "Branch"}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: statusItems.map((item) => ({
                                                key: String(item.key),
                                                label: item.label
                                            })),
                                            onClick: handleStatusClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {statusItems.find((i) => i.key === selectedStatus)?.label || "Status"}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={stafftableColumn({navigate,setStatusChange, setDeleteItem})}
                        dataSource={stafftableData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1200 }}
                        rowHoverable={false}
                        pagination={false}
                        // loading={isLoading}
                    />
                    <CustomPagination 
                        total={12}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'Are you sure you want to change status this staff?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this Staff?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { StaffTable };