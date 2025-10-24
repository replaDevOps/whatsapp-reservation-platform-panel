import { Col, Flex, Row, Typography } from 'antd'
import { BookingLineChart, CustomerLineChart, DashboardCards, MostBookTable, RevenueBarChart, TotalRegisteredBusiness } from '../../components';

const { Title } = Typography
const Dashboard = () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Title level={4} className='m-0'>Welcome Back!</Title>
        <DashboardCards />
        <BookingLineChart />
        <CustomerLineChart />
        <RevenueBarChart />
        <Row gutter={[24,24]}>
          <Col xl={{span:12}} lg={{span:12 }} span={24}>
            <MostBookTable />
          </Col>
          <Col xl={{span:12}} lg={{span:12 }} span={24}>
            <TotalRegisteredBusiness />
          </Col>
        </Row>
      </Flex>
    </div>
  )
}

export {Dashboard}