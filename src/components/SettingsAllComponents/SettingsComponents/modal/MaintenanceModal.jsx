import { CloseOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client/react'
import { Button, Divider, Flex, Modal, notification, Switch, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IS_MAINTENANCE_ALLOW } from '../../../../graphql/mutation'
import { notifyError, notifySuccess } from '../../../../shared'


const { Title, Text } = Typography
const MaintenanceModal = ({visible,onClose,initialChecked,refetch}) => {

    const [localChecked, setLocalChecked] = useState(initialChecked)
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const [ updateMaintenanceStatus, {loading} ] = useMutation(IS_MAINTENANCE_ALLOW,{
        onCompleted: () => {notifySuccess(api,t("Maintenance Status Update"),t("Maintenance status updated successfully"),()=> {refetch()});onClose(localChecked)},
        onError: (error) => {notifyError(api, error)},
    })

    const handleOk = async () => {
        try {
            await updateMaintenanceStatus({
                variables: { input: { isEnabled: localChecked } }
            })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setLocalChecked(initialChecked)
    }, [initialChecked]);
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
                        <Button type="primary" loading={loading} className='btnsave border0 text-white brand-bg' onClick={handleOk}>
                            {t("Save")}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t("Maintenance Mode")}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                <Flex justify='space-between' align='flex-start'>
                    <Flex vertical>
                        <Text strong>{t("Maintenance Mode")}</Text>
                        <Text className='fs-13 text-gray'>
                            {t("Enable or disable maintenance mode for your application.")}
                        </Text>
                    </Flex>
                    <Switch
                        size='small'
                        checked={localChecked}
                        onChange={(checked) => setLocalChecked(checked)}
                        className='mt-2'
                    />
                </Flex>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
        </>
    )
}

export {MaintenanceModal}