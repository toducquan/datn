import React from "react";
import { Modal } from "antd";
import { IconDanger } from "../Icons/IconDanger";

function ModalChangeStatus(props) {
  const { modalVisible, modalCloseFunc } = props;
  return (
    <Modal
      title="ステータス変更確認"
      className="status-modal"
      centered
      closable={false}
      visible={modalVisible}
      getContainer="#modalMount"
      footer={null}
      width={359}
    >
      <div className="status-modal-content">
        <IconDanger />
        <p className="gx-mb-0 gx-pb-0">
          【会員ID】1　「前デザ料振込」ステータスを
        </p>
        <p className="gx-pt-0">未→済 に変更しますか？</p>
        <button className="status-modal-btn status-modal-btn-red">変更</button>
        <button
          className="status-modal-btn status-modal-btn-grey"
          onClick={modalCloseFunc}
        >
          キャンセル
        </button>
      </div>
    </Modal>
  );
}
export default ModalChangeStatus;
