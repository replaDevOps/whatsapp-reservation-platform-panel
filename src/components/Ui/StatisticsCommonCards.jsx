import { useLazyQuery } from '@apollo/client/react'
import { Card, Col, Flex, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { GET_SUBSCRIPTIONS_STATS } from '../../graphql/query'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography
const StatisticsCommonCards = ({lg = 6,  md = 12, sm = 24, cardClass = ''}) => {
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [subscriptionsStats, setSubscriptionsStats]= useState(null)

    const [getSubscriptionsStats, { data }] = useLazyQuery(GET_SUBSCRIPTIONS_STATS, {
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

    return (
        <Row gutter={[14, 24]} className="h-100">
            <Col span={24} sm={sm} md={md} lg={lg}>
                <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                    <Flex gap={8} vertical align="start">
                        <img src={'/assets/icons/plan-business.webp'} width={45} alt={'icon'} fetchPriority="high"/>
                        <Text className="fs-14 text-gray">{t("Basic Plan Business")}</Text>
                        <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                            {subscriptionsStats?.basicPlanCount || 0}
                        </Title>
                    </Flex>
                </Card>
            </Col>
            <Col span={24} sm={sm} md={md} lg={lg}>
                <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                    <Flex gap={8} vertical align="start">
                        <img src={'/assets/icons/plan-business.webp'} width={45} alt={'icon'} fetchPriority="high"/>
                        <Text className="fs-14 text-gray">{t("Standard Plan Business")}</Text>
                        <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                            {subscriptionsStats?.standardPlanCount || 0}
                        </Title>
                    </Flex>
                </Card>
            </Col>
            <Col span={24} sm={sm} md={md} lg={lg}>
                <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                    <Flex gap={8} vertical align="start">
                        <img src={'/assets/icons/plan-business.webp'} width={45} alt={'icon'} fetchPriority="high"/>
                        <Text className="fs-14 text-gray">{t("Pro Plan Business")}</Text>
                        <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                            {subscriptionsStats?.proPlanCount || 0}
                        </Title>
                    </Flex>
                </Card>
            </Col>
            <Col span={24} sm={sm} md={md} lg={lg}>
                <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                    <Flex gap={8} vertical align="start">
                        <img src={'/assets/icons/plan-business.webp'} width={45} alt={'icon'} fetchPriority="high"/>
                        <Text className="fs-14 text-gray">{t("Enterprise Plan Business")}</Text>
                        <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                            {subscriptionsStats?.enterprisePlanCount || 0}
                        </Title>
                    </Flex>
                </Card>
            </Col>
        </Row>
    )
}

export { StatisticsCommonCards }
