import { Card, Col, Flex, Row, Typography } from 'antd'

const { Title, Text } = Typography
const SubscriptionManageCard = () => {
  
    const cardsData = [
        {
            id: 1,
            title: '50',
            subtitle: 'Basic Plan Business',
        },
        {
            id: 2,
            title: '30',
            subtitle: 'Standard Plan Business',
        },
        {
            id: 3,
            title: '16',
            subtitle: 'Pro Plan Business',
        },
        {
            id: 4,
            title: '8',
            subtitle: 'Enterprise Plan Business',
        },
    ];

  return (
    <Row gutter={[14,24]} className='h-100'>
        {
            cardsData?.map((item,index)=>
                <Col span={24} md={12} lg={6} key={index}>
                    <Card className={`card-bg h-100 border-gray card-cs`}>
                        <Flex gap={8} vertical>
                            <div>
                                <img src={"/assets/icons/plan-business.webp"} width={45} alt={item?.title} fetchPriority="high" />
                            </div>
                            <Text className='fs-14 text-gray'>{item?.subtitle}</Text>
                            <Title level={5} className='fw-600 text-black m-0'>{item?.title}</Title>
                        </Flex>
                    </Card>
                </Col>
            )
        }
    </Row>
  )
}

export {SubscriptionManageCard}