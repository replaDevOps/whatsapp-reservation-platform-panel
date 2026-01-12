import { SyncOutlined } from '@ant-design/icons'
import { Avatar, Image, Space, Typography } from 'antd'
import { getUserImage } from '../utils/auth'
import { useTranslation } from "react-i18next";

const Fallback = () => {
  const { t } = useTranslation()
  return(
  <div className='center w-100 h-100vh'>
    <Space
      direction='vertical'
      align='center'
      className='w-100 h-100 justify-center'
    >
      {
        getUserImage() ?
          <Avatar size={100} shape='square' src={getUserImage()} alt='logo image' fetchPriority="high" />
        :
        <Image
          src='/assets/images/logo.webp'
          alt='logo image'
          preview={false}
          fetchPriority="high"
          className='w-150'
        />
      }
      <Typography.Title level={4}>{t("Super Admin Panel Reservation System")}</Typography.Title>
      <SyncOutlined className='fs-35 text-brand' spin />
    </Space>
  </div>
)
}
  

export {Fallback}