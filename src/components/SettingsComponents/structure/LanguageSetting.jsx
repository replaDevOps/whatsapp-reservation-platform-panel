import { useState } from 'react'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { EditLanguage, MySelect } from '../../../components'
import { languageopt } from '../../../shared'

const { Title } = Typography
const LanguageSetting = () => {

    const [form] = Form.useForm();
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)


    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">Language Settings</Title>
                        <Button className='btncancel' onClick={()=>{setVisible(true);setEditItem(1)}}> 
                            Change
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <MySelect 
                                    label="Select Language" 
                                    name="language" 
                                    placeholder="Select Language"
                                    options={languageopt}
                                    disabled 
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
            <EditLanguage 
                visible={visible}
                edititem={edititem}
                onClose={()=>{ setVisible(false); setEditItem(null) }}
            />
        </>
    )
}

export {LanguageSetting}