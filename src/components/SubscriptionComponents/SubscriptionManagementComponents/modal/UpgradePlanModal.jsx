import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { periodOp, subscriptionplanOp, typeOp } from '../../../../shared'
import moment from 'moment'

const { Title, Text } = Typography
const UpgradePlanModal = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                businessName: edititem?.businessName,
                type: edititem?.type,
                email: edititem?.email,
                subscriptionPlan: edititem?.subscription,
                period: edititem?.period,
                startDate: moment(edititem?.startDate,'DD/MM/YYYY'),
                expDate: moment(edititem?.expiryDate,'DD/MM/YYYY'),
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg'>
                        Confirm & Save
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            Change Subscription Plan
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        Assign a new Subscription Plan to a business or switch from its current plan.
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
                                label="Business Name" 
                                name="businessName" 
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label="Business Type" 
                                name="type" 
                                options={typeOp}
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Business Email" 
                                name="email" 
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label="Subscription Plan" 
                                name="subscriptionPlan" 
                                required
                                message='Choose subscription plan'
                                options={subscriptionplanOp}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label="Period" 
                                name="period" 
                                required
                                message='Choose period'
                                options={periodOp}
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
                                label='Expiry Date'
                                name='expDate'
                                placeholder='Select date'
                                disabled={edititem}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {UpgradePlanModal}