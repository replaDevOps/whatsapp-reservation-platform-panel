import { Flex } from 'antd'
import { BookingTable, BreadCrumbCard } from '../../components'

function BookingPage() {
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                { title: 'Booking Management', },
                { title: 'Bookings' },
            ]}
        />
        <BookingTable />
    </Flex>
  )
}

export {BookingPage} 