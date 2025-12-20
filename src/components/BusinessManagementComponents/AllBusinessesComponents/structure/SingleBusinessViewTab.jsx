import { useState } from 'react';
import { Button, Card, Flex, Row, Col, Tooltip, Image, Tabs } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal } from '../../../Ui';
import { BusinessServiceTable } from './BusinessServiceTable';
import { BusinessStaffTable } from './BusinessStaffTable';
import { exportToExcel} from '../../../../shared';
import { useTranslation } from 'react-i18next';


const SingleBusinessViewTab = ({setViewItem,viewitem}) => {
    const {t,i18n} = useTranslation()
    const [activeKey, setActiveKey] = useState('1');
    const [ servicetabledata, setServiceTableData ] = useState([])
    const [ stafftabledata, setStaffTableData ] = useState([])
    const onChange = (key) => {
        setActiveKey(key);
    };
    const items = [
        {
            key: '1',
            label: t("Services"),
            children: <BusinessServiceTable setServiceTableData={setServiceTableData} id={viewitem?.id} />,
        },
        {
            key: '2',
            label: t("Staffs"),
            children: <BusinessStaffTable setStaffTableData={setStaffTableData} id={viewitem?.id} />,
        },
    ];

    const currentContent = items.find((item) => item.key === activeKey)?.children;

    console.log('view id',viewitem?.id)
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={15}>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => setViewItem(null)}>
                            {i18n?.language === 'ar' ? <ArrowRightOutlined />:<ArrowLeftOutlined />}
                        </Button>
                        <ModuleTopHeading level={5} name={viewitem?.name} />
                        <Tooltip title={t("This branch has self booking tablet access")}>
                            <Image src='/assets/icons/mobile.webp' alt='mobile icon' width={15} preview={false} />
                        </Tooltip>
                    </Flex>
                    <Row gutter={[24,0]}>
                        <Col span={24} md={{span: 12}}>
                            <Tabs defaultActiveKey="1" 
                                items={items.map(({ key, label }) => ({
                                    key,
                                    label,
                                }))} 
                                onChange={onChange}
                                className='tab-fill'
                            />
                        </Col>
                        <Col span={24} md={{span: 12}}>
                            <Flex justify='end' gap={10}>
                                <Button className='btncancel'
                                    onClick={() => exportToExcel(
                                        activeKey === '1' ? servicetabledata : stafftabledata,
                                        activeKey === '1' ? 'ServicebybranchData' : 'StaffbybranchData'
                                    )}
                                > 
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.webp' width={20} preview={false} alt='export icons' fetchPriority="high" /> 
                                        {t("Export Data")}
                                    </Flex>
                                </Button>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            {currentContent}
                        </Col>
                    </Row>
                </Flex>
            </Card>
        </>
    );
};

export { SingleBusinessViewTab };