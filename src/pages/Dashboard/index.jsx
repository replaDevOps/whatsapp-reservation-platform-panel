import { Col, Flex, Row, Typography } from "antd";
// import {
//   BookingLineChart,
// } from "../../components";
import BookingLineChart from "../../components/DashboardComponents/structure/BookingLineChart"
import DashboardCards from "../../components/DashboardComponents/structure/DashboardCards";
import BookingCustomerBarChart from "../../components/DashboardComponents/structure/BookingCustomerBarChart";
import CustomersChart from "../../components/DashboardComponents/structure/customersChart";
import RegisteredBusinesses from "../../components/DashboardComponents/structure/RegisteredBusinesses";
import TopPerformingBusinesses from "../../components/DashboardComponents/structure/TopPerformingBusinessTable"

const { Title } = Typography;
const Dashboard = () => {
  return (
    <div style={{padding:"0px 0px 20px 0px"}}>
      <Flex vertical gap={16}>
        <Title level={3} className="m-0">
          Welcome Back!
        </Title>

        <DashboardCards />
        <BookingLineChart />
        <CustomersChart/>
        <BookingCustomerBarChart/>
        <Row gutter={[16]}>
          <Col md={12}>
            <TopPerformingBusinesses/>
          </Col>
          <Col md={12}>
            <RegisteredBusinesses/>
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export { Dashboard };
