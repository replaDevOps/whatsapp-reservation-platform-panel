import { useEffect, useState } from 'react';
import { Card, Flex, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { MyDatepicker } from '../../Forms';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../shared';
import { GET_CUSTOMER_ANALYTICS } from '../../../graphql/query';
import { useLazyQuery } from '@apollo/client/react';

const { Title, Text } = Typography
const CustomerLineChart = () => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [selectedYear, setSelectedYear] = useState(moment());
    const chartData = {
        series: [
            { name: t("Customers"), data: [0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 3] },
        ],
        options: {
        chart: {
            type: 'line',
            toolbar:{
            show: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
            ],
            labels: {
                style: {
                    colors: '#000',
                },
            },
        },
        yaxis: {
            min: 0,
            max: 35,
            tickAmount: 5,
            labels: {
                style: {
                    colors: '#000',
                },
            },
        },
        fill: {
            opacity: 1,
        },
        grid: {
            show: false,
        },
        colors: ['#0ABAB5'],
         legend: { show: false },
        },
    };
    const [getCustomerAnalytics, { data, loading}] = useLazyQuery(GET_CUSTOMER_ANALYTICS, {
      fetchPolicy: "network-only",
  })
  useEffect(()=>{
    getCustomerAnalytics({variables: {startDate: '2025-11-20', endDate: '2025-11-25'}})
  }, [])
  useEffect(()=>{

  }, [])
  console.log("customer:", data)

  return (
    <Card className='radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
            <Flex vertical gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={t("Customers")} />
                    <Text className='text-gray fs-13'>{t("Total registered customers in system")}</Text>
                </Flex>
                <Title level={4} className='fw-500 text-black m-0'>
                    {isArabic ? toArabicDigits(6820):6820} <span className='text-bright-red fs-13 fw-400'>{i18n?.language === 'ar' ? '9%-':'-3%'} {t("then last month")} <img src='/assets/icons/down-ar.webp' width={12} alt='down arrow icon' fetchPriority="high" /></span>
                </Title>
            </Flex>
            <Flex justify='end' gap={10}>
                <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder={t("Select Year")}
                    value={selectedYear}
                    onChange={(year) => setSelectedYear(year)}
                />
            </Flex>
        </Flex>
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={300}
            width={'100%'}
            className='bar-width'
        />
      </Card>
  );
};

export { CustomerLineChart };
