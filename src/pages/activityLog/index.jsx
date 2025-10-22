import React from 'react'
import ActivityLogTable from '../../components/activityLog/structure/table'
import { Breadcrumb, Card } from 'antd'

const Activity = () => {
  return (
    <div>
        <Card style={{marginBottom:"10px"}} className='card-cs'>
            <Breadcrumb>
            <Breadcrumb.Item>Admin Settings</Breadcrumb.Item>
            <Breadcrumb.Item>Activity Log</Breadcrumb.Item>
            </Breadcrumb>
        </Card>
      <ActivityLogTable/>
    </div>
  )
}

export default Activity
