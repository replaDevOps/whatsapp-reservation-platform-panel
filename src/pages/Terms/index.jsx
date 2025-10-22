import { Breadcrumb, Card } from "antd";
import React from "react";
import TermsCondition from "../../components/Terms/structure/quill";

const Terms = () => {
  return (
    <div>
      <Card className="card-cs">
        <Breadcrumb>
          <Breadcrumb.Item>Website Pages</Breadcrumb.Item>
          <Breadcrumb.Item>Terms & Conditions</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <TermsCondition/>
    </div>
  );
};

export default Terms;
