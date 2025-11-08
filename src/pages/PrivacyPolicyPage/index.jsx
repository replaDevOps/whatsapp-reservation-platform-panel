import { Button, Card, Divider, Flex } from 'antd'
import { BreadCrumbCard, EditorDescription, TitleCard } from '../../components'
import { useState } from 'react'
import { websitepagesTitle } from '../../shared'
import { useTranslation } from 'react-i18next'

const PrivacyPolicyPage = () => {

    const [ descriptionData, setDescriptionData ] = useState('')
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    const handleDescriptionChange = (value) =>{
        setDescriptionData(value)
    }

    const submitHandle = () => {
        console.log('description',descriptionData)
    }

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Privacy Policy') },
                ]}
            />
            <TitleCard 
                title={t('Privacy Policy')}
                subtitle={t('Manage all the platform policy in your system')}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>    
                <Flex vertical gap={20}>
                    <EditorDescription
                        label={t('Page Body')}
                        descriptionData={descriptionData}
                        onChange={handleDescriptionChange}
                    />
                    <Divider className='my-2 bg-divider' />
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray'>
                            {t("Cancel")}
                        </Button>
                        <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={submitHandle}>
                            {t("Save")}
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export {PrivacyPolicyPage}