import { useMemo, useState } from 'react';
import { Button, Card, Col, Dropdown, Flex,  Row, Space, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../shared';
import { useQuery } from '@apollo/client/react';
import { GET_REVENUE_STATS } from '../../../graphql/query';

const { Title, Text } = Typography
const RevenueBarChart = () => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [order, setOrder] = useState(2024);
    const items = [
        { label: <NavLink to={''}>{isArabic ? toArabicDigits(2024):2024}</NavLink>, key: 0 },
    ];
    const { data, loading } = useQuery(GET_REVENUE_STATS, {
      variables: { year: order },
      fetchPolicy: "network-only",
    });
    const onClick = ({ key }) => {
      setOrder(Number(key));
    };
    const chartResponse = data?.getRevenueChart;

    const chartSeries = useMemo(() => {
      if (!chartResponse) {
        return [
          { name: t("New Revenue"), data: [] },
          { name: t("Old Revenue"), data: [] },
        ];
      }

      const months = chartResponse.monthlyData;

      return [
        {
          name: t("New Revenue"),
          data: months.map(m => m.currentYearAmount),
        },
        {
          name: t("Old Revenue"),
          data: months.map(m => m.previousYearAmount),
        }
      ];
    }, [chartResponse, t]);

    const categories = chartResponse
    ? chartResponse.monthlyData.map(m => t(m.label))
    : [];

    let yAxisMax = 100;
    const chartData = {
        series: chartSeries,
        options: {
          chart: {
            type: 'bar',
            toolbar: { show: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2, },
          xaxis: {
            categories: categories,
            labels: { style: { colors: '#000' } },
          },
          yaxis: {
            min: 0,
            max: yAxisMax,
            tickAmount: 5,
            labels: {
              formatter: (value) => `SAR ${value}k`,
              style: { colors: '#000' },
            },
          },          
          fill: { opacity: 1 },
          grid: { show: true },
          colors: ['#0B6172','#DFE7FF'],
          legend: { show: false },
          plotOptions: {
            bar: {
              borderRadius: 8
            }
          }
        },
      };
    

  return (
    <Card className='radius-12 border-gray card-cs'>
      <Flex vertical gap={10}>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
          <Flex vertical>
            <ModuleTopHeading level={4} name={t("Revenue")} />
            <Text className='text-gray fs-13'>{t("Total Revenue")}</Text>
          </Flex>
          <Flex justify='end' gap={10}>
            <Dropdown
              menu={{ items, onClick }}
              trigger={['click']}
              className='margin-top'
            >
              <Button className='btncancel pad-x fs-13'>
                  <Space size={10}>
                      {isArabic ? toArabicDigits(order) : order} 
                      <DownOutlined className='fs-12' />
                  </Space>
              </Button>
            </Dropdown>
          </Flex>
        </Flex>
        <Title level={4} className="fw-500 text-black m-0">
          {chartResponse
            ? isArabic
              ? toArabicDigits(chartResponse.totalRevenue)
              : chartResponse.totalRevenue
            : "--"}
          {" "}
          <span className="text-green fs-13 fw-400">
            {chartResponse
              ? `${chartResponse.percentageChange}%+`
              : "0%"} {t("then last year")}
            <img src="/assets/icons/up-ar.webp" width={12} alt="up arrow" />
          </span>
        </Title>
      </Flex>
      
        <Row gutter={[24,24]} >
          <Col span={24}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={300}  
              width={'100%'}
              className='bar-width'
            />
          </Col>
        </Row>
      </Card>
  );
};

export { RevenueBarChart };
