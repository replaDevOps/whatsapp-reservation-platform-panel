import { useEffect, useState } from 'react';
import { Card, Flex, Table, Typography, Row, Col } from 'antd';
import { CustomPagination, DropdownFilter, } from '../../../Ui';
import { demoreqColumns } from '../../../../data';
import { MyDatepicker } from '../../../Forms';
import { ModuleTopHeading } from '../../../PageComponent';
import { MeetingNoteModal } from '../modal';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { GET_DEMO_REQUEST } from '../../../../graphql/query';
import { servicetypeItems, statusItems, TableLoader } from '../../../../shared';

const { Text } = Typography;
const DemoRequestTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const {t,i18n} = useTranslation()
    const [current, setCurrent] = useState(1);
    const [statusfilter, setStatusFilter] = useState(null);
    const [selectedType, setselectedType] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [ visible, setVisible ] = useState(false)
    const [demorequestData, setDemoRequestData]= useState([])
    const [ getDemoRequest, { data, loading }] = useLazyQuery(GET_DEMO_REQUEST,{
        fetchPolicy: 'network-only'
    })
    const FetchDemoRequest = () => {
        const startDate =  selectedDate?.[0] ? selectedDate[0].format("DD-MM-YYYY") : null;
        const endDate = selectedDate?.[1] ? selectedDate[1].format("DD-MM-YYYY") : null;
        getDemoRequest({
            variables: { 
                limit: pageSize,
                offset: (current - 1) * pageSize,
                filter:{
                    businessType: selectedType || null,
                    status: statusfilter || null,
                    startDate,
                    endDate
                }
            }
        })
    }    

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };
    // const handleStatusChange = (key,row) => {
    //     setselectedStatus(prevData =>
    //         prevData.map(item =>
    //             item.key === row.key ? { ...item, status: key } : item
    //         )
    //     );
    //     console.log('key:',row)
    // };

    useEffect(()=>{
        if(getDemoRequest){
            FetchDemoRequest()
        }
    },[getDemoRequest, current, pageSize, selectedType, statusfilter, selectedDate])
    
    useEffect(()=>{
        if (data?.getBookDemos?.bookDemos)
            setDemoRequestData(data.getBookDemos.bookDemos);
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
                                <DropdownFilter
                                    items={servicetypeItems}
                                    value={selectedType}
                                    onChange={(key)=>{setselectedType(key);setCurrent(1)}}
                                    onClear={() => setselectedType(null)}
                                    placeholder="Type"
                                    t={t}
                                />
                                <DropdownFilter
                                    items={statusItems}
                                    value={statusfilter}
                                    onChange={(key)=>{setStatusFilter(key);setCurrent(1)}}
                                    onClear={() => setStatusFilter(null)}
                                    placeholder="Status"
                                    t={t}
                                />
                            </Flex>
                        </Col>
                        <Col span={24} md={24} xl={8}>
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
                        </Col>
                    </Row>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={demoreqColumns({setEditItem,setVisible,t,i18n})}
                        dataSource={demorequestData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1500 }}
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
                        total={data?.getBookDemos?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        
                    />
                </Flex>
            </Card>

            <MeetingNoteModal 
                visible={visible}
                id={editItem}
                onClose={()=>{setVisible(false);setEditItem(null)}}
                refetch={() => FetchDemoRequest()}
            />
        </>
    );
};

export { DemoRequestTable };