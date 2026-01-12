import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Row, Col, Form, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ConfirmModal, CustomPagination } from '../../../Ui';
import { singleviewColumns, singleviewData } from '../../../../data';
import { SearchInput } from '../../../Forms';
import { notifyError, notifySuccess, statusitemsCust, TableLoader, useDebounce } from '../../../../shared';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { GET_BRANCH_BY_BUSINESS } from '../../../../graphql/query';
import { CHANGE_BUSINESS_STATUS } from '../../../../graphql/mutation';
import { useNavigate } from 'react-router-dom';


const SingleBusinessViewTable = ({setViewItem,id}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedstatus, setselectedStatus] = useState(null);
    const [ statuschange, setStatusChange ] = useState(null)
    const navigate = useNavigate()
    const [ search, setSearch ] = useState(null)
    const debouncedSearch = useDebounce(search,500)
    const [ api, contextHolder ] = notification.useNotification()
    const [ branchBusinessData, setBranchBusinessData ] = useState([])
    const [changeBusinessStatus, { loading: statusChanging }] = useMutation(CHANGE_BUSINESS_STATUS,{
        onCompleted: ()=>{
            notifySuccess(api,t("Business status change"),t("Business status changes successfully"),()=>{setStatusChange(null);navigate('/allbusiness')} )
        },
        onError: (error) => {
            notifyError(api, error);
        }
    });
    const [ getBranchesByBusiness, {data,loading} ] = useLazyQuery(GET_BRANCH_BY_BUSINESS,{
        fetchPolicy:'network-only'
    })
    const buildFilterObject = () => ({
        search: debouncedSearch || null,
        status: selectedstatus,
    });

    useEffect(()=>{
        if(id) {
            getBranchesByBusiness({
                variables:{
                    limit: pageSize,
                    offSet: (current - 1) * pageSize,
                    businessId: id, 
                    filter: buildFilterObject(),
                }
            })
        }
    },[id,debouncedSearch,selectedstatus,current,pageSize])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleStatusClick = ({ key }) => {
        if (key === '') {
            setselectedStatus(null);
        } else {
            setselectedStatus(key === 'true');
        }
    }; 
    
    useEffect(()=>{
        setBranchBusinessData(data?.getBusinessBranches?.branches)
    },[data])
    return (
        <>
            {contextHolder}
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={10} md={24} span={24}>  
                            <Flex gap={10}>
                                <SearchInput
                                    name='name'
                                    placeholder={t("Search by Branch Name")}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
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
                                            {t(statusitemsCust.find((i) => (i.key === '' ? selectedstatus === null : i.key === selectedstatus))?.label || "Status")}
                                            <DownOutlined />
                                        </Flex>
                                    </Button>
                                </Dropdown>    
                            </Flex>    
                        </Col>
                        <Col span={24} md={24} xl={8}>
                            <Flex justify='end' gap={10}>
                                <Button onClick={()=>setStatusChange({id:id, status: 'INACTIVE'})} className='btnsave border-0 bg-red text-white fs-13'>
                                    {t("Deactivate business")}
                                </Button>
                            </Flex>
                        </Col>
                    </Row>
                </Form>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={singleviewColumns({setViewItem,t,i18n})}
                        dataSource={branchBusinessData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1000 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record)=>record?.id}
                        loading={{
                            ...TableLoader,
                            spinning: loading
                        }}
                    />
                    <CustomPagination 
                        total={branchBusinessData?.length ?? 0}
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
                subtitle={'This action cannot be undone. Are you sure you want to inactivate this Business?'}
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
        </>
    );
};

export { SingleBusinessViewTable };