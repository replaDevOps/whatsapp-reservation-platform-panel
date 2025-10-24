import { Card, Col, Flex, Row, Typography } from 'antd'

const { Title, Text } = Typography
const StaffManagementCards = () => {
  
    const cardsData = [
        {
            id: 1,
            icon: 'dummy.png',
            title: '104',
            subtitle: 'Total Bookings',
        },
        {
            id: 2,
            icon: 'dummy.png',
            title: '50',
            subtitle: 'Completed Bookings',
        },
        {
            id: 3,
            icon: 'dummy.png',
            title: '30',
            subtitle: 'Cancelled Bookings',
        },
    ];

    return (
        <Row gutter={[14,24]} className='h-100'>
            {
                cardsData?.map((item,index)=>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 8}} key={index}>
                        <Card className={`card-bg h-100 border-gray card-cs`}>
                            <Flex gap={8} vertical>
                                <div>
                                    <img src={"/assets/icons/"+item?.icon} width={45} alt='staff statistics icon' fetchPriority="high" />
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

export {StaffManagementCards}