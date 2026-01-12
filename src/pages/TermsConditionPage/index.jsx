import { Button, Card, Divider, Flex, notification } from 'antd'
import { BreadCrumbCard, EditorDescription, TitleCard } from '../../components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { notifySuccess, websitepagesTitle } from '../../shared'
import { useQuery, useMutation } from '@apollo/client/react'
import { UPDATE_TERMS } from '../../graphql/mutation'
import { GET_TERMS } from '../../graphql/query'

const TermsConditionPage = () => {

    const [ descriptionData, setDescriptionData ] = useState('')
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    const [ api, contextHolder ] = notification.useNotification()
    const { data, refetch, loading } = useQuery(GET_TERMS)
    const [updateTermsCondition, { loading: updating }] = useMutation(UPDATE_TERMS,{
      onCompleted:()=>{notifySuccess(api,t("Terms & Condition Update"),t("Terms & Condition has been updated successfully"),()=>refetch())},
      onError: (error) => {notifyError(api, error)},
    })

    useEffect(() => {
        if (!loading && data?.getTermsCondition?.content) {
          setDescriptionData(data.getTermsCondition.content)
        }
    }, [loading])
    const handleDescriptionChange = (value) =>{
      setDescriptionData(value)
    }

    const onFinish = async () => {
        try {
          if (!descriptionData) {
            notifyError(api, t("Please add terms content"))
            return
          }
          
          if (data?.getTermsCondition?.id) {
            await updateTermsCondition({
              variables: {
                id: data.getTermsCondition.id,
                input: {
                  content: descriptionData
                }
              }
            })
          }
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
                    { title: t('Terms & Condition') },
                ]}
            />
            <TitleCard 
                title={t('Terms & Condition')}
                subtitle={t('Manage all the platform Terms & Condition in your system')}
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
                        <Button type='button' onClick={()=>setDescriptionData(null)} className='btncancel text-black border-gray'>
                          {t("Cancel")}
                        </Button>
                        <Button 
                            type="primary"
                            loading={updating}
                            onClick={onFinish}
                            className='btnsave border0 text-white brand-bg'
                        >
                            {t("Save")}
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
        </>
    )
}

export {TermsConditionPage}
