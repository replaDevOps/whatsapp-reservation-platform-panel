
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Dropdown, Flex, Image, Space, Typography,message } from 'antd'
// import { SwitchAccount } from './SwitchAccount';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
// import { useMutation,useQuery } from '@apollo/client';
// import { LOGOUT } from '../../../graphql/mutation/login';
// import {ME} from '../../../graphql/query'

// import { client } from '../../../config';

const UserDropdown = ()=> {
  const userId = localStorage.getItem("userId"); 
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // const { data, loading:isLoading, refetch } = useQuery(ME, {
  //   variables: { getUserId:userId },
  //   skip: !userId,
  //   fetchPolicy: "network-only",
  // });
  
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
  
  // const handleLogout = () => {
  //   logout(); 
  // };

  const items = [
    {
      key: 'setting',
      label: <Text className='fw-500'>{'Settings'}</Text>,
      onClick: () => navigate('/setting', { state: { user } }),
    },
    {
      key: 'logout',
      label: (<Text className='fw-500' >{'Logout'}</Text>),
      // onClick: handleLogout,
    },
  ];

  const dropdownContent = (
    <Card className='radius-12 shadow-c card-cs'>
      <Space direction='vertical'> 
        <Flex align='center' gap={10}>
          <Avatar size={44} src='/assets/images/av-1.png' />
          <Flex vertical gap={1}>
            <Typography.Text strong className='fs-13'>Business Name</Typography.Text>
            <Typography.Text className='text-gray fs-13'>Admin</Typography.Text>
          </Flex>
        </Flex>
        <Button className='btnsave w-100'
          type='primary' 
          // loading={loading}
          // onClick={logout}
          >
            Logout
        </Button>
      </Space>
    </Card>
);
  return (
    <>
    {contextHolder}
    <div>
      <Dropdown
          overlay={dropdownContent}
          trigger={['click']}
          className='p-0'
      >
        <Flex align='center' gap={5} className='cursor'>
          <Avatar size={44} src='/assets/images/av-1.png' />
          <Flex align='flex-start' gap={5}>
            <Flex vertical gap={0} align='end'>
              <Typography.Text strong className='fs-12'>Business Name</Typography.Text>
              <Typography.Text className='text-gray fs-12'>Admin</Typography.Text>
            </Flex>
            <DownOutlined className='fs-12 py-1' />
          </Flex>
        </Flex>
      </Dropdown>
      {/* <SwitchAccount 
          visible={switchAccount}
          onClose={()=>{setSwitchAccount(false)}}
        /> */}
    </div>
    </>
  )
}

export {UserDropdown}