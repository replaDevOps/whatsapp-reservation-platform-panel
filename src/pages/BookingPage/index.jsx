import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { BookingTable } from '../../components'

const { Text } = Typography
function BookingPage() {
  return (
    <Flex vertical gap={15}>
        <Card className='card-bg card-cs radius-12 border-gray'>
            <Breadcrumb
                separator="/"
                items={[
                    {
                        title: (
                            <Text className="fs-13 text-gray">
                                Booking Management
                            </Text>
                        ),
                    },
                    {
                        title: <Text className="fw-500 fs-14 text-black">Bookings</Text>,
                    },
                ]}
            />
        </Card>
        <BookingTable />
    </Flex>
  )
}

export {BookingPage} 