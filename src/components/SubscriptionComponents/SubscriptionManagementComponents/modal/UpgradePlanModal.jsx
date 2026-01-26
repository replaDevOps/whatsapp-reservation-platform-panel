import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { notifyError, notifySuccess, periodOp, subscriptionplanOp, typeOp, typeOps } from '../../../../shared'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { UPDATE_SUBSCRIBER_SUBSCRIPTION } from '../../../../graphql/mutation'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { GET_SUBSCRIBERS_SUBSCRIPTIONS } from '../../../../graphql/query'

const { Title, Text } = Typography
const UpgradePlanModal = ({visible,onClose,edititem}) => {
    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const [getSubscriberSubscriptions] = useLazyQuery(GET_SUBSCRIBERS_SUBSCRIPTIONS, {
        fetchPolicy: "network-only",
    })
    const [updateSubscriberSubscription, { loading }] = useMutation(UPDATE_SUBSCRIBER_SUBSCRIPTION, {
        onCompleted: () => {
            notifySuccess(
                api,
                t("Subscription Plan Upgrade"),
                t("Subscription plan has been upgraded successfully"),
                ()=> {getSubscriberSubscriptions()}
            );
            onClose()
        },
        onError: (error) => {
            notifyError(api, error);
        },
    });
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                name: edititem?.business?.name,
                businessType: edititem?.business?.businessType,
                email: edititem?.subscriber?.email,
                type: edititem?.type,
                validity: edititem?.validity,
                startDate: dayjs(),
                endDate: edititem?.validity === 'MONTHLY' ? dayjs().add(1, "m")  : dayjs().add(1, 'year'),
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])
    const save= async ()=>{ 
        const {type, validity, startDate, endDate}= form.getFieldsValue()
        await updateSubscriberSubscription({ variables: { input: {type, validity, startDate, endDate}, updateSubscriberSubscriptionId: edititem?.id } })
    }
    return (
        <>
            {contextHolder}    
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
                        <Button type="primary" loading={loading} className='btnsave border0 text-white brand-bg'
                        onClick={()=> form.submit()}>
                            {t("Confirm & Save")}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex vertical className='mb-2'>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                {t("Change Subscription Plan")}
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex> 
                        <Text className='fs-13 text-gray'>
                            {t("Assign a new Subscription Plan to a business or switch from its current plan.")}
                        </Text>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={save} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Business Name")} 
                                    name="name" 
                                    disabled={edititem}
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    label={t("Business Type")} 
                                    name="businessType" 
                                    options={typeOps}
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
                                    label={t("Subscription Plan")} 
                                    name="type" 
                                    required
                                    message={t('Choose subscription plan')}
                                    options={subscriptionplanOp}
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    label={t("Period")} 
                                    name="validity" 
                                    required
                                    message={t('Choose period')}
                                    options={[
                                        {
                                            id: 'MONTHLY',
                                            name: 'Monthly'
                                        },
                                        {
                                            id: "YEARLY",
                                            name: 'Yearly'
                                        },
                                    ]}
                                    onChange= {(value)=>{
                                        if(value === 'MONTHLY')
                                            form.setFieldValue("endDate", dayjs().add(1, 'M'))
                                        else
                                            form.setFieldValue("endDate", dayjs().add(1, 'year'))
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <MyDatepicker
                                    datePicker
                                    label={t('Start Date')}
                                    name='startDate'
                                    required
                                    message={t('Please select start date')}
                                    placeholder='Select date'
                                />
                            </Col>
                            <Col span={24}>
                                <MyDatepicker
                                    datePicker
                                    label={t('Expiry Date')}
                                    name='endDate'
                                    placeholder={t('Select date')}
                                    disabled={edititem}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Divider className='my-2 bg-light-brand' />
            </Modal>
        </>
    )
}

export {UpgradePlanModal}