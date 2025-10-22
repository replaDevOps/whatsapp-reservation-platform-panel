import { Card, Col, Flex, Row, Typography } from 'antd'
import { message } from "antd";

const { Title, Text } = Typography
const Headline = () => {
    const [messageApi, contextHolder] = message.useMessage();
  
    const cardsData = [
      {
        id: 1,
        icon: 'dummy.png',
        title: '50',
        subtitle: 'Basic Plan Business',
      },
      {
        id: 2,
        icon: 'dummy.png',
        title: '30',
        subtitle: 'Standered Plan Business',
      },
      {
        id: 3,
        icon: 'dummy.png',
        title: '16',
        subtitle: 'Pro Plan Business',
      },
      {
        id: 4,
        icon: 'dummy.png',
        title: '8',
        subtitle: 'Enterprise Plan Business',
      },
    ];

  return (
    <>
    {contextHolder}
    <Row gutter={[14,24]} className='h-100'>
        {
            cardsData?.map((item,index)=>
                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 6}} key={index}>
                    <Card className={`card-bg h-100 border-gray card-cs`}>
                        <Flex gap={8} vertical>
                            <div>
                                <img src={"/assets/icons/"+item?.icon} width={45} alt="" />
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

export {Headline}

