import { Card, Col, Flex, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../shared'

const { Title, Text } = Typography
const StatisticsCommonCards = ({ data = [], lg = 6,  md = 12, sm = 24, cardClass = '',}) => {
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    return (
        <Row gutter={[14, 24]} className="h-100">
            {data.map((item, index) => (
                <Col key={index} span={24} sm={sm} md={md} lg={lg}>
                    <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                        <Flex gap={8} vertical align="start">
                            {item?.icon && (
                                <img src={item.icon} width={45} alt={item.title || 'icon'} fetchPriority="high"/>
                            )}
                            {item?.subtitle && (
                                <Text className="fs-14 text-gray">{t(item.subtitle)}</Text>
                            )}
                            <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                                {isArabic ? toArabicDigits(item.title):item.title}
                            </Title>
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export { StatisticsCommonCards }
