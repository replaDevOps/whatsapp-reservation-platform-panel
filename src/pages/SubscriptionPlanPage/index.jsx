import { Breadcrumb, Card, Flex, Typography } from 'antd'
import { BasicPlanCard, RenewSubscriptionModal, SubscriptionPlanTable } from '../../components'
import { useState } from 'react'

const { Text } = Typography
const SubscriptionPlanPage = () => {

    const [ renewvisible, setRenewVisible ] = useState(false)
    const [ renewstate, setRenewState ] = useState(null)
    return (
        <Flex vertical gap={10}>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Breadcrumb
                    separator="/"
                    items={[
                        {
                            title: (
                                <Text className="fs-13 text-gray">
                                    Business Management
                                </Text>
                            ),
                        },
                        {
                            title: <Text className="fw-500 fs-14 text-black">Subscription Plan</Text>,
                        },
                    ]}
                />
            </Card>
            <BasicPlanCard  
                setRenewVisible={setRenewVisible}
                setRenewState={setRenewState}
            />
            <SubscriptionPlanTable 
                renewvisible={renewvisible}
                setRenewVisible={setRenewVisible}
                renewstate={renewstate}
                setRenewState={setRenewState}
            />

            <RenewSubscriptionModal 
                visible={renewvisible}
                renewstate={renewstate}
                onClose={()=>{setRenewVisible(false);setRenewState(null)}}
            />
        </Flex>
    )
}

export {SubscriptionPlanPage}