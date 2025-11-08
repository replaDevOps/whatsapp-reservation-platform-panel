import { Flex } from 'antd'
import { BreadCrumbCard, FaqsTable, TitleCard } from '../../components'
import { useState } from 'react'
import { websitepagesTitle } from '../../shared'
import { useTranslation } from 'react-i18next'

const FaqsPage = () => {
    const [ visible, setVisible ] = useState(false)
    const {t} = useTranslation()
    const title = websitepagesTitle({t})
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('FAQs') },
                ]}
            />
            <TitleCard 
                title={t('FAQs')}
                subtitle={t('Manage all the FAQs in your system')}
                btntext={t('Add FAQ')}
                onClick={()=>{setVisible(true)}}
            />
            <FaqsTable 
                visible={visible}
                setVisible={setVisible}
            />
        </Flex>
    )
}

export {FaqsPage}