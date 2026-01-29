import { useEffect, useState } from 'react';
import { Button, Flex, Table, Row, Col, Form, Image } from 'antd';
import { CustomPagination, DropdownFilter } from '../../../Ui';
import { activitylogColumn } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';
import { actionItems, exportToExcel, roleItems, TableLoader, useDebounce } from '../../../../shared';
import { useLazyQuery } from '@apollo/client/react';
import { ACTIVITY_LOG } from '../../../../graphql/query';
import dayjs from 'dayjs';

const SystemActivityLogTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState(null);
    const [selectedRole, setselectedRole] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [systemactivityData, setSystemActivityData]= useState([])
    const [ search, setSearch ] = useState('')
    const debounce = useDebounce(search,500)
    const [ getSystemActivity, { data, loading } ] = useLazyQuery(ACTIVITY_LOG,{
        fetchPolicy: 'network-only'
    })

    const buildFilterObject = () => ({
        search: debounce || null,
        roles: selectedRole || null,
        action: selectedAction || null,
        startDate: selectedDate?.[0]?.format("YYYY-MM-DD") || null,
        endDate: selectedDate?.[1]?.format("YYYY-MM-DD") || null
    });

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(() => {
        getSystemActivity({
            variables: {
                limit: pageSize,
                offset: (current - 1) * pageSize,
                filters: buildFilterObject(),
            }
        });
    }, [
        getSystemActivity,
        debounce,
        selectedDate,
        selectedRole,
        selectedAction,
        current,
        pageSize
    ]);


    useEffect(()=>{
        if(data?.getAlerts?.alerts)
            setSystemActivityData(data?.getAlerts?.alerts)
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
                                        placeholder={t('Search by Role Name')}
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
                                            items={roleItems}
                                            value={selectedRole}
                                            onChange={(key)=>{setselectedRole(key);setCurrent(1)}}
                                            onClear={() => setselectedRole(null)}
                                            placeholder="Role"
                                            t={t}
                                        />
                                        <DropdownFilter
                                            items={actionItems}
                                            value={selectedAction}
                                            onChange={(key)=>{setselectedAction(key);setCurrent(1)}}
                                            onClear={() => setselectedAction(null)}
                                            placeholder="Action"
                                            t={t}
                                        />
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} md={24} xl={10}>
                            <Flex justify='end' gap={10}>
                                <Button className='btncancel' onClick={() => exportToExcel(systemactivityData, 'SystemActivityTable')}> 
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
                    columns={activitylogColumn({t,i18n})}
                    dataSource={systemactivityData}
                    className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                    showSorterTooltip={false}
                    scroll={{ x: 1200 }}
                    rowHoverable={false}
                    pagination={false}
                    rowKey={"id"}
                    loading={
                        {
                            ...TableLoader,
                            spinning: loading
                        }
                    }
                />
                <CustomPagination 
                    total={data?.getAlerts?.totalCount}
                    current={current}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                />
            </Flex>
        </>
    );
};

export { SystemActivityLogTable };