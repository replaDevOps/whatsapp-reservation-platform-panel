import {useState} from 'react';
import {
  Layout,
  Menu,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Typography,
  Card,
} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const {Sider, Content} = Layout;
const {Title} = Typography;
const {Option} = Select;

const packagesData = {
  basic: {
    name: 'Basic',
    description: 'Simple start for small setups',
    price: 200,
    billingCycle: 'Monthly',
    features: [
      {name: 'Branch', enabled: true},
      {name: 'Admin', enabled: true},
      {name: 'Staff Manager', enabled: true},
      {name: 'Service Provider', enabled: false},
      {name: 'Receptionist', enabled: true},
      {name: 'WhatsApp Bot', enabled: true},
      {name: 'Manual Reminders', enabled: true},
      {name: 'Automated Reminders', enabled: false},
      {name: 'Google Review Link', enabled: true},
      {name: 'Promotions', enabled: true},
      {name: 'Self Service Tablet', enabled: false},
      {name: 'Basic Dashboard', enabled: true},
      {name: 'Full Access Dashboard', enabled: false},
    ],
  },
  standard: {
    name: 'Standard',
    description: 'Perfect for growing businesses',
    price: 500,
    billingCycle: 'Monthly',
    features: [
      {name: 'Branch', enabled: true},
      {name: 'Admin', enabled: true},
      {name: 'Receptionist', enabled: true},
      {name: 'WhatsApp Bot', enabled: true},
      {name: 'Manual Reminders', enabled: true},
      {name: 'Automated Reminders', enabled: true},
      {name: 'Google Review Link', enabled: true},
      {name: 'Advanced Dashboard', enabled: true},
      {name: 'Priority Support', enabled: true},
    ],
  },
  pro: {
    name: 'Pro',
    description: 'Advanced features for professionals',
    price: 1000,
    billingCycle: 'Monthly',
    features: [
      {name: 'Branch', enabled: true},
      {name: 'Admin', enabled: true},
      {name: 'Receptionist', enabled: true},
      {name: 'WhatsApp Bot', enabled: true},
      {name: 'Manual Reminders', enabled: true},
      {name: 'Automated Reminders', enabled: true},
      {name: 'Analytics Dashboard', enabled: true},
      {name: 'Dedicated Support', enabled: true},
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Custom solutions for large companies',
    price: 2500,
    billingCycle: 'Monthly',
    features: [
      {name: 'Unlimited Branches', enabled: true},
      {name: 'Unlimited Admins', enabled: true},
      {name: 'Unlimited Receptionists', enabled: true},
      {name: 'Full Automation', enabled: true},
      {name: 'Dedicated Account Manager', enabled: true},
      {name: 'Enterprise Dashboard', enabled: true},
      {name: '24/7 Support', enabled: true},
    ],
  },
};

const EditPackages = () => {
  const [selectedKey, setSelectedKey] = useState ('basic');
  const [form] = Form.useForm ();
  const navigate = useNavigate ();
  const handleMenuClick = e => {
    setSelectedKey (e.key);
    form.setFieldsValue (packagesData[e.key]);
  };

  const onFinish = values => {
    console.log ('Updated Package:', values);
    alert ('Package updated successfully!');
  };

  return (
    
    <Layout
      style={{
        minHeight: '100vh',
        padding: 0,
        gap: 12,
        background: 'transparent',
        marginTop: -20,
      }}
    >
      {/* Sidebar */}
      <Sider
        width={220}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          borderRadius: 8,
          padding: '17px 0px',
          height: 'fit-content',
          color: '#777E90',
          marginLeft: -20,
          
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {key: 'basic', label: 'Basic Package'},
            {key: 'standard', label: 'Standard Package'},
            {key: 'pro', label: 'Pro Package'},
            {key: 'enterprise', label: 'Enterprise Package'},
          ]}
        />
      </Sider>

      {/* Content */}
      <Content
        style={{
          borderRadius: 8,
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: '10px 15px',
            marginLeft: 0,
          }}
        >
          <Title
            level={4}
            style={{
              margin: 0,
              fontSize: 16,
              padding: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >

            <ArrowLeftOutlined
              onClick={() => {
                navigate ('/packages');
                window.location.reload();
              }}
              style={{cursor: 'pointer'}}
            />
            {packagesData[selectedKey].name} Package
          </Title>
        </div>

        {/* Card Form */}
        <Card style={{borderRadius: 12}}>
          <Form
            key={selectedKey}
            layout="vertical"
            form={form}
            initialValues={packagesData[selectedKey]}
            onFinish={onFinish}
          >
            {/* Package Name */}
            <Form.Item name="name" style={{marginBottom: 16}}>
              <Input placeholder="Package Name" />
            </Form.Item>

            {/* Description */}
            <Form.Item name="description" style={{marginBottom: 24}}>
              <Input placeholder="Description" />
            </Form.Item>

            {/* Price Section */}
            <Form.Item label="Price" style={{marginBottom: 24}}>
              <Input.Group compact>
                {/* Currency */}
                <Input
                  value="SAR"
                  readOnly
                  style={{
                    width: 60,
                    textAlign: 'center',
                    background: '#fafafa',
                  }}
                />

                {/* Price Input */}
                <Form.Item name="price" noStyle>
                  <InputNumber
                    style={{width: 620, borderLeft: 0, borderRight: 0}}
                    placeholder="Price"
                  />
                </Form.Item>

                {/* Billing Cycle Dropdown */}
                <Form.Item name="billingCycle" noStyle>
                  <Select
                    style={{width: 140, textAlign: 'right', color: '#777E90'}}
                  >
                    <Option value="Monthly"> | Monthly</Option>
                    <Option value="Yearly"> | Yearly</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* Features Section */}
            <Title level={5} style={{marginBottom: 16}}>
              Included Features:
            </Title>

            <Form.List name="features">
              {fields => (
                <div
                  style={{display: 'flex', flexDirection: 'column', gap: 10}}
                >
                  {fields.map (({key, name, ...restField}) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderRadius: 6,
                        padding: '12px 10px',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'enabled']}
                        valuePropName="checked"
                        style={{
                          marginBottom: 0,
                        }}
                      >
                        <Switch />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        style={{
                          marginBottom: 0,
                          flex: 1,
                          marginLeft: 12,
                          textAlign: 'right',
                        }}
                      >
                        <Select style={{width: '100%', color: '#777E90'}}>
                          <Option value="Branch"> | Branch</Option>
                          <Option value="Admin"> | Admin</Option>
                          <Option value="Staff Manager">| Staff Manager</Option>
                          <Option value="Service Provider">
                            | Service Provider
                          </Option>
                          <Option value="Receptionist"> | Receptionist</Option>
                          <Option value="WhatsApp Bot"> | WhatsApp Bot</Option>
                          <Option value="Manual Reminders">
                            | Manual Reminders
                          </Option>
                          <Option value="Automated Reminders">
                            | Automated Reminders
                          </Option>
                          <Option value="Google Review Link">
                            | Google Review Link
                          </Option>
                          <Option value="Promotions"> | Promotions</Option>
                          <Option value="Self Service Tablet">
                            | Self Service Tablet
                          </Option>
                          <Option value="Basic Dashboard">
                            | Basic Dashboard
                          </Option>
                          <Option value="Full Access Dashboard">
                            | Full Access Dashboard
                          </Option>
                          <Option value="Advanced Dashboard">
                            | Advanced Dashboard
                          </Option>
                          <Option value="Priority Support">
                            | Priority Support
                          </Option>
                          <Option value="Analytics Dashboard">
                            | Analytics Dashboard
                          </Option>
                          <Option value="Dedicated Support">
                            | Dedicated Support
                          </Option>
                          <Option value="Unlimited Branches">
                            | Unlimited Branches
                          </Option>
                          <Option value="Unlimited Admins">
                            | Unlimited Admins
                          </Option>
                          <Option value="Unlimited Receptionists">
                            | Unlimited Receptionists
                          </Option>
                          <Option value="Full Automation">
                            | Full Automation
                          </Option>
                          <Option value="Dedicated Account Manager">
                            | Dedicated Account Manager
                          </Option>
                          <Option value="Enterprise Dashboard">
                            | Enterprise Dashboard
                          </Option>
                          <Option value="24/7 Support"> | 24/7 Support</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>

            {/* Footer Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 24,
                gap: 12,
              }}
            >
              <Button onClick={() => form.resetFields ()}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default EditPackages;
