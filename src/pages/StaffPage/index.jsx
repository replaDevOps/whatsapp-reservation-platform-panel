import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { StaffTable } from '../../components'

const { Text } = Typography
const StaffPage = () => {
    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Staff Management
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Staffs</Text>,
                        },
                    ]}
                />
            </Card>
            <StaffTable />
        </Flex>
    )
}

export {StaffPage}