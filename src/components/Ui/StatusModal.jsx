import { Button, Divider, Flex, Modal, Typography } from "antd";

const { Title, Text } = Typography;

const StatusModal = ({ open, onClose, title, subtitle,  onConfirm }) => {
  return (
    <Modal
      title={null }
      open={open} // ✅ correct prop
      onCancel={onClose}
      centered
      height={350}
      footer={
        
        <Flex justify="center" gap={5}>
          <Button
            type="default"
            onClick={onClose}
            className="btncancel text-black border-gray"
          >
            Cancel
          </Button>
          <Button
            className='btnsave bg-dark-orange border-0 text-white'
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Flex>
        
      }
    >
      <Flex vertical align="center" className="text-center" gap={10}>
        <img src="/assets/icons/mark.png" width={50} alt="icon" />
        <Title level={5} className="m-0">
          {title}
        </Title>
      <Flex vertical>
          <Text className="fs-18">{subtitle}
            Are you sure ?  
        </Text>
        <Text className="fs-12 text-gray">{subtitle}
           Are you sure you want to inactivate this service?
        </Text>

      </Flex>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Modal>
  );
};

export { StatusModal };