import { useEffect, useState } from 'react'
import { Button, Col, Divider, Flex, Form, notification, Row } from 'antd'
import { MyInput } from '../../../Forms'
import { IncludeFeatureField } from './IncludeFeatureField';
import { useTranslation } from 'react-i18next';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../../../graphql/mutation';
import { useMutation } from '@apollo/client/react';
import { notifyError, notifySuccess } from '../../../../shared';

const EditSubscription = ({setEditItem,edititem,getSubscriptionPlans,setState}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const [featureValues, setFeatureValues] = useState({})
    const [updateSubscriptionPlan, { loading, error, success }] = useMutation(UPDATE_SUBSCRIPTION_PLAN, {
        onCompleted: () => {notifySuccess(api,t("Subscription Plan Update"),t("Subscription Plan has been updated successfully"),()=>{getSubscriptionPlans();setEditItem(null);setState(null)})
    },
        onError:(error)=>{notifyError(api,error)}
    });
    console.log("featureValues:", success)
    useEffect(()=>{
        if(edititem){
            form.setFieldsValue({
                name: edititem?.title,
                description: edititem?.description,
                price: edititem?.price,
                yearlyPrice: edititem?.yearlyPrice
            })
            let data= {...edititem}
            delete data?.title
            delete data?.description
            delete data?.__typename
            delete data?.type
            delete data?.price
            delete data?.yearlyPrice
            delete data?.discountPrice
            delete data?.discountYearlyPrice
            setFeatureValues(convertBackToInput(data))
        }
    },[edititem])

    function convertBackToInput(output) {
        const result = {}
        Object.keys(output).forEach(key => {
            const value = output[key];
            const isNumberField = key.startsWith("noOf");

            // Prepare select label (convert camelCase to readable text)
            const selectLabel = key
                .replace(/^noOf/, '') // remove leading noOf
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .toLowerCase();

            if (isNumberField) {
                // Number fields
                if (value === 0 || value === null || value === "") {
                    result[key] = {
                        value: "",
                        select: selectLabel,
                        active: false
                    };
                } else {
                    result[key] = {
                        value: String(value),
                        select: selectLabel,
                        active: true
                    };
                }
            } else {
                // Boolean fields
                if (value === true) {
                    result[key] = {
                        value: "",
                        select: selectLabel,
                        active: true
                    };
                } else {
                    result[key] = {
                        value: "",
                        select: selectLabel,
                        active: false
                    };
                }
            }
        });
        return result;
    }


    const handleSubmit = async (values) => {
        const data = {
            ...convertPlanData(featureValues),
            ...values,
            price: parseInt(values?.price),
            yearlyPrice: parseInt(values?.yearlyPrice),
        };
        console.log('data subscription',data)
        try {
            await updateSubscriptionPlan({ variables: { input: {...data, id: edititem?.id} } })
        }
        catch (e){

        }
    }
    function convertPlanData(input) {
        const output = {};

        Object.keys(input).forEach(key => {
            const item = input[key]

            const isNumberField = key.startsWith("noOf");

            if (isNumberField) {
                // Integer fields
                if (!item.active || item.value === "" || item.value === "0") {
                    output[key] = 0;
                } else {
                    output[key] = parseInt(item.value, 10) || 0;
                }
            } else {
                 output[key] = item.active;
            }
        })
        return output
    }
    

    return (
        <>
            {contextHolder}
            <Form layout="vertical" 
                form={form} 
                onFinish={handleSubmit}
                requiredMark={false}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <MyInput 
                            label={t("Subscription Title")} 
                            value={t(edititem?.title)}
                            required 
                            message={t("Please enter subscription title")} 
                            disabled
                        />
                    </Col>
                    <Col span={24}>
                        <MyInput 
                            label={t("Description")} 
                            name="description" 
                            required 
                            message={t("Please enter description")} 
                        />
                    </Col>
                    <Col span={24}>
                        <MyInput
                            label={t("Monthly Price")}
                            name="price"
                            required={edititem?.title !== 'ENTERPRISE'}
                            message={t("Please enter monthly price")}
                            addonBefore={t('SAR')}
                            // addonAfter={
                            //     <Select
                            //         defaultValue="monthly"
                            //         className='w-100px'
                            //         onChange={(value) => form.setFieldsValue({ type: value })}
                            //     >
                            //         <Select.Option value="monthly">{t("Monthly")}</Select.Option>
                            //         <Select.Option value="yearly">{t("Yearly")}</Select.Option>
                            //     </Select>
                            // }
                            // value={form.getFieldValue("price") || ""}
                            className='w-100'
                            type='number'
                            min={0}
                        />
                    </Col>
                    <Col span={24}>
                        <MyInput
                            label={t("Yearly Price")}
                            name="yearlyPrice"
                            required={edititem?.title !== 'ENTERPRISE'}
                            message={t("Please enter yearly price")}
                            addonBefore={t('SAR')}
                            className='w-100'
                            type='number'
                            min={0}
                        />
                    </Col>
                    <Col span={24}>
                        <IncludeFeatureField
                            title="Included Features:"
                            fields={[
                                {
                                    key: "noOfBranches",
                                    selectOptions: [
                                        { label: "Branch", value: "branch" },
                                        { label: "Branches", value: "branches" },
                                    ],
                                },
                                {
                                    key: "noOfAdmins",
                                    selectOptions: [
                                        { label: "Admin", value: "admin" },
                                        { label: "Admins", value: "admins" },
                                    ],
                                },
                                {
                                    key: "noOfStaffManagers",
                                    selectOptions: [
                                        { label: "Staff Manager", value: "staff manager" },
                                        { label: "Staff Managers", value: "staff managers" },
                                    ],
                                },
                                {
                                    key: "noOfServiceProviders",
                                    selectOptions: [
                                        { label: "Service Provider", value: "service provider" },
                                        { label: "Service Provider", value: "service providers" },
                                    ],
                                },
                                {
                                    key: "noOfReceptionists",
                                    selectOptions: [
                                        { label: "Receptionist", value: "receptionist" },
                                        { label: "Receptionists", value: "receptionists" },
                                    ],
                                },
                                {
                                    key: "whatsappBot",
                                    selectOptions: [
                                        { label: "WhatsApp Bot", value: "whatsApp bot" },
                                    ],
                                },
                                {
                                    key: "manualReminder",
                                    selectOptions: [
                                        { label: "Manual Reminders", value: "manual reminders" },
                                    ],
                                },
                                {
                                    key: "automatedReminder",
                                    selectOptions: [
                                        { label: "Automated Reminders", value: "automated reminders" },
                                    ],
                                },
                                {
                                    key: "googleReviewLink",
                                    selectOptions: [
                                        { label: "Google Review Link", value: "Google link" },
                                    ],
                                },
                                {
                                    key: "promotions",
                                    selectOptions: [
                                        { label: "Promotions", value: "promotion" },
                                    ],
                                },
                                {
                                    key: "selfServiceTablet",
                                    selectOptions: [
                                        { label: "Self Service Tablet", value: "self service tablet" },
                                    ],
                                },
                                {
                                    key: "basicDashboard",
                                    selectOptions: [
                                        { label: "Basic Dashboard", value: "basic dashboard" },
                                    ],
                                },
                                {
                                    key: "fullAccessDashboard",
                                    selectOptions: [
                                        { label: "Full Access Dashboard", value: "full access dashboard" },
                                    ],
                                },
                            ]}
                            editable={true}
                            defaultSwitch={true}
                            withSelect
                            disabledKeys={[
                                'whatsappBot',
                                'manualReminder',
                                'automatedReminder',
                                'googleReviewLink',
                                'promotions',
                                'selfServiceTablet',
                                'basicDashboard',
                                'fullAccessDashboard'
                            ]}
                            featureValues={featureValues}
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
                                {t("Cancel")}
                            </Button>
                            <Button loading={loading} htmlType='submit'  className={`btnsave border-0 text-white brand-bg`}>
                                {t("Update")}
                            </Button>
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export {EditSubscription}