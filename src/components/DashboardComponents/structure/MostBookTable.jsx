import { Button, Card, Dropdown, Flex, Space, Table, Typography } from 'antd';
import { useState } from 'react';
import { CustomPagination } from '../../Ui';
import { message } from "antd";
import { BookingDashboardColumn, dashboardtableData } from '../../../data';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography
const MostBookTable = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [order, setOrder] = useState(0)

    const items = [
        { key: 0, label: 'This Month' },
    ];
    // Pagination change
    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const onClick = ({ key }) => {
        setOrder(key);
    };


    return (
        <>
        {contextHolder}
            <Card className='radius-12 border-gray h-100 card-cs'>
                <Flex justify='space-between' align='flex-start' wrap gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Most Booked Doctors' />
                        <Text className='text-gray fs-13'>Top Ranked</Text>
                    </Flex>
                    <Flex justify='end' gap={10}>
                        <Dropdown
                            menu={{ items, onClick }}
                            trigger={['click']}
                            className='margin-top'
                        >
                            <Button className='btncancel fs-13 pad-x'>
                                <Space>
                                    {
                                        order == 0 ? 'This Month' : ''
                                    }  
                                    <DownOutlined className='fs-12' />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Flex>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={BookingDashboardColumn}
                        dataSource={dashboardtableData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 400 }}
                        rowHoverable={false}
                        pagination={false}
                        // loading={isLoading}
                    />
                    <CustomPagination 
                        total={4}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
        </>
    );
};

export { MostBookTable };