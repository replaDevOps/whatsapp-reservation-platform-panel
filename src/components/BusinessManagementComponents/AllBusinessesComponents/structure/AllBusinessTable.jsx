import { useState, useEffect} from 'react';
import { Card, Flex, Table, Row, Col, Form, notification } from 'antd';
import { ConfirmModal, CustomPagination, DeleteModal, DropdownFilter, } from '../../../Ui';
import { allbusinessColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { notifyError, notifySuccess, statusbusinessItem, TableLoader, typeItems, useDebounce } from '../../../../shared';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_BUSINESSES } from '../../../../graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { CHANGE_BUSINESS_STATUS, DELETE_BUSINESS } from '../../../../graphql/mutation';


const AllBusinessTable = ({getSubscriptionsStats}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState(null);
    const [selectedstatus, setselectedStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [ deleteitem, setDeleteItem ] = useState(false)
    const [ statuschange, setStatusChange ] = useState(null)
    const navigate = useNavigate()
    const [ api, contextHolder ] = notification.useNotification()
    const [ search, setSearch ] = useState('')
    const debouncedSearch = useDebounce(search, 500);
    const [businesses, setBusinesses]= useState([])
    const [getBusinesses, { data, loading}] = useLazyQuery(GET_BUSINESSES, {
        fetchPolicy: "network-only",
    })
    const fetchBusinesses = () => {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedDate?.[1]?.format("YYYY-MM-DD") || null;

        getBusinesses({
            variables: {
                limit: pageSize,
                offSet: (current - 1) * pageSize,
                search: debouncedSearch?.trim() || null,
                status: selectedstatus || null,
                startDate,
                endDate,
                type: selectedAction || null
            }
        });
    };
    const [changeBusinessStatus, { loading: statusChanging }] = useMutation(CHANGE_BUSINESS_STATUS,{
        onCompleted: ()=>{
            notifySuccess(api,t("Business status change"),t("Business status changes successfully"));
            fetchBusinesses();
            setStatusChange(null)
        },
        onError: (error) => {
            notifyError(api, error);
        }
    });
     const [deleteBusiness, {loading: deleting}] = useMutation(DELETE_BUSINESS, {
        onCompleted: () => {
            notifySuccess(api,t("Business Delete"),t("Business deleted successfully"));
            setDeleteItem(false)
            fetchBusinesses();
            setCurrent(1);
        },
        onError: (error) => {
            notifyError(api, error);
        },
    });

    useEffect(()=>{
        fetchBusinesses()
    }, [
        debouncedSearch,
        selectedstatus,
        selectedAction,
        current,
        pageSize,
        selectedDate
    ])
    useEffect(()=>{
        setBusinesses(data?.getBusinesses?.businessess || []);
    }, [data])

    

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    return (
        <>
            {contextHolder}
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col span={24} md={24} xl={14}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={18} xl={16}>
                                    <SearchInput
                                        name='name'
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrent(1)
                                        }}
                                        placeholder={t("Search by Business Name / Customer Name")}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                        allowClear
                                    />
                                </Col>
                                <Col span={24} lg={6} xl={8}>
                                    <Flex gap={5}>
                                        <DropdownFilter
                                            items={typeItems}
                                            value={selectedAction}
                                            onChange={(key)=>{setselectedAction(key);setCurrent(1)}}
                                            onClear={() => setselectedAction(null)}
                                            placeholder="Type"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={statusbusinessItem}
                                            value={selectedstatus}
                                            onChange={(key)=>{setselectedStatus(key);setCurrent(1)}}
                                            onClear={() => setselectedStatus(null)}
                                            placeholder="Status"
                                            t={t}
                                        />
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
                                    placeholder={[t("Start Date"),t("End Date")]}
                                    value={selectedDate}
                                    onChange={(date) => {setSelectedDate(date);setCurrent(1)}}
                                />
                            </Flex>
                        </Col>
                    </Row>
                </Form>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={allbusinessColumns({setDeleteItem,setStatusChange,navigate,t,i18n})}
                        dataSource={businesses}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1500 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={"id"}
                        loading={{
                            ...TableLoader,
                            spinning: loading,
                        }}
                    />
                    <CustomPagination 
                        total={data?.getBusinesses?.totalCount}
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
                subtitle={'This action cannot be undone. Are you sure you want to change status of this Business?'}
                onClose={()=>setStatusChange(null)}
                loading={statusChanging}
                onConfirm={async ({id, status})=>{
                    await changeBusinessStatus({
                        variables: {
                            input:{
                                id,
                                status
                            }
                        }
                    })
                }}
            />
            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this business?'}
                onClose={()=>setDeleteItem(false)}
                loading={deleting}
                onConfirm= {async (deleteBusinessId)=>{
                    await deleteBusiness({ variables: {deleteBusinessId, deletedBy: '1eb5f017-9245-4258-8c8f-94f613a4db15'}  })
                }}
            />
        </>
    );
};

export { AllBusinessTable }