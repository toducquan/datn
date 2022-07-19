import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col, DatePicker, TimePicker } from "antd";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDateJA, formatDatetimeJA } from "../../util";
import ModalConfirmEmail from "../Modal/ModalConfirmEmail";

ModalEmail.propTypes = {
  modalVisible: PropTypes.bool,
  modalCloseFunc: PropTypes.func.isRequired,
  modalConfirmFunc: PropTypes.func.isRequired,
};

ModalEmail.defaultProps = {
  modalVisible: false,
};

function ModalEmail(props) {
  const timeNow = formatDatetimeJA(new Date());
  const { modalVisible, modalCloseFunc, orderIndex } = props;
  const [ManualEmail, setManualEmail] = useState(false);
  const [isDisableInput, setIsDisableInput] = useState(true);
  const [checked, setChecked] = useState("即時配信");
  const [isModalConfirmEmail, setIsModalConfirmEmail] = useState(false);
  const [date, SetDate] = useState("");
  const [time, setTime] = useState("");
  const [dataSend, setDataSend] = useState({
    subject: "",
    content: "",
    DeliveryDate: timeNow,
    email: "",
  });

  useEffect(() => {
    if (orderIndex) {
      setDataSend({ ...dataSend, email: orderIndex?.customer?.email });
    }
  }, [orderIndex]);

  useEffect(() => {
    if (date && time) {
      setDataSend({ ...dataSend, DeliveryDate: `${date} ${time}` });
    }
  }, [date, time]);

  const customFormat = (value) => `${value.format("YYYY年MM月DD日")}`;
  const formatTimePicker = "HH:mm";

  const handleChangeDate = (date, dateString) => {
    if (dateString) {
      SetDate(dateString);
    }
  };
  const handleChangeTime = (date, timeString) => {
    if (timeString) {
      setTime(timeString);
    }
  };

  const convetTextPaymentMethod = (text) => {
    let convertDataIndex = "";
    if (text === "CreditCard") {
      return (convertDataIndex = "クレカ");
    } else {
      return (convertDataIndex = "銀行振込");
    }
  };

  const handleConfirmChangeEmailModal = () => {
    if (
      dataSend.email &&
      dataSend.DeliveryDate &&
      dataSend.content &&
      dataSend.subject
    ) {
      modalCloseFunc();
      setIsModalConfirmEmail(true);
    }
  };

  const handleCloseConfirmEmail = () => {
    setIsModalConfirmEmail(false);
  };

  return (
    <div>
      <Modal
        subject="個別メール配信"
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
            onClick={handleConfirmChangeEmailModal}
          >
            送信内容確認
          </Button>,
        ]}
      >
        <div className="card-detail">
          <div className="card-detail__title">会員情報</div>
          <Row className="card-detail-table">
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会員ID
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.id
                  .split("-")
                  .join("")
                  .substring(0, 10) || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                配布完了日
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {formatDateJA(orderIndex?.product?.distribute_complete_date) ||
                  ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.firstName || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.companyName || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.firstNameFurigana || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社名フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.companyNamePhonetic || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__item__left card-detail-table__th">
                メールアドレス
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {orderIndex?.customer?.email || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__th">
                ご利用の目的
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {orderIndex?.customer?.purposeOfUse || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__item__left card-detail-table__th">
                やること（お客様）
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {orderIndex?.customer?.email || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__th">
                都道府県
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {orderIndex?.customer?.prefectures || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__item__left card-detail-table__th">
                決済種類
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {convetTextPaymentMethod(orderIndex?.beforePaymentMethod) || ""}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__th">
                振込状況
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                {orderIndex?.customer?.address || ""}
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__item__left card-detail-table__th">
                期限
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                データ入稿期限:
                {formatDateJA(orderIndex?.product?.upload_deadline) || ""}
              </div>
            </Col>
          </Row>
        </div>

        <div className="card-detail">
          <div className="card-detail__title">メール新規作成</div>
          <Row className="card-detail-table">
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                宛先
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderIndex?.customer?.email}
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
                <input
                  type="radio"
                  className="card-detail-table__td__checkbox"
                  name="cbox_shipment"
                  value="即時配信"
                  onChange={(e) => {
                    setChecked(e.target.value);
                  }}
                  onClick={() => {
                    setIsDisableInput(true);
                    setDataSend({ ...dataSend, DeliveryDate: timeNow });
                  }}
                  checked={checked === "即時配信" && true}
                />
                <span className="card-detail-table__td__checkbox__name">
                  即時配信
                </span>

                <input
                  type="radio"
                  className="card-detail-table__td__checkbox"
                  name="cbox_shipment"
                  value="予約配信"
                  onChange={(e) => {
                    setChecked(e.target.value);
                  }}
                  onClick={() => {
                    setIsDisableInput(false);
                  }}
                  checked={checked === "予約配信" && true}
                />
                <span className="card-detail-table__td__checkbox__name">
                  予約配信
                </span>

                <DatePicker
                  className="card-detail-table__td__field card-detail-table__td__date"
                  defaultValue={
                    isDisableInput
                      ? ""
                      : moment("2021年01月01日", "YYYY年MM月DD日")
                  }
                  style={{ width: 133 }}
                  format={customFormat}
                  onChange={(date, dateString) =>
                    handleChangeDate(date, dateString)
                  }
                  disabled={isDisableInput ? true : false}
                />
                <TimePicker
                  className="card-detail-table__td__field card-detail-table__td__date card-detail-table__td__date_time"
                  style={{ width: 77 }}
                  defaultValue={
                    isDisableInput ? "" : moment("12:08", formatTimePicker)
                  }
                  format={formatTimePicker}
                  onChange={(date, dateString) =>
                    handleChangeTime(date, dateString)
                  }
                  disabled={isDisableInput ? true : false}
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                本文
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input"
                  style={{ width: 593 }}
                  onChange={(e) => {
                    setDataSend({ ...dataSend, subject: e.target.value });
                  }}
                  value={dataSend?.subject}
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div
                className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th"
                style={{ height: "unset" }}
              >
                手動メールを参照
              </div>
              <div className="card-detail-table__item card-detail-table__td custom-card-detail-table__td ">
                <button
                  className="btn-manual-email mt-2"
                  onClick={() => {
                    setManualEmail(!ManualEmail);
                  }}
                >
                  <p className="gx-mb-0 gx-text-left">手動メール参照</p>
                </button>
                {ManualEmail && (
                  <div className="w-100 manual-email_reference gx-d-flex justify-content-start mt-10">
                    <div className="w-80">
                      <div className="gx-d-flex justify-content-between manual-email_reference__fake">
                        <p className="color-links gx-font-weight-bold">
                          チラシが到着していないときの催促メール
                        </p>
                        <p className="color-links gx-font-weight-bold">
                          〇〇〇〇〇〇〇〇〇〇〇〇メール
                        </p>
                      </div>
                      <div className="gx-d-flex justify-content-between manual-email_reference__fake">
                        <p className="color-links gx-font-weight-bold">
                          チラシが到着していないときの催促メール
                        </p>
                        <p className="color-links gx-font-weight-bold">
                          〇〇〇〇〇〇〇〇〇〇〇〇メール
                        </p>
                      </div>
                      <div className="gx-d-flex justify-content-between manual-email_reference__fake">
                        <p className="color-links gx-font-weight-bold">
                          チラシが到着していないときの催促メール
                        </p>
                        <p className="color-links gx-font-weight-bold">
                          〇〇〇〇〇〇〇〇〇〇〇〇メール
                        </p>
                      </div>
                      <div className="gx-d-flex justify-content-between manual-email_reference__fake">
                        <p className="color-links gx-font-weight-bold">
                          チラシが到着していないときの催促メール
                        </p>
                        <p className="color-links gx-font-weight-bold">
                          〇〇〇〇〇〇〇〇〇〇〇〇メール
                        </p>
                      </div>
                      <div className="gx-d-flex justify-content-between manual-email_reference__fake">
                        <p className="color-links gx-font-weight-bold">
                          チラシが到着していないときの催促メール
                        </p>
                        <p className="color-links gx-font-weight-bold">
                          〇〇〇〇〇〇〇〇〇〇〇〇メール
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                <CKEditor
                  editor={ClassicEditor}
                  data={dataSend?.content || ""}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDataSend({ ...dataSend, content: data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

      <ModalConfirmEmail
        modalVisible={isModalConfirmEmail}
        modalCloseFunc={handleCloseConfirmEmail}
        dataSend={dataSend}
      />
    </div>
  );
}

export default ModalEmail;
