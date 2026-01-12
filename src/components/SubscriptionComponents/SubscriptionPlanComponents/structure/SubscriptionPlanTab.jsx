import { useState, useEffect} from 'react';
import { Button, Card, Flex, Typography, Row, Col, Tabs } from 'antd';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { EditSubscription } from './EditSubscription';
import { subscriptionplanData } from '../../../../data';
import { useTranslation } from 'react-i18next';
import { GET_SUBSCRIPTION_PLANS } from '../../../../graphql/query/subscriptionPlan';
import { useLazyQuery } from '@apollo/client/react';

const { Title } = Typography;
const SubscriptionPlanTab = () => {

    const {t,i18n} = useTranslation()
    const [activeKey, setActiveKey] = useState('1')
    const [activeSubscriptionPlan, setActiveSubscriptionPlan]= useState(null)
    const [getSubscriptionPlans, { data, loading }] = useLazyQuery(GET_SUBSCRIPTION_PLANS, {
        fetchPolicy: "network-only",
    })
    const [subscriptionPlans, setSubscriptionPlans]= useState([])
    const [editSubscriptionPlan, setEditSubscriptionPlan]= useState()
    const [ edititem, setEditItem ] = useState(null)
    const singledata = subscriptionplanData?.find((items)=>items?.id === Number(activeKey))
    const items = [
        {
            key: 'BASIC',
            label: t('Basic Subscription Plan'),
            children: <SubscriptionPlanCard singledata={singledata}/>,
        },
        {
            key: 'STANDARD',
            label: t('Standard Subscription Plan'),
            children: <SubscriptionPlanCard singledata={singledata} />,
        },
        {
            key: 'PRO',
            label: t('Pro Subscription Plan'),
            children: <SubscriptionPlanCard singledata={singledata} />,
        },
        {
            key: 'ENTERPRISE',
            label: t('Enterprise Subscription Plan'),
            children: <SubscriptionPlanCard singledata={singledata} />,
        }
    ]
    const currentContent = items.find((item) => item.key === activeKey)?.children

    useEffect(()=>{
        if(getSubscriptionPlans)
            getSubscriptionPlans()
    }, [getSubscriptionPlans])

    useEffect(()=>{
        if(data?.getSubscriptions?.length){
            setSubscriptionPlans(data?.getSubscriptions)
            
            setActiveSubscriptionPlan({...data?.getSubscriptions?.find(plan => plan?.type === items[0]?.key), title: items[0]?.key})
        }
    }, [data])
    const onChange = (key) => {
        setActiveKey(key)
        setActiveSubscriptionPlan({...subscriptionPlans?.find(plan => plan?.type === key), title: key})
    }
    console.log("subscriptionPlans:", activeSubscriptionPlan)
    return (
        <Row gutter={[24,24]}>
            <Col span={24} lg={9} xl={7} xxl={5}>
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Tabs defaultActiveKey="1" 
                        items={items.map(({ key, label }) => ({
                            key,
                            label,
                        }))} 
                        onChange={onChange} 
                        tabPosition='left'
                        className='custom-tabs-css'
                    />
                </Card>
            </Col>
            <Col span={24} lg={15} xl={17} xxl={19}>
                <Flex vertical gap={10}>
                    <Card className='card-bg card-cs radius-12 border-gray'>
                        {
                            edititem ?
                            <Flex gap={10} align="center">
                                <Button className="border-0 p-0 bg-transparent" onClick={() => setEditItem(null)}>
                                    {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                                </Button>
                                {
                                    edititem &&
                                    <Title level={5} className='m-0'>
                                        {t("Edit Subscription Plan")}
                                    </Title>
                                }
                            </Flex>
                            :
                            <Flex justify='space-between' align='center' wrap gap={10}>
                                <Title level={5} className='m-0'>
                                    {
                                        t(activeSubscriptionPlan?.title)
                                    }
                                </Title>
                                <Button className='btncancel' onClick={()=>setEditItem(activeSubscriptionPlan)}> 
                                    <img src='/assets/icons/edit-b.webp' width={20} alt='edit icon' /> {t("Edit Subscription Plan")}
                                </Button>
                            </Flex>
                        }
                    </Card>
                    <Card className='card-bg card-cs radius-12 border-gray'>
                        {
                            edititem ?  <EditSubscription {...{ edititem, setEditItem }} /> : <SubscriptionPlanCard subscriptionPlan={activeSubscriptionPlan}/>
                        }
                    </Card>
                </Flex>
            </Col>
        </Row>
    );
};

export { SubscriptionPlanTab };