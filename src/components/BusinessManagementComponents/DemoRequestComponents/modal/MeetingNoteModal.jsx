import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';

const { Title } = Typography
const MeetingNoteModal = ({visible,onClose}) => {

    const [form] = Form.useForm();

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
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        Save
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        Book a Demo - Meeting Note
                    </Title>
                    <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                textArea
                                label="Note" 
                                name="note" 
                                required 
                                message="Please enter note" 
                                placeholder="Add notes" 
                                rows={5}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {MeetingNoteModal}