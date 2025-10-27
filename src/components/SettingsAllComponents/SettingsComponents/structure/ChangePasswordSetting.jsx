import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../../../components'

const { Title } = Typography
const ChangePasswordSetting = () => {

    const [form] = Form.useForm();
    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">Password Manager</Title>
                        <Button className='btncancel' onClick={()=>form.submit()}>
                            Save
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <MyInput
                                    autoFocus
                                    type='password'
                                    name='oldPassword'
                                    label="Old Password"
                                    placeholder='Enter your old password'
                                    required
                                    message='please enter old password'
                                />
                            </Col>
                            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <MyInput
                                    name='newPassword'
                                    type='password'
                                    label='New Password'
                                    placeholder='Enter your new password'
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
                                                return Promise.reject(new Error('Password should contain at least 8 characters, one uppercase letter, one number, one special character'));
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
                                    label='Confirm Password'
                                    placeholder='Enter your confirm password'
                                    dependencies={['newPassword']}
                                    required
                                    message='Please enter confirm password'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                    validator={({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The password that you entered do not match!'));
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