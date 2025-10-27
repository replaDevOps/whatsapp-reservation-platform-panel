import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, EditFilled } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Col, Flex, Form, Row, Select, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MySelect, SingleFileUpload } from '../../../Forms'
import { stafftableData } from '../../../../data'
import { rolestaffopt } from '../../../../shared'

const { Text, Title } = Typography
const AddEditStaff = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const { id } = useParams()
    const editdetail = stafftableData?.find((list)=>list?.key === Number(id))
    const [ previewimage, setPreviewImage ] = useState(null)


    useEffect(()=>{
        if(id && editdetail){
            form.setFieldsValue({
                name: editdetail?.staffName,
                phoneNo: editdetail?.phoneNo,
                email: editdetail?.email,
                role: editdetail?.role,
            })
            setPreviewImage(editdetail?.img)
        }
    },[id, editdetail])

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Staff Management
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Staffs</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staff")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Title level={4} className="fw-500 m-0">{ editdetail ? editdetail?.staffName : 'Add Staff' }</Title>
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
                                        title="Upload Image"
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
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Name" 
                                    name="name" 
                                    required 
                                    message="Please enter name" 
                                    placeholder="Enter name" 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label="Phone Number"
                                    name="phoneNo"
                                    required
                                    message="Please enter a valid phone number"
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
                                    value={form.getFieldValue("phoneNo") || ""}
                                    className='w-100'
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Email Address" 
                                    name="email" 
                                    required 
                                    message="Please enter email address" 
                                    placeholder="Enter email address" 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    type='password'
                                    label="Password" 
                                    name="password" 
                                    required 
                                    message="Please enter password" 
                                    placeholder="Enter password" 
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    label={'Role'}
                                    name={'role'}
                                    required
                                    message='Please choose role'
                                    options={rolestaffopt}
                                />
                            </Col>
                            <Col span={24}>
                                <Flex justify='end' gap={5} >
                                    <Button type='button' className='btncancel text-black border-gray' >
                                        Cancel
                                    </Button>
                                    <Button htmlType='submit' className={`btnsave border-0 text-white brand-bg`}>
                                        {editdetail ? 'Update':'Save'}
                                    </Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
        </Flex>
    )
}

export {AddEditStaff}