import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Flex, Form, notification, Row, Select, Spin, Tag, Typography } from 'antd'
import { BreadCrumbCard, BusinessChooseSubscriptionPlan, ConfirmModal, MyInput, UploadImage } from '../../../../components'
import { MySelect } from '../../../Forms'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessTitle, notifyError, notifySuccess, SmLoader, typeOps, useDebounce } from '../../../../shared'
import { GET_SUBSCRIBER_CUSTOMERS_LOOKUP, VERIFY_DISCOUNT } from '../../../../graphql/query'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_BUSINESS } from '../../../../graphql/mutation'


const { Title, Text } = Typography
const AddEditBusiness = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const [ api, contextHolder ] = notification.useNotification()
    const [ previewimage, setPreviewImage ] = useState(null)
    const [ confirmsubmit, setConfirmSubmit ] = useState(false)
    const [ discountData, setDiscountData ] = useState(null)
    const [ discountstatus, setDiscountStatus ] = useState(null)
    const navigate = useNavigate()
    const [subscriberCustomersLookup, setSubscriberCustomersLookup]= useState([])
    const [subscriptionValidity, setSubscriptionValidity] = useState('MONTHLY')
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan]= useState(null)
    const [ getVerifyDiscount, { loading:verifyingDiscount } ] = useLazyQuery(VERIFY_DISCOUNT,{
        fetchPolicy:'network-only',
    });
    const [createBusiness, { loading, error, success }] = useMutation(CREATE_BUSINESS, {
        onCompleted: () => {
            notifySuccess(api,t("Business Create"),t("Business has been created successfully"),
                ()=> {navigate("/allbusiness")}
            )
        },
        onError: (error) => {
            notifyError(api, error);
        },
    });
    const [getSubscriberCustomersLookup, { data }] = useLazyQuery(GET_SUBSCRIBER_CUSTOMERS_LOOKUP, {
        fetchPolicy: "network-only",
    })
   
    useEffect(()=>{
        if(getSubscriberCustomersLookup)
            getSubscriberCustomersLookup({
                variables: {
                    limit: 1000,
                    offset: 0,
                    roles: ["SUBSCRIBER"]
                }
            })

    }, [getSubscriberCustomersLookup])
    useEffect(()=>{
        if(data?.getUsers?.users?.length)
            setSubscriberCustomersLookup([...data?.getUsers?.users]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(({id, firstName, lastName}) => ({id, name: firstName + " " + lastName})))
    }, [data])

    const onFinish = async () => {
        let data = form.getFieldsValue()
        const subscriptionPrice = subscriptionValidity === 'YEARLY' ? selectedSubscriptionPlan?.yearlyPrice : selectedSubscriptionPlan?.price
        if (!previewimage) {
            notifyError(api, t('Please upload an image'));
            return;
        }
        data= {
            ...data,
            image: previewimage,
            subscriberId: subscriberCustomersLookup?.find(subscriber => subscriber?.id === data?.subscriberId)?.id,
            subscriptionId: selectedSubscriptionPlan?.id,
            subscriptionType: selectedSubscriptionPlan?.type,
            subscriptionPrice: selectedSubscriptionPlan?.type === 'ENTERPRISE' ? Number(data?.customPrice) : discountData?.finalPrice ?? subscriptionPrice,
            subscriptionValidity,
            discountCode: discountData?.discount?.id
        }
        delete data?.customPrice
        delete data?.code

        console.log("final data to submit", data)
        await createBusiness({ variables: { input: {...data} } })
    }
    useEffect(() => {
        if (selectedSubscriptionPlan && discountData?.discount?.id) {
            checkDiscountCode();
        }
    }, [selectedSubscriptionPlan]);

    const checkDiscountCode = async () => {
        const data = form.getFieldValue();
        if (!data || !data.code || data.code.trim() === "") {
            setDiscountStatus(null);
            setDiscountData(null);
            form.setFields([{ name: 'code', errors: [] }]);
            return;
        }
        try {
            setDiscountData(null);
            const res = await getVerifyDiscount({ variables: { 
                    code: data?.code, 
                    subscriberId: subscriberCustomersLookup?.find(subscriber => subscriber?.id === data?.subscriberId)?.id,
                    subscriptionId: selectedSubscriptionPlan?.id 
                } 
            });
            setDiscountStatus(res?.data?.checkDiscountCode?.isValid === true);
            setDiscountData(res?.data?.checkDiscountCode);
            if (res?.data?.checkDiscountCode?.isValid === false) {
                notifyError(api,res?.data?.checkDiscountCode?.message);
            }
        } catch (error) {
            setDiscountStatus(false);
            setDiscountData(null);
            console.error(error);
        }
    };
    return (
        <>
            {contextHolder}
            <Flex vertical gap={10}>
                <BreadCrumbCard 
                    items={[
                        { title: title },
                        { title: t("All Businesses") },
                    ]}
                />
                <Card className='card-bg card-cs radius-12 border-gray'>
                    <Flex gap={10} vertical>
                        <Flex gap={10} align="center">
                            <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/allbusiness")}>
                                {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                            </Button>
                            <Title level={4} className="fw-500 m-0">{t("Add Business")}</Title>
                        </Flex>
                        <Form layout="vertical" 
                            form={form} 
                            onFinish={onFinish} 
                        >
                            <Row gutter={16}>
                                <Col span={24} className='my-5'>
                                    <UploadImage 
                                        form={form}
                                        src={previewimage}
                                        setPreviewImage={setPreviewImage}
                                        t={t}
                                        api={api}
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyInput 
                                        label={t("Business Name")} 
                                        name="name" 
                                        required 
                                        message={t("Please enter business name")} 
                                        placeholder={t("Enter business name")} 
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MySelect 
                                        label={t("Customer Name" )}
                                        name="subscriberId" 
                                        required 
                                        message={t("Please choose customer name")} 
                                        placeholder={t("Select customer name")} 
                                        options={subscriberCustomersLookup}
                                        disabled={!subscriberCustomersLookup?.length || !subscriberCustomersLookup}
                                        filterOption={(input, option) => 
                                            option?.children?.toLowerCase().includes(input.toLowerCase())
                                        }
                                        showSearch
                                        allowClear
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MySelect 
                                        label={t("Business Type")} 
                                        name="businessType" 
                                        required 
                                        message={t("Please choose business type")} 
                                        placeholder={t("Select business type")} 
                                        options={typeOps}
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MyInput
                                        label={t("Business Number")}
                                        name="phoneNumber"
                                        required
                                        message={t("Please enter a valid business number")}
                                        addonBefore={
                                            <Select
                                                defaultValue="sa"
                                                className="w-80"
                                                onChange={(value) =>
                                                    form.setFieldsValue({
                                                    countryCode: value,
                                                    })
                                                }
                                                >
                                                <Select value="sa">
                                                    +966
                                                </Select>

                                                <Select value="ae">
                                                    +971
                                                </Select>
                                            </Select>
                                        }
                                        placeholder={t("Please enter phone number")}
                                        className='w-100'
                                        type={'number'}
                                        min={0}
                                        maxLength={20}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 20);
                                        }}
                                        validator={
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value) {
                                                        return Promise.resolve();
                                                    }
                                                    const phoneLength = value.toString().length;
                                                    if (phoneLength < 9 || phoneLength > 20) {
                                                        return Promise.reject(new Error(t("Phone number must be between 9 and 20 digits")));
                                                    }
                                                    return Promise.resolve();
                                                }
                                            })
                                        }
                                    />
                                </Col>
                                <Col span={24} md={12}>
                                    <MyInput 
                                        label={t("Website (optional)")} 
                                        name="websiteLink" 
                                        placeholder={t("Enter website link")} 
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyInput
                                        label={t("Discount Code")}
                                        name="code"
                                        placeholder={t("Enter discount code")}
                                        className="w-100"
                                        onChange={(e) => {
                                            setDiscountStatus(null);
                                            if (e.target.value === "") {
                                                setDiscountData(null)
                                            }
                                        }}
                                        suffix={
                                            <Flex align='center' gap={2}>
                                                {verifyingDiscount && <Spin {...SmLoader} size="small" />}

                                                {discountstatus !== null && !verifyingDiscount && (
                                                discountstatus ? (
                                                    <Text className="text-green fs-12">{t("Valid")}</Text>
                                                ) : (
                                                    <Text className="text-red fs-12">{t("Invalid")}</Text>
                                                )
                                                )}
                                                <Tag onClick={checkDiscountCode} className='cursor'>{t('Check')}</Tag>
                                            </Flex>
                                        }
                                        disabled={!Form.useWatch("subscriberId", form)}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Title level={5} className='fw-500 my-3'>{t("Choose Subscription Plan")}</Title>
                                </Col> 
                                <Col span={24}>
                                    <BusinessChooseSubscriptionPlan 
                                        {...{subscriptionValidity, setSubscriptionValidity, selectedSubscriptionPlan, setSelectedSubscriptionPlan, discountData}}
                                    />
                                </Col>
                                <Col span={24}> 
                                    <Divider className='bg-divider' />
                                </Col>
                                <Col span={24}>
                                    <Flex justify='end' gap={5} >
                                        <Button type='button' onClick={()=>navigate('/allbusiness')} className='btncancel text-black border-gray' >
                                            {t("Cancel")}
                                        </Button>
                                        <Button loading={loading} onClick={()=>setConfirmSubmit(true)} className={`btnsave border-0 text-white brand-bg`}>
                                            {/* {edititem?'Update':'Save'} */}
                                            {t("Save")}
                                        </Button>
                                    </Flex>
                                </Col>
                            </Row>
                        </Form>
                    </Flex>
                </Card>
            </Flex>

            <ConfirmModal 
                type={'danger'}
                visible={confirmsubmit}
                title={'Are you sure?'}
                subtitle={'Please confirm that all business details are correct and a subscription plan is assigned before proceeding.'}
                onClose={()=>setConfirmSubmit(false)}
                onConfirm={()=>{form.submit();setConfirmSubmit(false)}}
                loading={loading}
            />
        </>
    )
}

export {AddEditBusiness}