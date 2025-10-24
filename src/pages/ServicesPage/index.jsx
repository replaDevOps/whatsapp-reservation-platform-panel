import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { ServicesTable } from '../../components'

const { Text } = Typography
const ServicesPage = () => {
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
                            title: <Text className="fw-500 fs-14 text-black">Services</Text>,
                        },
                    ]}
                />
            </Card>
            <ServicesTable />
        </Flex>
    )
}

export {ServicesPage}