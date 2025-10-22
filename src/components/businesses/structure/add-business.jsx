import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Flex, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const AddBusiness = () => {
  const navigate = useNavigate()
function navigateToAddBusiness() {
  navigate("/businesses/addbusiness")
}
  
  return (
    <Flex vertical>
      <Card style={{ borderRadius: "8px" }} className="card-cs">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Breadcrumb */}
          <Breadcrumb separator="">
            <Breadcrumb.Item>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontWeight: "600" }} className="fs-18">
                  All Businesses
                </h3>
                <span style={{ color: "#888" }} className="fs-15">
                  Manage all the businesses in your system
                </span>
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Right side: Button */}
          <Button
            type="primary"
            onClick={navigateToAddBusiness}
            style={{
              backgroundColor: "#F9FAFB",
              color: "black",
              border: "0.2px solid gray",
              boxShadow: "none",
            }}
          >
            <PlusOutlined /> Add Business
          </Button>
        </div>
      </Card>
    </Flex>
  );
};

export default AddBusiness;
