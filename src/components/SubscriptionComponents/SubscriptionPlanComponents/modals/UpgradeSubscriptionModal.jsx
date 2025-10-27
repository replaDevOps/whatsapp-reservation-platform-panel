import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import { Modal, Typography, Button, Flex, Card, Form, Col, Row, Divider, Image, Radio } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms';
import { periodoption, planoption } from '../../../../shared';
import { pricingData } from '../../../../data';

const { Title, Text } = Typography
const UpgradeSubscriptionModal = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
    const [selectedPlan, setSelectedPlan] = useState(pricingData[0]);
    const handleChange = (e) => {
        const selectedkey = e.target.value;
        const planobj = pricingData?.find((item) => item?.id === selectedkey)
        setSelectedPlan(planobj)
    }

    useEffect(()=>{
        if(visible && edititem) {
            form.setFieldsValue({
                subplan: edititem?.subplan,
                period: edititem?.period
            })
        }
    },[visible, edititem])

    return (
        <>
           <Modal 
                width={750}  
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
                        <Button type="primary" className='btnsave border0 text-white brand-bg'>
                            Confirm
                        </Button>
                    </Flex>
                }
            >
                <Flex vertical gap={10}>
                    <Flex vertical gap={0} className='mb-2'>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                Upgrade Subscription Plan
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex>                
                        <Text className='fs-13 text-gray'>
                            Assign a new package to your business or switch from the current plan.
                        </Text>
                    </Flex>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark={false}
                    >
                        <Flex vertical gap={10}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <MySelect
                                        label='Subscription Plan'
                                        name='subplan'
                                        required
                                        message={'Please choose subscription plan'}
                                        placeholder='Select subscription plan'
                                        options={planoption}
                                    />
                                </Col>
                                <Col span={24}>
                                    <MySelect
                                        label='Period'
                                        name='period'
                                        required
                                        message={'Please choose period'}
                                        placeholder='Select period'
                                        options={periodoption}
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='Start Date'
                                        name='startDate'
                                        required
                                        message={'Please enter start date'}
                                        placeholder='Select start date'
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='Expiry Date'
                                        name='expiryDate'
                                        required
                                        message={'Please enter expiry date'}
                                        placeholder='12/02/2025'
                                        disabled
                                    />
                                </Col>
                                <Col span={24}>
                                    <Flex vertical gap={0} className='my-3'>
                                        <Text className='fs-14 fw-600'>
                                            Select Payment Method
                                        </Text>
                                        <Text className='fs-13 subtitle-color'>
                                            Select a secure payment option to continue.
                                        </Text>
                                    </Flex>
                                </Col>
                                <Col span={24}>
                                    <Radio.Group
                                        value={selectedPlan?.id}
                                        onChange={handleChange}
                                        className='w-100'
                                    >
                                        {pricingData?.map((packages, index) => (
                                            <Card className={`shadow mb-2 card-cs cursor ${selectedPlan?.id === packages.id ? 'border-brand' : ''}`} key={index}
                                                onClick={() =>
                                                    handleChange({ target: { value: packages.id } })
                                                }
                                            >
                                                <Flex justify="space-between" gap={5}>
                                                    <Radio value={packages.id}>
                                                        {packages?.title}
                                                    </Radio>
                                                    <Flex>
                                                        {
                                                            Array.isArray(packages?.cards) ?
                                                            <Flex gap={5} align="center" wrap>
                                                                {
                                                                    packages?.cards?.map((list,i)=>
                                                                        <Image src={list} preview={false} width={35} key={i} alt='cards icon' fetchPriority="high" />
                                                                    )
                                                                }
                                                            </Flex>
                                                            :
                                                            <Image src={packages?.cards} preview={false} width={35} alt='cards icon' fetchPriority="high" />
                                                        }
                                                    </Flex>
                                                </Flex>
                                            </Card>
                                        ))}
                                    </Radio.Group>
                                </Col>
                                <Col md={{span: 12}} span={24}>
                                    <MyInput
                                        label='Cardholder Name'
                                        name='cardholderName'
                                        required
                                        message={'Please enter cardholder name'}
                                        placeholder='Enter cardholder name'
                                    />
                                </Col>
                                <Col md={{span: 12}} span={24}>
                                    <MyInput
                                        type='number'
                                        label='Card Number'
                                        name='cardNo'
                                        maxLength={19}
                                        required
                                        message={'Please enter card number'}
                                        placeholder='Enter card number'
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); // remove non-digits
                                            if (value.length > 16) value = value.slice(0, 16); // limit to 16 digits
                                            e.target.value = value.replace(/(.{4})/g, "$1 ").trim(); // insert space every 4 digits
                                        }}
                                    />
                                </Col>
                                <Col md={{span: 12}} span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='Expiry Date'
                                        name='expiryDate'
                                        required
                                        message={'Please enter expiry date'}
                                        placeholder='Enter expiry date'
                                    />
                                </Col>
                                <Col md={{span: 12}} span={24}>
                                    <MyInput
                                        type='number'
                                        label='CVV'
                                        name='cvv'
                                        required
                                        message={'Please enter CVV'}
                                        placeholder='Enter CVV'
                                    />
                                </Col>
                                <Col span={24}>
                                    <Flex justify='center'>
                                        <Flex className='pill-square mt-2' gap={8} align='center' justify='center'>
                                            <img src="/assets/icons/shield.png" width={16} alt='shield icon' fetchPriority="high" />
                                            <Text className='fs-12 text-sky'>
                                                Your payment method is secured with end-to-end encryption
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Col>
                            </Row>
                        </Flex>
                    </Form>
                </Flex>
                <Divider className='my-2 bg-light-brand' />
            </Modal>
        </>
    )
}

export {UpgradeSubscriptionModal}