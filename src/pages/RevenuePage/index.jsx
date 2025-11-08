import { Flex } from 'antd'
import { BreadCrumbCard, RevenueTable, StatisticsCommonCards, TitleCard } from '../../components'
import { BusinessTitle, toArabicDigits } from '../../shared'
import { useTranslation } from 'react-i18next'

const RevenuePage = () => {

    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const isArabic = i18n?.language === 'ar'
    const cardsData = [
        {
            id: 1,
            icon:'/assets/icons/rev-icon.webp',
            title: `${t("SAR")} ${isArabic ? toArabicDigits("30,000"):"30,000"}`,
            subtitle: 'Total Revenue',
        },
        {
            id: 2,
            icon:'/assets/icons/rev-icon.webp',
            title: `${t("SAR")} ${isArabic ? toArabicDigits("10,000"):"10,000"}`,
            subtitle: 'This Month Revenue',
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
                lg={12}
            />
            <RevenueTable />
        </Flex>
    )
}

export {RevenuePage}