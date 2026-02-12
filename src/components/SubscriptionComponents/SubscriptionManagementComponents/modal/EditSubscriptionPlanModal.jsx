import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Modal, notification, Row, Typography } from 'antd'
import { IncludeFeatureField } from '../../SubscriptionPlanComponents'
import { useTranslation } from 'react-i18next'
import { UPDATE_SUBSCRIBER_SUBSCRIPTION } from '../../../../graphql/mutation'
import { useMutation } from '@apollo/client/react'
import { notifyError, notifySuccess } from '../../../../shared'

const { Title, Text } = Typography
const EditSubscriptionPlanModal = ({visible,onClose,edititem,refetch}) => {

    const {t} = useTranslation()
    const [ featureValues, setFeatureValues ] = useState(null)
    const [ api, contextHolder ] = notification.useNotification()
    const [updateSubscriptionPlan, { loading}] = useMutation(UPDATE_SUBSCRIBER_SUBSCRIPTION,{
        onCompleted: () => {
            notifySuccess(api,t("Subscription Update"),t("Subscription has been Updated successfully"));
            refetch();
            onClose()
        },
        onError: (error) => {
            notifyError(api, error);
        },
    });
    useEffect(()=>{
        if(visible && edititem){
            let data= {...edititem?.features}
            setFeatureValues(convertBackToInput(data))
            console.log('edit item plan',data)
        }
        else {
            console.log(edititem)
        }
    },[visible,edititem])

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

    const handleSubmit = async () => {
        if (!featureValues || !edititem?.id) return;

        const payload = {                 
            features: convertPlanData(featureValues), 
        };

        console.log("submit form", payload);
        await updateSubscriptionPlan({
            variables: {
                updateSubscriberSubscriptionId: edititem.id,  
                input: payload,
            },
        });
    };


    
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
            <Modal
                title={null}
                open={visible}
                onCancel={onClose}
                closeIcon={false}
                centered
                footer={
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                            {t("Cancel")}
                        </Button>
                        <Button type="primary" onClick={handleSubmit} loading={loading} className='btnsave border0 text-white brand-bg'>
                            {t("Update")}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex vertical className='mb-2'>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                {t("Edit Subscription Plan")}
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex> 
                        <Text className='fs-13 text-gray'>
                            {t("Edit client Subscription Plan.")}
                        </Text>
                    </Flex>
                    <Row gutter={16}>
                        <Col slot='24'>
                            <IncludeFeatureField
                                title={null}
                                fields={[
                                    {
                                        key: "noOfBranches",
                                        selectOptions: [
                                            { label: t("Branch"), value: "branch" },
                                            { label: t("Branches"), value: "branches" },
                                        ],
                                    },
                                    {
                                        key: "noOfAdmins",
                                        selectOptions: [
                                            { label: t("Admin"), value: "admin" },
                                            { label: t("Admins"), value: "admins" },
                                        ],
                                    },
                                    {
                                        key: "noOfStaffManagers",
                                        selectOptions: [
                                            { label: t("Staff Manager"), value: "staff manager" },
                                            { label: t("Staff Managers"), value: "staff managers" },
                                        ],
                                    },
                                    {
                                        key: "noOfServiceProviders",
                                        selectOptions: [
                                            { label: t("Service Provider"), value: "service provider" },
                                            { label: t("Service Providers"), value: "service providers" },
                                        ],
                                    },
                                    {
                                        key: "noOfReceptionists",
                                        selectOptions: [
                                            { label: t("Receptionist"), value: "receptionist" },
                                            { label: t("Receptionists"), value: "receptionists" },
                                        ],
                                    },
                                    {
                                        key: "whatsappBot",
                                        selectOptions: [
                                            { label: t("WhatsApp Bot"), value: "whatsApp bot" },
                                        ],
                                    },
                                    {
                                        key: "manualReminder",
                                        selectOptions: [
                                            { label: t("Manual Reminders"), value: "manual reminders" },
                                        ],
                                    },
                                    {
                                        key: "automatedReminder",
                                        selectOptions: [
                                            { label: t("Automated Reminders"), value: "automated reminders" },
                                        ],
                                    },
                                    {
                                        key: "googleReviewLink",
                                        selectOptions: [
                                            { label: t("Google Review Link"), value: "Google link" },
                                        ],
                                    },
                                    {
                                        key: "promotions",
                                        selectOptions: [
                                            { label: t("Promotions"), value: "promotion" },
                                        ],
                                    },
                                    {
                                        key: "selfServiceTablet",
                                        selectOptions: [
                                            { label: t("Self Service Tablet"), value: "self service tablet" },
                                        ],
                                    },
                                    {
                                        key: "basicDashboard",
                                        selectOptions: [
                                            { label: t("Basic Dashboard"), value: "basic dashboard" },
                                        ],
                                    },
                                    {
                                        key: "fullAccessDashboard",
                                        selectOptions: [
                                            { label: t("Full Access Dashboard"), value: "full access dashboard" },
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
                    </Row>
                </Flex>
                <Divider className='my-2 bg-light-brand' />
            </Modal>
        </>
    )
}

export {EditSubscriptionPlanModal}