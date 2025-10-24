import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination } from '../../../Ui';
import { subscribetableColumn, subscribetableData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { UpgradeSubscriptionModal } from '../modals';

const { Text } = Typography;
const SubscriptionPlanTable = ({setRenewVisible,setRenewState}) => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedSubscribe, setselectedSubscribe] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)

    const statusItems = [
        { key: 'active', label: 'Active' },
        { key: 'inactive', label: 'Inactive' },
    ];
    const subscribeItems = [
        { key: 'basicplan', label: 'Basic Plan' },
        { key: 'standardplan', label: 'Standard Plan' },
        { key: 'proplan', label: 'Pro Plan' },
        { key: 'enterpriseplan', label: 'Enterprise Plan' },
    ];


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleStatusClick = ({ key }) => {
        setSelectedStatus(key);
    };

    const handleFreqClick = ({ key }) => {
        setselectedSubscribe(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Subscriptions' />
                        <Text className='text-gray fs-13'>Manage all the invoices in your system</Text>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={14} md={24} span={24}>        
                                <Row gutter={[16, 16]}>
                                    <Col span={24} lg={12}>
                                        <Flex gap={5}>
                                            <Dropdown
                                                menu={{
                                                    items: subscribeItems.map((item) => ({
                                                        key: String(item.key),
                                                        label: item.label
                                                    })),
                                                    onClick: handleFreqClick
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        {subscribeItems.find((i) => i.key === selectedSubscribe)?.label || "Subscription Plan"}
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
                        columns={subscribetableColumn({setEditItem,setVisible,setRenewVisible,setRenewState})}
                        dataSource={subscribetableData}
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
            <UpgradeSubscriptionModal 
                visible={visible}
                edititem={edititem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
            />
        </>
    );
};

export { SubscriptionPlanTable };