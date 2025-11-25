import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../../../shared'

const { Title } = Typography
const EditGeneralSettings = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar';
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                firstName: edititem?.getUser?.firstName,
                lastName: edititem?.getUser?.lastName,
                phone: edititem?.getUser?.phone,
                email: edititem?.getUser?.email,
            })
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        {t("Save")}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t("General Settings")}
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
                                message={t('Please enter your first name')}
                                placeholder={t('Enter first name')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Last Name")} 
                                name="lastName" 
                                required
                                message={t('Please enter your last name')}
                                placeholder={t('Enter last name')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                type='number' 
                                label={t("Phone Number")} 
                                name="phone" 
                                required 
                                message={t("Please enter phone number")} 
                                placeholder={t("Enter phone number")} 
                                addonBefore={ isArabic ? `${toArabicDigits(966)}+`: `+${966}`}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Email Address")} 
                                name="email" 
                                required 
                                message={t("Please enter email address")} 
                                placeholder={t("Enter email address")} 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Facebook")} 
                                name="facebook" 
                                required 
                                message={t("Please enter facebook link")} 
                                placeholder={t("Enter facebook link")} 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Instagram")} 
                                name="instagram" 
                                required 
                                message={t("Please enter instagram link")} 
                                placeholder={t("Enter instagram link")} 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("X (twitter)")} 
                                name="twitter"
                                required 
                                message={t("Please enter X (twitter) link")} 
                                placeholder={t("Enter X (twitter) link")} 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("WhatsApp")} 
                                name="whatsapp" 
                                required 
                                message={t("Please enter whatsapp link")} 
                                placeholder={t("Enter whatsapp link")} 
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {EditGeneralSettings}