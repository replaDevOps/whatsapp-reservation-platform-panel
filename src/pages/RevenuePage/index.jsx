import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { ModuleTopHeading, PromotionTable, RevenueCard, RevenueTable } from '../../components'

const { Text } = Typography
const RevenuePage = () => {
    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Business Management
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Revenue</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Revenue' />
                    <Text className='text-gray fs-13'>Manage all the revenue in your system</Text>
                </Flex>
            </Card>
            <RevenueCard />
            <RevenueTable />
        </Flex>
    )
}

export {RevenuePage}