import { Button, Divider, Flex, Modal, Typography } from 'antd'

const { Title, Text } = Typography
const DeleteModal = ({visible,onClose,title,subtitle,onConfirm}) => {

    
  return (
    <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        centered
        footer={
            <Flex justify='center' gap={5}>
                <Button type='button' onClick={onClose} className='btncancel text-black border-gray' >
                    Cancel
                </Button>
                <Button className={`btnsave border-0 text-white bg-red`} onClick={onConfirm} >
                    Confirm
                </Button>
            </Flex>
        }
      > 

        <Flex vertical align='center' className='mt-3' gap={5}>
            <img src='/assets/icons/delete.svg' width={50} alt='bin icon' fetchPriority="high" />
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

export {DeleteModal}