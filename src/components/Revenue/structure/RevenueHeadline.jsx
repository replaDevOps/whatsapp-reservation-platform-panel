import { Card } from 'antd'
import React from 'react'

const RevenueHeader = () => {
  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }} className='card-cs'>
        <h3>Revenue </h3> 
        <p>Manage all the revenue in your system</p>
      </Card>
    </div>
  )
}

export default RevenueHeader
