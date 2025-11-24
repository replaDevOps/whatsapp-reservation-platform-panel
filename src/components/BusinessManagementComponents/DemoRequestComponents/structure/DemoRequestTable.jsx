import { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CustomPagination, } from '../../../Ui';
import { demoreqColumns, demoreqData } from '../../../../data';
import { MyDatepicker } from '../../../Forms';
import moment from 'moment';
import { ModuleTopHeading } from '../../../PageComponent';
import { MeetingNoteModal } from '../modal';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { GET_DEMO_REQUEST } from '../../../../graphql/query';
import { TableLoader } from '../../../../shared';

const { Text } = Typography;
const DemoRequestTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const {t,i18n} = useTranslation()
    const [current, setCurrent] = useState(1);
    const [selectedAction, setselectedAction] = useState('');
    const [selectedType, setselectedType] = useState('');
    const [selectedStatus, setselectedStatus] = useState(demoreqData);
    const [selectedYear, setSelectedYear] = useState(moment());
    const [ visible, setVisible ] = useState(false)
    const [demorequestData, setDemoRequestData]= useState([])
    const [ getDemoRequest, { data, loading }] = useLazyQuery(GET_DEMO_REQUEST,{
        fetchPolicy: 'network-only'
    })

    const statusItems = [
        { key: 'pending', label: 'Pending' },
        { key: 'contacted', label: 'Contacted' },
    ];

     const typeItems = [
        { key: 'general', label: 'General' },
        { key: 'barber', label: 'Barber' },
        { key: 'clinic', label: 'Clinic' },
        { key: 'spa', label: 'Spa' },
    ];

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

    const handleStatusChange = (key,row) => {
        setselectedStatus(prevData =>
            prevData.map(item =>
                item.key === row.key ? { ...item, status: key } : item
            )
        );
        console.log('key:',row)
    };

    useEffect(()=>{
        if(getDemoRequest){
            getDemoRequest({
                variables: {
                    limit: 20,
                    offset: 0,
                }
            })
        }
    },[getDemoRequest])
    
    useEffect(()=>{
        if(data?.bookDemos)
            setDemoRequestData(data?.bookDemos)
    }, [data])
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name={t("Demo Requests")} />
                        <Text className='text-gray fs-13'>{t("Manage all the Customers who contacted you via Book a Demo")}</Text>
                    </Flex>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col span={24} lg={12}>
                            <Flex gap={5}>
                                <Dropdown
                                    menu={{
                                        items: typeItems.map((item) => ({
                                            key: String(item.key),
                                            label: t(item.label)
                                        })),
                                        onClick: handleTypeClick
                                    }}
                                    trigger={['click']}
                                >
                                    <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                        <Flex justify="space-between" align="center" gap={30}>
                                            {t(typeItems.find((i) => i.key === selectedType)?.label || "Type")}
                                            <DownOutlined />
                                        </Flex>
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    menu={{
                                        items: statusItems.map((item) => ({
                                            key: String(item.key),
                                            label: t(item.label)
                                        })),
                                        onClick: handleActionClick
                                    }}
                                    trigger={['click']}
                                >
                                    <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                        <Flex justify="space-between" align="center" gap={30}>
                                            {t(statusItems.find((i) => i.key === selectedAction)?.label || "Status")}
                                            <DownOutlined />
                                        </Flex>
                                    </Button>
                                </Dropdown>
                            </Flex>
                        </Col>
                        <Col span={24} md={24} xl={8}>
                            <Flex justify='end' gap={10}>
                                <MyDatepicker
                                    withoutForm
                                    rangePicker
                                    className="datepicker-cs"
                                    placeholder={[t("Start Year"),t("Start Year")]}
                                    value={selectedYear}
                                    onChange={(year) => setSelectedYear(year)}
                                />
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={demoreqColumns({handleStatusChange,setVisible,t,i18n})}
                        dataSource={demorequestData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1500 }}
                        rowHoverable={false}
                        pagination={false}
                        loading={
                            {
                                ...TableLoader,
                                spinning: loading
                            }
                        }
                        rowKey={(record)=> record?.id}
                    />
                    {/* <CustomPagination 
                        total={12}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    /> */}
                </Flex>
            </Card>

            <MeetingNoteModal 
                visible={visible}
                onClose={()=>setVisible(false)}
            />
        </>
    );
};

export { DemoRequestTable };