import { Card } from 'antd'
import React from 'react'

const Header = () => {
  return (
    <div>
      <Card style={{ borderRadius: "8px", marginBottom: 16 }} className='card-cs'>
        <h3>Bookings </h3> 
        <p>See all the bookings in your system.</p>
      </Card>
    </div>
  )
}

export default Header
