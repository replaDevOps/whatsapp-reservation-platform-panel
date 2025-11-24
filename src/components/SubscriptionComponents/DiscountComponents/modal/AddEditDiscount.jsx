import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, message, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { customertypeOp, promoType, subscriptionplanOp } from '../../../../shared'
import { useTranslation } from 'react-i18next'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_DISCOUNTS, UPDATE_DISCOUNTS } from '../../../../graphql/mutation/mutations'
import { GET_DISCOUNTS } from '../../../../graphql/query/discount'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const AddEditDiscount = ({visible,onClose,edititem,messageApi}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ getDiscounts ] = useLazyQuery(GET_DISCOUNTS,{
        fetchPolicy: 'network-only'
    })
    const [ updateDiscounts ] = useMutation(UPDATE_DISCOUNTS)
    const [ createDiscount, { loading, error } ] = useMutation(CREATE_DISCOUNTS,{
        onCompleted:()=> {
            getDiscounts({
                variables: {
                    limit: 20,
                    offset: 0,
                }
            })
            onClose()
        }
    })

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                code: edititem?.code,
                group: edititem?.group?.charAt(0)?.toUpperCase() + edititem?.group?.slice(1).toLowerCase(),
                packageType: edititem?.packageType?.charAt(0)?.toUpperCase() + edititem?.packageType?.slice(1).toLowerCase(),
                discountType: edititem?.discountType?.charAt(0)?.toUpperCase() + edititem?.discountType?.slice(1).toLowerCase(),
                value: edititem?.value,
                usageLimit: edititem?.usageLimit,
                startDate: dayjs(edititem?.startDate,'YYYY/MM/DD'),
                expiryDate: dayjs(edititem?.expiryDate,'YYYY/MM/DD'),
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])

    useEffect(()=>{
        if(error){
            message.error(  "Something went wrong")
        }
     }, [error])


    const AddEditDiscounts = async () => {
        const data = form.getFieldsValue();
        const input = {
            code: data.code,
            group: data.group?.toUpperCase() || null,
            discountType: data.discountType?.toUpperCase() || null,
            value: data.value ? Number(data.value) : 0,
            packageType: data.packageType?.toUpperCase() || "",
            usageLimit: data.usageLimit ? Number(data.usageLimit) : 0,
            startDate: data.startDate,
            expiryDate: data.expiryDate
        };
        try {
            if (edititem?.id) {
                await updateDiscounts({
                    variables: {
                        editDiscountId: edititem.id,
                        input
                    }
                });
                messageApi.success("Discount updated successfully!");
            } else {
                await createDiscount({
                    variables: { input }
                });
                messageApi.success("Discount created successfully!");
            }
            getDiscounts({
                variables: {
                    limit: 20,
                    offset: 0,
                }
            });
            onClose();
        } catch (e) {
            console.error(e);
            message.error("Something went wrong!");
        }
    };


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
                    <Button type="primary" loading={loading}  onClick={()=>form.submit()} className='btnsave border0 text-white brand-bg'>
                        {t(edititem?'Update':'Confirm & Save')}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t(edititem? edititem?.code : 'Add Discount')}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {
                            t(edititem ? 'Edit discount details in your system.' : 'Add a new discount in your system.')
                        }
                    </Text>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    onFinish={AddEditDiscounts} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label={t("Discount Code")} 
                                name="code" 
                                required
                                message={t('Please enter discount code')}
                                placeholder={t('Enter discount code')}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Group")} 
                                name="group" 
                                required
                                message={t('Please choose group')}
                                options={customertypeOp}
                                placeholder={t('Choose group')}
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                // mode={'multiple'}
                                label={t("Subscription Plan Type")} 
                                name="packageType" 
                                required
                                message={t('Choose subscription plan type')}
                                options={subscriptionplanOp}
                                placeholder={t('Choose plan type')}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={t("Discount Type")} 
                                name="discountType" 
                                required
                                message={t('Please choose discount type')}
                                options={promoType}
                                placeholder={t('Choose discount type')}
                                
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Value")} 
                                name="value" 
                                required
                                message={t('Please enter value')}
                                placeholder={t('Enter value')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t("Limit")} 
                                name="usageLimit" 
                                required
                                message={t('Please enter limit')}
                                placeholder={t('Enter limit')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Start Date')}
                                name='startDate'
                                required
                                message={t('Please select start date')}
                                placeholder={t('Select date')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Expiry Date')}
                                name='expiryDate'
                                placeholder={t('Select date')}
                                required
                                message={t('Please select expiry date')}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditDiscount}