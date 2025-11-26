import { useState, useMemo } from 'react';
import { Button, Card, Col, Dropdown, Flex, List, Row, Space, Spin, Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableLoader, toArabicDigits } from '../../../shared';
import { GET_REGISTERED_BUSINESSES } from '../../../graphql/query';
import { useQuery } from '@apollo/client/react';

const { Title, Text } = Typography;

const TotalRegisteredBusiness = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n?.language === 'ar';

  const [order, setOrder] = useState(0);
  const items = [
    { label: <NavLink to="">{t("This Month")}</NavLink>, key: 0 },
  ];

  const { data, loading } = useQuery(GET_REGISTERED_BUSINESSES, {
    fetchPolicy: 'network-only',
  });

  const onClick = ({ key }) => setOrder(key);

  const stats = data?.getBusinessTypeCount?.counts || [];

  const chartSeries = stats.map((item) => item.count);
  const chartLabels = stats.map((item) => {
    const label = t(item.type) || "";
    return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  });


  const chartColors = ['#007272', '#00BEBE', '#2CD9C5', '#7EF6F6'];

  const chartData = {
    series: chartSeries.length ? chartSeries : [0, 0, 0, 0],
    options: {
      chart: { type: 'donut', toolbar: { show: false } },
      labels: chartLabels.length  ? chartLabels
      : [t("Spa"), t("Clinic"), t("Barber"), t("General")],
      colors: chartColors,
      stroke: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: { size: '70%', labels: { show: false } },
        },
      },
      tooltip: { enabled: true, y: { formatter: (val) => `${val}` } },
    },
  };

  const datalist = useMemo(() => {
    return stats.length
      ? stats.map((item, idx) => ({
          id: idx + 1,
          icon: `/assets/icons/${item.type.toLowerCase()}-ic.webp`,
          title: item.count,
          subtitle: item.type?.charAt(0).toUpperCase() + item?.type?.slice(1)?.toLowerCase(),
        }))
      : [
          { id: 1, icon: '/assets/icons/spa-ic.webp', title: 0, subtitle: 'Spa' },
          { id: 2, icon: '/assets/icons/clinic-ic.webp', title: 0, subtitle: 'Clinic' },
          { id: 3, icon: '/assets/icons/barber-ic.webp', title: 0, subtitle: 'Barber' },
          { id: 4, icon: '/assets/icons/general-ic.webp', title: 0, subtitle: 'General' },
        ];
  }, [stats]);

  // total regestered data
  const totalBusinesses = stats.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="radius-12 border-gray card-cs">
      <Flex vertical gap={10}>
        <Flex justify="space-between" align="flex-start" wrap gap={10}>
          <Flex vertical>
            <ModuleTopHeading level={4} name={t("Registered Business")} />
            <Text className="text-gray fs-13">{t("Total Registered")}</Text>
          </Flex>
          <Flex justify="end" gap={10}>
            <Dropdown menu={{ items, onClick }} trigger={['click']} className="margin-top">
              <Button className="btncancel pad-x fs-13">
                <Space size={10}>
                  {order === 0 ? t("This Month") : ''}
                  <DownOutlined className="fs-12" />
                </Space>
              </Button>
            </Dropdown>
          </Flex>
        </Flex>

        <Title level={4} className="fw-500 text-black m-0">
          {isArabic ? toArabicDigits(totalBusinesses) : totalBusinesses}
        </Title>
      </Flex>

      {
        loading ? 
        <Flex justify='center' align='center'>
          <Spin {...TableLoader} size="large" />
        </Flex>
        :
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Flex align="center" wrap gap={15} justify="center">
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="donut"
                height={300}
                width="100%"
              />
              <List
                itemLayout="horizontal"
                dataSource={datalist}
                size="small"
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<img src={item.icon} width={30} alt={item.subtitle} />}
                      title={
                        <span className="fs-18">
                          {isArabic ? toArabicDigits(item.title) : item.title}
                        </span>
                      }
                      description={t(item.subtitle)}
                    />
                  </List.Item>
                )}
              />
            </Flex>
          </Col>
        </Row>
      }
    </Card>
  );
};

export { TotalRegisteredBusiness };
