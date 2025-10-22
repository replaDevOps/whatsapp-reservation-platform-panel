import { Flex } from "antd"
import AddBusiness from "../../components/businesses/structure/add-business"
import { Business } from "../../components/businesses/structure/bussiness"
import { Headline } from "../../components/businesses/structure/headline"
import BusinessTable from "../../components/businesses/structure/business-Table"


const Businesses = () => {
  return (
    <Flex vertical gap={24}>
      <Business/>
      <AddBusiness/>
      <Headline/>
      <BusinessTable/>
    </Flex>
  )
}

export default Businesses
