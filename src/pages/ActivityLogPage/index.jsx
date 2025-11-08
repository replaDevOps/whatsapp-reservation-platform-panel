import { Card, Flex, Tabs, Typography } from 'antd'
import { BreadCrumbCard, DiscountActivityLog, ModuleTopHeading, SystemActivityLogTable } from '../../components'
import { useTranslation } from 'react-i18next'
import { websitepagesTitle } from '../../shared'

const { Text } = Typography
const ActivityLogPage = () => {

    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    const items = [
        {
            key: '1',
            label: t('System Logs'),
            children: <SystemActivityLogTable />,
        },
        {
            key: '2',
            label: t('Discount Logs'),
            children: <DiscountActivityLog />,
        },
    ];

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Activity Log') },
                ]}
            />
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={15}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name={t('Activity Log')} />
                        <Text className='text-gray fs-13'>{t("Manage all the activities in your system")}</Text>
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