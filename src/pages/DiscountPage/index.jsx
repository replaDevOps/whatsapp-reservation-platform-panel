import { Flex } from 'antd'
import { BreadCrumbCard, DiscountTable, TitleCard } from '../../components'
import { useState } from 'react'

const DiscountPage = () => {
    const [ visible, setVisible ] = useState(false)
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Subscription Plan', },
                    { title: 'Discounts' },
                ]}
            />
            <TitleCard 
                title={'Discounts'}
                subtitle={'Manage all the discounts in your system'}
                btntext={'Add Discount'}
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