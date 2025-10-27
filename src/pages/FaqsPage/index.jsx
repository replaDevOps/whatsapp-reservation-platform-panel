import { Breadcrumb, Button, Card, Flex, Typography } from 'antd'
import { DiscountTable, FaqsTable, ModuleTopHeading } from '../../components'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Text } = Typography
const FaqsPage = () => {
    const [ visible, setVisible ] = useState(false)
    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Website Pages
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">FAQs</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex align='center' justify='space-between' gap={10}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='FAQs' />
                        <Text className='text-gray fs-13'>Manage all the FAQs in your system</Text>
                    </Flex>
                    <Button className='btncancel' onClick={()=>{setVisible(true)}}> 
                        <PlusOutlined /> Add FAQ
                    </Button>
                </Flex>
            </Card>
            <FaqsTable 
                visible={visible}
                setVisible={setVisible}
            />
        </Flex>
    )
}

export {FaqsPage}