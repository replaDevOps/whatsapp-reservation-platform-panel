import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting, MaintenanceModeSetting, TitleCard } from '../../components'
import { useTranslation } from 'react-i18next'
import { websitepagesTitle } from '../../shared'

const SettingsPage = () => {
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Setting') },
                ]}
            />
            <TitleCard 
                title={t('Setting')}
                subtitle={t('Manage all the admin setting in your system')}
            />
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
            <MaintenanceModeSetting />
        </Flex>
    )
}

export {SettingsPage}