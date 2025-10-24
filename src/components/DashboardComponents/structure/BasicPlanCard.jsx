import { Button, Card, Flex, Typography } from 'antd'

const { Title, Text } = Typography
const BasicPlanCard = ({setRenewVisible,setRenewState}) => {
  return (
    <Card className='card-bg radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='center' gap={5}>
            <Flex vertical gap={5}>
                <Flex align='center' gap={10}>
                    <Title level={4} className='m-0'>Basic Plan</Title>
                    <Text className='bg-green text-white sm-pill fs-12'>Active</Text>
                </Flex>
                <Text className='fs-13 text-gray'>
                    Expires on 12/2025
                </Text>
            </Flex>
            <Button className='btncancel' onClick={()=>{setRenewVisible(true);setRenewState()}}>
                Renew
            </Button>
        </Flex>
    </Card>
  )
}

export {BasicPlanCard}