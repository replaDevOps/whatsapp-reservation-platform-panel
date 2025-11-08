import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Flex, Image, Row, Tag, Typography } from 'antd'
import { BreadCrumbCard, ModuleTopHeading, SingleBusinessViewTable, StatisticsCommonCards, SingleBusinessViewTab } from '../../../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { allbusinessData } from '../../../../data'
import { useState } from 'react'
import { BusinessTitle } from '../../../../shared'
import { useTranslation } from 'react-i18next'

const { Text, Title } = Typography
const SingleViewBusiness = () => {

    const navigate = useNavigate()
    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const {id} = useParams()
    const [ viewitem, setViewItem ] = useState(false)
    const singleview = allbusinessData?.find((items)=>items?.key === Number(id))

    const condata = [
        {
            id: 1,
            icon: '/assets/icons/us.webp',
            title: singleview?.customerName
        },
        {
            id: 2,
            icon: '/assets/icons/ph.webp',
            title: '+123 456 789'
        },
        {
            id: 3,
            icon: '/assets/icons/ml.webp',
            title: singleview?.email
        },
        {
            id: 4,
            icon: '/assets/icons/gl.webp',
            title: 'www.acb.com'
        }
    ] 

    const cardsData = [
        {
            id: 1,
            icon:'/assets/icons/total-booking.webp',
            title: '50',
            subtitle: 'Total Bookings',
        },
        {
            id: 2,
            icon:'/assets/icons/todays-booking.webp',
            title: '8',
            subtitle: 'Today’s Bookings',
        },
        {
            id: 3,
            icon:'/assets/icons/total-active-branch.webp',
            title: '3',
            subtitle: 'Total Active Branches',
        },
        {
            id: 4,
            icon:'/assets/icons/total-as.webp',
            title: '16',
            subtitle: 'Total Active Service Providers',
        },
    ];

    return (
        <>
            <Flex vertical gap={10}>
                <BreadCrumbCard 
                    items={[
                        { title: title },
                        { title: t("All Businesses") },
                    ]}
                />
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex gap={15} vertical>
                        <Row gutter={[24,24]}>
                            <Col span={24} lg={{span: 12}}>
                                <Flex gap={10} align="center" className='mb-2'>
                                    <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/allbusiness")}>
                                        {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                                    </Button>
                                    <Avatar src={singleview?.businessLogo} size={40}  />
                                    <Flex gap={10} align="center">
                                        <ModuleTopHeading level={4} name={singleview?.businessName} />
                                        <Tag className='px-3 py-1 radius-20'>{t(singleview?.type)}</Tag>
                                    </Flex>
                                </Flex>
                                <Flex gap={15} align='center' wrap className='ml-20'>
                                    {
                                        condata?.map((contact,i)=>
                                            <Flex align='flex-end' gap={7} key={i}>
                                                <Image preview={false} src={contact?.icon} alt='contact icon' width={14} />
                                                <Text className='fs-13 text-gray'>{contact?.title}</Text>
                                            </Flex>
                                        )
                                    }
                                </Flex>
                            </Col>
                            <Col span={24} lg={{span: 12}}>
                                <Flex justify='end'>
                                    <Flex vertical gap={3}>
                                        <Flex align='center' gap={2}>
                                            <Title level={5} className='m-0'>
                                                {
                                                    t(singleview?.subscriptionPlan
                                                    ?.replace(/([a-z])([A-Z])/g, '$1 $2')
                                                    ?.replace(/([a-z]+)(plan)$/i, '$1 Plan')
                                                    ?.replace(/^./, (str) => str.toUpperCase()))
                                                } 
                                             </Title>
                                            <Tag color='#34C759'>{t("Active")}</Tag>
                                        </Flex>
                                        <Text className='fs-13 text-gray'>
                                            {t("Expire on")} {singleview?.date}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Col>
                        </Row>
                    </Flex>
                </Card>
                <StatisticsCommonCards 
                    data={cardsData}
                />
                {
                    viewitem ? 
                    <SingleBusinessViewTab setViewItem={setViewItem} />
                    :
                    <SingleBusinessViewTable setViewItem={setViewItem}  />
                }
            </Flex>
        </>
    )
}

export {SingleViewBusiness}