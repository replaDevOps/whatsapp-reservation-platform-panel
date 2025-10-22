import React, { useState } from "react";
import { Modal, Button } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import "./AddBusinessModal.css"; // Custom styles for pixel-perfect match
import { useNavigate } from "react-router-dom";

const AddBusinessModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };



  const handleConfirm = () => {
    setIsModalVisible(false);
    console.log("Business saved!");
    navigate('/businesses'); 
  };

  const handleBack = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Save
      </Button>
      <Modal
        open={isModalVisible}
        footer={null}
        centered
        closable={false}
        className="custom-modal"
      >
        <div className="modal-content-wrapper">
          <QuestionCircleFilled className="warning-icon" />
          <h2 className="modal-title">Are you sure?</h2>
          <p className="modal-message">
            Please confirm that all business details are correct and a
            subscription plan is assigned before proceeding.
          </p>
          <div className="modal-buttons">
            <Button onClick={handleBack}>Back</Button>
            <Button
              style={{
                backgroundColor: "#F5693D",
                color: "#fff",
                border: "none",
              }}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddBusinessModal;
