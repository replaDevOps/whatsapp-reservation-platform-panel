import { ArrowLeftOutlined, DoubleLeftOutlined, DoubleRightOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Card, Collapse, Flex, Table, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ModuleTopHeading } from '../../PageComponent'
import { stafftableData } from '../../../data'
import { StaffManagementCards } from './StaffManagementCards'
import { ViewStaffDetails } from './ViewStaffDetails'
import { ViewHistoryTable } from './ViewHistoryTable'

const { Text } = Typography
const SingleViewStaffManagement = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const details = stafftableData?.find((list)=>list?.key === Number(id))

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
                                <Text className="fs-13 text-gray">
                                    Staffs
                                </Text>
                            ),
                        },
                        {
                            title: (
                                <Text className="fw-500 fs-14 text-black">
                                    {details?.staffName}
                                </Text>
                            ),
                        },
                    ]}
                />
            </Card>
            {
                details.role === 'Service Provider' &&
                <StaffManagementCards />
            }
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} align="center" justify='space-between' className='mb-3'>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staffmanagement")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Avatar src={details?.img} size={40}  />
                        <ModuleTopHeading level={4} name={details?.staffName} />
                    </Flex>
                    {
                        details?.status && 
                        details?.status === 'Active' ? (
                            <Text className='btnpill fs-12 success'>Active</Text>
                        ) : (
                            <Text className='btnpill fs-12 inactive'>Inactive</Text>
                        )
                    }
                </Flex>
                {
                    details.role === 'Service Provider' ?
                    <Flex vertical gap={20} className='my-4 mb-0'>
                        <Card className='bg-light-white card-5 radius-12 border-gray'>
                            <Collapse
                                ghost
                                items={[{ key: '1', label: 'Basic Information', children: <ViewStaffDetails details={details} /> }]}
                                expandIconPosition='end'
                            />
                        </Card>
                        <Card className='bg-light-white card-5 radius-12 border-gray'>
                            <Collapse
                                ghost
                                items={[{ key: '1', label: 'Booking History', children: <ViewHistoryTable /> }]}
                                expandIconPosition='end'
                            />
                        </Card>
                    </Flex>
                    :
                    <ViewStaffDetails details={details} />
                }
            </Card>
        </Flex>
    )
}

export {SingleViewStaffManagement}