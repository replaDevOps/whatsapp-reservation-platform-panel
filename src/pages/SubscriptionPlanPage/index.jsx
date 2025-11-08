import { Flex } from 'antd'
import { BreadCrumbCard, SubscriptionPlanTab, TitleCard } from '../../components'
import { useTranslation } from 'react-i18next'
import { subscriptionTitle } from '../../shared'

const SubscriptionPlanPage = () => {
    const {t} = useTranslation()
    const title = subscriptionTitle({t})
    return (
        <Flex vertical gap={15}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Subscription Plan') },
                ]}
            />
            <TitleCard 
                title={t('Subscription Plan')}
                subtitle={t('Manage all the subscription plan in your system')}
            />
            <SubscriptionPlanTab />
        </Flex>
    )
}

export {SubscriptionPlanPage}