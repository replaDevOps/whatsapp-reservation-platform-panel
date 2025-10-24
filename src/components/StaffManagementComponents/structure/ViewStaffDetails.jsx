import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Flex, Table, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ModuleTopHeading } from '../../PageComponent'

const { Text } = Typography
const ViewStaffDetails = ({details}) => {

    const navigate = useNavigate()

    const workinghours = [
        {
            id: 1,
            title:'Monday',
            subtitle: '09:00 am - 06:00 pm'
        },
        {
            id: 2,
            title:'Tuesday',
            subtitle: '09:00 am - 06:00 pm'
        },
        {
            id: 3,
            title:'Wednesday',
            subtitle: '09:00 am - 06:00 pm'
        },
        {
            id: 4,
            title:'Thursday',
            subtitle: '09:00 am - 06:00 pm'
        },
        {
            id: 5,
            title:'Friday',
            subtitle: 'Day Off'
        },
        {
            id: 6,
            title:'Saturday',
            subtitle: '09:00 am - 06:00 pm'
        },
        {
            id: 7,
            title:'Sunday',
            subtitle: '09:00 am - 06:00 pm'
        },
    ]

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Details',
            dataIndex: 'detail',
        },
    ]

    const data = [
        {
            key: '1',
            type: <Text className='text-gray'>Staff Name</Text>,
            detail: <Text>{details?.staffName}</Text>
        },
        {
            key: '2',
            type: <Text className='text-gray'>Role</Text>,
            detail: <Text>{details?.role}</Text>
        },
        {
            key: '3',
            type: <Text className='text-gray'>Phone Number</Text>,
            detail: <Text>{details?.phoneNo}</Text>
        },
        {
            key: '4',
            type: <Text className='text-gray'>Assigned Branch</Text>,
            detail: <Text>{details?.branchAssign}</Text>
        },
        {
            key: '5',
            type: <Text className='text-gray'>Services</Text>,
            detail: <Flex gap={5}>
                    {
                        details?.services?.map((items,index)=>
                            <Tag className='badge-cs' key={index}>
                                {
                                    items
                                }
                            </Tag>
                        )
                    }
                </Flex>
        },
        {
            key: '6',
            type: <Text className='text-gray'>Email Address</Text>,
            detail: <Text>{details?.email}</Text>
        },
        {
            key: '7',
            type: <Text className='text-gray'>Working Hours</Text>,
            detail: <Flex gap={5} vertical>
                    {
                        workinghours?.map((items,index)=>
                            <Text key={index}><strong>{items?.title}</strong>: {items?.subtitle}</Text>
                        )
                    }
                </Flex>
        },
    ];

    return (
        <Flex vertical gap={10}>
            <Table
                size='large'
                columns={columns}
                dataSource={data}
                className='pagination table-cs table'
                showSorterTooltip={false}
                scroll={{ x: 500 }}
                rowHoverable={false}
                pagination={false}
                // loading={isLoading}
            />
        </Flex>
    )
}

export {ViewStaffDetails}