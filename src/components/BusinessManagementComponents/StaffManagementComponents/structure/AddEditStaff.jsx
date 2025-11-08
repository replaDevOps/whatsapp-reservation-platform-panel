import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Row, Select, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MySelect, SingleFileUpload } from '../../../Forms'
import { stafftableData } from '../../../../data'
import { BusinessTitle, rolestaffopt, toArabicDigits } from '../../../../shared'
import { BreadCrumbCard } from '../../../Ui'
import { useTranslation } from 'react-i18next'

const { Title } = Typography
const AddEditStaff = () => {

    const navigate = useNavigate()
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar';
    const title = BusinessTitle({t})
    const [form] = Form.useForm();
    const { id } = useParams()
    const editdetail = stafftableData?.find((list)=>list?.key === Number(id))
    const [ previewimage, setPreviewImage ] = useState(null)


    useEffect(()=>{
        if(id && editdetail){
            form.setFieldsValue({
                name: editdetail?.staffName,
                phoneNo: editdetail?.phoneNo,
                email: editdetail?.email,
                role: editdetail?.role,
            })
            setPreviewImage(editdetail?.img)
        }
    },[id, editdetail])

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Staffs') },
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staff")}>
                            {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                        </Button>
                        <Title level={4} className="fw-500 m-0">{ editdetail ? editdetail?.staffName : t('Add Staff') }</Title>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} className='my-5'>
                                {
                                    !previewimage ?
                                    <SingleFileUpload
                                        name="document"
                                        title={t("Upload Image")}
                                        form={form}
                                        onUpload={(file) => console.log("uploading:", file)}
                                        align="center"
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
                            <Col span={24} md={12}>
                                <MyInput 
                                    label={t("Name")} 
                                    name="name" 
                                    required 
                                    message={t("Please enter name")} 
                                    placeholder={t("Enter name")} 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label={t("Phone Number")}
                                    name="phoneNo"
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
                                    value={form.getFieldValue("phoneNo") || ""}
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
                            <Col span={24}>
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
                                    <Button htmlType='submit' className={`btnsave border-0 text-white brand-bg`}>
                                        {t(editdetail ? 'Update':'Save')}
                                    </Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
        </Flex>
    )
}

export {AddEditStaff}