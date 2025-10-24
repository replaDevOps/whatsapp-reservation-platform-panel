import { Button, Divider, Flex, Image, Modal, Typography } from 'antd'

const { Title, Text } = Typography
const ConfirmModal = ({visible,onClose,title,subtitle,type,onConfirm}) => {
  return (
    <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        centered
        footer={
            <Flex justify='center' gap={5}>
                <Button type='button' onClick={onClose} className='btncancel pad-filter text-black border-gray' >
                    Cancel
                </Button>
                <Button className={`btnsave pad-filter border-0 text-white ${type==='danger'? 'bg-delete':'brand-bg'}`} onClick={onConfirm} >
                    Confirm
                </Button>
            </Flex>
        }
      > 

        <Flex vertical align='center' className='mt-3' gap={5}>
            <Image src='/assets/icons/red-quest.svg' alt='question mark icon' fetchPriority="high" preview={false} width={50} />
            <Title level={5} className='m-0'>
                {title}
            </Title>
            <Text className='fs-14'>
                {subtitle}
            </Text>
        </Flex>
        <Divider className='my-2 bg-light-brand' />
    </Modal>
  )
}

export {ConfirmModal}