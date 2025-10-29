import { Flex } from 'antd'
import { BreadCrumbCard, RevenueTable, StatisticsCommonCards, TitleCard } from '../../components'

const RevenuePage = () => {

    const cardsData = [
        {
            id: 1,
            icon:'/assets/icons/rev-icon.png',
            title: 'SAR 30,000',
            subtitle: 'Total Revenue',
        },
        {
            id: 2,
            icon:'/assets/icons/rev-icon.png',
            title: 'SAR 10,000',
            subtitle: 'This Month Revenue',
        },
    ];


    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Business Management', },
                    { title: 'Revenue' },
                ]}
            />
            <TitleCard 
                title={'Revenue'}
                subtitle={'Manage all the revenue in your system'}
            />
            <StatisticsCommonCards 
                data={cardsData}
                lg={12}
            />
            <RevenueTable />
        </Flex>
    )
}

export {RevenuePage}