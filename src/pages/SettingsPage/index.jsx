import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting, MaintenanceModeSetting, TitleCard } from '../../components'

const SettingsPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Admin Setting', },
                    { title: 'Setting' },
                ]}
            />
            <TitleCard 
                title={'Setting'}
                subtitle={'Manage all the admin setting in your system'}
            />
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
            <MaintenanceModeSetting />
        </Flex>
    )
}

export {SettingsPage}