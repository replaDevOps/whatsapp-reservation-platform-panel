import { Card, Col, Flex, Row, Typography } from 'antd'

const { Title, Text } = Typography
const RevenueCard = () => {
  
    const cardsData = [
        {
            id: 1,
            title: 'SAR 30,000',
            subtitle: 'Total Revenue',
        },
        {
            id: 2,
            title: 'SAR 10,000',
            subtitle: 'This Month Revenue',
        },
    ];

  return (
    <Row gutter={[14,24]} className='h-100'>
        {
            cardsData?.map((item,index)=>
                <Col span={24} md={12} key={index}>
                    <Card className={`card-bg h-100 border-gray card-cs`}>
                        <Flex gap={8} vertical>
                            <div>
                                <img src={"/assets/icons/rev-icon.png"} width={45} alt='revenue statistic icon' fetchPriority="high" />
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

export {RevenueCard}