import { useEffect, useState } from 'react';
import { Button, Card, Flex, Table, Row, Col, Form, Image } from 'antd';
import { CustomPagination, DropdownFilter, } from '../../../Ui';
import { revenueColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { subscriptionItems, TableLoader, servicetypeItems, exportToExcel, useDebounce } from '../../../../shared';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { GET_REVENUE } from '../../../../graphql/query';


const RevenueTable = () => {

    const [form] = Form.useForm();
    const {t,i18n}=useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState(null);
    const [selectedType, setselectedType] = useState(null);
    const [selectedDate, setselectedDate] = useState([]);
    const [revenueData, setRevenueData]= useState([])
    const [ search, setSearch ] = useState(null)
    const debouncedSearch = useDebounce(search, 500);
    const [ getRevenue, { data, loading }] = useLazyQuery(GET_REVENUE,{
        fetchPolicy: 'network-only'
    })

    const fetchFilters = () => {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedDate?.[1]?.format("YYYY-MM-DD") || null;

        getRevenue({
            variables: {
                limit: pageSize,
                offDet: (current - 1) * pageSize,
                search: debouncedSearch || null,
                type: selectedType || null,
                plan: selectedAction || null,
                startDate,
                endDate,
            }
        });
    };
    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(() => {
        fetchFilters()
    }, [
        getRevenue,
        debouncedSearch,
        selectedDate,
        selectedType,
        selectedAction,
        current,
        pageSize
    ]);


    useEffect(()=>{
        if(data?.getSubscriberSubscriptions?.subscribersubscriptions)
            setRevenueData(data?.getSubscriberSubscriptions?.subscribersubscriptions)
    }, [data])
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={14} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by Business Name')}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrent(1)
                                        }}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <Flex gap={5}>
                                        <DropdownFilter
                                            items={servicetypeItems}
                                            value={selectedType}
                                            onChange={(key)=>{setselectedType(key);setCurrent(1)}}
                                            onClear={() => setselectedType(null)}
                                            placeholder="Types"
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
                                <Button className='btncancel'  onClick={() => exportToExcel(revenueData, 'RevenueData')}> 
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.webp' width={16} preview={false} alt='export icons' fetchPriority="high" /> {t("Export")}
                                    </Flex>
                                </Button>
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
                        columns={revenueColumns({t,i18n})}
                        dataSource={revenueData}
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
                        total={data?.getSubscriberSubscriptions?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
        </>
    );
};

export { RevenueTable };