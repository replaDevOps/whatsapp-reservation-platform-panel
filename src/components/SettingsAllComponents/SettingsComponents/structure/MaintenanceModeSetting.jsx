import { useState, useEffect } from 'react'
import { Card, Flex, Switch, Typography, Button } from 'antd'
import { MaintenanceModal } from '../modal'
import { useTranslation } from 'react-i18next'
import { GET_MAINTENANCE_STATUS } from '../../../../graphql/query'
import { useQuery } from '@apollo/client/react'

const { Title, Text } = Typography

const MaintenanceModeSetting = () => {
    const [isChecked, setIsChecked] = useState(false)
    const {t} = useTranslation()
    const [visible, setVisible] = useState(false)
    const { data, refetch } = useQuery(GET_MAINTENANCE_STATUS);

    useEffect(() => {
        if (data?.getMaintenanceStatus?.isEnabled !== undefined) {
            setIsChecked(Boolean(data.getMaintenanceStatus.isEnabled))
        }
    }, [data]);
    const handleEdit = () => {
        setVisible(true)
    }
    const handleModalClose = (newValue) => {
        if (typeof newValue === 'boolean') {
            setIsChecked(newValue)
        }
        setVisible(false)
    }

    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className='fw-500 m-0'>{t("Maintenance Mode")}</Title>
                        <Button className='btncancel' onClick={handleEdit}>
                            {t("Change")}
                        </Button>
                    </Flex>

                    <Flex justify='space-between' align='flex-start'>
                        <Flex vertical>
                            <Text strong>{t("Maintenance Mode")}</Text>
                            <Text className='fs-13 text-gray'>
                                {t("Enable or disable maintenance mode for your application.")}
                            </Text>
                        </Flex>

                        <Switch
                            size='small'
                            checked={isChecked}
                            disabled
                        />
                    </Flex>
                </Flex>
            </Card>

            <MaintenanceModal
                visible={visible}
                refetch={refetch}
                initialChecked={isChecked}
                onClose={handleModalClose}
            />
        </>
    )
}

export { MaintenanceModeSetting }
