import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ConfirmModal, CustomPagination, DeleteModal, } from '../../../Ui';
import { allbusinessColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { allbusinessData } from '../../../../data';
import { typeOp } from '../../../../shared';


const AllBusinessTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedstatus, setselectedStatus] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ deleteitem, setDeleteItem ] = useState(false)
    const [ statuschange, setStatusChange ] = useState(false)


    const statusItem = [
        {
            key: '1', label: 'Active'
        },
        {
            key: '2', label: 'Deactive'
        },
    ]

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleStatusClick = ({ key }) => {
        setselectedStatus(key);
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
                                        placeholder='Search by Business Name / Customer Name'
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
                                                items: typeOp.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {typeOp.find((i) => i.key === selectedAction)?.label || "Type"}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: statusItem.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleStatusClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {statusItem.find((i) => i.key === selectedstatus)?.label || "Status"}
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
                        columns={allbusinessColumns({setDeleteItem,setStatusChange})}
                        dataSource={allbusinessData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1300 }}
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
                subtitle={'This action cannot be undone. Are you sure you want to deactivate this Business?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this business?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { AllBusinessTable };