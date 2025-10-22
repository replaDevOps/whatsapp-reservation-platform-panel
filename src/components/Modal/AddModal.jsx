import { Modal, Button, Form, Input, DatePicker } from "antd";

const AddVacationModal = ({ open, onClose, onSave, staffName = "Mohammad Taha" }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // parent se function call
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Vacation"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      centered
    >
      <Form layout="vertical" form={form}>
        {/* Staff Name */}
        <Form.Item label="Staff Name" name="staffName" initialValue={staffName}>
          <Input disabled />
        </Form.Item>

        {/* Start Date */}
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select start date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* End Date */}
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select end date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVacationModal;
