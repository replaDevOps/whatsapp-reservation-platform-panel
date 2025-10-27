import { Breadcrumb, Button, Card, Flex, Typography } from 'antd'
import { AllBusinessCards, AllBusinessTable, ModuleTopHeading } from '../../components'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography
const AllBusinessPage = () => {

    const navigate = useNavigate()

    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Business Management
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">All Businesses</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex align='center' justify='space-between' gap={10}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='All Businesses' />
                        <Text className='text-gray fs-13'>Manage all the businesses in your system</Text>
                    </Flex>
                    <Button className='btncancel' onClick={()=>navigate('/addbusiness')}> 
                        <PlusOutlined /> Add Business
                    </Button>
                </Flex>
            </Card>
            <AllBusinessCards />
            <AllBusinessTable />
        </Flex>
    )
}

export {AllBusinessPage}