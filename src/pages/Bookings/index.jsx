import { Breadcrumb, Card } from 'antd'
import React from 'react'
import Header from '../../components/bookings/structure/header'
import BookingTable from '../../components/bookings/structure/bookingsTable'

const Bookings = () => {
  return (
    <div style={{maxWidth:"1130px"}}>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }} className='card-cs'>
        <Breadcrumb>
          <Breadcrumb.Item>Business Management</Breadcrumb.Item>
          <Breadcrumb.Item >
          <span style={{ fontWeight: "600" }}>Bookings</span>
           </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Header/>
      
      <BookingTable/>
    </div>
  )
}

export default Bookings
