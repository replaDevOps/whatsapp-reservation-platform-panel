import { useEffect, useState } from 'react';
import { Button, Card, Flex, Table, Typography, Row, Col, Form, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal, CustomPagination, DeleteModal, DropdownFilter } from '../../../Ui';
import { stafftableColumn } from '../../../../data';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../../Forms';
import { notifyError, notifySuccess, roleItems, statusitemsCust, TableLoader, useDebounce } from '../../../../shared';
import { useTranslation } from 'react-i18next';
import { GET_STAFFS } from '../../../../graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { DELETE_STAFF, UPDATE_STAFF } from '../../../../graphql/mutation/mutations';
import { getUserID } from '../../../../utils/auth';

const { Text } = Typography;

const StaffTable = () => {
    
    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedRole, setselectedRole] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const navigate = useNavigate();
    const [ statuschange, setStatusChange ] = useState(null)
    const [ deleteitem, setDeleteItem ] = useState(null)
    const [api, contextHolder] = notification.useNotification();
    const [ search, setSearch ] = useState('')
    const searchdebounce = useDebounce(search,500);
    const [staffData, setStaffData]= useState([])
    const [ getstaff, { data, loading }] = useLazyQuery(GET_STAFFS,{
        fetchPolicy: 'network-only'
    })
    const [updatestaff, {loading: updating}] = useMutation(UPDATE_STAFF,{
        onCompleted: () => {
            notifySuccess(api,t('Staff Status Update'),t('Staff status has been updated successfully'),()=>fetchStaffs());
            setStatusChange(null);
        },onError:(error)=>{notifyError(api,error)}
    })
    const fetchStaffs = () => {
        getstaff({
            variables: {
                limit: pageSize,
                offset: (current - 1) * pageSize,
                superAdminId: getUserID(),
                filter: {
                    search: searchdebounce || null,
                    role: selectedRole || null,
                    isActive: selectedStatus,
                }
            }
        })
    }
    const [deleteStaff, { loading: deleting }] = useMutation(DELETE_STAFF,{
        onCompleted: ()=>{
            notifySuccess(api,t("Staff Delete"),t("Staff has been deleted successfully."), ()=> {fetchStaffs(); setDeleteItem(null)})
        },
        onError: (error) => {
            notifyError(api, error);
        }
    });


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(()=>{
        if(getstaff){
            fetchStaffs();
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
        if(data?.getSuperAdminPanelUsers)
            setStaffData(data?.getSuperAdminPanelUsers?.users)
    }, [data])

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
                                        setCurrent(1)
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    allowClear
                                />
                            </Col>
                            <Col span={24} lg={12}>
                                <Flex gap={5}>
                                    <DropdownFilter
                                        items={roleItems}
                                        value={selectedRole}
                                        onChange={(key)=>{setselectedRole(key);setCurrent(1)}}
                                        onClear={() => setselectedRole(null)}
                                        placeholder="Role"
                                        t={t}
                                    />
                                    <DropdownFilter
                                        items={statusitemsCust}
                                        value={selectedStatus}
                                        onChange={(key)=>{setSelectedStatus(key);setCurrent(1)}}
                                        onClear={() => setSelectedStatus(null)}
                                        placeholder="Status"
                                        t={t}
                                    />
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
                        rowKey={"id"}
                        loading={
                            {
                                ...TableLoader,
                                spinning: loading
                            }
                        }
                    />
                    <CustomPagination 
                        total={data?.getSuperAdminPanelUsers?.totalCount}
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
                onClose={()=>setStatusChange(null)}
                onConfirm={ async({id,status})=>{
                    if(!id && !status) {
                        notifyError(api,'Id is missing!') 
                        return
                    }
                    await updatestaff({variables:{input:{id,isActive: !status}}})
                }}
                loading={updating}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this Staff?'}
                onClose={()=>setDeleteItem(null)}
                onConfirm={ async()=>{
                    if (!deleteitem) return;
                    await deleteStaff({ variables: { deleteUserId: deleteitem } });
                }} 
                loading={deleting}
            />
        </>
    );
};

export { StaffTable };