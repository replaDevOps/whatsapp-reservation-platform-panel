import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { DemoRequestTable } from '../../components'

const { Text } = Typography
const DemoRequestPage = () => {
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
                            title: <Text className="fw-500 fs-14 text-black">Demo Requests</Text>,
                        },
                    ]}
                />
            </Card>
            <DemoRequestTable />
        </Flex>
    )
}

export {DemoRequestPage}