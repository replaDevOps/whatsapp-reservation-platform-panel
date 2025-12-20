import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination } from '../../../Ui';
import { bookingColumn } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
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
    const [selectedYear, setSelectedYear] = useState([]);
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
        const startDate = selectedYear?.[0]?.format("YYYY-MM-DD") || null;
        const endDate = selectedYear?.[1]?.format("YYYY-MM-DD") || null;

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
    },[getBooking,debouncedSearch,selectedbrnach,selectedBusiness,selectedYear,selectedstatus,pageSize,current])

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

   
    const handleBusinessClick = ({ key }) => {
        setSelectedBusiness(key);
    };

    const handleBranchClick = ({ key }) => {
        setSelectedBranch(key === 'all' ? null : key);
    }; 

    const handleStatusClick = ({ key }) => {
        setselectedStatus(key);
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
                                placeholder={[t("Start Year"),t("End Year")]}
                                value={selectedYear}
                                onChange={(year) => setSelectedYear(year)}
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
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={16} xl={16}>
                                <Flex gap={5} wrap>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                { key: '', label: t("All Business") },
                                                ...(businessItems?.map((item) => ({
                                                    key: String(item.id),
                                                    label: item.name
                                                })) || [])
                                            ],
                                            onClick: handleBusinessClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {selectedBusiness ? businessItems?.find((i) => String(i.id) === selectedBusiness)?.name : t("All Business")}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                { key: '', label: t("All Branches") },
                                                ...(branchitem?.map((item) => ({
                                                    key: String(item.id),
                                                    label: item.name
                                                })) || [])
                                            ],
                                            onClick: handleBranchClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {selectedbrnach ? branchitem?.find((i) => String(i.id) === selectedbrnach)?.name : t("All Branches")}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: statusItem.map((item) => ({
                                                key: String(item.key),
                                                label: t(item.label)
                                            })),
                                            onClick: handleStatusClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {t(statusItem.find((i) => i.key === selectedstatus)?.label || "All Status")}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
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