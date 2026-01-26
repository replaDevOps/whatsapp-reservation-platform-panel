import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess, toArabicDigits } from '../../../../shared'
import { getUserID } from '../../../../utils/auth'
import { UPDATE_USER } from '../../../../graphql/mutation'
import { useMutation } from '@apollo/client/react'

const { Title } = Typography
const EditGeneralSettings = ({visible,onClose,edititem,refetch}) => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar';
    const [ api, contextHolder ] = notification.useNotification()
    const [ updateUser,  { loading: updaing } ] = useMutation(UPDATE_USER,{
        onCompleted: () => {notifySuccess(api,t("Setting update"),t("Setting has been updated successfully"),()=> {refetch()});onClose()},
        onError: (error) => {notifyError(api, error);},
    })
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                firstName: edititem?.getUser?.firstName,
                lastName: edititem?.getUser?.lastName,
                phone: edititem?.getUser?.phone,
                email: edititem?.getUser?.email,
                fb: edititem?.getUser?.fb,
                instagram: edititem?.getUser?.instagram,
                x: edititem?.getUser?.x,
                whatsapp: edititem?.getUser?.whatsapp
            })
        }
    },[visible,edititem])

    const EditGeneralInfo = async () => {
        const input = form.getFieldsValue();
        try {
            if (getUserID()) {
                await updateUser({
                    variables: { 
                        input: { id: getUserID(), ...input }
                    }
                });
            } 
        } catch (e) {
            console.error(e);
        }
    };

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
                        <Button type="primary" loading={updaing} className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
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
                        onFinish={EditGeneralInfo} 
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
                                    name="fb" 
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
                                    name="x"
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
        </>
    )
}

export {EditGeneralSettings}