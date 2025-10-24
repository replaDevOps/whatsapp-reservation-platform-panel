import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination } from '../../../Ui';
import { activitylogColumn, activitylogtableData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';

const { Text } = Typography;
const ActivityLogTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedRole, setselectedRole] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());


    const actionItems = [
        { key: 'active', label: 'Active' },
        { key: 'inactive', label: 'Inactive' },
        { key: 'add', label: 'Add' },
        { key: 'edit', label: 'Edit' },
        { key: 'delete', label: 'Delete' },
        { key: 'status-update', label: 'Status Update' },
        { key: 'cancel', label: 'Cancel' },
        { key: 'in-progress', label: 'In Progress' },
        { key: 'no-show', label: 'No Show' },
        { key: 'renew', label: 'Renew' },
        { key: 'upgrade', label: 'Upgrade' }
    ];

     const roleItems = [
        { key: 'admin', label: 'Admin' },
        { key: 'staffmanager', label: 'Staff Manager' },
        { key: 'serviceprovider', label: 'Service Provider' },
        { key: 'receptionist', label: 'Receptionist' },
    ];

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleRoleClick = ({ key }) => {
        setselectedRole(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Activity Log' />
                        <Text className='text-gray fs-13'>Manage all the activities in your system</Text>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={14} md={24} span={24}>        
                                <Row gutter={[16, 16]}>
                                    <Col span={24} md={24} lg={12}>
                                        <SearchInput
                                            name='name'
                                            placeholder='Search by Role Name'
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
                                                    items: actionItems.map((item) => ({
                                                        key: String(item.key),
                                                        label: item.label
                                                    })),
                                                    onClick: handleActionClick
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        {actionItems.find((i) => i.key === selectedAction)?.label || "Action"}
                                                        <DownOutlined />
                                                    </Flex>
                                                </Button>
                                            </Dropdown>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} md={24} xl={7}>
                                <Flex justify='end' gap={10}>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder="Select Year"
                                        value={selectedYear}
                                        onChange={(year) => setSelectedYear(year)}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={activitylogColumn}
                        dataSource={activitylogtableData}
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
        </>
    );
};

export { ActivityLogTable };