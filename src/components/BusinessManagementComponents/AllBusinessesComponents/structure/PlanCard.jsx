import { Card, Divider, Flex, List, Space, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';

const { Title,Text } = Typography;
const PlanCard = ({singledata,selectedvalue}) => {

    return (
         <Card className='bg-brand-light border-brand card-cs radius-12 h-100'>
            <Flex vertical gap={20}>
                <Flex vertical>
                    <ModuleTopHeading level={4} name={singledata?.title} />
                    <Text className='text-gray fs-14'>{singledata?.subtitle}</Text>
                </Flex>
                <Title className={`m-0`} level={3}>
                    <Space size={8} wrap>
                        <sup className={`fs-16 fw-600 text-grey`}>SAR</sup>
                        {singledata?.amount}
                        <span className='fs-16 fw-500 text-gray'>/{selectedvalue==='1'?'mon':'yr' || 'monthly'}</span>
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
        </Card>
    );
};

export { PlanCard };