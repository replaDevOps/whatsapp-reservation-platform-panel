import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Modal, Row, Typography } from 'antd'
import { IncludeFeatureField } from '../../SubscriptionPlanComponents'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const EditSubscriptionPlanModal = ({visible,onClose,edititem}) => {

    const {t} = useTranslation()
    useEffect(()=>{
        if(visible && edititem){
            console.log(edititem)
        }
        else {
            console.log(edititem)
        }
    },[visible,edititem])
    return (
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg'>
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
                            onValueChange={(data) => setFeatureValues(data)}
                            onSwitchChange={(checked, key) => console.log("Switch:", key, checked)}
                        />
                    </Col>
                </Row>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {EditSubscriptionPlanModal}