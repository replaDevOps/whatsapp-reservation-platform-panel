
import { Flex } from 'antd';
import ProfileSetting from '../../components/Setting/Structure/ProfileSetting';
import SettingComponent2 from '../../components/Setting/Structure/SettingComponent2';
import GeneralSettings from '../../components/Setting/Structure/GeneralSetting';
import LanguageSettings from '../../components/Setting/Structure/LanguageSetting';
import PasswordManager from '../../components/Setting/Structure/PasswordManager';



function Settings() {
  return (
    <div>
 
<Flex vertical gap={24}>
    <ProfileSetting/>
    <SettingComponent2/>
    <GeneralSettings/>
    <LanguageSettings/>
    <PasswordManager/>

    
</Flex>
    </div>
  )
}

export default Settings;
