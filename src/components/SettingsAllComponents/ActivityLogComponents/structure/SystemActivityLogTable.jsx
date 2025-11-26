import { useEffect, useState } from 'react';
import { Button, Dropdown, Flex, Table, Row, Col, Form, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination } from '../../../Ui';
import { activitylogColumn, activitylogtableData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { actionItems, exportToExcel, roleItems, TableLoader } from '../../../../shared';
import { useLazyQuery } from '@apollo/client/react';
import { ACTIVITY_LOG } from '../../../../graphql/query';

const SystemActivityLogTable = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedRole, setselectedRole] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const [systemactivityData, setSystemActivityData]= useState([])
    const [ search, setSearch ] = useState('')
    const [ getSystemActivity, { data, loading } ] = useLazyQuery(ACTIVITY_LOG,{
        fetchPolicy: 'network-only'
    })

    const buildFilterObject = () => ({
        search: search || undefined,
        role: selectedRole || undefined,
        action: selectedAction || undefined,
    });

    


    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedAction(key);
    };

    const handleRoleClick = ({ key }) => {
        setselectedRole(key);
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
        search,
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
                                        }}
                                        prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                        className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <Flex gap={5}>
                                        <Dropdown
                                            menu={{
                                                items: roleItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleRoleClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(roleItems.find((i) => i.key === selectedRole)?.label || "Role")}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown
                                            menu={{
                                                items: actionItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: t(item.label)
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {t(actionItems.find((i) => i.key === selectedAction)?.label || "Action")}
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
                                <Button className='btncancel' onClick={() => exportToExcel(systemactivityData, 'SystemActivityTable')}> 
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.webp' width={20} preview={false} alt='export icons' fetchPriority="high" /> {t("Export Data")}
                                    </Flex>
                                </Button>
                                {/* <MyDatepicker
                                    withoutForm
                                    rangePicker
                                    className="datepicker-cs"
                                    placeholder={[t("Start Year"),t("End Year")]}
                                    value={selectedYear}
                                    onChange={(year) => setSelectedYear(year)}
                                /> */}
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