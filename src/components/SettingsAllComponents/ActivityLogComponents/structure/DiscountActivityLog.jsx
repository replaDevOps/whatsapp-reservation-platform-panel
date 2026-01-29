import { useEffect, useState } from 'react';
import { Button, Flex, Table, Row, Col, Form, Image } from 'antd';
import { CustomPagination, DropdownFilter } from '../../../Ui';
import { discountactivityColumn } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';
import { exportToExcel, groupItem, TableLoader, useDebounce } from '../../../../shared';
import { GET_DISCOUNT_LOG, GET_DISCOUNT_LOOKUP } from '../../../../graphql/query';
import { useLazyQuery, useQuery } from '@apollo/client/react';

const DiscountActivityLog = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState(null);
    const [selecteddiscount, setselectedDiscount] = useState(null);
    const [selectedDate, setSelectedDate] = useState([]);
    const [ search, setSearch ] = useState(null)
    const debounce = useDebounce(search,500)
    const [ discountlogdata, setDiscountLogData ] = useState([])
    const [ getDiscountLog, { data, loading } ] = useLazyQuery(GET_DISCOUNT_LOG,{
        fetchPolicy: 'network-only'
    })
    const { data:discountLookups } = useQuery(GET_DISCOUNT_LOOKUP,{
        variables:{
            limit: 100,
            offset: 0
        }
    })

    const discountLookup = discountLookups?.getDiscounts?.discounts

    const fetchDiscountFilter = () => {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedDate?.[1]?.format("YYYY-MM-DD") || null;

        getDiscountLog({
            variables: {
                limit: pageSize,
                offSet: (current - 1) * pageSize,
                search: debounce || null,
                group: selectedAction || null,
                code: selecteddiscount || null,
                startDate,
                endDate
            }
        });
    };

     useEffect(() => {
        fetchDiscountFilter()
    }, [
        debounce,
        selectedDate,
        selectedAction,
        selecteddiscount,
        current,
        pageSize
    ]);    

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };
    
    // const handleDiscountClick = ({ key }) => {
    //     const found = discountLookup?.find((i) => String(i.id) === String(key));
    //     const code = found?.code ?? null;
    //     setselectedDiscount(code);
    //     setCurrent(1)
    // };

    useEffect(()=>{
        if(data?.getAllSubscriptionDiscountLogs)
            setDiscountLogData(data?.getAllSubscriptionDiscountLogs?.discountlogs)
    }, [data])

    return (
        <>
            
            <Flex vertical gap={10} className='mb-2'>
                <Form layout="vertical" form={form}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={14} md={24} span={24}>        
                            <Row gutter={[16, 16]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by Customer Name')}
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
                                            items={discountLookup?.map((item) => ({
                                                key: String(item.code),
                                                label: item.code
                                            }))}
                                            value={selecteddiscount}
                                            onChange={(key)=>{setselectedDiscount(key);setCurrent(1)}}
                                            onClear={() => setselectedDiscount(null)}
                                            placeholder="Discount Code"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={groupItem}
                                            value={selectedAction}
                                            onChange={(key)=>{setselectedAction(key);setCurrent(1)}}
                                            onClear={() => setselectedAction(null)}
                                            placeholder="Group"
                                            t={t}
                                        />
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} md={24} xl={10}>
                            <Flex justify='end' gap={10}>
                                <Button className='btncancel'  onClick={() => exportToExcel('', 'DiscountActivityLog')}> 
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.webp' width={20} preview={false} alt='export icons' fetchPriority="high" /> {t("Export Data")}
                                    </Flex>
                                </Button>
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
            </Flex>
            <Flex vertical gap={20}>
                <Table
                    size='large'
                    columns={discountactivityColumn({t,i18n})}
                    dataSource={discountlogdata}
                    className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                    showSorterTooltip={false}
                    scroll={{ x: 1200 }}
                    rowHoverable={false}
                    pagination={false}
                    rowKey={"id"}
                    loading={{
                        ...TableLoader,
                        spinning: loading
                    }}
                />
                <CustomPagination 
                    total={data?.getAllSubscriptionDiscountLogs?.totalCount}
                    current={current}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </Flex>
        </>
    );
};

export { DiscountActivityLog };