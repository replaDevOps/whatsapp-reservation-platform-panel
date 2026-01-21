import { Flex } from 'antd'
import { BreadCrumbCard, RevenueTable, StatisticsCommonCards, TitleCard } from '../../components'
import { BusinessTitle, toArabicDigits } from '../../shared'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client/react'
import { GET_REVENUE_COUNT } from '../../graphql/query'

const RevenuePage = () => {

    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const isArabic = i18n?.language === 'ar'
    const { data, loading } = useQuery(GET_REVENUE_COUNT,{
        fetchPolicy: 'network-only'
    })
    const revenueCount = data?.getSubscriberSubscriptions
    const cardsData = [
        {
            id: 1,
            icon:'/assets/icons/rev-icon.webp',
            title: `${t("SAR")} ${ isArabic ? toArabicDigits(revenueCount?.totalRevenue ?? 0): revenueCount?.totalRevenue ?? 0}`,
            subtitle: t('Total Revenue'),
        },
        {
            id: 2,
            icon:'/assets/icons/rev-icon.webp',
            title: `${t("SAR")} ${isArabic ? toArabicDigits(revenueCount?.thisMonthRevenue ?? 0):revenueCount?.thisMonthRevenue ?? 0}`,
            subtitle: t('This Month Revenue'),
        },
    ];


    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t("Revenue") },
                ]}
            />
            <TitleCard 
                title={t("Revenue")}
                subtitle={t("Manage all the revenue in your system")}
            />
            <StatisticsCommonCards 
                data={cardsData}
                arr={2}
                loading={loading}
                lg={12}
            />
            <RevenueTable />
        </Flex>
    )
}

export {RevenuePage}