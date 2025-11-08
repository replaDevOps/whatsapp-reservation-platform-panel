import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { customertypeOp, promoType, subscriptionplanOp } from '../../../../shared'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const AddEditDiscount = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
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
                        {t("Cancel")}
                    </Button>
                    <Button type="primary" onClick={()=>form.submit()} className='btnsave border0 text-white brand-bg'>
                        {t(edititem?'Update':'Confirm & Save')}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t(edititem? edititem?.discountCode : 'Add Discount')}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {
                            t(edititem ? 'Edit discount details in your system.' : 'Add a new discount in your system.')
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
                                label={t("Discount Code")} 
                                name="discountCode" 
                                required
                                message={t('Please enter discount code')}
                                placeholder={t('Enter discount code')}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Group")} 
                                name="group" 
                                required
                                message={t('Please choose group')}
                                options={customertypeOp}
                                placeholder={t('Choose group')}
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                mode={'multiple'}
                                label={t("Subscription Plan Type")} 
                                name="subscriptionType" 
                                required
                                message={t('Choose subscription plan type')}
                                options={subscriptionplanOp}
                                placeholder={t('Choose plan type')}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Discount Type")} 
                                name="discountType" 
                                required
                                message={t('Please choose discount type')}
                                options={promoType}
                                placeholder={t('Choose discount type')}
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Value")} 
                                name="value" 
                                required
                                message={t('Please enter value')}
                                placeholder={t('Enter value')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Limit")} 
                                name="limit" 
                                required
                                message={t('Please enter limit')}
                                placeholder={t('Enter limit')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Start Date')}
                                name='startDate'
                                required
                                message={t('Please select start date')}
                                placeholder={t('Select date')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Expiry Date')}
                                name='endDate'
                                placeholder={t('Select date')}
                                required
                                message={t('Please select expiry date')}
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