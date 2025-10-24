import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import { Modal, Typography, Button, Flex, Card, Form, Col, Row, Divider, Image, Radio } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms';
import { periodoption, planoption } from '../../../../shared';
import { pricingData } from '../../../../data';
import moment from 'moment';

const { Title, Text } = Typography
const RenewSubscriptionModal = ({visible,onClose,renewstate}) => {

    const [form] = Form.useForm();
    const [selectedPlan, setSelectedPlan] = useState(pricingData[0]);
    const handleChange = (e) => {
        const selectedkey = e.target.value;
        const planobj = pricingData?.find((item) => item?.id === selectedkey)
        setSelectedPlan(planobj)
    }

    useEffect(()=>{
        if(visible && renewstate) {
            form.setFieldsValue({
                currentsubplan: renewstate?.subplan,
                currentperiod: renewstate?.period,
                currentexpiryDate: moment(renewstate?.expireon, 'DD-MM-YYYY'),
            })
        }
    },[visible, renewstate])

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
                            Renew
                        </Button>
                    </Flex>
                }
            >
                <Flex vertical gap={10}>
                    <Flex vertical gap={0} className='mb-2'>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                Renew Subscription
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex>                
                        <Text className='fs-13 text-gray'>
                            Quickly extend the subscription period of your business.
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
                                        label='Current Subscription Plan'
                                        name='currentsubplan'
                                        options={planoption}
                                        disabled
                                    />
                                </Col>
                                <Col span={24}>
                                    <MySelect
                                        label='Current Period'
                                        name='currentperiod'
                                        options={periodoption}
                                        disabled
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='Current Expiry Date'
                                        name='currentexpiryDate'
                                        placeholder='12/02/2025'
                                        disabled
                                    />
                                </Col>
                                <Col span={24}>
                                    <MySelect
                                        label='Renew Period'
                                        name='renewperiod'
                                        required
                                        message={'Please choose renew period'}
                                        placeholder='Select period'
                                        options={periodoption}
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='New Start Date'
                                        name='startDate'
                                        required
                                        message={'Please enter new start date'}
                                        placeholder='Select new start date'
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyDatepicker
                                        datePicker
                                        label='New Expiry Date'
                                        name='expiryDate'
                                        required
                                        message={'Please enter new expiry date'}
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
                                                            <Image src={packages?.cards} preview={false} width={35} alt='card icon' fetchPriority="high" />
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
                                        required
                                        message={'Please enter card number'}
                                        placeholder='Enter card number'
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
                                        message={'Please enter cvv'}
                                        placeholder='Enter cvv'
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

export {RenewSubscriptionModal}