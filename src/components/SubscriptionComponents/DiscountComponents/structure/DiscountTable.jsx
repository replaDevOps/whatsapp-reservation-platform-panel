import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination, DeleteModal, } from '../../../Ui';
import { discountColumns, discountData} from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { subscriptionItems, typeamountItem, typeitemsCust } from '../../../../shared';
import moment from 'moment';
import { AddEditDiscount } from '../modal';


const DiscountTable = ({visible,setVisible}) => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedType, setselectedType] = useState('');
    const [selectedgroup, setselectedGroup] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ edititem, setEditItem ] = useState(null)
    const [ expireitem, setExpireItem ] = useState(false)

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleTypeClick = ({ key }) => {
        setselectedType(key);
    };

    const handleGroupClick = ({ key }) => {
        setselectedGroup(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={10} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder='Search by Discount code'
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
                                                items: typeamountItem.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleTypeClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {typeamountItem.find((i) => i.key === selectedType)?.label || "Type"}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: typeitemsCust.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleGroupClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {typeitemsCust.find((i) => i.key === selectedgroup)?.label || "Group"}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: subscriptionItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {subscriptionItems.find((i) => i.key === selectedAction)?.label || "Subscription Plan"}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} md={24} xl={8}>
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
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={discountColumns({setVisible,setEditItem,setExpireItem})}
                        dataSource={discountData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1600 }}
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
            <AddEditDiscount 
                visible={visible}
                edititem={edititem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
            />
            <DeleteModal 
                visible={expireitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to expire this discount?'}
                onClose={()=>setExpireItem(false)}
            />            
        </>
    );
};

export { DiscountTable };