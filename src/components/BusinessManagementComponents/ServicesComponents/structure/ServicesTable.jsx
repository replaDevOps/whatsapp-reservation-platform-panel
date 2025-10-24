import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../../Ui';
import { serviceColumn, servicetableData } from '../../../../data';
import { useNavigate } from 'react-router-dom';
import { MySelect, SearchInput } from '../../../Forms';
import { AddEditServiceModal } from '../modal';

const { Text } = Typography;

const ServicesTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)
    const [ selectedbranch, setSelectedBranch] = useState([])

    const statusItems = [
        { key: 'active', label: 'Active' },
        { key: 'inactive', label: 'Inactive' },
    ];

    const branchItems = [
        { key: 'branch1', label: 'Branch 01' },
        { key: 'branch2', label: 'branch 02' },
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
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='Services' />
                            <Text className='text-gray fs-13'>Manage all the services in your system</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>setVisible(true)}> 
                          <PlusOutlined /> Add Service
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={7}>
                                <SearchInput
                                    name='name'
                                    placeholder='Search by Service Name'
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
                                    prefix={<img src='/assets/icons/search.png' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <Flex align='center' gap={15}>
                                    <MySelect 
                                        withoutForm
                                        mode={'multiple'}
                                        value={selectedbranch}
                                        onChange={(val)=>setSelectedBranch(val)}
                                        options={[
                                            {
                                                id: 1,
                                                name: 'Branch 01'
                                            },
                                        ]}
                                        placeholder='Branch'
                                        className='w-150'
                                    />
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
                        columns={serviceColumn({ setVisible, setEditItem, setDeleteItem, setStatusChange})}
                        dataSource={servicetableData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 700 }}
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
            <AddEditServiceModal 
                visible={visible}
                edititem={edititem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
            />
            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'Are you sure you want to inactivate this service?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this service?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { ServicesTable };