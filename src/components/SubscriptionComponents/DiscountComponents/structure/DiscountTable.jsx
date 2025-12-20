import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Row, Col, Form, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination, DeleteModal, } from '../../../Ui';
import { discountColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { subscriptionItems, TableLoader, typeamountItem, typeitemsCust, useDebounce } from '../../../../shared';
import { AddEditDiscount } from '../modal';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { GET_DISCOUNTS } from '../../../../graphql/query';
import { EXPIRE_DISCOUNT } from '../../../../graphql/mutation';
import dayjs from 'dayjs';


const DiscountTable = ({visible,setVisible}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [search, setSearch] = useState('');
    const searchdebounce = useDebounce(search,500)
    const [selectedAction, setselectedAction] = useState('');
    const [selectedType, setselectedType] = useState('');
    const [selectedgroup, setselectedGroup] = useState('');
    const [selectedYear, setSelectedYear] = useState([null]);
    const [ edititem, setEditItem ] = useState(null)
    const [ expireitem, setExpireItem ] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [ getDiscounts, { data, loading } ] = useLazyQuery(GET_DISCOUNTS,{
        fetchPolicy: 'network-only'
    })
    const [expireStaffPackage] = useMutation(EXPIRE_DISCOUNT);

    const buildFilterObject = () => ({
        search: searchdebounce || null,
        discountType: selectedType || null,
        group: selectedgroup || null,
        packageType: selectedAction || null,
        startDate: selectedYear?.[0] ? dayjs(selectedYear[0]).toISOString() : null,
        endDate: selectedYear?.[1] ? dayjs(selectedYear[1]).toISOString() : null,
    });

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleTypeClick = ({ key }) => {
        setselectedType(key);
    };

    const handleGroupClick = ({ key }) => {
        setselectedGroup(key);
    };

    const [discountData, setDiscountData]= useState([])
    useEffect(() => {
        if (getDiscounts) {
            getDiscounts({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    filter: buildFilterObject()
                }
            });
        }
    }, [
        getDiscounts,
        searchdebounce,
        selectedType,
        selectedgroup,
        selectedAction,
        selectedYear,
        current,
        pageSize
    ]);

    useEffect(()=>{
        if(data?.getDiscounts?.discounts)
            setDiscountData(data?.getDiscounts?.discounts)
    }, [data])

    const handleExpire = async () => {
        if (!expireitem) return;
        try {
            await expireStaffPackage({
                variables: { expireDiscountId: expireitem }
            });
            messageApi.success(t("Discount expired successfully"));
            setExpireItem(null);
            getDiscounts({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    filter: buildFilterObject()
                }
            });
        } catch (err) {
            console.error(err);
            messageApi.error(t("Failed to expire discount"));
        }
    };

    
    return (
        <>
            {contextHolder}
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={10} md={24} span={24}>        
                            <Row gutter={[10, 10]}>
                                <Col span={24} md={24} lg={10}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by Discount code')}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    />
                                </Col>
                                <Col span={24} lg={14}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{
                                                items: typeamountItem.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleTypeClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(typeamountItem.find((i) => i.key === selectedType)?.label || "Type")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: typeitemsCust.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleGroupClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(typeitemsCust.find((i) => i.key === selectedgroup)?.label || "Group")}
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
                        columns={discountColumns({setVisible,setEditItem,setExpireItem,t,i18n})}
                        dataSource={discountData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1600 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record) => record.id}
                        loading={
                            {
                                ...TableLoader,
                                spinning: loading
                            }
                        }
                    />
                    <CustomPagination 
                        total={data?.getDiscounts?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>
            <AddEditDiscount 
                visible={visible}
                edititem={edititem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
                refetch={() => getDiscounts({
                    variables: {
                        limit: pageSize,
                        offset: (current - 1) * pageSize,
                        filter: buildFilterObject()
                    }
                })}
            />
            <DeleteModal 
                visible={expireitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to expire this discount?'}
                onClose={()=>setExpireItem(false)}
                onConfirm={handleExpire}
                loading={loading}
            />            
        </>
    );
};

export { DiscountTable };