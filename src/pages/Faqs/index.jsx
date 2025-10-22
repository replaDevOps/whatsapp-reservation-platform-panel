import React from 'react'
import FaqBreadcrumb from '../../components/Faqs/Structure/FaqBreadcrumb'
import FaqTitle from '../../components/Faqs/Structure/FaqTitle'
import { Flex } from 'antd'
import FaqTable from '../../components/Faqs/Structure/FaqTable'

function Faqs() {
  return (
    <div>
        <Flex gap={24} vertical>

      <FaqBreadcrumb/>
      <FaqTitle/>
      <FaqTable/>
        </Flex>
    </div>
  )
}

export default Faqs
