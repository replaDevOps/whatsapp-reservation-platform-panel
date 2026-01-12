import { Button, Divider, Flex, Image, Modal, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Text } = Typography
const ConfirmModal = ({visible,onClose,title,subtitle,type,onConfirm,loading}) => {
    const {t} = useTranslation()
    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            centered
            footer={
                <Flex justify='center' gap={5}>
                    <Button type='button' onClick={onClose} className='btncancel pad-filter text-black border-gray' >
                        {t("Cancel")}
                    </Button>
                    <Button loading={loading} className={`btnsave border-0 text-white ${type==='danger'? 'bg-delete':'brand-bg'}`} onClick={()=> onConfirm(visible)} >
                        {t("Confirm")}
                    </Button>
                </Flex>
            }
        > 

            <Flex vertical align='center' className='mt-3' gap={5}>
                <Image src='/assets/icons/red-quest.svg' alt='question mark icon' fetchPriority="high" preview={false} width={50} />
                <Title level={5} className='m-0'>
                    {t(title)}
                </Title>
                <Text className='fs-14 text-center'>
                    {t(subtitle)}
                </Text>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {ConfirmModal}