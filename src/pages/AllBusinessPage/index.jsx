import { Flex } from 'antd'
import { AllBusinessTable, BreadCrumbCard, StatisticsCommonCards, TitleCard } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'
import { GET_SUBSCRIPTIONS_STATS } from '../../graphql/query'
import { useLazyQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react'

const AllBusinessPage = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()
    const title = BusinessTitle({t})
    const [subscriptionsStats, setSubscriptionsStats]= useState(null)

    const [getSubscriptionsStats, { data, loading }] = useLazyQuery(GET_SUBSCRIPTIONS_STATS, {
        fetchPolicy: "network-only",
    })
    useEffect(()=>{
        if(getSubscriptionsStats)
            getSubscriptionsStats()
    }, [getSubscriptionsStats])
    useEffect(()=>{
        if(data?.getBusinesses){
            const {basicPlanCount, standardPlanCount, proPlanCount, enterprisePlanCount}= data?.getBusinesses
            setSubscriptionsStats({
                basicPlanCount,
                standardPlanCount,
                proPlanCount,
                enterprisePlanCount,
            })
        }
    }, [data])

    const cardsData = [
        {
            id: 1,
            icon: '/assets/icons/plan-business.webp',
            title: subscriptionsStats?.basicPlanCount || 0,
            subtitle: t("Basic Plan Business"),
        },
        {
            id: 2,
            icon: '/assets/icons/plan-business.webp',
            title: subscriptionsStats?.standardPlanCount || 0,
            subtitle: t("Standard Plan Business"),
        },
        {
            id: 3,
            icon: '/assets/icons/plan-business.webp',
            title: subscriptionsStats?.proPlanCount || 0,
            subtitle: t("Pro Plan Business"),
        },
        {
            id: 4,
            icon: '/assets/icons/plan-business.webp',
            title: subscriptionsStats?.enterprisePlanCount || 0,
            subtitle: t("Enterprise Plan Business"),
        },
    ]

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title, },
                    { title: t("All Businesses") }
                ]}
            />
            <TitleCard 
                title={t("All Businesses")}
                subtitle={t("Manage all the businesses in your system")}
                btntext={t("Add Business")}
                onClick={()=>navigate('/addbusiness')}
            />
            <StatisticsCommonCards 
                data={cardsData}
                loading={loading}
                lg={6}
            />
            <AllBusinessTable/>
        </Flex>
    )
}

export {AllBusinessPage}