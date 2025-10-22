import { Flex } from 'antd'
import Packages from '../../components/Packages/structure/AllPackages';
import ManagePackages from '../../components/Packages/structure/ManagePackages';
import PackageManagement from '../../components/Packages/structure/PackagesSection';
// import EditPackages from '../../components/EditPackages/structure/EditPackages';


function Package() {
  return (
    <div>
        <Flex vertical gap={24}>
         <Packages/>
         <ManagePackages/>
         <PackageManagement/>
         {/* <EditPackages/> */}

        </Flex>
      
    </div>
  )
}

export default Package;
 