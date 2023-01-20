import React from "react";
import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";

const ModalContainer = () => {
  const { modalStore } = useStore();

  return (
    <Modal
      title={modalStore.modal.title}
      open={modalStore.modal.open}
      onCancel={modalStore.closeModal}
      centered
      footer={null}
    >
      {modalStore.modal.body}
    </Modal>
  );
};

export default observer(ModalContainer);
