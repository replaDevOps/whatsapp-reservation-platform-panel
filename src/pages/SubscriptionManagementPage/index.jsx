import { Flex } from 'antd'
import { BreadCrumbCard, StatisticsCommonCards, SubscriptionManageTable, TitleCard } from '../../components'

const SubscriptionManagementPage = () => {

    const cardsData = [
        {
            id: 1,
            icon:'/assets/icons/plan-business.webp',
            title: '50',
            subtitle: 'Basic Plan Business',
        },
        {
            id: 2,
            icon:'/assets/icons/plan-business.webp',
            title: '30',
            subtitle: 'Standard Plan Business',
        },
        {
            id: 3,
            icon:'/assets/icons/plan-business.webp',
            title: '16',
            subtitle: 'Pro Plan Business',
        },
        {
            id: 4,
            icon:'/assets/icons/plan-business.webp',
            title: '8',
            subtitle: 'Enterprise Plan Business',
        },
    ];
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Subscription Plan', },
                    { title: 'Subscription Management' },
                ]}
            />
            <TitleCard 
                title={'Subscription Management'}
                subtitle={'Manage all the subscription in your system'}
            />
            <StatisticsCommonCards 
                data={cardsData}
            />
            <SubscriptionManageTable />
        </Flex>
    )
}

export {SubscriptionManagementPage}