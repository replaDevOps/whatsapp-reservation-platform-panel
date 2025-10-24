import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput } from '../../Forms'

const { Title } = Typography
const AddVacationModal = ({visible,onClose,view}) => {

    const [form] = Form.useForm();
    useEffect(()=>{
        if(visible && view){
            form.setFieldsValue({
                name: view,
            })
        }
        else {
            form.resetFields()
        }
    },[visible,view])
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg'>
                        Save
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        Add Vacation
                    </Title>
                    <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex> 
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label="Staff Name" 
                                name="name" 
                                disabled
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label='Start Date'
                                name='startDate'
                                required
                                message={'Please select start date'}
                                placeholder='Select date'
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label='End Date'
                                name='endDate'
                                required
                                message={'Please select end date'}
                                placeholder='Select date'
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddVacationModal}