import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Select, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../../../shared'

const { Title } = Typography
const AddCustomerModal = ({visible,onClose}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
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
                    // onFinish={} 
                    requiredMark={false}
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
                                name="phoneNo" 
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