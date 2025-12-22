import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { capitalizeTranslated, notifyError, notifySuccess, periodOp, subscriptionplanOp, typeOp, typeOps } from '../../../../shared'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { GET_SUBSCRIBERS_SUBSCRIPTIONS } from '../../../../graphql/query'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { RENEW_SUBSCRIBER_SUBSCRIPTION } from '../../../../graphql/mutation'

const { Title, Text } = Typography
const RenewPlanModal = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const [getSubscriberSubscriptions] = useLazyQuery(GET_SUBSCRIBERS_SUBSCRIPTIONS, {
        fetchPolicy: "network-only",
    })
    const [renewSubscriberSubscription, { loading }] = useMutation(RENEW_SUBSCRIBER_SUBSCRIPTION, {
        onCompleted: () => {
            notifySuccess(
                api,
                "Renew Plan Upgrade",
                "Renew plan upgraded successfully",
                ()=> {getSubscriberSubscriptions();onClose()}
            )
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
                currentsubscriptionPlan: edititem?.type,
                validity: capitalizeTranslated(edititem?.validity),
                currentexpDate: dayjs(edititem?.endDate),
                startDate: dayjs(),
                endDate: edititem?.validity === 'MONTHLY' ? dayjs().add(1, "m")  : dayjs().add(1, 'year'),
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])
    const save= async ()=>{ 
        await renewSubscriberSubscription({ variables:{renewSubscriberSubscriptionId: edititem?.id }})
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
                        <Button type="primary" loading={loading} className='btnsave border0 text-white brand-bg' onClick={()=> form.submit()}>
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
                                    label={t("Current Subscription Plan")} 
                                    name="currentsubscriptionPlan" 
                                    options={subscriptionplanOp}
                                    disabled={edititem}
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    label={t("Current Period")} 
                                    name="validity" 
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
                                    disabled={edititem}
                                    options={[
                                        {
                                            id: "MONTHLY",
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
                                    label={t('New Expiry Date')}
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

export {RenewPlanModal}