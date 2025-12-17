import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination, } from '../../../Ui';
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
    const [selectedAction, setselectedAction] = useState('');
    const [selectedType, setselectedType] = useState('');
    const [selectedperiod, setselectedPeriod] = useState('');
    const [selectedYear, setSelectedYear] = useState(null);
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

    const buildFilterObject = () => ({
        search: debouncedSearch || null,
        type: selectedType || null,
        plan: selectedAction || null,
        validity: selectedperiod || null
        // startDate: selectedYear?.[0]?.format("YYYY-MM-DD") || null,
        // endDate: selectedYear?.[1]?.format("YYYY-MM-DD") || null,
    });
    useEffect(()=>{
        if(getSubscriberSubscriptions)
            getSubscriberSubscriptions({
                variables:{
                    limit: pageSize,
                    offDet: (current - 1) * pageSize,
                    ...buildFilterObject()
                }
            })
    }, [getSubscriberSubscriptions,debouncedSearch,selectedAction,selectedType,selectedperiod])
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

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };


    const handlePeriodClick = ({ key }) => {
        setselectedPeriod(key);
    };

    const handleTypeClick = ({key}) => {
        setselectedType(key);
    }
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={10} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by Business ID')}
                                        value={search}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                        onChange={(e)=>{
                                            setSearch(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{
                                                items: typeItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleTypeClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(typeItems.find((i) => i.key === selectedType)?.label || "Type")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: periodItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handlePeriodClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(periodItems.find((i) => i.key === selectedperiod)?.label || "Period")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: subscriptionItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(subscriptionItems.find((i) => i.key === selectedAction)?.label || "Subscription Plan")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
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
                                    placeholder={[t("Start Year"),t("End Year")]}
                                    value={selectedYear}
                                    onChange={(year) => setSelectedYear(year)}
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
                onClose={()=>{setVisible(false)}}
            />
            <UpgradePlanModal 
                visible={upgradeplan}
                edititem={edititem}
                onClose={()=>{setUpgradePlan(false);setEditItem(null);}}
            />
            <RenewPlanModal 
                visible={isrenew}
                edititem={edititem}
                onClose={()=>{setIsRenew(false);setEditItem(null);}}
            />

            
        </>
    );
};

export { SubscriptionManageTable };