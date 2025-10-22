import { Card, Col, Flex, Row, Typography } from 'antd';
import { message } from 'antd';

const { Title, Text } = Typography;

const RevenueCards = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const cardsData = [
    {
      id: 1,
      icon: 'dummy.png',
      title: 'SAR 30,000',
      subtitle: 'Total Revenue',
    },
    {
      id: 2,
      icon: 'dummy.png',
      title: 'SAR 10,000',
      subtitle: 'This month Revenue',
    },
  ];

  return (
    <>
      {contextHolder}
      <Row gutter={[14, 24]} className="h-100">
        {cardsData?.map((item, index) => (
          <Col
            key={index}
            xs={{ span: 24 }} // 100% on mobile
            sm={{ span: 24 }} // 100% on small
            md={{ span: 12 }} // 50% on medium screens
            lg={{ span: 12 }} // 50% on large screens
          >
            <Card className="card-bg h-100 border-gray card-cs" style={{ width: '100%' }}>
              <Flex gap={8} vertical>
                <div>
                  <img src={'/assets/icons/' + item?.icon} width={45} alt="" />
                </div>
                <Text className="fs-14 text-gray">{item?.subtitle}</Text>
                <Title level={5} style={{marginTop:"0px",fontSize:"19px"}}>
                  {item?.title}
                </Title>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export { RevenueCards };
