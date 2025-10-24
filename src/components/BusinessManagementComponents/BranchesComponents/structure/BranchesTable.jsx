import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../../Ui';
import { branchColumn, branchtableData } from '../../../../data';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../../Forms';

const { Text } = Typography;

const BranchesTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)

    const statusItems = [
        { key: 'active', label: 'Active' },
        { key: 'inactive', label: 'Inactive' },
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
                            <ModuleTopHeading level={4} name='Branches' />
                            <Text className='text-gray fs-13'>Manage all the branches in your system</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>navigate('/addbranch')}> 
                          <PlusOutlined /> Add Branch
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={7}>
                                <SearchInput
                                    name='name'
                                    placeholder='Search by Branch Name'
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
                                    prefix={<img src='/assets/icons/search.png' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} md={4}>
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
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={branchColumn({navigate, setDeleteItem, setStatusChange})}
                        dataSource={branchtableData}
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
            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'Are you sure you want to change status of this branch?'}
                onClose={()=>setStatusChange(false)}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this branch?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { BranchesTable };