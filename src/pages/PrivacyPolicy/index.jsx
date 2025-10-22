import { Breadcrumb, Card } from 'antd'
import React from 'react'
import PrivacyPolicyQuill from '../../components/PrivacyPolicy/structure/Privacyquill'

const PrivacyPolicy = () => {
  return (
    <div>
      <Card className='card-cs'>
        <Breadcrumb>
            <Breadcrumb.Item>Website Pages</Breadcrumb.Item>
            <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <PrivacyPolicyQuill/>
    </div>
  )
}

export default PrivacyPolicy
