import { useState } from 'react';
import { Button, Card, Col, Dropdown, Flex, Row, Space, Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Title, Text } = Typography;

const TotalRegisteredBusiness = () => {
  const [order, setOrder] = useState(0);
  const items = [
    { label: <NavLink to={''}>This Month</NavLink>, key: 0 },
  ];

  const onClick = ({ key }) => {
    setOrder(key);
  };

  const chartData = {
    series: [190, 190, 78, 78],
    options: {
      chart: {
        type: 'donut',
        toolbar: { show: false },
      },
      labels: ['Spa', 'Clinic', 'Barber', 'General'],
      colors: ['#007272', '#00BEBE', '#2CD9C5', '#7EF6F6'],
      stroke: {
        show: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: false,
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}`,
        },
      },
     
    },
  };

  return (
    <Card className="radius-12 border-gray card-cs">
      <Flex vertical gap={10}>
        <Flex justify="space-between" align="flex-start" wrap gap={10}>
          <Flex vertical>
            <ModuleTopHeading level={4} name="Registered Business" />
            <Text className="text-gray fs-13">Total Registered</Text>
          </Flex>
          <Flex justify="end" gap={10}>
            <Dropdown
              menu={{ items, onClick }}
              trigger={['click']}
              className="margin-top"
            >
              <Button className="btncancel pad-x fs-13">
                <Space size={10}>
                  {order == 0 ? 'This Month' : ''}
                  <DownOutlined className="fs-12" />
                </Space>
              </Button>
            </Dropdown>
          </Flex>
        </Flex>
        <Title level={4} className="fw-500 text-black m-0">
          2,000
        </Title>
      </Flex>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={300}
            width={'100%'}
          />
        </Col>
      </Row>
    </Card>
  );
};

export { TotalRegisteredBusiness };
