import { useEffect, useState } from 'react';
import { Card, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination, DropdownFilter } from '../../../Ui';
import { bookingColumn } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { statusItem, TableLoader, useDebounce } from '../../../../shared';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { BRACH_LOOKUP, BUSINESS_LOOKUP, GET_BOOKING } from '../../../../graphql/query';

const { Text } = Typography;
const BookingTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedstatus, setselectedStatus] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [selectedbrnach, setSelectedBranch] = useState(null);
    const [selectedDate, setSelectedDate] = useState([]);
    const [ search, setSearch ] = useState(null);
    const debouncedSearch = useDebounce(search, 500);
    const [ bookingData, setBookingData ] = useState([])
    const [ getBooking, {data,loading} ] = useLazyQuery(GET_BOOKING,{
        fetchPolicy:'network-only'
    })
    const { data:branchLookups } = useQuery(BRACH_LOOKUP,{
        fetchPolicy:'network-only'
    })
    const { data:businessLookups } = useQuery(BUSINESS_LOOKUP,{
        fetchPolicy:'network-only'
    })
    const branchitem = branchLookups?.getBranches?.branches
    const businessItems = businessLookups?.getBusinesses?.businesses

    const fetchFilters = () => {
        const startDate = selectedDate?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedDate?.[1]?.format("YYYY-MM-DD") || null;

        getBooking({
            variables: {
                limit: pageSize,
                offset: (current - 1) * pageSize,
                search: debouncedSearch || null,
                branchId: selectedbrnach || null,
                businessId: selectedBusiness || null,
                startDate,
                endDate,
                status: selectedstatus || null
            }
        });
    };


    useEffect(()=>{
        if(getBooking){
            fetchFilters()
        }
    },[getBooking,debouncedSearch,selectedbrnach,selectedBusiness,selectedDate,selectedstatus,pageSize,current])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(()=>{
        if(data?.getAppointments){
            setBookingData(data?.getAppointments?.appointments)
        }
    },[data])
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={15} className='mb-2'>
                    <Flex wrap justify='space-between' align='center' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name={t("Bookings")} />
                            <Text className='text-gray fs-13'>{t("See all the Bookings in your system")}</Text>
                        </Flex>
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
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={24} lg={8} xl={8}>
                                <SearchInput
                                    name='name'
                                    placeholder={t("Search by Booking ID")}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrent(1)
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={16} xl={16}>
                                <Flex gap={5} wrap>
                                    <DropdownFilter
                                        items={businessItems?.map((item) => ({
                                            key: String(item.id),
                                            label: item.name
                                        })) || []}
                                        value={selectedBusiness}
                                        onChange={(key)=>{setSelectedBusiness(key);setCurrent(1)}}
                                        onClear={() => setSelectedBusiness(null)}
                                        placeholder="Businesses"
                                        t={t}
                                    />
                                    <DropdownFilter
                                        items={branchitem?.map((item) => ({
                                            key: String(item.id),
                                            label: item.name
                                        })) || []}
                                        value={selectedbrnach}
                                        onChange={(key)=>{setSelectedBranch(key);setCurrent(1)}}
                                        onClear={() => setSelectedBranch(null)}
                                        placeholder="Branches"
                                        t={t}
                                    />
                                    <DropdownFilter
                                        items={statusItem}
                                        value={selectedstatus}
                                        onChange={(key)=>{setselectedStatus(key);setCurrent(1)}}
                                        onClear={() => setselectedStatus(null)}
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
                        columns={bookingColumn({t,i18n})}
                        dataSource={bookingData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1400 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record)=> record?.id}
                        loading={{
                            ...TableLoader,
                            spinning:loading
                        }}
                    />
                    <CustomPagination 
                        total={data?.getAppointments?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
        </>
    );
};

export { BookingTable };