import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Modal, Switch, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


const { Title, Text } = Typography
const MaintenanceModal = ({visible,onClose,initialChecked}) => {

    const [localChecked, setLocalChecked] = useState(initialChecked)
    const {t} = useTranslation()
    const handleOk = () => {
        onClose(localChecked)
    }
    const handleCancel = () => {
        onClose()
    }

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={handleCancel}
            closeIcon={false}
            centered
            footer={
                <Flex justify='end' gap={5}>
                    <Button type='button' className='btncancel text-black border-gray' onClick={handleCancel}>
                        {t("Cancel")}
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={handleOk}>
                        {t("Save")}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t("Language")}
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
    )
}

export {MaintenanceModal}