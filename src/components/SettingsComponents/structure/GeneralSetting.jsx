import { useState } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { EditGeneralSettings, MyInput } from '../../../components'

const { Title } = Typography
const GeneralSetting = () => {

    const [form] = Form.useForm();
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)

    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">General Settings</Title>
                        <Button className='btncancel' onClick={()=>{setVisible(true);setEditItem(1)}}> 
                            Edit
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="First Name" 
                                    name="firstName" 
                                    required 
                                    message="Please enter first name" 
                                    placeholder="Enter first name"
                                    disabled 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Last Name" 
                                    name="lastName" 
                                    required 
                                    message="Please enter last name" 
                                    placeholder="Enter last name" 
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number' 
                                    label="Phone Number" 
                                    name="phoneNo" 
                                    required 
                                    message="Please enter phone number" 
                                    placeholder="Enter phone number" 
                                    prefix='+966 '
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Email Address" 
                                    name="email" 
                                    required 
                                    message="Please enter email address" 
                                    placeholder="Enter email address" 
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
            <EditGeneralSettings 
                visible={visible}
                edititem={edititem}
                onClose={()=>{ setVisible(false); setEditItem(null) }}
            />
        </>
    )
}

export {GeneralSetting}