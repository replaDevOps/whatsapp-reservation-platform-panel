import { Flex } from 'antd'
import { BreadCrumbCard, FaqsTable, TitleCard } from '../../components'
import { useState } from 'react'

const FaqsPage = () => {
    const [ visible, setVisible ] = useState(false)
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    { title: 'Website Pages', },
                    { title: 'FAQs' },
                ]}
            />
            <TitleCard 
                title={'FAQs'}
                subtitle={'Manage all the FAQs in your system'}
                btntext={'Add FAQ'}
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