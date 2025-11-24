import { Button, Card, Divider, Flex, message, Spin } from 'antd'
import { BreadCrumbCard, EditorDescription, TitleCard } from '../../components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { websitepagesTitle } from '../../shared'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_TERMS } from '../../graphql/query'
import { UPDATE_TERMS } from '../../graphql/mutation'

const TermsConditionPage = () => {

    const [ descriptionData, setDescriptionData ] = useState('')
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    const [messageApi, contextHolder] = message.useMessage();

    const { data } = useQuery(GET_TERMS)
    const [updateTermsCondition, { loading: updating }] = useMutation(UPDATE_TERMS)

    useEffect(() => {
        if (data?.getTermsCondition?.content) {
          setDescriptionData(data.getTermsCondition.content)
        }
    }, [data])
    
    const handleDescriptionChange = (value) =>{
        setDescriptionData(value)
    }

    const onFinish = async () => {
        try {
          if (!descriptionData) {
            messageApi.error("Please add terms content")
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
            messageApi.success("Terms updated successfully!")
          }

        } catch (err) {
          console.error(err)
          messageApi.error("Failed to save terms")
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
                        <Button type='button' className='btncancel text-black border-gray'>
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
