import { Breadcrumb, Card } from 'antd'
import React from 'react'
import { DemoRequestsTable } from '../../components/DemoRequests/structure/DemoRequestsTable'

const DemoRequests = () => {
  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }} className='card-cs'>
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item>Demo Requests </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <DemoRequestsTable/>
    </div>
  )
}

export default DemoRequests
