import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../../Ui';
import { stafftableColumn, stafftableData } from '../../../../data';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../../Forms';
import { statusitemsCust } from '../../../../shared';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const StaffTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedRole, setselectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)

    const roleItems = [
        { key: 'superadmin', label: t("Super Admin") },
        { key: 'technicaladmin', label: t("Technical Admin") },
        { key: 'demoadmin', label: t("Demo Admin") },
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

    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name={t("Staffs")} />
                            <Text className='text-gray fs-13'>{t("Manage all the staffs in your system")}</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>navigate('/addstaff')}> 
                          <PlusOutlined /> {t("Add Staff")}
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={24} lg={7}>
                                <SearchInput
                                    name='name'
                                    placeholder={t("Search by Staff Name")}
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <Flex gap={5}>
                                    <Dropdown
                                        menu={{
                                            items: roleItems.map((item) => ({
                                                key: String(item.key),
                                                label: t(item.label)
                                            })),
                                            onClick: handleRoleClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {t(roleItems.find((i) => i.key === selectedRole)?.label || "Role")}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: statusitemsCust.map((item) => ({
                                                key: String(item.key),
                                                label: t(item.label)
                                            })),
                                            onClick: handleStatusClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {t(statusitemsCust.find((i) => i.key === selectedStatus)?.label || "Status")}
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
                        columns={stafftableColumn({navigate,setStatusChange, setDeleteItem,t,i18n})}
                        dataSource={stafftableData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
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