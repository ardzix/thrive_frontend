// components/ReusableConfirmModal.tsx

import React, { ReactNode } from "react";
import { Modal, Button } from "antd";

type ReusableConfirmModalProps = {
  isVisible: boolean;
  title?: string;
  content?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean; // Optional prop to show loading state on confirm button
};

const ConfirmModal: React.FC<ReusableConfirmModalProps> = ({
  isVisible,
  title = "Confirmation",
  content = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
  danger = false,
}) => {
  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
      closable={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {cancelText}
        </Button>,
        <Button key="confirm" type="primary" danger={danger} loading={loading} onClick={onConfirm}>
          {confirmText}
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};

export default ConfirmModal;
