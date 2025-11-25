import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client/react'
import { CREATE_FAQS } from '../../../../graphql/mutation'

const { Title, Text } = Typography
const AddEditFaqs = ({visible,onClose,edititem,refetch}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ createFaqs, { loading: creating, error } ] = useMutation(CREATE_FAQS,{
        onCompleted: async () => {
            await refetch();
            onClose();     
        }
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
        // const input = {
        //     code: data.code,
        //     group: data.group?.toUpperCase() || null,
        //     discountType: data.discountType?.toUpperCase() || null,
        //     value: data.value ? Number(data.value) : 0,
        //     packageType: data.packageType?.toUpperCase() || "",
        //     usageLimit: data.usageLimit ? Number(data.usageLimit) : 0,
        //     startDate: data.startDate,
        //     expiryDate: data.expiryDate
        // };
        try {
            if (edititem?.id) {
                await updateDiscounts({
                    variables: {
                        editDiscountId: edititem.id,
                        input
                    }
                });
                messageApi.success("Faqs updated successfully!");
            } else {
                await createFaqs({
                    variables: { input }
                });
                messageApi.success("Faqs created successfully!");
            }
            await refetch();
            onClose();
        } catch (e) {
            console.error(e);
            message.error("Something went wrong!");
        }
    }
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
                    <Button type="primary" loading={creating} className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
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
                    // onFinish={} 
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
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditFaqs}