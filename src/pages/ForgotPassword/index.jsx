import { Form, Button, Typography, Row, Col, Image, Flex } from "antd";
import { LanguageChange, MyInput } from "../../components";
import { NavLink } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [ requestState, setRequestState ] = useState('request')
    const {t} = useTranslation()
     const forgotpass = () => {
        if (requestState === "request") {
            // dispatcher(actionsApi?.forgotPassword(form.getFieldsValue(['email'])));
            console.log('Request send on email')
            setRequestState('otp')
        } 
        if (requestState === "otp") {
            // dispatcher(actionsApi?.otpVerify(form.getFieldsValue(['otp'])));
            console.log('Otp receive by email')
            setRequestState('reset')
        }
        if (requestState === "reset") {
            // const data = form.getFieldsValue(['password', 'confirmationPassword']);
            // dispatcher(actionsApi?.resetPassword({data:{token: otpToken, ...data}, navigate}));
            console.log('Now enter password and confirm password')
            setRequestState('request')
        }
    };


    return (
        <Row className="signup-page">
            <Col xs={24} sm={24} md={12} lg={10} className="signup-form-container">
                <div className="form-inner">
                    <NavLink to={'/'}>
                      <div className="logo">
                        <img src="/assets/images/logo.webp" className="h-70" alt='logo image' fetchPriority="high" />
                      </div>
                    </NavLink>
                    <div>
                        {   requestState === 'otp'  ?
                            <Button type='button' onClick={()=>setRequestState('request')} ghost className="text-black fs-18 p-0 border-0"><ArrowLeftOutlined /></Button>
                            :
                            requestState === 'reset' ? 
                            <Button type='button' onClick={()=>setRequestState('otp')} ghost className="text-black fs-18 p-0 border-0"><ArrowLeftOutlined /></Button>
                            :
                            null
                        }
                    </div>
                    <Title level={3}>
                        {requestState === 'request' && t('Forget Password')}
                        {requestState === 'otp' && t('OTP')}
                        {requestState === 'reset' && t('Set a New Password')}
                    </Title>
                    <Paragraph>
                        {requestState === 'request' && t('Enter the email address to send you the OTP code.')}
                        {requestState === 'otp' && t('Enter the 5 digit OTP code sent to your email abc****4@gmail.com')}
                        {requestState === 'reset' && t('Your OTP has been verified. Please create a strong new password to secure your account.')}
                    </Paragraph>
                    <Form 
                        layout="vertical" 
                        form={form} 
                        requiredMark={false}
                    >
                      <Row>
                        {requestState === 'request' && (
                            <Col span={24}>
                                <MyInput
                                    label={t('Email Address')}
                                    name='email'
                                    required
                                    message={t("Please enter Email Address")}
                                    placeholder={t('Enter Email Address')}
                                />
                            </Col>
                        )}
                        {requestState === 'otp' && (
                            <Col span={24}>
                                <MyInput
                                    oTp
                                    length={5}
                                    label={t('OTP')}
                                    name='otp'
                                    type='number'
                                    required
                                    message={t("Please enter the OTP sent to your email")}
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className='w-100'
                                    min={0}
                                />
                            </Col>
                        )}
                        {requestState === 'reset' && (
                            <>
                                <Col span={24}>
                                    <MyInput
                                        label={t("New Password")}
                                        type="password"
                                        name="password"
                                        size='large'
                                        required
                                        message={()=>{}}
                                        placeholder={t('Enter new password')}
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
                                <Col span={24}>
                                    <MyInput
                                        label={t("Confirm Password")}
                                        type="password"
                                        name="confirmationPassword"
                                        size='large'
                                        dependencies={['password']}
                                        required
                                        message={t('Please enter confirm password')}
                                        placeholder={t('Re-enter new password')}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error(t('The password that you entered do not match!')));
                                                },
                                            }),
                                        ]}
                                        validator={({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(t('The password that you entered do not match!')));
                                            },
                                        })}
                                    />
                                </Col>
                            </>
                            )}
                        <Col span={24}>
                            <Button htmlType="submit" className="btnsave bg-dark-blue text-white fs-16" block onClick={forgotpass}>
                                {requestState === 'request' && t('Next')}
                                {requestState === 'otp' && t('Confirm')}
                                {requestState === 'reset' && t('Update Password')}
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Paragraph className="text-center mt-2">
                                {requestState === 'request' && <>{t("Remember Password?")} <NavLink className={'text-brand'} to={'/login'}>{t("Sign In")}</NavLink></>}
                                {requestState === 'otp' && <>{t("Didn’t receive code?")} <NavLink to={''}>{t("Resend")}</NavLink></>}
                                {requestState === 'reset' && null}
                            </Paragraph>
                        </Col>
                      </Row>
                    </Form>
                </div>
            </Col>

            <Col xs={0} md={12} lg={14} className="signup-visual-container">
                <Flex justify="end">
                    <LanguageChange />
                </Flex>
                <Flex vertical justify="space-between" align="center" gap={40} className="logo-sp">
                    <Flex vertical align="center" gap={20}>
                        <Title level={2} className="m-0">
                            {t("Simplify Your Bookings,")}
                        </Title>
                        <Title level={2} className="m-0 text-dark-brand">
                            {t("Streamline")} <span className="px-2 radius-12 py-2 bg-white">{t("Your Day.")}</span>
                        </Title>
                    </Flex>
                    <Image src="/assets/images/login-frame.svg" alt='dashboard image' fetchPriority="high" preview={false} />
                </Flex>
            </Col>
        </Row>
    );
};

export { ForgotPassword };
