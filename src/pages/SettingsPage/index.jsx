import { useEffect, useState } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Col, Divider, Flex, Form, Row, Switch, Tag, Typography } from 'antd'
import { ChangePasswordSetting, GeneralSetting, LanguageSetting, MaintenanceModeSetting, ModuleTopHeading, MyInput, SingleFileUpload, TimeForm } from '../../components'

const { Text, Title } = Typography
const SettingsPage = () => {

    const [form] = Form.useForm();

    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Admin Setting
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Setting</Text>,
                        },
                    ]}
                />
            </Card>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex vertical>
                    <ModuleTopHeading level={4} name='Setting' />
                    <Text className='text-gray fs-13'>Manage all the admin setting in your system</Text>
                </Flex>
            </Card>
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
            <MaintenanceModeSetting />
        </Flex>
    )
}

export {SettingsPage}