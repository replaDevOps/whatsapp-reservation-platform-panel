import { useState } from 'react';
import { Button, Card, Divider, Dropdown, Flex, List, Space, Typography } from 'antd';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { subscriptionplanData } from '../../../../data';
import { ModuleTopHeading } from '../../../PageComponent';

const { Title,Text } = Typography;
const SubscriptionPlanCard = ({singledata}) => {

    const [ selectedduration, setSelectedDuration ] = useState('')

    const durationItems = [
        { key: 'monthly', label: 'Monthly' },
        { key: 'yearly', label: 'Yearly' },
    ];

    const handleDurationClick = ({ key }) => {
        setSelectedDuration(key);
    };

    return (
        <Flex vertical gap={20}>
            <Flex justify='space-between' align='center' gap={10}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={singledata?.title} />
                    <Text className='text-gray fs-14'>{singledata?.description}</Text>
                </Flex>
                <Dropdown
                    menu={{
                        items: durationItems.map((item) => ({
                            key: String(item.key),
                            label: item.label
                        })),
                        onClick: handleDurationClick
                    }}
                    trigger={['click']}
                >
                    <Button className="btncancel px-3 filter-bg fs-13 text-black">
                        <Flex justify="space-between" align="center" gap={30}>
                            {durationItems.find((i) => i.key === selectedduration)?.label || "Monthly"}
                            <DownOutlined />
                        </Flex>
                    </Button>
                </Dropdown>
            </Flex>
            <Title className={`m-0`}>
                <Space size={8}>
                    <sup className={`fs-16 fw-600 text-grey`}>SAR</sup>
                    {singledata?.amount}
                    <span className='fs-16 fw-500 text-gray'>/{durationItems?.find((items)=>items.key === selectedduration)?.key || 'monthly'}</span>
                </Space> 
            </Title>
            <Divider className='my-2 bg-divider' />
            <Flex vertical gap={10}>
                <Title level={5} className='m-0 fw-500'>Included Features:</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={singledata?.features}
                    size='small'
                    renderItem={(item, _) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CheckOutlined className='text-green'/>}
                            description={item?.title}
                        />
                    </List.Item>
                    )}
                />
            </Flex>
        </Flex>
    );
};

export { SubscriptionPlanCard };