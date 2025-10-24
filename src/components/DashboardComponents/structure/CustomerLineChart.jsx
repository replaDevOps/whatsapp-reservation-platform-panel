import { useState } from 'react';
import { Card, Flex, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { MyDatepicker } from '../../Forms';
import moment from 'moment';

const { Title, Text } = Typography
const CustomerLineChart = () => {

    const [selectedYear, setSelectedYear] = useState(moment());
    const chartData = {
        series: [
            { name: 'Customers', data: [0, 13, 17, 10, 15, 16, 25, 14, 17, 15, 12, 20] },
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
    

  return (
    <Card className='radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
            <Flex vertical gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Customers' />
                    <Text className='text-gray fs-13'>Total registered customers in system</Text>
                </Flex>
                <Title level={4} className='fw-500 text-black m-0'>
                    6820 <span className='text-bright-red fs-13 fw-400'>-9% then last month <img src='/assets/icons/down-ar.png' width={12} alt='down arrow icon' fetchPriority="high" /></span>
                </Title>
            </Flex>
            <Flex justify='end' gap={10}>
                <MyDatepicker
                    withoutForm
                    rangePicker
                    className="datepicker-cs"
                    placeholder="Select Year"
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
