import { useEffect, useState } from 'react';
import { Card, Flex, Spin, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { MyDatepicker } from '../../Forms';
import { useTranslation } from 'react-i18next';
import { TableLoader, toArabicDigits } from '../../../shared';
import { GET_CUSTOMER_ANALYTICS_STATS } from '../../../graphql/query';
import { useQuery } from '@apollo/client/react';
import dayjs from 'dayjs';

const { Title, Text } = Typography
const CustomerLineChart = () => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [dateRange, setDateRange] = useState([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);
    const [startDate, endDate] = dateRange ?? [];
    const { data, loading, refetch } = useQuery(GET_CUSTOMER_ANALYTICS_STATS, {
        variables: { 
            startDate: startDate?.format("YYYY-MM-DD"),
            endDate: endDate?.format("YYYY-MM-DD"),
         },
    });
    const monthlyStats = data?.getCustomersAnalyticsApi?.chartData || [];
    const maxCount = Math.max(...monthlyStats.map(m => m.count || 0), 0);

    const yAxisMax =
    maxCount < 100
      ? 100
      : maxCount < 1000
      ? Math.ceil(maxCount / 100) * 100
      : Math.ceil(maxCount / 1000) * 1000;

    const chartData = {
        series: [
            { name: t("Customers"), data: monthlyStats.map((m) => m.count || 0)},
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
            categories: monthlyStats.map((m) => m.count),
            labels: {
                style: {
                    colors: '#000',
                },
            },
        },
        yaxis: {
            min: 0,
            max: yAxisMax,
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

    useEffect(() => {
        if (!startDate || !endDate) return;

        refetch({
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        });
    }, [startDate, endDate, refetch]);
    

  return (
    <Card className='radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
            <Flex vertical gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={t("Customers")} />
                    <Text className='text-gray fs-13'>{t("Total registered customers in system")}</Text>
                </Flex>
                {/* <Title level={4} className='fw-500 text-black m-0'>
                    {isArabic ? toArabicDigits(data?.getCustomersAnalyticsApi?.totalCustomers):data?.getCustomersAnalyticsApi?.totalCustomers} 
                    <span className='text-bright-red fs-13 fw-400'>{i18n?.language === 'ar' ? 
                    `${data?.getCustomersAnalyticsApi?.percentageChange}%-`:
                    `${data?.getCustomersAnalyticsApi?.percentageChange}%`} {t("then last month")} <img src='/assets/icons/down-ar.webp' width={12} alt='down arrow icon' fetchPriority="high" /></span>
                </Title> */}
                <Title level={4} className='fw-500 text-black m-0'>
                    {isArabic 
                        ? toArabicDigits(data?.getCustomersAnalyticsApi?.totalCustomers) 
                        : data?.getCustomersAnalyticsApi?.totalCustomers
                    } 
                    <span className={`fs-13 fw-400
                        ${
                            data?.getCustomersAnalyticsApi?.isPositiveTrend ? 'text-green':'text-bright-red'
                        }
                    `}>
                        {data?.getCustomersAnalyticsApi?.isPositiveTrend 
                        ? '+' 
                        : '-'
                        }
                        {
                            i18n?.language === 'ar' 
                            ? `${toArabicDigits(data?.getCustomersAnalyticsApi?.percentageChange)}%` 
                            : `${data?.getCustomersAnalyticsApi?.percentageChange}%`
                        } {t("than last month")} 
                        {
                            data?.getCustomersAnalyticsApi?.isPositiveTrend 
                            ? <img src='/assets/icons/up-ar.webp' width={12} alt='up arrow icon' fetchPriority="high" />
                            : <img src='/assets/icons/down-ar.webp' width={12} alt='down arrow icon' fetchPriority="high" />
                        }
                        
                    </span>
                </Title>
            </Flex>
            <Flex justify='end' gap={10}>
                <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder={[t("Start Year"),t("End Year")]}
                    value={dateRange}
                    onChange={(values) => setDateRange(values)}
                />
            </Flex>
        </Flex>
        {
            loading ? 
            <Flex justify='center' align='center'>
                <Spin {...TableLoader} size="large" />
            </Flex>
            :
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={300}
                width={'100%'}
                className='bar-width'
            />
        }
      </Card>
  );
};

export { CustomerLineChart };
