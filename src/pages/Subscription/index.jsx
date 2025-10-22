import { Flex } from 'antd';
import Management from '../../components/Subscription Management/Structure/ManagementSec1';
import ManageSubscription from '../../components/Subscription Management/Structure/ManagementSec2';
import HeadingCards from '../../components/Subscription Management/Structure/ManagementCards';
import BusinessTable from '../../components/Subscription Management/Structure/SubscriptionTable';


function Subscription() {
  return (
    <div>
      <Flex vertical gap={22}>

          <Management />
          <ManageSubscription/>
          <HeadingCards   />
          <BusinessTable/>
       
      </Flex>   
    </div>
  )
}

export default Subscription;
