import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../../Ui';
import { promotionColumn, promotionData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { AddEditPromotion } from '../modal';

const { Text } = Typography;
const PromotionTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedPromo, setselectedPromo] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ visible, setVisible ] = useState(false)
    const [ editItem, setEditItem ] = useState(null)
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)


    const actionItems = [
        { key: 'active', label: 'Active' },
        { key: 'expire', label: 'Expires' },
    ];

     const promoItems = [
        { key: 'fixed', label: 'Fixed' },
        { key: 'percentage', label: 'Percentage' },
    ];

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handlePromoClick = ({ key }) => {
        setselectedPromo(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='Promotions' />
                            <Text className='text-gray fs-13'>Manage all the promotions in your system</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>setVisible(true)}> 
                          <PlusOutlined /> Add Promotion
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={14} md={24} span={24}>        
                                <Row gutter={[16, 16]}>
                                    <Col span={24} md={24} lg={12}>
                                        <SearchInput
                                            name='name'
                                            placeholder='Search by Promo Name'
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
                                                    items: promoItems.map((item) => ({
                                                        key: String(item.key),
                                                        label: item.label
                                                    })),
                                                    onClick: handlePromoClick
                                                }}
                                                trigger={['click']}
                                            >
                                                <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                    <Flex justify="space-between" align="center" gap={30}>
                                                        {promoItems.find((i) => i.key === selectedPromo)?.label || "Promo Type"}
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
                                                        {actionItems.find((i) => i.key === selectedAction)?.label || "Status"}
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
                        columns={promotionColumn({setVisible, setEditItem, setStatusChange, setDeleteItem})}
                        dataSource={promotionData}
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

            <AddEditPromotion 
                visible={visible}
                edititem={editItem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
            />

            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'Are you sure you want to expire this promo?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this promo?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { PromotionTable };