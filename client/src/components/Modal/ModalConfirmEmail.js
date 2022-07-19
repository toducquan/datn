import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import parse from "html-react-parser";
import { httpClient } from "../../util/Api";

export default function ModalConfirmEmail(props) {
  const { modalVisible, modalCloseFunc, dataSend } = props;
  const [ModalMailHadsend, setModalMailHadsend] = useState(false);

  const sendMail = async () => {
    httpClient
      .post("send-mail-ses", dataSend)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        title="未処理情報編集"
        className="custom-modal"
        visible={modalVisible}
        getContainer="#modalMount"
        width={830}
        style={{ top: 30 }}
        onCancel={modalCloseFunc}
        footer={[
          <Button
            type="text"
            className="custom-modal-footer custom-modal-footer__edit"
            onClick={() => {
              modalCloseFunc();
              setModalMailHadsend(true);
              sendMail();
            }}
          >
            送信
          </Button>,
          <Button
            type="text"
            className="custom-modal-footer custom-modal-footer__close"
            onClick={modalCloseFunc}
          >
            キャンセル
          </Button>,
        ]}
      >
        <div className="card-detail">
          <div className="card-detail__title">メール新規作成</div>
          <Row className="card-detail-table">
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                宛先
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {dataSend?.email}
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                差出人
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                info@joh-ltd.com
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                配信日時
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                予約配信　{dataSend?.DeliveryDate}
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                件名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {dataSend?.subject}
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div
                className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th"
                style={{ height: "unset" }}
              >
                住所
              </div>
              <div
                className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td"
                style={{
                  paddingLeft: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                  height: "unset",
                }}
              >
                <p style={{ height: "25px" }} className="gx-mb-0 gx-ml-2">
                  {parse(dataSend?.content)}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

      <Modal
        title="メール送信完了"
        className="modal-confirm-mail-sended"
        width={420}
        visible={ModalMailHadsend}
        onCancel={() => {
          setModalMailHadsend(false);
        }}
        footer={false}
      >
        <p className="gx-text-center mb-25">メールの送信が完了しました。</p>
        <div>
          <p className="gx-text-center gx-mb-0">件名：{dataSend?.subject}</p>
          <p className="gx-text-center gx-mb-0">宛先：{dataSend?.email}</p>
          <p className="gx-text-center gx-mb-0">
            配信日時：{dataSend?.DeliveryDate}
          </p>
        </div>
        <div className="gx-d-flex justify-content-center mt-20">
          <button className="btn-ok-mail-sended">
            <span
              onClick={() => {
                setModalMailHadsend(false);
              }}
            >
              OK
            </span>
          </button>
        </div>
      </Modal>
    </>
  );
}
