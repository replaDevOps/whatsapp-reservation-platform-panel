
import { Breadcrumb, Card } from "antd";

const ProfileSetting = () => {
  return (
    <Card style={{ borderRadius: "8px" }} className="card-cs">
      <Breadcrumb>
        <Breadcrumb.Item  className="fs-12">Profile Setting</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ fontWeight: "600" }} className="fs-12">Setting</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};


export default ProfileSetting;




