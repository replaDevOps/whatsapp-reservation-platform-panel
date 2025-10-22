import { Flex } from 'antd'
import React from 'react'
import { ServiceManagement, ServiceTable } from '../../components/ServicesComponents/Structure'

function Services() {
  return (
    <div>
        <Flex vertical gap={24}>
            <ServiceManagement/>
            <ServiceTable/>
        </Flex>
      
    </div>
  )
}

export default Services
 