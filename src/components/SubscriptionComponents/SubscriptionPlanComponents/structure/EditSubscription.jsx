import { useEffect, useState } from 'react'
import { Button, Col, Divider, Flex, Form, Row, Select } from 'antd'
import { MyInput } from '../../../Forms'
import { IncludeFeatureField } from './IncludeFeatureField';

const EditSubscription = ({setEditItem,edititem}) => {

    const [form] = Form.useForm();
    const [featureValues, setFeatureValues] = useState({})

    useEffect(()=>{
        if(edititem){
            form.setFieldsValue({
                name: edititem?.title,
                description: edititem?.description,
                price: edititem?.amount,
            })
        }
    },[edititem])

    const handleSubmit = (values) => {
        const allData = {
            ...values,
            featureValues,
        };
        console.log("✅ Submitted Data:", allData);
    };
    

    return (
        <Form layout="vertical" 
            form={form} 
            onFinish={handleSubmit}
            requiredMark={false}
        >
            <Row gutter={16}>
                <Col span={24}>
                    <MyInput 
                        label="Subscription Title" 
                        name="name" 
                        required 
                        message="Please enter subscription title" 
                    />
                </Col>
                <Col span={24}>
                    <MyInput 
                        label="Description" 
                        name="description" 
                        required 
                        message="Please enter description" 
                    />
                </Col>
                <Col span={24}>
                    <MyInput
                        label="Price"
                        name="price"
                        required
                        message="Please enter price"
                        addonBefore='SAR'
                        addonAfter={
                            <Select
                                defaultValue="Monthly"
                                className='w-100px'
                                onChange={(value) => form.setFieldsValue({ type: value })}
                            >
                                <Select.Option value="monthly">Monthly</Select.Option>
                                <Select.Option value="yearly">Yearly</Select.Option>
                            </Select>
                        }
                        value={form.getFieldValue("price") || ""}
                        className='w-100'
                    />
                </Col>
                <Col span={24}>
                    <IncludeFeatureField
                        title="Included Features:"
                        fields={[
                            {
                                key: "branch",
                                selectOptions: [
                                    { label: "Branch", value: "branch" },
                                    { label: "Branches", value: "branches" },
                                ],
                            },
                            {
                                key: "admin",
                                selectOptions: [
                                    { label: "Admin", value: "admin" },
                                    { label: "Admins", value: "admins" },
                                ],
                            },
                            {
                                key: "staffmanag",
                                selectOptions: [
                                    { label: "Staff Manager", value: "staff manager" },
                                    { label: "Staff Managers", value: "staff managers" },
                                ],
                            },
                            {
                                key: "serviceprovid",
                                selectOptions: [
                                    { label: "Service Provider", value: "service provider" },
                                    { label: "Service Provider", value: "service providers" },
                                ],
                            },
                            {
                                key: "reception",
                                selectOptions: [
                                    { label: "Receptionist", value: "receptionist" },
                                    { label: "Receptionists", value: "receptionists" },
                                ],
                            },
                            {
                                key: "whatsAppbot",
                                selectOptions: [
                                    { label: "WhatsApp Bot", value: "whatsApp bot" },
                                ],
                            },
                            {
                                key: "manualreminder",
                                selectOptions: [
                                    { label: "Manual Reminders", value: "manual reminders" },
                                ],
                            },
                            {
                                key: "automatedremind",
                                selectOptions: [
                                    { label: "Automated Reminders", value: "automated reminders" },
                                ],
                            },
                            {
                                key: "meetRreviewlink",
                                selectOptions: [
                                    { label: "Google Review Link", value: "Google link" },
                                ],
                            },
                            {
                                key: "promo",
                                selectOptions: [
                                    { label: "Promotions", value: "promotion" },
                                ],
                            },
                            {
                                key: "selfservicetablet",
                                selectOptions: [
                                    { label: "Self Service Tablet", value: "self service tablet" },
                                ],
                            },
                            {
                                key: "basicdashboard",
                                selectOptions: [
                                    { label: "Basic Dashboard", value: "basic dashboard" },
                                ],
                            },
                            {
                                key: "fullaccessdashboard",
                                selectOptions: [
                                    { label: "Full Access Dashboard", value: "full access dashboard" },
                                ],
                            },
                        ]}
                        editable={true}
                        defaultSwitch={true}
                        withSelect
                        disabledKeys={[
                            'whatsAppbot',
                            'manualreminder',
                            'automatedremind',
                            'meetRreviewlink',
                            'promo',
                            'selfservicetablet',
                            'basicdashboard',
                            'fullaccessdashboard'
                        ]}
                        onValueChange={(data) => setFeatureValues(data)}
                        onSwitchChange={(checked, key) => console.log("Switch:", key, checked)}
                    />
                </Col>
                <Col span={24}>
                    <Divider className='my-3 bg-divider' />
                </Col>
                <Col span={24}>
                    <Flex justify='end' gap={5} >
                        <Button type='button' onClick={()=>setEditItem(null)} className='btncancel text-black border-gray' >
                            Cancel
                        </Button>
                        <Button htmlType='submit'  className={`btnsave border-0 text-white brand-bg`}>
                            Update
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </Form>
    )
}

export {EditSubscription}