import { useEffect, useState } from 'react';
import { Card, Flex, Table, Row, Col, Form, notification, Typography } from 'antd';
import { CustomPagination, DeleteModal, DropdownFilter, } from '../../../Ui';
import { discountColumns } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { notifySuccess, subscriptionItems, TableLoader, typeamountItem, typeitemsCust, useDebounce } from '../../../../shared';
import { AddEditDiscount } from '../modal';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { GET_DISCOUNTS } from '../../../../graphql/query';
import { EXPIRE_DISCOUNT } from '../../../../graphql/mutation';
import dayjs from 'dayjs';

const { Text } = Typography
const DiscountTable = ({visible,setVisible}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [search, setSearch] = useState('');
    const searchdebounce = useDebounce(search,500)
    const [selectedAction, setselectedAction] = useState(null);
    const [selectedType, setselectedType] = useState(null);
    const [selectedgroup, setselectedGroup] = useState(null);
    const [selectedDate, setSelectedDate] = useState([null]);
    const [ edititem, setEditItem ] = useState(null)
    const [ expireitem, setExpireItem ] = useState(null)
    const [ api, contextHolder] = notification.useNotification();
    const [ getDiscounts, { data, loading } ] = useLazyQuery(GET_DISCOUNTS,{
        fetchPolicy: 'network-only'
    })
    const [expireStaffPackage] = useMutation(EXPIRE_DISCOUNT,{
        onCompleted: ()=>{notifySuccess(api,t("Discount Expire"),t("Discount has been expired successfully"));fetchDiscounts();setExpireItem(null)},
    });

    const fetchDiscounts = () => {
        const startDate= selectedDate?.[0] ? dayjs(selectedDate[0]).toISOString() : null;
        const endDate= selectedDate?.[1] ? dayjs(selectedDate[1]).toISOString() : null;
        return (
            getDiscounts({
                variables: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    filter: {
                        search: searchdebounce || null,
                        discountType: selectedType || null,
                        group: selectedgroup || null,
                        packageType: selectedAction || null,
                        startDate,
                        endDate
                    }
                }
            })
        )
    };

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const [discountData, setDiscountData]= useState([])
    useEffect(() => {
        if (getDiscounts) {
            fetchDiscounts();
        }
    }, [
        getDiscounts,
        searchdebounce,
        selectedType,
        selectedgroup,
        selectedAction,
        selectedDate,
        current,
        pageSize
    ]);

    useEffect(()=>{
        if(data?.getDiscounts?.discounts)
            setDiscountData(data?.getDiscounts?.discounts)
    }, [data])

    
    return (
        <>
            {contextHolder}
            <Card className='radius-12 card-cs border-gray h-100'>
                <Form layout="vertical" form={form} className='mb-3'>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xl={10} md={24} span={24}>        
                            <Row gutter={[10, 10]}>
                                <Col span={24} md={24} lg={12}>
                                    <SearchInput
                                        name='name'
                                        placeholder={t('Search by Discount code')}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrent(1)
                                        }}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                        allowClear
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <Flex gap={5}>
                                        <DropdownFilter
                                            items={typeamountItem}
                                            value={selectedType}
                                            onChange={(key)=>{setselectedType(key);setCurrent(1)}}
                                            onClear={() => setselectedType(null)}
                                            placeholder="Type"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={typeitemsCust}
                                            value={selectedgroup}
                                            onChange={(key)=>{setselectedGroup(key);setCurrent(1)}}
                                            onClear={() => setselectedGroup(null)}
                                            placeholder="Group"
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
                                    prefix={<Text className='text-gray'>Expiry: </Text>}
                                    onChange={(date) => {setSelectedDate(date);setCurrent(1)}}
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
                refetch={() => fetchDiscounts()}
            />
            <DeleteModal 
                visible={expireitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to expire this discount?'}
                onClose={()=>setExpireItem(null)}
                onConfirm={ async()=>{
                    if (!expireitem) return;
                    await expireStaffPackage({ variables: { expireDiscountId: expireitem }})
                }}
                loading={loading}
            />            
        </>
    );
};

export { DiscountTable };