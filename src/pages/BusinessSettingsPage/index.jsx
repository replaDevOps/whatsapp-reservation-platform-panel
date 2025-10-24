import { useEffect, useState } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Col, Divider, Flex, Form, Row, Select, Switch, Tag, Typography } from 'antd'
import { GenerateOtpModal, MyInput, OtpVerifyModal, SingleFileUpload, TimeForm } from '../../components'

const { Text, Title } = Typography
const BusinessSettingsPage = () => {

    const [form] = Form.useForm();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [ previewimage, setPreviewImage ] = useState(null)
    const [ edititem, setEditItem ] = useState(false)
    const [ visible, setVisible] = useState(false)
    const [ otpverify, setOtpVerify ] = useState(false)


    useEffect(()=>{
        if(edititem){
            form.setFieldsValue({
                name: edititem?.name,
                website: edititem?.website,
            })
            setPreviewImage(edititem?.img)
        }
    },[edititem])

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    return (
        <>
            <Flex vertical gap={10}>
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Breadcrumb
                        separator="/"
                        items={[
                            {
                                title: (
                                    <Text className="fs-13 text-gray">
                                        Business Management
                                    </Text>
                                ),
                            },
                            {
                                title: <Text className="fw-500 fs-14 text-black">Business Settings</Text>,
                            },
                        ]}
                    />
                </Card>
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex gap={10} vertical>
                        <Flex gap={10} justify='space-between' align='center'>
                            <Flex gap={10} align="center">
                                <Title level={4} className="fw-500 m-0">Business Settings</Title>
                                <Tag className='sm-pill radius-20'>Clinic</Tag>
                            </Flex>
                            {
                                !edititem &&
                                <Button className='btncancel' onClick={()=>setEditItem(true)}> 
                                    <EditFilled /> Edit Settings
                                </Button>
                            }
                        </Flex>
                        <Form layout="vertical" 
                            form={form} 
                            // onFinish={} 
                            requiredMark={false}
                        >
                            <Row gutter={16}>
                                <Col span={24} className='my-5'>
                                    {
                                        !previewimage ?
                                        <SingleFileUpload
                                            name="document"
                                            title="Upload Logo"
                                            form={form}
                                            onUpload={(file) => console.log("uploading:", file)}
                                            align="center"
                                        />
                                        :
                                        <Flex vertical gap={5} justify='center' align='center'>
                                            <img
                                                src={previewimage}
                                                alt="Category"
                                                className='radius-12 mxw-mxh'
                                                fetchPriority="high"
                                            />
                                            <div>
                                                <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                                    <EditFilled /> Edit
                                                </Button>
                                            </div>
                                        </Flex>

                                    }
                                </Col>
                                <Col span={24}>
                                    <MyInput 
                                        label="Business Name" 
                                        name="name" 
                                        required 
                                        message="Please enter business name" 
                                        placeholder="Enter business name" 
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MyInput
                                        label="Business Number"
                                        name="businessNo"
                                        required
                                        message="Please enter a valid business number"
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
                                        placeholder="3445592382"
                                        className='w-100'
                                        suffix={<Button type='button' onClick={()=>setVisible(true)} className='btnsave px-2 py-2 brand-bg text-white my-1 fs-12 m-1'>Generate OTP</Button>}
                                    />
                                    <Text className='fs-11 text-brand'>Note: This number will connect the system with your WhatsApp account.</Text>
                                </Col>
                                <Col span={24} md={12}>
                                    <MyInput
                                        label="OTP"
                                        name="otp"
                                        required
                                        message="Please enter a valid otp"
                                        placeholder=""
                                        className='w-100'
                                        suffix={<Button type='button' onClick={()=>setOtpVerify(true)} className='btnsave px-2 py-2 brand-bg text-white my-1 fs-12 m-1'>Verify OTP</Button>}
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyInput 
                                        label="Website (optional)" 
                                        name="website" 
                                        required 
                                        message="Please enter website" 
                                        placeholder="Enter email address" 
                                    />
                                </Col>
                                <Col span={24} className='my-3'>
                                    <Flex vertical gap={10}>
                                        <Flex align='center' justify='space-between' gap={10}>
                                            <Flex vertical>
                                                <Text className='fs-14'>New Customer Instruction</Text>
                                                <Text className='text-gray fs-13'>
                                                    Enable this option to send instruction to new customers related to early arrival.
                                                </Text>
                                            </Flex>
                                            <Switch size='small' defaultChecked />
                                        </Flex>
                                        <Flex align='center' justify='space-between' gap={10}>
                                            <Flex vertical>
                                                <Text className='fs-14'>Does your business has branches?</Text>
                                                <Text className='text-gray fs-13'>
                                                    If your business has no branch, then turn the toggle OFF. You can enable it anytime.
                                                </Text>
                                            </Flex>
                                            <Switch size='small' defaultChecked />
                                        </Flex>
                                    </Flex>
                                </Col>
                                <Col span={24}>
                                    <Title level={5} className='fw-500 my-2'>Working Hours</Title>
                                </Col>
                                <Col span={24}>
                                    {daysOfWeek.map((day) => (
                                        <TimeForm
                                            key={day}
                                            form={form}
                                            dayKey={day}
                                            title={day}
                                        />
                                    ))}
                                </Col>
                                
                                {
                                    edititem && 
                                    <>
                                        <Col span={24}>
                                            <Divider className='bg-divider' />
                                        </Col>
                                        <Col span={24}>
                                            <Flex justify='end' gap={5} >
                                                <Button type='button' onClick={()=>setEditItem(false)} className='btncancel text-black border-gray' >
                                                    Cancel
                                                </Button>
                                                <Button className={`btnsave border-0 text-white brand-bg`}>
                                                    Save
                                                </Button>
                                            </Flex>
                                        </Col>
                                    </>
                                }
                            </Row>
                        </Form>
                    </Flex>
                </Card>
            </Flex>
            <GenerateOtpModal 
                visible={visible}
                onClose={()=>setVisible(false)}
            />
            <OtpVerifyModal 
                visible={otpverify}
                onClose={()=>setOtpVerify(false)}
            />
        </>
    )
}

export {BusinessSettingsPage}