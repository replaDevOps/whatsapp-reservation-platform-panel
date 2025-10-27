import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { ModuleTopHeading, SubscriptionManageCard, SubscriptionManageTable } from '../../components'

const { Text } = Typography
const SubscriptionManagementPage = () => {
    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Subscription Plan
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Subscription Management</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Subscription Management' />
                    <Text className='text-gray fs-13'>Manage all the subscription in your system</Text>
                </Flex>
            </Card>
            <SubscriptionManageCard />
            <SubscriptionManageTable />
        </Flex>
    )
}

export {SubscriptionManagementPage}