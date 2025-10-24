import { useState } from 'react'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Card, Divider, Flex, Image, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ModuleTopHeading } from '../../PageComponent'
import { ManageVacationTable } from './ManageVacationTable'
import { stafftableData } from '../../../data'
import { AddVacationModal } from '../modal'

const { Text, Title } = Typography
const ManageVacations = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const details = stafftableData?.find((list)=>list?.key === Number(id))
    const [ visible, setVisible ] = useState(false)
    const [ viewname, setViewName ] = useState(details?.staffName)

    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Business Management
                                </Text>
                            ),
                        },
                        {
                            title: (
                                <Text className="fs-500 fs-14 text-black">
                                    Staffs
                                </Text>
                            ),
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} align="center" justify='space-between'>
                    <Flex gap={10} align="flex-start">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staffmanagement")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='Manage Vacations' />
                            <Text className='text-gray fs-13'>Manage all the branches in your system</Text>
                        </Flex>
                    </Flex>
                    {/* <Button className='btncancel' onClick={()=>setVisible(true)}> 
                        <PlusOutlined /> Add Vacation
                    </Button> */}
                </Flex>
                <Flex gap={15} wrap className='my-4 h-40' align='center'>
                    <Flex gap={15} align='center'>
                        <Avatar src={details?.img} size={40}  />
                        <Title className='fw-600 m-0' level={5}>
                            {details?.staffName}
                        </Title>
                    </Flex>
                    <Divider type='vertical' className='h-100'/>
                    <Flex gap={15} align='center'>
                        <Image src='/assets/icons/newcust-ar.png' width={40} preview={false} alt='total vacations icon' fetchPriority="high" />
                        <Flex vertical>
                            <Text className='text-gray fs-15'>Total vacations  (this month)</Text>
                            <Title className='fw-600 m-0' level={4}>
                                19
                            </Title>
                        </Flex>
                    </Flex>
                </Flex>
                <ManageVacationTable />
            </Card>

            {/* <AddVacationModal 
                visible={visible}
                view = {viewname}
                onClose={()=>{setVisible(false);setViewName(null)}}
            /> */}
        </Flex>
    )
}

export {ManageVacations}