import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'

const { Title, Text } = Typography
const AddEditFaqs = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                question: edititem?.question,
                answer: edititem?.answer,
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])
    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            footer={
                <Flex justify='end' gap={5}>
                    <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        {edititem?'Update':'Save'}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {edititem? 'Edit Question' : 'Add Question'}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {
                            edititem 
                            ? 
                            'Edit a question and its answer to help users better understand how Qloop works.' 
                            : 
                            'Enter a question and its answer to help users better understand how Qloop works.'
                        }
                    </Text>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label="Question" 
                                name="question" 
                                required
                                message='Please enter question'
                                placeholder='Enter question'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                textArea
                                label="Answer" 
                                name="answer" 
                                required
                                message='Please enter answer'
                                placeholder='Enter answer'
                                rows={5}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditFaqs}