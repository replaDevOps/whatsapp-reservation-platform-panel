import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput } from '../../../Forms'
import { useTranslation } from 'react-i18next'

const { Title } = Typography
const AddVacationModal = ({visible,onClose,view}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    useEffect(()=>{
        if(visible && view){
            form.setFieldsValue({
                name: view,
            })
        }
        else {
            form.resetFields()
        }
    },[visible,view])
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg'>
                        {t("Save")}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t("Add Vacation")}
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
                                label={t("Staff Name")} 
                                name="name" 
                                disabled
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t("Start Date")}
                                name='startDate'
                                required
                                message={t("Please select start date")}
                                placeholder={t("Select date")}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('End Date')}
                                name='endDate'
                                required
                                message={t('Please select end date')}
                                placeholder={t('Select date')}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddVacationModal}