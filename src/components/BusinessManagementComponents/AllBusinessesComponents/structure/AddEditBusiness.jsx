import { useState } from 'react'
import { ArrowLeftOutlined, EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Divider, Flex, Form, Row, Select, Typography } from 'antd'
import { BreadCrumbCard, BusinessChooseSubscriptionPlan, ConfirmModal, MyInput, SingleFileUpload } from '../../../../components'
import { MySelect } from '../../../Forms'
import { useNavigate } from 'react-router-dom'

const { Text, Title } = Typography
const AddEditBusiness = () => {

    const [form] = Form.useForm();
    const [ previewimage, setPreviewImage ] = useState(null)
    const [ confirmsubmit, setConfirmSubmit ] = useState(false)
    const navigate = useNavigate()

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    const onFinish = () => {
        const data = form.getFieldsValue()
        console.log('data',data)
    }

    return (
        <>
            <Flex vertical gap={10}>
                <BreadCrumbCard 
                    items={[
                        { title: 'Business Management', },
                        { title: 'All Businesses' },
                    ]}
                />
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex gap={10} vertical>
                        <Flex gap={10} align="center">
                            <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/allbusiness")}>
                                <ArrowLeftOutlined />
                            </Button>
                            <Title level={4} className="fw-500 m-0">Add Business</Title>
                        </Flex>
                        <Form layout="vertical" 
                            form={form} 
                            onFinish={onFinish} 
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
                                    <MySelect 
                                        label="Customer Name" 
                                        name="customerName" 
                                        required 
                                        message="Please choose customer name" 
                                        placeholder="Select customer name" 
                                        options={[
                                            {
                                                id: 1,
                                                name: 'Customer Name'
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MySelect 
                                        label="Business Type" 
                                        name="businessType" 
                                        required 
                                        message="Please choose business type" 
                                        placeholder="Select business type" 
                                        options={[
                                            {
                                                id: 1,
                                                name: 'Business Type'
                                            }
                                        ]}
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
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MyInput 
                                        label="Website (optional)" 
                                        name="website" 
                                        required 
                                        message="Please enter website" 
                                        placeholder="Enter email address" 
                                    />
                                </Col>
                                <Col span={24}>
                                    <Title level={5} className='fw-500 my-3'>Choose  Subscription Plan</Title>
                                </Col>
                                <Col span={24}>
                                    <BusinessChooseSubscriptionPlan />
                                </Col>
                                <Col span={24}>
                                    <Divider className='bg-divider' />
                                </Col>
                                <Col span={24}>
                                    <Flex justify='end' gap={5} >
                                        <Button type='button' className='btncancel text-black border-gray' >
                                            Cancel
                                        </Button>
                                        <Button onClick={()=>setConfirmSubmit(true)} className={`btnsave border-0 text-white brand-bg`}>
                                            {/* {edititem?'Update':'Save'} */}
                                            Save
                                        </Button>
                                    </Flex>
                                </Col>
                            </Row>
                        </Form>
                    </Flex>
                </Card>
            </Flex>

            <ConfirmModal 
                type={'danger'}
                visible={confirmsubmit}
                title={'Are you sure?'}
                subtitle={'Please confirm that all business details are correct and a subscription plan is assigned before proceeding.'}
                onClose={()=>setConfirmSubmit(false)}
                onConfirm={()=>{form.submit();setConfirmSubmit(false)}}
            />
        </>
    )
}

export {AddEditBusiness}