import { Card, Flex, Tabs, Typography } from 'antd'
import { BreadCrumbCard, DiscountActivityLog, ModuleTopHeading, SystemActivityLogTable } from '../../components'

const { Text } = Typography
const ActivityLogPage = () => {

    const items = [
        {
            key: '1',
            label: 'System Logs',
            children: <SystemActivityLogTable />,
        },
        {
            key: '2',
            label: 'Discount Logs',
            children: <DiscountActivityLog />,
        },
    ];

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Admin Setting', },
                    { title: 'Activity Log' },
                ]}
            />
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={15}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Activity Log' />
                        <Text className='text-gray fs-13'>Manage all the activities in your system</Text>
                    </Flex>
                    <Tabs defaultActiveKey="1" 
                        items={items}
                        className='tab-fill'
                    />
                </Flex>
            </Card>
        </Flex>
    )
}

export {ActivityLogPage}