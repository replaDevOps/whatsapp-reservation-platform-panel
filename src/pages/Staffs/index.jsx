import { Flex } from 'antd'
import { StaffManagement } from '../../components/Staff Mangement/Structure/StaffMangment'
import { StaffTable } from '../../components/Staff Mangement/Structure/Stafftable'

function Staffs() {
  return (
    <div>
      <Flex vertical gap={24}>
         <StaffManagement/>
         <StaffTable/>
      </Flex>   
    </div>
  )
}

export default Staffs
