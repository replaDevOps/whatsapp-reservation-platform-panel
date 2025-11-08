import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { periodOp, subscriptionplanOp, typeOp } from '../../../../shared'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const RenewPlanModal = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                businessName: edititem?.businessName,
                type: edititem?.type,
                email: edititem?.email,
                currentsubscriptionPlan: edititem?.subscription,
                currentperiod: edititem?.period,
                currentexpDate: moment(edititem?.startDate,'DD/MM/YYYY'),
                newexpDate: moment(edititem?.expiryDate,'DD/MM/YYYY'),
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg'>
                        {t("Renew")}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t("Renew Subscription")}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {t("Quickly extend the subscription period for a business and update payment records.")}
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
                                label={t("Business Name")} 
                                name="businessName" 
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Business Type")} 
                                name="type" 
                                options={typeOp}
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Business Email")} 
                                name="email" 
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Current Subscription Plan")} 
                                name="currentsubscriptionPlan" 
                                options={subscriptionplanOp}
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Current Period")} 
                                name="currentperiod" 
                                options={periodOp}
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Current Expiry Date')}
                                name='currentexpDate'
                                placeholder={t('Select date')}
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Renew Period")} 
                                name="renewperiod" 
                                required
                                message={t('Choose renew period')}
                                options={periodOp}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('New Expiry Date')}
                                name='newexpDate'
                                placeholder={t('Select date')}
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

export {RenewPlanModal}