import { Breadcrumb, Card } from "antd";
import data from "../../data/businessListData";
import { useParams, useNavigate } from "react-router-dom";
import BusinessInfo from "../../components/viewBusiness/structure/BusinessInfo";
import BusinessBranchesTable from "../../components/viewBusiness/structure/BusinessBranchesTable";
import Headline from "../../components/viewBusiness/structure/Headline";
import { useEffect } from "react";

const ViewBusiness = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const business = data.find((item) => String(item.businessId) === String(id));
  const businessBranches = business.branches;

  useEffect(() => {
    if (businessBranches.length <= 1) {
      const branch = businessBranches[0];
      navigate(
        `/businesses/${business.businessId}/branches/${branch.branchId}`
      );
    }
  }, [id]);

  const goBack = () => {
    navigate(-1);
    console.log("clicked")
  };

  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }}>
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item>All Businesses</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "600" }}>{business.businessName}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <BusinessInfo business={business} goBack={goBack} />
      <Headline businessId={business.businessId} />
      <BusinessBranchesTable businessId={business.businessId} />
    </div>
  );
};

export default ViewBusiness;