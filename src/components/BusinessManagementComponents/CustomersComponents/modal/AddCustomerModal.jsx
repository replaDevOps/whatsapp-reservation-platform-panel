import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, message, Modal, Row, Select, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../../../shared'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_SUBSCRIBER_CUSTOMER } from '../../../../graphql/mutation/mutations'
import { GET_SUBSCRIBER_CUSTOMERS } from '../../../../graphql/query/subscriberCustomers'
import { useEffect } from 'react'

const { Title } = Typography
const AddCustomerModal = ({visible,onClose}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [getSubscriberCustomers] = useLazyQuery(GET_SUBSCRIBER_CUSTOMERS, {
        fetchPolicy: "network-only",
    })
    const [createSubscriberCustomer, { loading, error, success }] = useMutation(CREATE_SUBSCRIBER_CUSTOMER, {
        onCompleted: () => {
            getSubscriberCustomers({
                variables: {
                    limit: 20,
                    offset: 0,
                    role: "SUBSCRIBER",
                    isActive: false
                },
            })
            onClose()
        }
     });

console.log('hanan:', error,":", success)
     useEffect(()=>{
        if(error){
            alert("i call")
            message.error(  "Something went wrong")
        }
     }, [error])
    const AddEditSubsriberCustomer= async () => {
        console.log("customer:", form.getFieldsValue())
        const data= form.getFieldsValue()
        try {
            await createSubscriberCustomer({ variables: { input: {...data, role: "SUBSCRIBER"} } })
        }
        catch (e){

        }
    }

    return (
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
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Email Address")} 
                                name="email" 
                                required 
                                message={t("Please enter email")} 
                                placeholder={t("Enter email")} 
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
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddCustomerModal}