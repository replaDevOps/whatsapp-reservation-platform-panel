import { Flex } from 'antd'
import { AddBusinessCrumb } from '../../components/Add Business/addBusinessCrumb'
import AddBusinessForm from '../../components/Add Business/Form'

const AddBusiness = () => {
  return (
    <Flex vertical gap={24}>
      <AddBusinessCrumb/>
      <AddBusinessForm/>
    </Flex>
  )
}

export default AddBusiness
