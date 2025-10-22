import { useParams } from "react-router-dom";
import data from "../../data/businessListData";
import { Breadcrumb, Card } from "antd";
import BranchInfo from "../../components/branchDetails/structure/BranchInfo";
import BranchHeadline from "../../components/branchDetails/structure/BranchHeadline";
import BranchDetailsTable from "../../components/branchDetails/structure/Table";

const BranchDetails = () => {
  const {id_business ,id_branch } = useParams();
  const filteredBusiness = data.find((business => business.businessId === id_business));
  const filteredBranch = filteredBusiness?.branches.find(branch => branch.branchId === id_branch);

  const branchsLength = filteredBusiness.branches.length
  // console.log(branchsLength)

  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }}>
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item>All Business</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "600" }}>{filteredBusiness.businessName}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "600" }}>{filteredBranch.branchName}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <BranchInfo business={filteredBusiness}  branches={branchsLength}/>
      <BranchHeadline branch={filteredBranch}/>
      <BranchDetailsTable branchName={filteredBranch.branchName} hasTabletAccess={filteredBranch.TableAccess} branches={branchsLength} services={filteredBranch.services} staffs={filteredBranch.staff}  />
    </div>
  );
};

export default BranchDetails;
