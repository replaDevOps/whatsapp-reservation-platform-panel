import { useEffect, useState } from 'react'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { EditGeneralSettings, MyInput } from '../../../../components'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../../../shared'
import { useQuery } from '@apollo/client/react'
import { GET_STAFFS_BY_ID } from '../../../../graphql/query'

const { Title } = Typography
const GeneralSetting = () => {

    const userId = localStorage.getItem('userId');
    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(null)
    const { data, loading } = useQuery(GET_STAFFS_BY_ID, {
        variables: { getUserId: userId },
        skip: !userId,
    });

    useEffect(() => {
        if (!loading && data) {
            form.setFieldsValue({
                firstName: data?.getUser?.firstName,
                lastName: data?.getUser?.lastName,
                phone: data?.getUser?.phone,
                email: data?.getUser?.email,
            });
        }
    }, [loading, data]);

    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">{t("General Settings")}</Title>
                        <Button className='btncancel' onClick={()=>{setVisible(true);setEditItem(data)}}> 
                            {t("Edit")}
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("First Name")} 
                                    name="firstName" 
                                    placeholder={t("Enter first name")}
                                    disabled 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("Last Name")} 
                                    name="lastName" 
                                    placeholder={t("Enter last name")} 
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number' 
                                    label={t("Phone Number")} 
                                    name="phone" 
                                    placeholder={t("Enter phone number")} 
                                    addonBefore={ isArabic ? `${toArabicDigits(966)}+`: `+${966}`}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("Email Address")} 
                                    name="email" 
                                    placeholder={t("Enter email address")} 
                                    disabled
                                />
                            </Col>
                            <Col span={24}>
                                <Title level={5} className="fw-500 my-3">{t("Social Links")}</Title>
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("Facebook")} 
                                    name="facebook" 
                                    placeholder={t("Enter facebook link")} 
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("Instagram")} 
                                    name="instagram" 
                                    placeholder={t("Enter instagram link")} 
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("X (twitter)")} 
                                    name="twitter" 
                                    placeholder={t("Enter X (twitter) link")} 
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("WhatsApp")} 
                                    name="whatsapp" 
                                    placeholder={t("Enter whatsapp link")} 
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
            <EditGeneralSettings 
                visible={visible}
                edititem={edititem}
                onClose={()=>{ setVisible(false); setEditItem(null) }}
            />
        </>
    )
}

export {GeneralSetting}