import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Select, Typography } from 'antd'
import { MyInput } from '../../../Forms'

const { Title } = Typography
const AddCustomerModal = ({visible,onClose}) => {

    const [form] = Form.useForm();

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
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        Save
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        Add Customer
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
                                label="First Name" 
                                name="firstName" 
                                required 
                                message="Please enter first name" 
                                placeholder="Enter first name" 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Last Name" 
                                name="lastName" 
                                required 
                                message="Please enter last name" 
                                placeholder="Enter last name" 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Phone Number" 
                                name="phoneNo" 
                                required 
                                message="Please enter phone number" 
                                placeholder="Enter phone number" 
                                addonBefore={
                                    <Select
                                        defaultValue="+966"
                                        className='w-80'
                                        onChange={(value) => form.setFieldsValue({ countryCode: value })}
                                    >
                                        <Select.Option value="sa">+966</Select.Option>
                                        <Select.Option value="ae">+955</Select.Option>
                                    </Select>
                                }
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Email Address" 
                                name="email" 
                                required 
                                message="Please enter email" 
                                placeholder="Enter email" 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                type={'password'}
                                label="Password" 
                                name="password" 
                                required 
                                message="Please enter password" 
                                placeholder="Enter password" 
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