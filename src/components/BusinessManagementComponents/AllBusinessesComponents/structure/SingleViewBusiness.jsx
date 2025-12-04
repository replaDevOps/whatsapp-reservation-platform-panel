import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Flex, Image, Row, Spin, Tag, Typography } from 'antd'
import { BreadCrumbCard, ModuleTopHeading, SingleBusinessViewTable, StatisticsCommonCards, SingleBusinessViewTab } from '../../../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BusinessTitle, capitalizeTranslated, FieldMerger, TableLoader, utcDateToLocal } from '../../../../shared'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client/react'
import { GET_BUSINESSES_BY_ID } from '../../../../graphql/query'

const { Text, Title } = Typography
const SingleViewBusiness = () => {

    const navigate = useNavigate()
    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const {id} = useParams()
    const [ viewitem, setViewItem ] = useState(false)
    const { data, loading } = useQuery(GET_BUSINESSES_BY_ID, {
        variables: { getBusinessId: id },
        skip: !id,
    });
    const singleview = data?.getBusiness

    const condata = [
        {
            id: 1,
            icon: '/assets/icons/us.webp',
            title: <FieldMerger 
                    object={singleview?.subscriber}
                    fields={['firstName', 'lastName']}
            />
        },
        {
            id: 2,
            icon: '/assets/icons/ph.webp',
            title: `+${singleview?.subscriber?.phone}`
        },
        {
            id: 3,
            icon: '/assets/icons/ml.webp',
            title: singleview?.subscriber?.email
        },
        {
            id: 4,
            icon: '/assets/icons/gl.webp',
            title: singleview?.websiteLink
        }
    ] 


    return (
        <>
            <Flex vertical gap={10}>
                <BreadCrumbCard 
                    items={[
                        { title: title },
                        { title: t("All Businesses") },
                    ]}
                />
                {
                    loading ?
                    <Flex justify='center' align='center'>
                        <Spin {...TableLoader} size="large" />
                    </Flex>
                    :
                    <>
                        <Card className='card-bg card-cs radius-12 border-gray'>
                            <Flex gap={15} vertical>
                                <Row gutter={[24,5]}>
                                    <Col span={24} md={{span: 12}}>
                                        <Flex gap={10} align="center">
                                            <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/allbusiness")}>
                                                {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                                            </Button>
                                            <Avatar src={singleview?.image} size={40}  />
                                            <Flex gap={10} align="center">
                                                <ModuleTopHeading level={4} name={capitalizeTranslated(singleview?.name)} />
                                                <Tag className='px-3 py-1 radius-20'>{capitalizeTranslated(t(singleview?.businessType))}</Tag>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                    <Col span={24} md={{span: 12}}>
                                        <Flex justify='end'>
                                            <Flex vertical gap={3}>
                                                <Flex align='center' gap={2}>
                                                    <Title level={5} className='m-0'>
                                                        {
                                                            capitalizeTranslated(t(singleview?.subscription?.type))
                                                        } 
                                                        {/* {
                                                            t(singleview?.subscriptionPlan
                                                            ?.replace(/([a-z])([A-Z])/g, '$1 $2')
                                                            ?.replace(/([a-z]+)(plan)$/i, '$1 Plan')
                                                            ?.replace(/^./, (str) => str.toUpperCase()))
                                                        }  */}
                                                    </Title>
                                                    <Tag color='#34C759'>{t("Active")}</Tag>
                                                </Flex>
                                                <Text className='fs-13 text-gray'>
                                                    {t("Expire on")} {utcDateToLocal(singleview?.subscription?.createdAt)}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Col>
                                    <Col span={24}>
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
                                </Row>
                            </Flex>
                        </Card>
                        <StatisticsCommonCards 
                            // data={cardsData}
                        />
                        {
                            viewitem ? 
                            <SingleBusinessViewTab setViewItem={setViewItem} />
                            :
                            <SingleBusinessViewTable setViewItem={setViewItem} id={singleview?.id}  />
                        }
                    </>
                }
            </Flex>
        </>
    )
}

export {SingleViewBusiness}