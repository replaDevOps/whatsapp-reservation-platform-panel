import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination } from '../../../Ui';
import { bookingColumn, bookingData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { statusItem } from '../../../../shared';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const BookingTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedstatus, setselectedStatus] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [selectedbrnach, setSelectedBranch] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());

    const businessItems = [
        { key: 'business01', label: 'Mirava Spine Clinic' },
        { key: 'business02', label: 'Northrel Therapy Dept' },
    ];

    const branchItems = [
        { key: 'branch01', label: 'Branch name 01' },
        { key: 'branch02', label: 'Branch name 02' },
    ];

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

   
    const handleBusinessClick = ({ key }) => {
        setSelectedBusiness(key);
    };

    const handleBranchClick = ({ key }) => {
        setSelectedBranch(key);
    };

    const handleStatusClick = ({ key }) => {
        setselectedStatus(key);
    };

    
    
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
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                            <Col span={24} lg={16} xl={16}>
                                <Flex gap={5} wrap>
                                    <Dropdown
                                        menu={{
                                            items: businessItems.map((item) => ({
                                                key: String(item.key),
                                                label: item.label
                                            })),
                                            onClick: handleBusinessClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {t(businessItems.find((i) => i.key === selectedBusiness)?.label || "Business Name")}
                                                <DownOutlined />
                                            </Flex>
                                        </Button>
                                    </Dropdown>
                                    <Dropdown
                                        menu={{
                                            items: branchItems.map((item) => ({
                                                key: String(item.key),
                                                label: item.label
                                            })),
                                            onClick: handleBranchClick
                                        }}
                                        trigger={['click']}
                                    >
                                        <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                            <Flex justify="space-between" align="center" gap={30}>
                                                {t(branchItems.find((i) => i.key === selectedbrnach)?.label || "Branch Name")}
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
                                                {t(statusItem.find((i) => i.key === selectedstatus)?.label || "Status")}
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
                        // loading={isLoading}
                    />
                    <CustomPagination 
                        total={12}
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