import { Flex } from 'antd'
import { BookingTable } from '../../components/Staff Mangement/Structure/BookingTable'

function Booking() {
  return (
    <div>
        <Flex vertical gap={24}>
            <BookingTable/>
        </Flex>
      
    </div>
  )
}

export default Booking
 