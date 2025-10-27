import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Layout, Menu, Image, Space, Divider, Flex, Typography, Button } from 'antd';
import { Notifications, UserDropdown } from '../../components/Header';
import { Dashboard } from '../Dashboard';
import { SearchInput } from '../../components/Forms';
import { CustomersPage } from '../CustomersPage';
import { MenuItems } from './MenuItems';
import { BookingPage } from '../BookingPage';
import { RevenuePage } from '../RevenuePage';
import { DemoRequestPage } from '../DemoRequestPage';
import { StaffPage } from '../StaffPage';
import { AddEditBusiness, AddEditStaff } from '../../components';
import { SubscriptionPlanPage } from '../SubscriptionPlanPage';
import { SubscriptionManagementPage } from '../SubscriptionManagementPage';
import { DiscountPage } from '../DiscountPage';
import { TermsConditionPage } from '../TermsConditionPage';
import { FaqsPage } from '../FaqsPage';
import { PrivacyPolicyPage } from '../PrivacyPolicyPage';
import { SettingsPage } from '../SettingsPage';
import { ActivityLogPage } from '../ActivityLogPage';
import { AllBusinessPage } from '../AllBusinessPage';

const { Header, Sider, Content } = Layout;
const { Text } = Typography
const Sidebar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('1');
  const [openKeys, setOpenKeys] = useState(['']);

  useEffect(() => {
    let tab = location?.pathname?.split("/")[1];
    tab = tab === '' ? '1' :
      tab === 'allbusiness' ? '2' :
      tab === 'customer' ? '3' :
      tab === 'booking' ? '4'  :
      tab === 'revenue' ? '5' :
      tab === 'demorequest' ? '6' :
      tab === 'staff' || tab === 'addstaff' || tab === 'staffmanagement/editstaff/' ? '7' :
      tab === 'subscriptionplan' ? '8' :
      tab === 'subscriptionmanage' ? '9'  :
      tab === 'discount' ? '10'  :
      tab === 'termscondition' ? '11'  :
      tab === 'faqs' ? '12'  :
      tab === 'privacypolicy' ? '13'  :
      tab === 'setting' ? '14'  :
      tab === 'activitylog' ? '15'  :
    '1';
    setCurrentTab(tab);
    
  }, [location]);

  const handleMenuClick = (e) => {
    const { key } = e;
    switch (key) {
      case '1':
        navigate("/", { replace: true });
        break;
      case '2':
        navigate("/allbusiness", { replace: true });
        break;
      case '3':
        navigate("/customer", { replace: true });
        break;
      case '4':
        navigate("/booking", { replace: true });
        break;
      case '5':
        navigate("/revenue", { replace: true });
        break;
      case '6':
        navigate("/demorequest", { replace: true });
        break;
      case '7':
        navigate("/staff", { replace: true});
        break;
      case '8':
        navigate("/subscriptionplan", { replace: true });
        break;
      case '9':
        navigate("/subscriptionmanage", { replace: true });
        break;
      case '10':
        navigate("/discount", { replace: true });
        break;
      case '11':
        navigate("/termscondition", { replace: true });
        break;      
      case '12':
        navigate("/faqs", { replace: true });
        break;
      case '13':
        navigate("/privacypolicy", { replace: true });
        break;
      case '14':
        navigate("/setting", { replace: true });
        break;
      case '15':
        navigate("/activitylog", {replace: true});
        break;
      default:
        break;
    }
  };

  const menuItems = MenuItems({ currentTab });
 
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
    // localStorage.setItem('openKeys', JSON.stringify(keys));
  };
  return (
    <Layout className='h-100vh'>
      <Sider breakpoint="md"
        collapsedWidth="0"
        width={250}
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }} trigger={null} collapsible collapsed={collapsed} className={collapsed ? 'addclass overflowstyle h-100vh overflowy-auto border-right-side' :'overflowstyle h-100vh overflowy-auto border-right-side'}>
        <Flex className="logo" align='center' gap={10}>
          <Image
            style={{ width: collapsed ? "40px" : '40px' }}
            height={'auto'}
            src="/assets/images/logo.webp"
            alt='logo image'
            preview={false}
            fetchPriority="high"
          />
          <Text strong className='fs-14'>Qloop</Text>
        </Flex>
        <Divider className='m-0 bg-divider' />
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={[currentTab]}
          mode="inline"
          theme="dark"
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          items={menuItems}
          className='listitem'
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header-mbl-cs header"
        >
          <div className='position-relative w-98per'>
            <Flex justify='space-between' align='center' gap={5} className='flex-col-mbl'>
              <Space className='mbl-space'>
                <Button type='button' className='bg-transparent border-0 p-0' onClick={() => setCollapsed(!collapsed)}>
                  <Image src='/assets/icons/collapse.png' 
                    width={'25px'} preview={false} 
                    style={{transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}}  
                    alt='collapse icon' fetchPriority="high"
                  />
                </Button>
                <SearchInput  
                  prefix={<img src='/assets/icons/search.png' width={20} />}
                  placeholder={'Search'} alt='search icon' fetchPriority="high"
                />
              </Space>
              <Flex justify='space-between' align='center' className='w-100 flex-end'>
                <Button type='button' className='bg-transparent border-0 p-0 d-none' onClick={() => setCollapsed(!collapsed)}>
                  <Image src='/assets/icons/collapse.png' 
                    width={'25px'} preview={false} 
                    style={{transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}} 
                    alt='collapse icon' fetchPriority="high" 
                  />
                </Button>  
                <Space size={15} align='center' className='right'> 
                  <Notifications />
                  <UserDropdown />
                </Space>
              </Flex>
            </Flex>
          </div>
        </Header>
        <Divider className='border-gray m-0' />
        <Content className="scroll-bar content-css">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/allbusiness" element={<AllBusinessPage />} />
            <Route path="/addbusiness" element={<AddEditBusiness />} />
            <Route path="/customer" element={<CustomersPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="/demorequest" element={<DemoRequestPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/addstaff" element={<AddEditStaff />} />
            <Route path="/staffmanagement/editstaff/:id" element={<AddEditStaff />} />
            <Route path="/subscriptionplan" element={<SubscriptionPlanPage />} />
            <Route path="/subscriptionmanage" element={<SubscriptionManagementPage />} />
            <Route path="/discount" element={<DiscountPage />} />
            <Route path="/termscondition" element={<TermsConditionPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
            <Route path="/setting" element={<SettingsPage />} />
            <Route path="/activitylog" element={<ActivityLogPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export {Sidebar};
