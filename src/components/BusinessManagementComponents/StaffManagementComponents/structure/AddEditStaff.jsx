import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, EditFilled} from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, message, notification, Row, Select, Spin, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MySelect, SingleFileUpload} from '../../../Forms'
import { BusinessTitle, notifyError, notifySuccess, rolestaffopt, TableLoader, toArabicDigits } from '../../../../shared'
import { BreadCrumbCard } from '../../../Ui'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_STAFF, UPDATE_STAFF } from '../../../../graphql/mutation/mutations'
import { GET_STAFFS_BY_ID } from '../../../../graphql/query'
import imageCompression from 'browser-image-compression';

const { Title } = Typography
const AddEditStaff = () => {

    const navigate = useNavigate()
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar';
    const title = BusinessTitle({t})
    const [form] = Form.useForm();
    const { id } = useParams()
    const [ api, contextHolder ] = notification.useNotification()
    const [ previewimage, setPreviewImage ] = useState(null)
    const [createstaff, { loading: creating, error }] = useMutation(CREATE_STAFF,{
        onCompleted:()=>{notifySuccess(api,"Staff Create","Staff created successfully",()=> {navigate("/staff")})},
        onError: (error) => {notifyError(api, error);},
    });
    const [updatestaff, {loading: updating}] = useMutation(UPDATE_STAFF,{
        onCompleted:()=>{
            notifySuccess(
                api,
                "Staff Update",
                "Staff updated successfully",
                ()=>{navigate("/staff")}
            )
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
            console.log('staff single id',data?.getUser?.id)
        }
    }, [loading, data]);

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    const uploadFileToServer = async (file) => {
        try {
            let compressedFile = file;
    
            // Compress only if image
            if (file.type.startsWith("image/")) {
                compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                });
            }
    
            const formData = new FormData();
            formData.append("file", compressedFile);
    
            const res = await fetch("https://backend.qloop.me/upload", {
                method: "POST",
                body: formData,
            });
    
            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            setPreviewImage(data.fileUrl);
            return {
                fileName: data.fileName,
                fileType: data.fileType,
                filePath: data.fileUrl,
            };
    
        } catch (err) {
            console.error("Upload error:", err);
            message.error("Failed to upload file");
            throw err;
        }
    };
    const AddEditStaff = async () => {
        const data = form.getFieldsValue();
        const input = {
            ...data,
            imageUrl: previewimage,
        }
        try {
            if (id) {
                await updatestaff({
                    variables: {
                        input:{
                            id,
                            ...input
                        }
                    }
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
                    <Flex justify='center' align='center'>
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
                                            data?.getUser?.firstName?.charAt(0)?.toUpperCase() +
                                            data?.getUser?.firstName?.slice(1)
                                            + ' ' + 
                                            data?.getUser?.lastName 
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
                                                onUpload={uploadFileToServer}
                                                align="center"
                                                width={100}
                                                height={100}
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
                                            placeholder="3445592382"
                                            value={form.getFieldValue("phone") || ""}
                                            className='w-100'
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MyInput 
                                            label={t("Email Address")} 
                                            name="email" 
                                            required 
                                            message={t("Please enter email address")} 
                                            placeholder={t("Enter email address")} 
                                        />
                                    </Col>
                                    <Col span={24} md={12}>
                                        <MyInput 
                                            type='password'
                                            label={"Password"} 
                                            name="password" 
                                            required
                                            message={t("Please enter password")} 
                                            placeholder={t("Enter password")} 
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
                                            <Button type='button' className='btncancel text-black border-gray' >
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