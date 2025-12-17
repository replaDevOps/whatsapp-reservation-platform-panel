import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form, message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal } from '../../../Ui';
import { stafftableColumn } from '../../../../data';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../../Forms';
import { getUserId, roleItems, statusitemsCust, TableLoader, useDebounce } from '../../../../shared';
import { useTranslation } from 'react-i18next';
import { GET_STAFFS } from '../../../../graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { DELETE_STAFF } from '../../../../graphql/mutation/mutations';
import { getUserID } from '../../../../utils/auth';

const { Text } = Typography;

const StaffTable = () => {
    
    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedRole, setselectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(true);
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(false)
    const [ deleteitem, setDeleteItem ] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [ search, setSearch ] = useState('')
    const searchdebounce = useDebounce(search,500);
    const [ getstaff, { data, loading, refetch }] = useLazyQuery(GET_STAFFS,{
        fetchPolicy: 'network-only'
    })
    const [staffData, setStaffData]= useState([])
    const [deleteStaff, { loading: deleting }] = useMutation(DELETE_STAFF);

    
    const buildFilterObject = () => ({
        search: searchdebounce || undefined,
        role: selectedRole || undefined,
        isActive: selectedStatus,
    });


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleRoleClick = ({ key }) => {
        setselectedRole(key);
    };

    const handleStatusClick = ({ key }) => {
        setSelectedStatus(key === "true");
    };

    useEffect(()=>{
        if(getstaff){
            getstaff({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    superAdminId: getUserID(),
                    filter: buildFilterObject(),
                }
            })
        }
    },[
        getstaff,
        searchdebounce,
        selectedRole,
        selectedStatus,
        current,
        pageSize
    ])

    useEffect(()=>{
        if(data?.getSuperAdminPanelUsers?.users)
            setStaffData(data?.getSuperAdminPanelUsers?.users)
    }, [data])

    const handleDelete = async () => {
        if (!deleteitem) return;
        try {
            await deleteStaff({ variables: { deleteUserId: deleteitem } });
            messageApi.success('Staff deleted successfully');
            setDeleteItem(null);
            refetch({
                limit: 20,
                offset: 0,
                filter: buildFilterObject()
            });
        } catch (err) {
            console.error(err);
            messageApi.error('Failed to delete staff');
        }
    };


    return (
        <>
            {contextHolder}
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
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
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
                                                key: item.key,
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
                        dataSource={staffData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1300 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record)=>record?.id}
                        loading={
                            {
                                ...TableLoader,
                                spinning: loading
                            }
                        }
                    />
                    <CustomPagination 
                        total={data?.getStaffMembers?.totalCount}
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
                onConfirm={handleDelete} 
                loading={deleting}
            />
        </>
    );
};

export { StaffTable };