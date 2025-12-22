
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Dropdown, Flex, Image, Space, Typography,message } from 'antd'
// import { SwitchAccount } from './SwitchAccount';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getRole, getUserFirstName, getUserImage, getUserLastName, getUserName } from '../../../utils/auth';
const UserDropdown = ()=> {
  const [messageApi, contextHolder] = message.useMessage();
  const {t} = useTranslation()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [ loading, setLoaing ] = useState(false)
  
  // const [logout, { loading }] = useMutation(LOGOUT, {
  //   onCompleted: () => {
  //     localStorage.removeItem("accessToken"); 
  //     localStorage.removeItem("refreshToken");
  //     localStorage.removeItem("userId");
  //     client.resetStore(); 
  //     window.location.reload();
  //     },
  //   onError: (err) => messageApi.error("Logout error:", err)
  // });
  
  const handleLogout = () => {
    setLoaing(true)
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken')
    setInterval(() => {
      setLoaing(false)
      window.location.href = "/login";
    }, 2000);
  };

  const dropdownContent = (
    <Card className='radius-12 shadow-c card-cs'>
      <Space direction='vertical'> 
        <Flex align='center' gap={10}>
          {
            getUserImage() ?
            <Avatar size={44} src={getUserImage()} />
            :
            <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>
              {getUserFirstName()?.charAt(0).toUpperCase() + getUserLastName()?.charAt(0).toUpperCase()}
            </Avatar>
          }
          <Flex vertical gap={1}>
            <Typography.Text strong className='fs-13'>{getUserName()}</Typography.Text>
            <Typography.Text className='text-gray fs-12'>{getRole() ==='SUPER_ADMIN' && t("Super Admin")}</Typography.Text>
          </Flex>
        </Flex>
        <Button className='btnsave w-100'
          type='primary' 
          loading={loading}
          onClick={handleLogout}
          >
            {t("Logout")}
        </Button>
      </Space>
    </Card>
);
  return (
    <>
    {contextHolder}
    <div>
      <Dropdown
          popupRender={()=>dropdownContent}
          trigger={['click']}
          className='p-0'
      >
        <Flex align='center' gap={5} className='cursor'>
          {
            getUserImage() ?
            <Avatar size={44} src={getUserImage()} />
            :
            <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>
              {getUserFirstName()?.charAt(0).toUpperCase() + getUserLastName()?.charAt(0).toUpperCase()}
            </Avatar>
          }
          <Flex align='flex-start' gap={5}>
            <Flex vertical gap={0} align='end'>
              <Typography.Text strong className='fs-12'>{getUserName()}</Typography.Text>
              <Typography.Text className='text-gray fs-12'>{getRole() ==='SUPER_ADMIN' && t("Super Admin")}</Typography.Text>
            </Flex>
            <DownOutlined className='fs-12 py-1' />
          </Flex>
        </Flex>
      </Dropdown>
    </div>
    </>
  )
}

export {UserDropdown}