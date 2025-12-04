import { Button, Card, Dropdown, Flex, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { CustomPagination } from '../../Ui';
import { message } from "antd";
import { BookingDashboardColumn, dashboardtableData } from '../../../data';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { GET_TOP_PERFORMING_BUSINESS } from '../../../graphql/query';
import { TableLoader } from '../../../shared';

const { Text } = Typography
const MostBookTable = () => {
    const {t,i18n} = useTranslation()
    const [messageApi, contextHolder] = message.useMessage();
    const [order, setOrder] = useState(0)
    const [ businessData, setBusinessData ] = useState([])
    const [ getTopPerformingBusiness, { data, loading } ] = useLazyQuery(GET_TOP_PERFORMING_BUSINESS,{
        fetchPolicy:'network-only'
    })

    useEffect(()=>{
        if(getTopPerformingBusiness){
            getTopPerformingBusiness({
                variables:{
                    limt: 5
                }
            })
        }
    },[data])

    const items = [
        { key: 0, label: t("This Month") },
    ];
    const onClick = ({ key }) => {
        setOrder(key);
    };

    useEffect(()=>{
        setBusinessData(data?.getTopPerformingBusinesses || []);
    }, [data])

    return (
        <>
        {contextHolder}
            <Card className='radius-12 border-gray h-100 card-cs'>
                <Flex justify='space-between' align='flex-start' wrap gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name={t("Top Performing Businesses")} />
                        <Text className='text-gray fs-13'>{t("Top Ranked")}</Text>
                    </Flex>
                    <Flex justify='end' gap={10}>
                        <Dropdown
                            menu={{ items, onClick }}
                            trigger={['click']}
                            className='margin-top'
                        >
                            <Button className='btncancel fs-13 pad-x'>
                                <Space>
                                    {
                                        order == 0 ? t("This Month") : ''
                                    }  
                                    <DownOutlined className='fs-12' />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Flex>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={BookingDashboardColumn({t,i18n})}
                        dataSource={businessData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 400 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record)=>record?.id}
                        loading={{
                            ...TableLoader,
                            spinning: loading
                        }}
                    />
                </Flex>
            </Card>
        </>
    );
};

export { MostBookTable };