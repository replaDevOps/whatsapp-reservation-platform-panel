import { Card, Col, Flex, Row, Typography } from 'antd'
import { message } from "antd";

const { Title, Text } = Typography
const DashboardCards = () => {
    const [messageApi, contextHolder] = message.useMessage();
  
    const cardsData = [
      {
        id: 1,
        icon: 'dummy.png',
        title: '104',
        subtitle: 'Total Businesses',
      },
      {
        id: 2,
        icon: 'dummy.png',
        title: '50',
        subtitle: 'Basic Plan Businesses',
      },
      {
        id: 3,
        icon: 'dummy.png',
        title: '30',
        subtitle: 'Standard Plan Businesses',
      },
      {
        id: 4,
        icon: 'dummy.png',
        title: '16',
        subtitle: 'Pro Plan Businesses',
      },
      {
        id: 5,
        icon: 'dummy.png',
        title: '8',
        subtitle: 'Enterprise Plan Businesses',
      },
    ];

  return (
    <>
    {contextHolder}
    <Row gutter={[14,24]} className='h-100'>
        {
            cardsData?.map((item,index)=>
                <Col xs={{ flex: '100%' }}
                  sm={{ flex: '50%' }}
                  md={{ flex: '50%' }}
                  lg={{ flex: '20%' }}
                  xl={{ flex: '20%' }} key={index}>
                    <Card className={`card-bg h-100 border-gray card-cs`}>
                        <Flex gap={8} vertical>
                            <div>
                                <img src={"/assets/icons/"+item?.icon} width={45} alt='statistics icon' fetchPriority="high" />
                            </div>
                            <Text className='fs-14 text-gray'>{item?.subtitle}</Text>
                            <Title level={5} className='fw-600 text-black m-0'>{item?.title}</Title>
                        </Flex>
                    </Card>
                </Col>
            )
        }
    </Row>
    </>
  )
}

export {DashboardCards}