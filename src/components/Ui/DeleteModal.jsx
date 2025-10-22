import { Button, Divider, Flex, Modal, Typography } from "antd";

const { Title, Text } = Typography;

const DeleteModal = ({ open, onClose, title, subtitle,  onConfirm }) => {
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
            className='btnsave bg-red border-0 text-white'
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Flex>
        
      }
    >
      <Flex vertical align="center" className="text-center" gap={10}>
        <img src="/assets/icons/delete.svg" width={50} alt="icon" />
        <Title level={5} className="m-0">
          {title}
        </Title>
      <Flex vertical>
          <Text className="fs-18">{subtitle}
            Are you sure ?  
        </Text>
        <Text className="fs-12 text-gray">{subtitle}
            This action cannot be undone. Are you sure do you want to delete this vacation ?
        </Text>

      </Flex>
      </Flex>
      <Divider className="my-2 bg-light-brand" />
    </Modal>
  );
};

export { DeleteModal };