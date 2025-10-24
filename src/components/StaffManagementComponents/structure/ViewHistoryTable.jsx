import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../Ui';
import { staffbookinghistoryData, viewbookinghistorystaffColumn } from '../../../data';
import { useNavigate } from 'react-router-dom';
import { MyDatepicker, SearchInput } from '../../Forms';
import moment from 'moment';


const ViewHistoryTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)


    const statusItems = [
        { key: 'completed', label: 'Completed' },
        { key: 'cancelled', label: 'Cancelled' },
    ];


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleStatusClick = ({ key }) => {
        setSelectedStatus(key);
    };
    
    return (
        <>
            <Flex vertical gap={15}>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={14} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder='Search by Booking ID'
                                        // value={search}
                                        // onChange={(e) => {
                                        //     setSearch(e.target.value);
                                        // }}
                                        prefix={<img src='/assets/icons/search.png' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    />
                                </Col>
                                <Col span={24} lg={12}>
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
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={viewbookinghistorystaffColumn}
                        dataSource={staffbookinghistoryData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1400 }}
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
            </Flex>
            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'Are you sure you want to inactivate this staff?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this Customer?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { ViewHistoryTable };