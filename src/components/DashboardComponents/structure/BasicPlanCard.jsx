import { useState } from 'react'
import { Button, Card, Flex, Typography } from 'antd'
import { DeleteModal } from '../../Ui';
// import { MostBookTable } from './MostBookTable'

const { Title, Text } = Typography
const BasicPlanCard = () => {
    const [open, setOpen] = useState(false);
  
  
  const showModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    console.log("Confirmed ✅");
    setOpen(false); // close after confirm
  };

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
            <Button className='btncancel' onClick={showModal}>
                Renew
            </Button>
        </Flex>
        <DeleteModal
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Renew Confirmation"
        subtitle="Are you sure you want to renew this plan?"
        type="renew"
      />
        
    </Card>
  )
}

export {BasicPlanCard}