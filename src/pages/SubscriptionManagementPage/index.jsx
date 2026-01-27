import { Flex } from 'antd'
import { BreadCrumbCard, StatisticsCommonCards, SubscriptionManageTable, TitleCard } from '../../components'
import { useTranslation } from 'react-i18next'
import { subscriptionTitle } from '../../shared'
import { useState } from 'react'

const SubscriptionManagementPage = () => {

    const {t} = useTranslation()
    const title = subscriptionTitle({t})
    
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t("Subscription Management") },
                ]}
            />
            <TitleCard 
                title={t('Subscription Management')}
                subtitle={t('Manage all the subscription in your system')}
            />
            <StatisticsCommonCards />
            <SubscriptionManageTable />
        </Flex>
    )
}

export {SubscriptionManagementPage}