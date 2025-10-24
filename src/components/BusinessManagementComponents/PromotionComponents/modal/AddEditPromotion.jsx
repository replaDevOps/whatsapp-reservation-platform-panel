import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyDatepicker, MyInput, MySelect, SingleFileUpload } from '../../../Forms'
import { promoType } from '../../../../shared'
import moment from 'moment'

const { Title, Text } = Typography
const AddEditPromotion = ({visible,onClose,edititem}) => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [ previewimage, setPreviewImage ] = useState(null)


    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                name: edititem?.name,
                promoType: edititem?.promoType,
                value: edititem?.value,
                limit: edititem?.limit,
                branch: edititem?.assigned ? edititem?.assigned : null,
                startDate: moment(edititem?.startDate, 'M/D/YY'),
                expiryDate: moment(edititem?.endDate, 'M/D/YY'),
            })
            setPreviewImage(edititem?.img)
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])

    const handleChangeImage = () => {
        setPreviewImage(null);
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
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        {edititem?'Update':'Save'}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0} className='mb-2'>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            { edititem ? edititem?.name : 'Add a Promotion' }
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>                
                    <Text className='fs-13 text-gray'>
                        Add a new promotion to your business.
                    </Text>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            {
                                !previewimage ?
                                <SingleFileUpload
                                    name="document"
                                    label='Upload Promo Image'
                                    title="Upload Image"
                                    form={form}
                                    onUpload={(file) => console.log("uploading:", file)}
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
                                            <EditFilled /> Edit
                                        </Button>
                                    </div>
                                </Flex>

                            }
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Promo Name" 
                                name="name" 
                                required 
                                message="Please enter promo name" 
                                placeholder="Enter promotion name" 
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label={'Promo Type'}
                                name={'promoType'}
                                required 
                                message="Please choose promo type" 
                                options={promoType}
                                placeholder='Choose Type'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Value" 
                                name="value" 
                                required 
                                message="Please enter value" 
                                placeholder="Enter value" 
                                addonAfter='SAR'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Limit" 
                                name="limit" 
                                required 
                                message="Please enter limit" 
                                placeholder="Enter limit" 
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                mode={'multiple'}
                                label={'Branch'}
                                name={'branch'}
                                required 
                                message="Please choose branch" 
                                options={[
                                    {
                                        id: 1,
                                        name: 'Branch Name'
                                    },
                                    {
                                        id: 2,
                                        name: 'Branch Name 2'
                                    }
                                ]}
                                placeholder='Choose branch'
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label='Start Date'
                                name='startDate'
                                required
                                message={'Please enter start date'}
                                placeholder='Select date'
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label='Expiry Date'
                                name='expiryDate'
                                required
                                message={'Please enter expiry date'}
                                placeholder='Select date'
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditPromotion}