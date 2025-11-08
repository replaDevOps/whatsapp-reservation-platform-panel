import { Flex } from 'antd'
import { AllBusinessTable, BreadCrumbCard, StatisticsCommonCards, TitleCard } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'

const AllBusinessPage = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()
    const title = BusinessTitle({t})
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
                    { title: title, },
                    { title: t("All Businesses") },
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
            />
            <AllBusinessTable />
        </Flex>
    )
}

export {AllBusinessPage}