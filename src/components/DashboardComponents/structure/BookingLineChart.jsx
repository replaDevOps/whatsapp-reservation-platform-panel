import { useEffect, useState } from 'react';
import { Card, Flex, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { MyDatepicker } from '../../Forms';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../shared';
import { GET_BOOKING_STATS } from '../../../graphql/query';
import { useQuery } from '@apollo/client/react';
import dayjs from 'dayjs';

const { Title, Text } = Typography
const BookingLineChart = () => {

    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [dateRange, setDateRange] = useState([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);
    const [startDate, endDate] = dateRange ?? [];
    const { data, loading, refetch } = useQuery(GET_BOOKING_STATS, {
        variables: { 
            startDate: startDate?.format("YYYY-MM-DD"),
            endDate: endDate?.format("YYYY-MM-DD"),
            },
    });
    const detail = data?.getBusinessTypeBookingTrend
    useEffect(() => {
        refetch({
            startDate: startDate?.format("YYYY-MM-DD"),
            endDate: endDate?.format("YYYY-MM-DD")
        });
    }, [startDate, endDate]);
    const xCategories = detail?.chartData?.map(item =>
        dayjs(item.date).format("D")
    ) || [];
    const chartData = {
        series: [
            { name: t("Spa"), data: detail?.chartData?.map(item => item.Spa) || [] },
            { name: t("Barber"), data: detail?.chartData?.map(item => item.Barber) || [] },
            { name: t("Clinic"), data: detail?.chartData?.map(item => item.Clinic) || [] },
            { name: t("General"), data: detail?.chartData?.map(item => item.General) || [] },
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
            categories: xCategories,
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
        colors: ['#0ABAB5','#A947BA','#BAA947','#474DBA'],
        legend: {
            markers:{
                shape: "circle"
            }
        },
        },
    };
    

  return (
    <Card className='radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
            <Flex vertical gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={t("Bookings")} />
                    <Text className='text-gray fs-13'>{t("Spa VS Barber VS Clinic VS General")}</Text>
                </Flex>
                <Title level={4} className="fw-500 text-black m-0">
                    {isArabic
                        ? toArabicDigits(detail?.summary?.totalBookings ?? 0)
                        : detail?.summary?.totalBookings ?? 0}
                        <span className={
                            `fs-13 fw-400 ${
                                detail?.summary?.growthPercentage >=0 ? 'text-green':'text-bright-red'
                            }`
                        }>
                        {isArabic
                            ? toArabicDigits(
                                (detail?.summary?.growthPercentage ?? 0) +
                                    (detail?.summary?.growthPercentage >= 0 ? "%+" : "%-")
                            )
                            : `${detail?.summary?.growthPercentage ?? 0}${
                                detail?.summary?.growthPercentage >= 0 ? "%+" : "%-"
                            }`}{" "}
                        {t(detail?.summary?.comparisonText)}
                        {
                            detail?.summary?.growthPercentage >= 0 ?
                            <img
                                src="/assets/icons/up-ar.webp"
                                width={12}
                                alt="down arrow icon"
                                fetchPriority="high"
                            />
                            :
                            <img
                                src="/assets/icons/down-ar.webp"
                                width={12}
                                alt="down arrow icon"
                                fetchPriority="high"
                            />
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

export { BookingLineChart };
