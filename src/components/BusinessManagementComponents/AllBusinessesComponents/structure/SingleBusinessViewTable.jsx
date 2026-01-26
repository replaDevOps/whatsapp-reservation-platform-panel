import { useEffect, useState } from 'react';
import { Button, Card, Flex, Table, Row, Col, Form, notification } from 'antd';
import { ConfirmModal, CustomPagination, DropdownFilter } from '../../../Ui';
import { singleviewColumns } from '../../../../data';
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
                                        setCurrent(1)
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                                <DropdownFilter
                                    items={statusitemsCust}
                                    value={selectedstatus}
                                    onChange={(key)=>{setselectedStatus(key);setCurrent(1)}}
                                    onClear={() => setselectedStatus(null)}
                                    placeholder="Status"
                                    t={t}
                                />
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