import { useState } from 'react';
import { Button, Card, Flex, Row, Col, Tooltip, Image, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { ConfirmModal } from '../../../Ui';
import { BusinessServiceTable } from './BusinessServiceTable';
import { BusinessStaffTable } from './BusinessStaffTable';


const SingleBusinessViewTab = ({setViewItem}) => {


    const [ statuschange, setStatusChange ] = useState(false)
    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key) => {
        setActiveKey(key);
    };
    const items = [
        {
            key: '1',
            label: 'Services',
            children: <BusinessServiceTable />,
        },
        {
            key: '2',
            label: 'Staffs',
            children: <BusinessStaffTable />,
        },
    ];

    const currentContent = items.find((item) => item.key === activeKey)?.children;

    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={15}>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => setViewItem(false)}>
                            <ArrowLeftOutlined />
                        </Button>
                        <ModuleTopHeading level={5} name={'Branch 1'} />
                        <Tooltip title='This branch has self booking tablet access'>
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
                                <Button className='btncancel'> 
                                    <Flex align='center' gap={10}>
                                        <Image src='/assets/icons/export.png' width={20} preview={false} alt='export icons' fetchPriority="high" /> Export Data
                                    </Flex>
                                </Button>
                                <Button onClick={()=>setStatusChange(true)} className='btnsave border-0 bg-red text-white fs-13'>
                                    Deactivate business
                                </Button>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            {currentContent}
                        </Col>
                    </Row>
                </Flex>
            </Card>

            <ConfirmModal 
                type={'danger'}
                visible={statuschange}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to inactivate this Business?'}
                onClose={()=>setStatusChange(false)}
            />
        </>
    );
};

export { SingleBusinessViewTab };