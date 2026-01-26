import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const StatisticsCommonCards = ({data=[], loading, lg = 6,  md = 12, sm = 24, cardClass = ''}) => {
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    return (
        <Row gutter={[14, 24]} className="h-100">
            {
                data?.map((list, index)=>
                    <Col span={24} sm={sm} md={md} lg={lg} key={index}>
                        <Card className={`card-bg h-100 border-gray card-cs ${cardClass}`}>
                            <Flex gap={8} vertical align="start">
                                <img src={list?.icon} width={45} alt={'icon'} fetchPriority="high"/>
                                <Text className="fs-14 text-gray">{list?.subtitle}</Text>
                                <Title level={isArabic ? 4:5} className="fw-600 text-black m-0">
                                    {
                                        loading ?(
                                            <Skeleton.Button 
                                                active 
                                                size='large' 
                                                shape='square'
                                                block
                                                style={{height:'15px',borderRadius:5}}
                                                className='w-100'
                                            />
                                        ):(
                                            list?.title
                                        )
                                    }
                                </Title>
                            </Flex>
                        </Card>
                    </Col>
                )
            }
        </Row>
    )
}

export { StatisticsCommonCards }
