import { Flex } from 'antd'
import { BreadCrumbCard, DiscountTable, TitleCard } from '../../components'
import { useState } from 'react'
import { subscriptionTitle } from '../../shared'
import { useTranslation } from 'react-i18next'

const DiscountPage = () => {
    const {t} = useTranslation()
    const title = subscriptionTitle({t})
    const [ visible, setVisible ] = useState(false)
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: title },
                    { title: t('Discounts') },
                ]}
            />
            <TitleCard 
                title={t('Discounts')}
                subtitle={t('Manage all the discounts in your system')}
                btntext={t('Add Discount')}
                onClick={()=>{setVisible(true)}}
            />
            <DiscountTable 
                visible={visible}
                setVisible={setVisible}
            />
        </Flex>
    )
}

export {DiscountPage}