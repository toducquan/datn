import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { httpClient } from "../../util/Api";

export default function ModalUpload(props) {
  const { modalVisible, modalCloseFunc, orderIndex } = props;
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [listDesignData, setDesignData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (orderIndex && orderIndex?.designDataDocument) {
      setDesignData(orderIndex?.designDataDocument.split(","));
    }
  }, [orderIndex]);

  const updateOrderApi = async (id, dataOrderUpdate) => {
    httpClient
      .put(`order/update/${id}`, dataOrderUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Modal
        title="ステータス変更確認"
        className="modal-upload-home-page"
        centered
        closable={false}
        visible={modalVisible}
        getContainer="#modalMount"
        onCancel={modalCloseFunc}
        footer={[
          <div className="gx-d-flex justify-content-around">
            <Button
              type="text"
              className="custom-modal-footer custom-modal-footer__edit"
              onClick={() => {
                updateOrderApi(orderIndex?.id, {
                  designDataChecked: "Completed",
                });
                modalCloseFunc();
              }}
            >
              編集
            </Button>

            <Button
              type="text"
              className="custom-modal-footer custom-modal-footer__close"
              onClick={modalCloseFunc}
            >
              閉じる
            </Button>
          </div>,
        ]}
        width={496}
      >
        <div className="gx-d-flex justify-content-start">
          <div>
            <img src={listDesignData[index]} width={225} height={267} />
            <div className="gx-d-flex custom-pagination-list-design justify-content-center mt-15 mb-20">
              <div className="gx-d-flex ">
                <button
                  onClick={() => {
                    if (index > 0) {
                      setIndex(index - 1);
                    }
                  }}
                  className="btn-prev mr-4"
                >
                  {"<"}
                </button>
                <span className="number-display">
                  {index + 1} / {listDesignData.length}
                </span>
                <button
                  onClick={() => {
                    if (index < listDesignData.length - 1) {
                      setIndex(index + 1);
                    }
                  }}
                  className="btn-prev ml-4"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>

          <div className="gx-flex-column ml-25">
            <div className="mb-30">
              <h4 className="gx-font-weight-bold">ファイル名</h4>
              <p>{""}</p>
            </div>
            <div className="mb-30">
              <h4 className="gx-font-weight-bold">ファイルサイズ</h4>
              <p>00mb</p>
            </div>
            <div>
              <button
                className="status-modal-btn status-modal-btn-red gx-pointer gx-p-2"
                onClick={() => {
                  setIsModalDelete(true);
                }}
              >
                <span className="">削除する</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="ステータス変更確認"
        className="status-modal"
        centered
        closable={false}
        visible={isModalDelete}
        getContainer="#modalMount"
        footer={null}
        width={359}
      >
        <div className="status-modal-content">
          <div>
            <span className="gx-font-weight-bold">ファイル名 </span>
            <span></span>
            <span> を</span>
          </div>
          <p className="gx-pt-0">本当に削除してもよろしいでしょうか？</p>

          <button
            className="status-modal-btn status-modal-btn-grey gx-pl-5 gx-pr-5 "
            onClick={() => {
              setIsModalDelete(false);
            }}
          >
            キャンセル
          </button>
          <button
            className="status-modal-btn status-modal-btn-red gx-pl-5 gx-pr-5 "
            onClick={() => {
              updateOrderApi(orderIndex?.id, { designDataDocument: "" });
              setIsModalDelete(false);
              modalCloseFunc();
            }}
          >
            削除する
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
}
