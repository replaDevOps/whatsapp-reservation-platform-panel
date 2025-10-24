import { CloseOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Modal, Typography } from 'antd'

const { Text } = Typography
const GenerateOtpModal = ({visible,onClose}) => {
    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            footer={null}
        > 
            <Flex vertical gap={10}>
                <Flex justify='end'>
                    <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex> 
                <Flex vertical align='center' gap={10}>
                    <Avatar size={54} className='bg-delete'>
                        OTP
                    </Avatar>
                    <Text className='fs-14' strong>
                        Check OTP on your WhatsApp Business Account
                    </Text>
                </Flex>
            </Flex>
        </Modal>
    )
}

export {GenerateOtpModal}