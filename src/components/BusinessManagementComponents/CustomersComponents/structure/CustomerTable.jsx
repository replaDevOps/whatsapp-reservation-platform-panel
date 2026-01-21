import { useEffect, useState } from 'react';
import { Button, Card, Flex, Table, Typography, Row, Col, Form, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination } from '../../../Ui';
import { customerColumn } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { AddCustomerModal } from '../modal';
import { useTranslation } from 'react-i18next';
import { GET_SUBSCRIBER_CUSTOMERS } from '../../../../graphql/query/subscriberCustomers';
import { useLazyQuery } from '@apollo/client/react';
import { exportToExcel, TableLoader, useDebounce } from '../../../../shared';

const { Text } = Typography;

const CustomerTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [ visible, setVisible ] = useState(false)
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [ search, setSearch ] = useState('')
    const debouncedSearch = useDebounce(search, 500);
    const [subscriberCustomers, setSubscriberCustomers]= useState([])
    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    }
    const [getSubscriberCustomers, { data, loading }] = useLazyQuery(GET_SUBSCRIBER_CUSTOMERS, {
        fetchPolicy: "network-only",
    })
    const fetchCustomer = ()=> {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate =  selectedDate?.[1]?.format("YYYY-MM-DD") || null;
        return(
            getSubscriberCustomers({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    filter: {
                        search: debouncedSearch || null,
                        startDate,
                        endDate 
                    }
                }
            })
        )
    }

    useEffect(()=>{
        if(getSubscriberCustomers)
            fetchCustomer()
    }, [getSubscriberCustomers,debouncedSearch,selectedDate,current,pageSize])

    useEffect(()=>{
        setSubscriberCustomers(data?.getSubscribers?.subscribers)
    }, [data])
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex justify='space-between' align='center' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name={t("Customers")} />
                            <Text className='text-gray fs-13'>{t("Manage all the Customers in your system")}</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>{setVisible(true)}}> 
                          <PlusOutlined /> {t("Add Customer")}
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify={'space-between'}>
                            <Col span={24} md={24} lg={7} xl={8} >
                                <SearchInput
                                    name='name'
                                    placeholder={t("Search by Customer Name")}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} md={24} lg={12}>
                                <Flex justify='end' gap={10}>         
                                    <Button className='btncancel' onClick={() => exportToExcel(subscriberCustomers, 'SubscriberData')}> 
                                        <Flex align='center' gap={10}>
                                            <Image src='/assets/icons/export.webp' width={16} preview={false} alt='export icons' fetchPriority="high" /> {t("Export")}
                                        </Flex>
                                    </Button>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder={[t("Start Year"),t("End Year")]}
                                        value={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={customerColumn({t,i18n})}
                        dataSource={subscriberCustomers}
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
                        total={data?.getSubscribers?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
            <AddCustomerModal 
                visible={visible}
                refetch={() => fetchCustomer()}
                onClose={()=>setVisible(false)}
            />
        </>
    );
};

export { CustomerTable };