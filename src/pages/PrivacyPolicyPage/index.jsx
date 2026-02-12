import { Button, Card, Divider, Flex, message, notification } from 'antd'
import { BreadCrumbCard, EditorDescription, TitleCard } from '../../components'
import { useEffect, useState } from 'react'
import { notifyError, notifySuccess, websitepagesTitle } from '../../shared'
import { useTranslation } from 'react-i18next'
import { GETPRIVACYPOLICY } from '../../graphql/query'
import { useMutation, useQuery } from '@apollo/client/react'
import { UPDATE_PRIVACY_POLICY } from '../../graphql/mutation'

const PrivacyPolicyPage = () => {

    const [ descriptionData, setDescriptionData ] = useState('')
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    const [messageApi] = message.useMessage();
    const [ api, contextHolder ] = notification.useNotification()
    const { data, refetch,loading } = useQuery(GETPRIVACYPOLICY)
    const [privacypolicyCondition, { loading: updating }] = useMutation(UPDATE_PRIVACY_POLICY,{
      onCompleted:()=>{notifySuccess(api,t("Privacy Policy Update"),t("Privacy Policy has been updated successfully"));refetch()},
      onError: (error) => {notifyError(api, error)},
    })

    useEffect(() => {
        if (!loading && data?.getPrivacyPolicy?.content) {
            setDescriptionData(data.getPrivacyPolicy.content)
        }
    }, [loading])
    const handleDescriptionChange = (value) =>{
      setDescriptionData(value)
    }

    const onFinish = async () => {
        try {
          if (!descriptionData) {
            messageApi.error("Please add privacy policy content")
            return
          }
          await privacypolicyCondition({
            variables: {
                input: {
                    content: descriptionData
                }
            }
        })
        } catch (err) {
          console.error(err)
        }
    }

    return (
        <>
            {contextHolder}
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
                            <Button type="primary" loading={updating} className='btnsave border0 text-white brand-bg' onClick={onFinish}>
                                {t("Save")}
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </>
    )
}

export {PrivacyPolicyPage}