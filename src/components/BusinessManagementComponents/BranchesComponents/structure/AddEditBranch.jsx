import { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Col, Divider, Flex, Form, Radio, Row, Select, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MySelect } from '../../../Forms'
import { TimeForm } from '../../../Ui'
import { branchtableData } from '../../../../data'

const { Text, Title } = Typography
const AddEditBranch = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState(1);
    const [editactive, setEditActive] = useState(false);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const { id } = useParams()
    const editdetail = branchtableData?.find((list)=>list?.key === Number(id))

    const handleRadioChange = (e) => {
        setIsAccess(e.target.value === 1);
        setEditActive(e.target.value === 2 ? true : false)
    };

    useEffect(()=>{
        if(id){
            form.setFieldsValue({
                name: editdetail?.branchName,
                location: editdetail?.location,
                service: editdetail?.services ? editdetail?.services : null
            })
        }
    },[id])

    return (
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
                            title: <Text className="fw-500 fs-14 text-black">Branches</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/branches")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Title level={4} className="fw-500 m-0">{ editdetail ? editdetail?.branchName : 'Add Branch' }</Title>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Branch Name" 
                                    name="name" 
                                    required 
                                    message="Please enter branch name" 
                                    placeholder="Enter branch name" 
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
                                    className='w-100'
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label="Location" 
                                    name="location" 
                                    required 
                                    message="Please enter location" 
                                    placeholder="Enter location" 
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    mode={'multiple'}
                                    label={'Services'}
                                    name={'service'}
                                    required
                                    message='Please choose service'
                                    options={[
                                        {
                                            id: 1,
                                            name: 'Service 01'
                                        }
                                    ]}
                                    placeholder='Choose services'
                                />
                            </Col>
                            <Col span={24}>
                                <Title level={5} className='fw-500 my-2'>Working Hours</Title>
                            </Col>
                            <Col span={24}>
                                <Radio.Group
                                    onChange={handleRadioChange}
                                    value={isAccess ? 1 : 2}
                                    className="mb-4"
                                >
                                    <Flex vertical gap={3}>
                                        <Radio value={1} className="fs-14">
                                            Same as company operating hours
                                        </Radio>
                                        <Radio value={2} className="fs-14">
                                            Custom
                                        </Radio>
                                    </Flex>
                                </Radio.Group>
                            </Col>
                            <Col span={24}>
                                {daysOfWeek.map((day) => (
                                    <TimeForm
                                        key={day}
                                        form={form}
                                        dayKey={day}
                                        title={day}
                                        editactive={editactive}
                                    />
                                ))}
                            </Col>
                            <Col span={24}>
                                <Divider className='bg-divider' />
                            </Col>
                            <Col span={24}>
                                <Flex justify='end' gap={5} >
                                    <Button type='button' className='btncancel text-black border-gray' >
                                        Cancel
                                    </Button>
                                    <Button className={`btnsave border-0 text-white brand-bg`}>
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

export {AddEditBranch}