import { useState } from 'react';
import { Button, Divider, Dropdown, Flex, List, Space, Typography } from 'antd';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { useTranslation } from 'react-i18next';
import { toArabicDigits } from '../../../../shared';

const { Title,Text } = Typography;
const SubscriptionPlanCard = ({singledata}) => {

    const [ selectedduration, setSelectedDuration ] = useState('')
    const {t,i18n} = useTranslation()
    const isArabic = i18n?.language === 'ar'
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
                    <ModuleTopHeading level={4} name={t(singledata?.title)} />
                    <Text className='text-gray fs-14'>{t(singledata?.description)}</Text>
                </Flex>
                <Dropdown
                    menu={{
                        items: durationItems.map((item) => ({
                            key: String(item.key),
                            label: t(item.label)
                        })),
                        onClick: handleDurationClick
                    }}
                    trigger={['click']}
                >
                    <Button className="btncancel px-3 filter-bg fs-13 text-black">
                        <Flex justify="space-between" align="center" gap={30}>
                            {t(durationItems.find((i) => i.key === selectedduration)?.label || "Monthly")}
                            <DownOutlined />
                        </Flex>
                    </Button>
                </Dropdown>
            </Flex>
            <Title className={`m-0`}>
                <Space size={8}>
                    <sup className={`fs-16 fw-600 text-grey`}>{t("SAR")}</sup>
                    {isArabic ? toArabicDigits(singledata?.amount):singledata?.amount}
                    <span className='fs-16 fw-500 text-gray'>/{t(durationItems?.find((items)=>items.key === selectedduration)?.key || 'monthly')}</span>
                </Space> 
            </Title>
            <Divider className='my-2 bg-divider' />
            <Flex vertical gap={10}>
                <Title level={5} className='m-0 fw-500'>{t("Included Features")}:</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={singledata?.features}
                    size='small'
                    renderItem={(item, _) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CheckOutlined className='text-green'/>}
                            description={isArabic ? toArabicDigits(t(item?.title)):t(item?.title)}
                        />
                    </List.Item>
                    )}
                />
            </Flex>
        </Flex>
    );
};

export { SubscriptionPlanCard };