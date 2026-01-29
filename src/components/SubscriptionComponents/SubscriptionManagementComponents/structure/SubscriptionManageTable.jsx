import { useEffect, useState } from 'react';
import { Card, Flex, Table, Row, Col, Form } from 'antd';
import { CustomPagination, DropdownFilter, } from '../../../Ui';
import { submanageColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { periodItems, subscriptionItems, TableLoader, typeItems, useDebounce } from '../../../../shared';
import { EditSubscriptionPlanModal, RenewPlanModal, UpgradePlanModal } from '../modal';
import { useTranslation } from 'react-i18next';
import { GET_SUBSCRIBERS_SUBSCRIPTIONS } from '../../../../graphql/query';
import { useLazyQuery } from '@apollo/client/react';


const SubscriptionManageTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState(null);
    const [selectedType, setselectedType] = useState(null);
    const [selectedperiod, setselectedPeriod] = useState(null);
    const [selectedDate, setselectedDate] = useState([]);
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)
    const [ upgradeplan, setUpgradePlan ] = useState(false)
    const [ isrenew, setIsRenew ] = useState(false)
    const [ search, setSearch ] = useState('')
    const debouncedSearch = useDebounce(search, 500);
    const [subscriberSubscriptions, setSubscriberSubscriptions]= useState([])
    const [getSubscriberSubscriptions, { data, loading }] = useLazyQuery(GET_SUBSCRIBERS_SUBSCRIPTIONS, {
        fetchPolicy: "network-only",
    })
    const fetchSubscriptionPlanManagement = () => {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedDate?.[1]?.format("YYYY-MM-DD") || null;
        return(
            getSubscriberSubscriptions({
                variables:{
                    limit: pageSize,
                    offDet: (current - 1) * pageSize,
                    search: debouncedSearch || null,
                    type: selectedType || null,
                    plan: selectedAction || null,
                    validity: selectedperiod || null,
                    startDate,
                    endDate
                }
            })
        )
    }
    useEffect(()=>{
        if(getSubscriberSubscriptions)
            fetchSubscriptionPlanManagement()
    }, [getSubscriberSubscriptions,debouncedSearch,selectedAction,selectedType,selectedperiod, selectedDate, pageSize, current])
    useEffect(()=>{
        if(data?.getSubscriberSubscriptions)
        {
            setSubscriberSubscriptions(data?.getSubscriberSubscriptions?.subscribersubscriptions)
            setUpgradePlan(false);setEditItem(null);
        }
    }, [data])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={12} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={24} xl={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by business name')}
                                        value={search}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                        onChange={(e)=>{
                                            setSearch(e.target.value)
                                            setCurrent(1)
                                        }}
                                        allowClear
                                    />
                                </Col>
                                <Col span={24} lg={24} xl={12}>
                                    <Flex gap={5}>
                                        <DropdownFilter
                                            items={typeItems}
                                            value={selectedType}
                                            onChange={(key)=>{setselectedType(key);setCurrent(1)}}
                                            onClear={() => setselectedType(null)}
                                            placeholder="Type"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={periodItems}
                                            value={selectedperiod}
                                            onChange={(key)=>{setselectedPeriod(key);setCurrent(1)}}
                                            onClear={() => setselectedPeriod(null)}
                                            placeholder="Period"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={subscriptionItems}
                                            value={selectedAction}
                                            onChange={(key)=>{setselectedAction(key);setCurrent(1)}}
                                            onClear={() => setselectedAction(null)}
                                            placeholder="Subscription Plan"
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
                                    onChange={(date) => {setselectedDate(date);setCurrent(1)}}
                                />
                            </Flex>
                        </Col>
                    </Row>
                </Form>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={submanageColumns({setVisible,setEditItem,setUpgradePlan,setIsRenew,t,i18n})}
                        dataSource={subscriberSubscriptions}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1600 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={"id"}
                        loading={{
                            ...TableLoader,
                            spinning: loading
                        }}
                    />
                    <CustomPagination 
                        total={data?.getSubscriberSubscriptions?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
            <EditSubscriptionPlanModal 
                visible={visible}
                edititem={edititem}
                onClose={()=>{setVisible(false)}}
                refetch={()=>fetchSubscriptionPlanManagement()}
            />
            <UpgradePlanModal 
                visible={upgradeplan}
                edititem={edititem}
                onClose={()=>{setUpgradePlan(false);setEditItem(null);}}
                refetch={()=>fetchSubscriptionPlanManagement()}
            />
            <RenewPlanModal 
                visible={isrenew}
                edititem={edititem}
                onClose={()=>{setIsRenew(false);setEditItem(null);}}
                refetch={()=>fetchSubscriptionPlanManagement()}
            />
        </>
    );
};

export { SubscriptionManageTable };