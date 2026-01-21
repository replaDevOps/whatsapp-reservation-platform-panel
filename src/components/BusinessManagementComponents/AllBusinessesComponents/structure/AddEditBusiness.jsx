import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Divider, Flex, Form, notification, Row, Select, Typography } from 'antd'
import { BreadCrumbCard, BusinessChooseSubscriptionPlan, ConfirmModal, MyInput, SingleFileUpload } from '../../../../components'
import { MySelect } from '../../../Forms'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessTitle, notifyError, notifySuccess, typeOps } from '../../../../shared'
import { GET_SUBSCRIBER_CUSTOMERS_LOOKUP } from '../../../../graphql/query'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_BUSINESS } from '../../../../graphql/mutation'

const { Title } = Typography
const AddEditBusiness = () => {

    const [form] = Form.useForm();
    const {t,i18n} = useTranslation()
    const title = BusinessTitle({t})
    const [ api, contextHolder ] = notification.useNotification()
    const [ previewimage, setPreviewImage ] = useState(null)
    const [ confirmsubmit, setConfirmSubmit ] = useState(false)
    const navigate = useNavigate()

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
    const [subscriberCustomersLookup, setSubscriberCustomersLookup]= useState([])
    const [subscriptionValidity, setSubscriptionValidity] = useState('MONTHLY')
    const [selectedSubscriptionPlan, setSelectedSubscriptionPlan]= useState(null)
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
            setSubscriberCustomersLookup(data?.getUsers?.users?.map(({id, firstName, lastName}) => ({id, name: firstName + " " + lastName})))
    }, [data])

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    const onFinish = async () => {
        let data = form.getFieldsValue()
        console.log("data:", data)
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
            subscriptionPrice: selectedSubscriptionPlan?.type === 'ENTERPRISE' ? Number(data?.customPrice): subscriptionValidity === 'YEARLY' ? selectedSubscriptionPlan?.price*12 : selectedSubscriptionPlan?.price,
            subscriptionValidity
        }
        delete data?.customPrice
        await createBusiness({ variables: { input: {...data} } })
    }
    console.log("subscriberCustomersLookup:", data)
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
                                    {
                                        !previewimage ?
                                        <SingleFileUpload
                                            name="image"
                                            title={t("Upload Logo")}
                                            form={form}
                                            onUpload={(file)=> uploadFileToServer({file,setPreviewImage})}
                                            align="center"
                                            width={100}
                                            height={100}
                                        />
                                        :
                                        <Flex vertical gap={5} justify='center' align='center'>
                                            <img
                                                src={previewimage}
                                                alt="Category"
                                                className='radius-12 mxw-mxh'
                                                fetchPriority="high"
                                            />
                                            <div>
                                                <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                                    <EditFilled /> {t("Edit")}
                                                </Button>
                                            </div>
                                        </Flex>

                                    }
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
                                                <Select.Option value="sa">
                                                    +966
                                                </Select.Option>

                                                <Select.Option value="ae">
                                                    +971
                                                </Select.Option>
                                            </Select>
                                        }
                                        placeholder={t("Please enter phone number")}
                                        className='w-100'
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
                                        name="discountCode"
                                        placeholder={t("Enter discount code")}
                                        className="w-100"
                                    />
                                </Col>
                                <Col span={24}>
                                    <Title level={5} className='fw-500 my-3'>{t("Choose Subscription Plan")}</Title>
                                </Col> 
                                <Col span={24}>
                                    <BusinessChooseSubscriptionPlan 
                                        {...{subscriptionValidity, setSubscriptionValidity, selectedSubscriptionPlan, setSelectedSubscriptionPlan}}
                                    />
                                </Col>
                                <Col span={24}> 
                                    <Divider className='bg-divider' />
                                </Col>
                                <Col span={24}>
                                    <Flex justify='end' gap={5} >
                                        <Button type='button' className='btncancel text-black border-gray' >
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