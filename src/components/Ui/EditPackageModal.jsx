import React, { useState } from "react";
import {
  Modal,
  Button,
  Select,
  Switch,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const EditPackageModal = ({ visible, onCancel, onRenew }) => {
  const [formData, setFormData] = useState({
    branches: 2,
    admins: 2,
    staffManagers: 10,
    serviceProviders: 2,
    receptionists: 2,
    whatsappBot: false,
    manualReminders: false,
    automatedReminders: false,
    googleReviewLink: false,
    promotions: false,
    selfServiceTablet: false,
    basicDashboard: false,
    fullDashboard: false,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleToggle = (field, checked) => {
    setFormData({ ...formData, [field]: checked });
  };

  const numberOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={550}
      className="custom-modal"
    >
      <div style={{ marginBottom: 10 }}>
        <Title level={4}>Edit Package</Title>
        <Text type="secondary">Edit client package.</Text>
      </div>

      {/* Dropdown fields */}
      <Row gutter={[0, 15]}>
      <Col span={24} >
  <Switch checked disabled size="small" style={{ marginRight: 8 }} />
  <Select
    value={formData.branches}
    onChange={(val) => handleChange("branches", val)}
    style={{ width: "90%", marginRight: 8 }}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
  >
    {numberOptions.map((num) => (
      <Option
        key={num}
        value={num}
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{num}</span>
           <span style={{ color: "#777E90" }}> | Branches</span>

          </div>
        }
      >
        {num} 
      </Option>
    ))}
  </Select>
</Col>




       <Col span={24}>
  <Switch checked disabled size="small" style={{ marginRight: 8 }} />
  <Select
    value={formData.admins}
    onChange={(val) => handleChange("admins", val)}
    style={{ width: "90%", marginRight: 8 }}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
  >
    {numberOptions.map((num) => (
      <Option
        key={num}
        value={num}
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{num}</span>
            <span style={{ color: "#777E90" }}> | Admins</span>
          </div>
        }
      >
        {num} 
      </Option>
    ))}
  </Select>
</Col>


       <Col span={24}>
  <Switch checked disabled size="small" style={{ marginRight: 8 }} />
  <Select
    value={formData.staffManagers}
    onChange={(val) => handleChange("staffManagers", val)}
    style={{ width: "90%", marginRight: 8 }}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
  >
    {numberOptions.map((num) => (
      <Option
        key={num}
        value={num}
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{num}</span>
            <span style={{ color: "#777E90" }}> | Staff Managers</span>
          </div>
        }
      >
        {num} 
      </Option>
    ))}
  </Select>
</Col>


       <Col span={24}>
  <Switch checked disabled size="small" style={{ marginRight: 8 }} />
  <Select
    value={formData.serviceProviders}
    onChange={(val) => handleChange("serviceProviders", val)}
    style={{ width: "90%", marginRight: 8 }}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
  >
    {numberOptions.map((num) => (
      <Option
        key={num}
        value={num}
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{num}</span>
            <span style={{ color: "#777E90" }}> | Service Providers</span>
          </div>
        }
      >
        {num} 
      </Option>
    ))}
  </Select>
</Col>


        <Col span={24}>
  <Switch checked disabled size="small" style={{ marginRight: 8 }} />
  <Select
    value={formData.receptionists}
    onChange={(val) => handleChange("receptionists", val)}
    style={{ width: "90%", marginRight: 8 }}
    dropdownMatchSelectWidth={false}
    optionLabelProp="label"
  >
    {numberOptions.map((num) => (
      <Option
        key={num}
        value={num}
        label={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{num}</span>
            <span style={{ color: "#777E90" }}> | Receptionists</span>
          </div>
        }
      >
        {num} 
      </Option>
    ))}
  </Select>
</Col>

      </Row>

      <br />

      {/* Toggle Features */}
      <Row gutter={[0, 15]}>
       <Col  span={24}>
  <Switch
    checked={formData.whatsappBot}
    disabled 
    size="small"
    style={{ marginRight: 8 }}
  />
  <Select
    value=" |  WhatsApp Bot"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  >
    <Option value="WhatsApp Bot" label="WhatsApp Bot">
      WhatsApp Bot
    </Option>
  </Select>
</Col>

        <Col span={24}>
          <Switch
            checked={formData.manualReminders}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
           <Select
    value=" | Manual Remainder"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>

          <Option value="Manual Remainder" label="Manual Remainder ">
          <Text>Manual Reminders</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.automatedReminders}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
              <Select
    value=" | Automated Reminders"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
          <Option value="Automated Reminders" label="Automated Reminders">
          <Text>Automated Reminders</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.googleReviewLink}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
                      <Select
    value="| Google Review Link"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
  <Option value="Google Review Link" label="Google Review Link">
          <Text>Google Review Link</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.promotions}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
          <Select
    value=" | Promotions"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
  <Option value="Promotions" label="Promotions">
          <Text>Promotions</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.selfServiceTablet}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
           <Select
    value=" | Self Service Tablet"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
  <Option value="Self Service Tablet" label="Self Service Tablet">
          <Text>Self Service Tablet</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.basicDashboard}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
          <Select
    value=" | Basic Dashboard"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
  <Option value="Basic Dashboard" label="Basic Dashboard">
          <Text>Basic Dashboard</Text>
          </Option>
        </Col>

        <Col span={24}>
          <Switch
            checked={formData.fullDashboard}
            disabled
            size="small"
            style={{ marginRight: 8 }}
          />
           <Select
    value=" | Full Access Dashboard"
    disabled 
    style={{ width: "90%", textAlign: "right"  }}
    optionLabelProp="label"
  ></Select>
  <Option value="Full Access Dashboard" label="Full Access Dashboard">
          <Text>Full Access Dashboard</Text>
          </Option>
        </Col>
      </Row>

      {/* Footer */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={() => onRenew(formData)}>
          Renew
        </Button>
      </div>
    </Modal>
  );
};

export default EditPackageModal;
