import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { CustomerTable } from '../../components'

const { Text } = Typography
const CustomersPage = () => {
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
                            title: <Text className="fw-500 fs-14 text-black">Customers</Text>,
                        },
                    ]}
                />
            </Card>
            <CustomerTable />
        </Flex>
    )
}

export {CustomersPage}