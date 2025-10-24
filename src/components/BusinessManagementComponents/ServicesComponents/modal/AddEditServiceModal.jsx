import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { useEffect } from 'react'
import { MyInput, MySelect } from '../../../Forms'

const { Title } = Typography
const AddEditServiceModal = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();


    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                name: edititem?.serviceName,
                price: edititem?.price,
                duration: edititem?.duration,
                bufferTime: edititem?.bufferTime,
                assignedBranch: edititem?.assign
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
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        { edititem ? edititem?.serviceName : 'Add Service' }
                    </Title>
                    <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex> 
                <Form 
                    layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label="Service Name" 
                                name="name" 
                                required 
                                message="Please enter service name" 
                                placeholder="Add service name" 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Price" 
                                name="price" 
                                required 
                                message="Please enter price" 
                                placeholder="Add price" 
                                addonAfter='SAR'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Duration" 
                                name="duration" 
                                required 
                                message="Please enter duration" 
                                placeholder="Add duration" 
                                addonAfter='Min'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Buffer Time" 
                                name="bufferTime" 
                                required 
                                message="Please enter buffer time" 
                                placeholder="Add buffer time" 
                                addonAfter='SAR'
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                mode={'multiple'}
                                label={'Assigned Branches'}
                                name={'assignedBranch'}
                                options={[
                                    {
                                        id: 1,
                                        name: 'Branch 01'
                                    },
                                    {
                                        id: 2,
                                        name: 'Branch 02'
                                    },
                                    {
                                        id: 3,
                                        name: 'Branch 03'
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditServiceModal}