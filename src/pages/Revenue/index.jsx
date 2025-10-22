import { Breadcrumb, Card } from 'antd'
import React from 'react'
import RevenueHeader from '../../components/Revenue/structure/RevenueHeadline'
import { RevenueCards } from '../../components/Revenue/structure/RevenueCards'
import RevenueTable from '../../components/Revenue/structure/RevenueTable'

const Revenue = () => {
  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }}>
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "600" }}>Revenue</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <RevenueHeader/>
      <RevenueCards/>
      <RevenueTable/>
    </div>
  )
}

export default Revenue
