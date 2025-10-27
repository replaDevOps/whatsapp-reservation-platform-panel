import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { customertypeOp, periodOp, subscriptionplanOp, typeOp } from '../../../../shared'
import moment from 'moment'

const { Title, Text } = Typography
const AddEditDiscount = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                discountCode: edititem?.discountCode,
                group: edititem?.group,
                subscriptionType: edititem?.subscriptionPlan,
                discountType: edititem?.type,
                value: edititem?.value,
                limit: edititem?.limit,
                startDate: moment(edititem?.startDate,'DD/MM/YYYY'),
                endDate: moment(edititem?.endDate,'DD/MM/YYYY'),
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
                        {edititem?'Update':'Confirm & Save'}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {edititem? edititem?.discountCode : 'Add Discount'}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {
                            edititem ? 'Edit discount details in your system.' : 'Add a new discount in your system.'
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
                                label="Discount Code" 
                                name="discountCode" 
                                required
                                message='Please enter discount code'
                                placeholder='Enter discount code'
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label="Group" 
                                name="group" 
                                required
                                message='Please choose group'
                                options={customertypeOp}
                                placeholder='Choose group'
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                mode={'multiple'}
                                label="Subscription Plan Type" 
                                name="subscriptionType" 
                                required
                                message='Choose subscription plan type'
                                options={subscriptionplanOp}
                                placeholder='Choose plan type'
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label="Discount Type" 
                                name="discountType" 
                                required
                                message='Please choose discount type'
                                options={customertypeOp}
                                placeholder='Choose discount type'
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Value" 
                                name="value" 
                                required
                                message='Please enter value'
                                placeholder='Enter value'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Limit" 
                                name="limit" 
                                required
                                message='Please enter limit'
                                placeholder='Enter limit'
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
                                name='endDate'
                                placeholder='Select date'
                                required
                                message={'Please select expiry date'}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditDiscount}