import { Flex } from 'antd'
import { BreadCrumbCard, SubscriptionPlanTab, TitleCard } from '../../components'

const SubscriptionPlanPage = () => {

    return (
        <Flex vertical gap={15}>
            <BreadCrumbCard 
                items={[
                    { title: 'Business Management', },
                    { title: 'Subscription Plan' },
                ]}
            />
            <TitleCard 
                title={'Subscription Plan'}
                subtitle={'Manage all the subscription plan in your system'}
            />
            <SubscriptionPlanTab />
        </Flex>
    )
}

export {SubscriptionPlanPage}