import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Select, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess, toArabicDigits } from '../../../../shared'
import { useMutation } from '@apollo/client/react'
import { CREATE_SUBSCRIBER_CUSTOMER } from '../../../../graphql/mutation/mutations'

const { Title } = Typography
const AddCustomerModal = ({visible,onClose,refetch}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [ api, contextHolder ] = notification.useNotification()
    const [createSubscriberCustomer, { loading }] = useMutation(CREATE_SUBSCRIBER_CUSTOMER, {
        onCompleted: () => {notifySuccess(api,t("Customer Create"),t("Customer has been created successfully"),()=> {refetch()});onClose();form.resetFields()},
        onError: (error) => {notifyError(api, error);},
     });

    const AddEditSubsriberCustomer= async () => {
        const data= form.getFieldsValue()
        try {
            await createSubscriberCustomer({ variables: { input: {...data, role: "SUBSCRIBER"} } })
        }
        catch (e){
            console.error(e);
        }
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
                width={600}
                footer={
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                            {t("Cancel")}
                        </Button>
                        <Button loading={loading} type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                            {t("Save")}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t("Add Customer")}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>     
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={AddEditSubsriberCustomer}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <MyInput 
                                    label={t("First Name")} 
                                    name="firstName" 
                                    required 
                                    message={t("Please enter first name")} 
                                    placeholder={t("Enter first name")} 
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Last Name")} 
                                    name="lastName" 
                                    required 
                                    message={t("Please enter last name")} 
                                    placeholder={t("Enter last name")} 
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Phone Number")} 
                                    name="phone" 
                                    required 
                                    message={t("Please enter phone number")} 
                                    placeholder={t("Enter phone number")} 
                                    addonBefore={
                                        <Select
                                            defaultValue="sa"
                                            className="w-80"
                                            onChange={(value) =>
                                                form.setFieldsValue({
                                                countryCode: value,
                                                })
                                            }
                                            >
                                            <Select.Option value="sa">
                                                +{isArabic ? toArabicDigits(966) : 966}
                                            </Select.Option>

                                            <Select.Option value="ae">
                                                +{isArabic ? toArabicDigits(971) : 971}
                                            </Select.Option>
                                        </Select>
                                    }
                                    maxLength={20}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
                                    }}
                                    validator={
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.resolve();
                                                }
                                                const phoneLength = value.toString().length;
                                                if (phoneLength < 9 || phoneLength > 20) {
                                                    return Promise.reject(new Error(t("Phone number must be between 9 and 20 digits")));
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    }
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Email Address")} 
                                    name="email" 
                                    required 
                                    message={t("Please enter email")} 
                                    placeholder={t("Enter email")} 
                                    validator={
                                        {
                                            type:'email',
                                            message: t("Please enter a valid email format"),
                                        }
                                    }
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    type={'password'}
                                    label={t("Password")} 
                                    name="password" 
                                    required 
                                    message={t("Please enter password")} 
                                    placeholder={t("Enter password")} 
                                    validator={({ getFieldValue }) => ({
                                        validator: (_, value) => {
                                            const reg = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
                                            if (!reg.test(value)) {
                                                return Promise.reject(new Error(t('Password should contain at least 8 characters, one uppercase letter, one number, one special character')));
                                            } else {
                                                return Promise.resolve();
                                            }
                                        }
                                    })}
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

export {AddCustomerModal}