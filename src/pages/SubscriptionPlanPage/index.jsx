import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { SubscriptionPlanTab } from '../../components'
import { ModuleTopHeading } from '../../components'

const { Text } = Typography
const SubscriptionPlanPage = () => {

    return (
        <Flex vertical gap={15}>
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
                            title: <Text className="fw-500 fs-14 text-black">Subscription Plan</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Subscription Plan' />
                    <Text className='text-gray fs-13'>Manage all the subscription plan in your system</Text>
                </Flex>
            </Card>
            <SubscriptionPlanTab />
        </Flex>
    )
}

export {SubscriptionPlanPage}