import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, EditFilled} from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, message, notification, Row, Select, Spin, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MySelect, SingleFileUpload} from '../../../Forms'
import { BusinessTitle, capitalizeTranslated, notifyError, notifySuccess, rolestaffopt, TableLoader, toArabicDigits, uploadFileToServer } from '../../../../shared'
import { BreadCrumbCard } from '../../../Ui'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_STAFF, UPDATE_STAFF } from '../../../../graphql/mutation/mutations'
import { GET_STAFFS_BY_ID } from '../../../../graphql/query'

const { Title } = Typography
const AddEditStaff = () => {

    const navigate = useNavigate()
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar';
    const title = BusinessTitle({t})
    const [form] = Form.useForm();
    const { id } = useParams()
    const [messageApi] = message.useMessage();
    const [ api, contextHolder ] = notification.useNotification()
    const [ previewimage, setPreviewImage ] = useState(null)
    const [createstaff, { loading: creating }] = useMutation(CREATE_STAFF,{
        onCompleted:()=>{notifySuccess(api,t("Staff Create"),t("Staff has been created successfully."),()=> {navigate("/staff")})},
        onError: (error) => {notifyError(api, error);},
    });
    const [updatestaff, {loading: updating}] = useMutation(UPDATE_STAFF,{
        onCompleted:()=>{
            notifySuccess(api,t("Staff Update"),t("Staff has been updated successfully."),()=>{navigate("/staff")})
        },
        onError: (error) => {
            notifyError(api, error);
        },
    });
    const { data, loading } = useQuery(GET_STAFFS_BY_ID, {
        variables: { getUserId: id },
        skip: !id,
    });
    useEffect(() => {
        if (!loading && data) {
            form.setFieldsValue({
                firstName: data?.getUser?.firstName,
                lastName: data?.getUser?.lastName,
                phone: data?.getUser?.phone,
                email: data?.getUser?.email,
                role: data?.getUser?.role,
            });
            setPreviewImage(data?.getUser?.imageUrl);
        }
    }, [loading, data]);

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    const AddEditStaff = async () => {
        const data = form.getFieldsValue();
        if(!previewimage){
            notifyError(api,t("Please upload image"))
            return;
        }
        const input = {
            ...data,
            imageUrl: previewimage,
        };
        
        try {
            if (id) {
                await updatestaff({
                    variables: { input: { id, ...input } }
                });
            } else {
                await createstaff({
                    variables: { input }
                });
            }
        } catch (e) {
            console.error(e);
        }        
    };

    useEffect(() => {
        form.resetFields();
    }, [i18n.language]);

    return (
        <>
            {contextHolder}
            <Flex vertical gap={10} className='position-relative'>
                <BreadCrumbCard 
                    items={[
                        { title: title },
                        { title: t('Staffs') },
                    ]}
                />
                {
                    loading ?
                    <Flex justify='center' align='center' className='h-100vh'>
                        <Spin {...TableLoader} size="large" />
                    </Flex>
                    :
                    <Card className='card-bg card-cs radius-12 border-gray'>
                        <Flex gap={10} vertical>
                            <Flex gap={10} align="center" className='mb-3'>
                                <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staff")}>
                                    {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                                </Button>
                                <Title level={4} className="fw-500 m-0">
                                    { 
                                        data?.getUser?.id ? 
                                        (
                                            capitalizeTranslated(data?.getUser?.firstName)
                                            + ' ' + 
                                            capitalizeTranslated(data?.getUser?.lastName)
                                             
                                        )
                                        : 
                                        t('Add Staff') 
                                    }
                                </Title>
                            </Flex>
                            <Form layout="vertical" 
                                form={form} 
                                onFinish={AddEditStaff} 
                                requiredMark={false}
                            >
                                <Row gutter={16}>
                                    <Col span={24} className='my-5'>
                                        {
                                            !previewimage ?
                                            <SingleFileUpload
                                                name="image"
                                                title={t("Upload Image")}
                                                form={form}
                                                onUpload={(file)=>uploadFileToServer({file,setPreviewImage})}
                                                align="center"
                                                width={100}
                                                height={100}
                                                acceptFileType='image'
                                            />
                                            :
                                            <Flex vertical gap={5} justify='center' align='center'>
                                                <img
                                                    src={previewimage}
                                                    alt="staff-image"
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
                                    <Col span={24} md={12}>
                                        <MyInput 
                                            label={t("First Name")} 
                                            name="firstName" 
                                            required 
                                            message={t("Please enter first name")} 
                                            placeholder={t("Enter first name")} 
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MyInput 
                                            label={t("Last Name")} 
                                            name="lastName" 
                                            required 
                                            message={t("Please enter last name")} 
                                            placeholder={t("Enter last name")} 
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MyInput
                                            label={t("Phone Number")}
                                            name="phone"
                                            required
                                            message={t("Please enter a valid phone number")}
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
                                                        +{isArabic ? toArabicDigits(966) : 966}
                                                    </Select.Option>

                                                    <Select.Option value="ae">
                                                        +{isArabic ? toArabicDigits(971) : 971}
                                                    </Select.Option>
                                                </Select>
                                            }
                                            className="w-100"
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
                                            label={t("Email Address")} 
                                            name="email" 
                                            required 
                                            message={t("Please enter email address")} 
                                            placeholder={t("Enter email address")} 
                                            validator={
                                                {
                                                    type: 'email',
                                                    message: t("Please enter a valid email format"),
                                                }
                                            }
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MyInput 
                                            type='password'
                                            label={t("Password")} 
                                            name="password" 
                                            required={!data}
                                            message={()=>{}} 
                                            placeholder={t("Enter password")} 
                                            validator={({ getFieldValue }) => ({
                                                validator: (_, value) => {
                                                    const reg = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
                                                    if (!reg.test(value)) {
                                                        return Promise.reject(new Error(t('Password should contain at least 8 characters, one uppercase letter, one number, one special character')));
                                                    } else {
                                                        return Promise.resolve();
                                                    }
                                                }
                                            })}
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MySelect 
                                            label={t('Role')}
                                            name={'role'}
                                            required
                                            message={t('Please choose role')}
                                            options={rolestaffopt}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Flex justify='end' gap={5} >
                                            <Button type='button' onClick={()=>navigate('/staff')} className='btncancel text-black border-gray' >
                                                {t("Cancel")}
                                            </Button>
                                            <Button htmlType='submit' loading={creating || updating } className={`btnsave border-0 text-white brand-bg`}>
                                                {t(data?.id ? 'Update':'Save')}
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Form>
                        </Flex>
                    </Card>
                }
            </Flex>
            
        </>
    )
}

export {AddEditStaff}