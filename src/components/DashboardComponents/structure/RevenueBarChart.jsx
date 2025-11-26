import { useState } from 'react';
import { Button, Card, Col, Dropdown, Flex,  Row, Space, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../shared';

const { Title, Text } = Typography
const RevenueBarChart = () => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [order, setOrder] = useState(0);
    const items = [
        { label: <NavLink to={''}>{isArabic ? toArabicDigits(2024):2024}</NavLink>, key: 0 },
    ];

    const onClick = ({ key }) => {
        // key = parseInt(key) + 1;
        setOrder(key);
        // filter(key);
    };
    let yAxisMax = 100;
    const chartData = {
        series: [
          {
            name: t("New Customers Bookings"),
            data: [200, 400, 0, 50, 90, 90, 55,30,43, 60, 44, 50],
          },
          {
            name: t("Old Customers Bookings"),
            data: [10, 30, 45, 205, 60, 75, 50,25,38, 55, 53, 40],
          },
        ],
        options: {
          chart: {
            type: 'bar',
            toolbar: { show: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2, },
          xaxis: {
            categories: [
            t("Jan"),
            t("Feb"),
            t("Mar"),
            t("Apr"),
            t("May"),
            t("Jun"),
            t("Jul"),
            t("Aug"),
            t("Sep"),
            t("Oct"),
            t("Nov"),
            t("Dec"),
          ],
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
                      {
                          order == 0 ? isArabic ? toArabicDigits(2024):2024 : ''
                      }  
                      <DownOutlined className='fs-12' />
                  </Space>
              </Button>
            </Dropdown>
          </Flex>
        </Flex>
        <Title level={4} className='fw-500 text-black m-0'>
          {isArabic ? toArabicDigits(6820):6820} <span className='text-green fs-13 fw-400'>{i18n?.language === 'ar' ? '9%+':'+9%'} {t("then last year")} <img src='/assets/icons/up-ar.webp' width={12} alt='up arrow icon' fetchPriority="high" /></span>
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
