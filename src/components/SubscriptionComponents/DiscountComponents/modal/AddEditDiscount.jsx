import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { capitalizeTranslated, customertypeOp, notifyError, notifySuccess, promoType, validityOp } from '../../../../shared'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_DISCOUNTS, UPDATE_DISCOUNTS } from '../../../../graphql/mutation/mutations'
import dayjs from 'dayjs'
import { GET_PLANS_LOOKUPS } from '../../../../graphql/query'

const { Title, Text } = Typography
const AddEditDiscount = ({visible,onClose,edititem,refetch}) => {

    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [ api, contextHolder ] = notification.useNotification()
    const [ selectDiscountType, setSelectDiscountType ] = useState(null)
    const {data} = useQuery(GET_PLANS_LOOKUPS,{
        fetchPolicy:'network-only'
    })
    const [ updateDiscounts, {loading: updating} ] = useMutation(UPDATE_DISCOUNTS,{
        onCompleted: () => {notifySuccess(api,t("Discount Update"),t("Discount has been updated successfully"));refetch();onClose()},
        onError: (error) => {notifyError(api, error);},
    })
    const [ createDiscount, { loading: creating } ] = useMutation(CREATE_DISCOUNTS,{
        onCompleted: () => {notifySuccess(api,t("Discount Create"),t("Discount has been created successfully"));refetch();onClose()},
        onError: (error) => {notifyError(api, error);},
    })
    

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                code: edititem?.code,
                group: capitalizeTranslated(edititem?.group),
                subscriptionIds: edititem?.applicableSubscriptions?.map((list)=> list?.id),
                discountType: capitalizeTranslated(edititem?.discountType),
                value: edititem?.value,
                usageLimit: edititem?.usageLimit,
                validity: edititem?.validity?.map(list => list),
                startDate: dayjs(edititem?.startDate,'YYYY/MM/DD'),
                expiryDate: dayjs(edititem?.expiryDate,'YYYY/MM/DD'),
            })
            setSelectDiscountType(edititem?.discountType)
        }
        else {
            form.resetFields()
            setSelectDiscountType(null)
        }
    },[visible,edititem])
    

    const AddEditDiscounts = async () => {
        const data = form.getFieldsValue();

        if (data.startDate && data.expiryDate) {
            if (data.startDate.isAfter(data.expiryDate)) {
                notifyError(api, t("Start date cannot be greater than expiry date"));
                return;
            }
        }
        
        const input = {
            code: data.code,
            group: data.group?.toUpperCase() || null,
            discountType: data.discountType?.toUpperCase() || null,
            value: data.value ? Number(data.value) : 0,
            subscriptionIds: data.subscriptionIds || [],
            usageLimit: data.usageLimit ? Number(data.usageLimit) : 0,
            validity: data?.validity,
            startDate: dayjs(data.startDate).format('YYYY/MM/DD'),
            expiryDate: dayjs(data.expiryDate).format('YYYY/MM/DD')
        };
        console.log('discount input:', input)
        // return 
        try {
            if (edititem?.id) {
                await updateDiscounts({variables: {editDiscountId: edititem.id,input}});
            } else {
                await createDiscount({
                    variables: { input }
                });
            }
        } catch (e) {
            console.error(e);
        }
    };


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
                        <Button type="primary" loading={creating || updating}  onClick={()=>form.submit()} className='btnsave border0 text-white brand-bg'>
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
                                    mode={'multiple'}
                                    label={t("Subscription Plan Type")} 
                                    name="subscriptionIds" 
                                    required
                                    message={t('Choose subscription plan type')}
                                    options={data?.getSubscriptions?.map((items)=>({
                                        id: items?.id,
                                        name: capitalizeTranslated(items?.type)
                                    }))}
                                    placeholder={t('Choose plan type')}
                                    showSearch={false}
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
                                    onChange={(id)=>{setSelectDiscountType(id)}}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Value")} 
                                    name="value" 
                                    required
                                    message={t('Please enter value')}
                                    placeholder={t('Enter value')}
                                    suffix={(((selectDiscountType ?? edititem?.discountType) || '').toUpperCase() === 'PERCENTAGE') ? '%' : null}
                                    min={0}
                                    type={'number'}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t("Limit")} 
                                    name="usageLimit" 
                                    required
                                    message={t('Please enter limit')}
                                    placeholder={t('Enter limit')}
                                    min={0}
                                    type={'number'}
                                />
                            </Col>
                            <Col span={24}>
                                <MySelect 
                                    mode={'multiple'}
                                    label={t("Validity")} 
                                    name="validity" 
                                    required
                                    message={t('Please choose validity')}
                                    options={validityOp}
                                    placeholder={t('Choose validity type')}
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
                                    disabledDate={(value)=> value && value  < dayjs().startOf('day')}
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
                                    disabledDate={(value)=> value && value < dayjs().startOf('day')}
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

export {AddEditDiscount}