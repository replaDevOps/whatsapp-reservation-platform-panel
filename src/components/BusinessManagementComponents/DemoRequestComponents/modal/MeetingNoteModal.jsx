import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { notifySuccess, notifyError } from '../../../../shared';
import { UPDATE_DEMO_REQUEST } from '../../../../graphql/mutation/mutations';

const { Title } = Typography
const MeetingNoteModal = ({visible,onClose,refetch,id}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()    
    const [updateDemo, { loading }] = useMutation(UPDATE_DEMO_REQUEST,{
        onCompleted:()=>{notifySuccess(api,t("Demo Request Status Update"),t("Demo request status has been updated successfully."),()=> {refetch()});onClose()},
        onError: (error) => {notifyError(api, error);},
    });

    const onFinish = async() => {
        const input = form.getFieldsValue()
        try{
            await updateDemo({
                variables:{
                    input:{id,...input}
                }
            })
        } catch (e){
            console.error(e); 
        }
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
                        <Button type="primary" loading={loading} className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                            {t("Save")}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t("Book a Demo - Meeting Note")}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={onFinish} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <MyInput 
                                    textArea
                                    label={t("Note")} 
                                    name="note" 
                                    required 
                                    message={t("Please enter note")} 
                                    placeholder={t("Add notes")} 
                                    rows={5}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Divider className='my-2 bg-light-brand' />
            </Modal>
        </>
    )
}

export {MeetingNoteModal}