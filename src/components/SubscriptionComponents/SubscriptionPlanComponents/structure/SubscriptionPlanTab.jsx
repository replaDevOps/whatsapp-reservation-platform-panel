import { useState } from 'react';
import { Button, Card, Flex, Typography, Row, Col, Tabs } from 'antd';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { EditSubscription } from './EditSubscription';
import { subscriptionplanData } from '../../../../data';

const { Title } = Typography;
const SubscriptionPlanTab = () => {

    const [activeKey, setActiveKey] = useState('1');
    const [ edititem, setEditItem ] = useState(null)
    const singledata = subscriptionplanData?.find((items)=>items?.id === Number(activeKey))

    const onChange = (key) => {
        setActiveKey(key);
    };
    const items = [
        {
            key: '1',
            label: 'Basic Subscription Plan',
            children: <SubscriptionPlanCard singledata={singledata}/>,
        },
        {
            key: '2',
            label: 'Standard Subscription Plan',
            children: <SubscriptionPlanCard singledata={singledata} />,
        },
        {
            key: '3',
            label: 'Pro Subscription Plan',
            children: <SubscriptionPlanCard singledata={singledata} />,
        },
        {
            key: '4',
            label: 'Enterprise Subscription Plan',
            children: <SubscriptionPlanCard singledata={singledata} />,
        },
    ];
    
    const currentContent = items.find((item) => item.key === activeKey)?.children;

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
                                    <ArrowLeftOutlined />
                                </Button>
                                {
                                    edititem &&
                                    <Title level={5} className='m-0'>
                                        Edit Subscription Plan
                                    </Title>
                                }
                            </Flex>
                            :
                            <Flex justify='space-between' align='center' wrap gap={10}>
                                <Title level={5} className='m-0'>
                                    {
                                        items.find((item) => item.key === activeKey)?.label
                                    }
                                </Title>
                                <Button className='btncancel' onClick={()=>setEditItem(singledata)}> 
                                    <img src='/assets/icons/edit-b.png' width={20} alt='edit icon' /> Edit Subscription Plan
                                </Button>
                            </Flex>
                        }
                    </Card>
                    <Card className='card-bg card-cs radius-12 border-gray'>
                        {edititem ? (
                        <EditSubscription {...{ edititem, setEditItem }} />
                        ) : (
                        currentContent
                        )}
                    </Card>
                </Flex>
            </Col>
        </Row>
    );
};

export { SubscriptionPlanTab };