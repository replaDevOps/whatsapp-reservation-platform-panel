import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, message, Modal, notification, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client/react'
import { CREATE_FAQS, UPDATE_FAQS } from '../../../../graphql/mutation'
import { notifyError, notifySuccess } from '../../../../shared'

const { Title, Text } = Typography
const AddEditFaqs = ({visible,onClose,edititem,refetch}) => {

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const {t} = useTranslation()
    const [ updateFaqs, {loading: updating} ] = useMutation(UPDATE_FAQS,{
        onCompleted: ()=> {
            notifySuccess(api,t("FAQ Update"),t("FAQ has been updated successfully"),()=>{refetch()});
            onClose()
        },onError: (error)=> {notifyError(api,error)}
    })
    const [ createFaqs, { loading: creating, error } ] = useMutation(CREATE_FAQS,{
        onCompleted: ()=> {
            notifySuccess(api,t("FAQ Create"),t("FAQ has been created successfully"),()=>{refetch();onClose()});
            onClose()
        },onError: (error)=> {notifyError(api,error)}
    })
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                question: edititem?.question,
                answer: edititem?.answer,
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])

    const CreateUpdateFaqs = async() => {
        const input = form.getFieldsValue()
        try {
            if (edititem?.id) {
                await updateFaqs({
                    variables: {
                        updateFaqId: edititem.id,
                        input
                    }
                });
            } else {
                await createFaqs({
                    variables: { input }
                });
            }
        } catch (e) {
            console.error(e);
            notifyError(e);
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
                        <Button type="primary" loading={creating || updating} className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                            {t(edititem?'Update':'Save')}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex vertical>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                {t(edititem? 'Edit Question' : 'Add Question')}
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex> 
                        <Text className='fs-13 text-gray'>
                            {
                                t(edititem 
                                ? 
                                'Edit a question and its answer to help users better understand how Qloop works.' 
                                : 
                                'Enter a question and its answer to help users better understand how Qloop works.')
                            }
                        </Text>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={CreateUpdateFaqs} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Question")} 
                                    name="question" 
                                    required
                                    message={t('Please enter question')}
                                    placeholder={t('Enter question')}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    textArea
                                    label={t("Answer")} 
                                    name="answer" 
                                    required
                                    message={t('Please enter answer')}
                                    placeholder={t('Enter answer')}
                                    rows={5}
                                    showCount 
                                    maxLength={500}
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

export {AddEditFaqs}