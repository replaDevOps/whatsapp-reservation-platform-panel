import { Button, Card, Col, Flex, Form, notification, Row, Typography } from 'antd'
import { MyInput } from '../../../../components'
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { CHANGE_PASSWORD_USER } from '../../../../graphql/mutation';
import { getUserID } from '../../../../utils/auth';
import { notifyError, notifySuccess } from '../../../../shared';
import { useEffect } from 'react';

const { Title } = Typography
const ChangePasswordSetting = () => {

    const [form] = Form.useForm();
    const { i18n } = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const {t} = useTranslation()

    const [ changePassword, { loading } ] = useMutation(CHANGE_PASSWORD_USER,{
        onCompleted:()=>{notifySuccess(api,t("Password Change"),t("Password has been changed successfully"),()=> {form.resetFields()})},
        onError: (error) => {notifyError(api, error);},
    });

    const onFinish = () => {
        const values = form.getFieldsValue();
        if (values.newPassword !== values.confirmPassword) {
            notifyError(api,t('New password and confirmation do not match.'));
            return;
        }

        if (!getUserID()) {
            notifyError(api,t('User ID not found.'));
            return;
        }

        changePassword({
            variables: {
                changedPasswordId: getUserID(),
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }
        });
    };

    useEffect(() => {
        form.resetFields();
    }, [i18n.language]);

    return (
        <>
            {contextHolder}
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">{t("Password Manager")}</Title>
                        <Button className='btncancel' loading={loading} onClick={()=>form.submit()}>
                            {t("Save")}
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={onFinish} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <MyInput
                                    autoFocus
                                    type='password'
                                    name='oldPassword'
                                    label={t("Old Password")}
                                    placeholder={t('Enter your old password')}
                                    required
                                    message={t('Please enter old password')}
                                />
                            </Col>
                            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <MyInput
                                    name='newPassword'
                                    type='password'
                                    label={t('New Password')}
                                    placeholder={t('Enter your new password')}
                                    required
                                    message={()=>{}} 
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
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
                            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <MyInput
                                    name='confirmPassword'
                                    type='password'
                                    label={t('Confirm Password')}
                                    placeholder={t('Enter your confirm password')}
                                    dependencies={['newPassword']}
                                    required
                                    message={t('Please enter confirm password')}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(t('The password that you entered do not match!')));
                                            },
                                        }),
                                    ]}
                                    validator={({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(t('The password that you entered do not match!')));
                                        },
                                    })}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
        </>
    )
}

export {ChangePasswordSetting}