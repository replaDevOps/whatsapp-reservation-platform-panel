import { useState } from 'react';
import { Button, Dropdown, Flex, Table, Row, Col, Form, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../../Ui';
import { discountactivityColumn, discountactivityData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { exportToExcel } from '../../../../shared';

const DiscountActivityLog = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selecteddiscount, setselectedDiscount] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());


    const discountItem = [
        { key: '1', label: 'Sale 12' },
        { key: '2', label: 'Deal 0101' },
    ];

     const groupItem = [
        { key: 'new', label: 'New' },
        { key: 'old', label: 'Old' },
        { key: 'both', label: 'Both' },
    ];

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleDiscountClick = ({ key }) => {
        setselectedDiscount(key);
    };
    
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
                                        // value={search}
                                        // onChange={(e) => {
                                        //     setSearch(e.target.value);
                                        // }}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{
                                                items: discountItem.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleDiscountClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(discountItem.find((i) => i.key === selecteddiscount)?.label || "Discount Code")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: groupItem.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(groupItem.find((i) => i.key === selectedAction)?.label || "Group")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
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
                                    placeholder={[t("Start Year"),t("End Year")]}
                                    value={selectedYear}
                                    onChange={(year) => setSelectedYear(year)}
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
                    dataSource={discountactivityData}
                    className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                    showSorterTooltip={false}
                    scroll={{ x: 1200 }}
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
        </>
    );
};

export { DiscountActivityLog };