import { Flex } from 'antd'
import { BreadCrumbCard, SubscriptionPlanTab, TitleCard } from '../../components'
import { useTranslation } from 'react-i18next'
import { subscriptionTitle } from '../../shared'
import { useState } from 'react'

const SubscriptionPlanPage = () => {
    const {t} = useTranslation()
    const title = subscriptionTitle({t})
    const [ state, setState ] = useState(null)
    return (
        <Flex vertical gap={15}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Subscription Plan') },
                    ...(state ? [{ title: state }] : [])
                ]}
            />
            <TitleCard 
                title={t('Subscription Plan')}
                subtitle={t('Manage all the subscription plan in your system')}
            />
            <SubscriptionPlanTab setState={setState} />
        </Flex>
    )
}

export {SubscriptionPlanPage}