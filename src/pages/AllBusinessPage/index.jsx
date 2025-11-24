import { Flex } from 'antd'
import { AllBusinessTable, BreadCrumbCard, StatisticsCommonCards, TitleCard } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessTitle } from '../../shared'

const AllBusinessPage = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()
    const title = BusinessTitle({t})

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
            />
            <AllBusinessTable/>
        </Flex>
    )
}

export {AllBusinessPage}