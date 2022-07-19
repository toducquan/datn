import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "antd";
import { formatDateJA, formatDatetimeJA } from "../../util";
import { httpClient } from "../../util/Api";
import ModalAreaList from "./ModalAreaList";

ModalDetail.propTypes = {
  modalVisible: PropTypes.bool,
  modalCloseFunc: PropTypes.func.isRequired,
};

ModalDetail.defaultProps = {
  modalVisible: false,
};

function ModalDetail(props) {
  const { modalVisible, modalCloseFunc, orderDetail, showModaListArea } = props;
  const [detailOrEdit, setDetailOrEdit] = useState(true);
  const [designFeeTransfer, setdesignFeeTransfer] = useState("Uncompleted");
  const [dataOrderUpdate, setDataOrderUpdate] = useState();

  const updateOrderApi = async (id) => {
    httpClient
      .put(`order/update/${id}`, dataOrderUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const convertDataText = (dataText) => {
    let convertDataIndex = "";
    if (dataText === "Completed") {
      return (convertDataIndex = "済");
    } else {
      return (convertDataIndex = "未");
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

  const convertTypeOfPaper = (text) => {
    let convertDataIndex = "";
    if (text === "mat") {
      return (convertDataIndex = "マット");
    } else if (text === "glossy") {
      return (convertDataIndex = "光沢のある");
    } else {
      return (convertDataIndex = "プレーン");
    }
  };

  const EditOrCofirm = () => {
    if (detailOrEdit) {
      setDetailOrEdit(false);
    } else {
      modalCloseFunc();
      updateOrderApi(orderDetail?.id);
      setDetailOrEdit(true);
    }
  };

  const toDoUser = (item) => {
    if (
      item?.designData != "デザインデータ作成依頼をする" &&
      !item?.designDataDocument
    ) {
      return "データアップロード未";
    }
    if (
      item?.designData != "デザインデータ作成依頼をする" &&
      item?.designFeePaymentStatus != "Completed"
    ) {
      return "「前回のデザイン料」の振込は未払いです。";
    }
    if (
      item?.beforePaymentMethod == "Banking" &&
      item?.beforePaymentStatus == "Uncompleted"
    ) {
      return "「即時/決済」振込は未払いです。";
    }
    if (
      item?.afterPaymentMethod == "Banking" &&
      item?.afterPaymentStatus == "Uncompleted"
    ) {
      return "「アフター/セトルメント」振替は未払いです";
    }
  };

  const toDoAdmin = (item) => {
    if (!item?.designDataDocument && item?.designDataChecked == "Uncompleted") {
      return "デザイン作成やり取り";
    }
    if (
      item?.designData != "デザインデータ作成依頼をする" &&
      item?.designFeePaymentStatus != "Uncompleted"
    ) {
      return "銀行振込確認";
    }
    if (
      item?.beforePaymentMethod == "Banking" &&
      item?.beforePaymentStatus == "Uncompleted"
    ) {
      return "銀行振込確認";
    }
    if (
      item?.afterPaymentMethod == "Banking" &&
      item?.afterPaymentStatus == "Uncompleted"
    ) {
      return "銀行振込確認";
    }
  };

  return (
    <div>
      <Modal
        title="未処理情報詳細"
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
            onClick={EditOrCofirm}
          >
            編集
          </Button>,
          <Button
            type="text"
            className="custom-modal-footer custom-modal-footer__close"
            onClick={() => {
              modalCloseFunc();
              setDetailOrEdit(true);
            }}
          >
            閉じる
          </Button>,
        ]}
      >
        <div className="card-detail">
          <div className="card-detail__title">購入商品詳細</div>
          <div className="card-detail__date_update">更新日：2021年00月00日</div>
          <Row className="card-detail-table">
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                注文番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.code || ""}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                注文日時
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {formatDatetimeJA(orderDetail?.createdOnDate) || ""}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.code}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                配布完了日
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {formatDatetimeJA(
                    orderDetail?.product?.distribute_complete_date
                  )}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品種別
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.type}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                成立状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.product?.type === "成立前" ? "未" : "済"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品大カテゴリ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.product_size_category}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                商品小カテゴリ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.product_small_category}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                配布エリアブロック
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.areaBlock} </span>
                <span
                  className="color-links gx-font-weight-bold ml-3 gx-pointer "
                  onClick={() => {
                    showModaListArea("getAll", orderDetail?.product?.areaBlock);
                  }}
                >
                  詳細
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                配布部数
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.numberOfCopiesActual}部</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                商品名
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{orderDetail?.product?.name}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                やること（お客様）
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{toDoUser(orderDetail)}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                やること（JOH）
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{toDoAdmin(orderDetail)}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会員ID
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.customer?.id
                    .split("-")
                    .join("")
                    .substring(0, 10)}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.customer?.companyName}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.customer?.lastName}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.customer?.phone}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                郵便番号・住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{`${orderDetail?.customer?.zipCode}/${orderDetail?.customer?.address}`}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                メールアドレス
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{orderDetail?.customer?.email}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                期限
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>
                  {formatDateJA(orderDetail?.product?.upload_deadline)}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                申し込み順
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.product?.name}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                割引率/値引済単価
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{`${orderDetail?.percentDiscount}% / `}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザインデータ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.designData}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                作成依頼内容 / オプション
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.designData === "デザインデータ作成依頼をする"
                    ? `${orderDetail?.createContent} / ${orderDetail?.createOption}`
                    : "なし"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザインデータ確認
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {orderDetail?.designData ===
                  "デザインデータをアップロードする" &&
                orderDetail?.designDataChecked === "Uncompleted" ? (
                  <span className="color-links gx-pointer">確認する</span>
                ) : (
                  <span>{"_"}</span>
                )}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                広告審査
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {!detailOrEdit &&
                orderDetail?.designData ===
                  "デザインデータをアップロードする" ? (
                  <select
                    className="card-detail-table__td__field card-detail-table__td__select"
                    defaultValue={{ value: "OK" }}
                    style={{ width: 55, height: 26 }}
                  >
                    <option value="OK">OK</option>
                  </select>
                ) : (
                  <span>{"_"}</span>
                )}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                サイズ / 折り加工
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.sizeOfPaper} /{" "}
                  {orderDetail?.foldingFee != 0 ? orderDetail?.foldingFee : "_"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                カラー
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.colorOFPaper}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                用紙の種類
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{convertTypeOfPaper(orderDetail?.typeOfPaper)}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                用紙の厚さ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.thickness}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                成立前デザイン料振込
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {detailOrEdit ? (
                  <>
                    {orderDetail?.designData ===
                    "デザインデータ作成依頼をする" ? (
                      <span>{convertDataText(designFeeTransfer)}</span>
                    ) : (
                      <span>_</span>
                    )}
                  </>
                ) : (
                  <>
                    {orderDetail?.designData ===
                    "デザインデータ作成依頼をする" ? (
                      <select
                        className="card-detail-table__td__field card-detail-table__td__select"
                        defaultValue={{ value: "未" }}
                        style={{ width: 55, height: 26 }}
                        onChange={(e) => {
                          setdesignFeeTransfer(e.target.value);
                          setDataOrderUpdate({
                            ...dataOrderUpdate,
                            designFeePaymentStatus: e.target.value,
                          });
                          console.log(e.target.value);
                        }}
                      >
                        <option value="Uncompleted">未</option>
                        <option value="Completed">済</option>
                      </select>
                    ) : (
                      <span>
                        <span>_</span>
                      </span>
                    )}
                  </>
                )}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                用紙の重さ/ページ数
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.weight || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                即 / 決済
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {convetTextPaymentMethod(orderDetail?.beforePaymentMethod)}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {convetTextPaymentMethod(orderDetail?.afterPaymentMethod)}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                後 / 決済金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.beforePaymentAmount || 0}円</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.afterPaymentAmount || 0}円</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                即 / 決済状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{convertDataText(orderDetail?.beforePaymentStatus)}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {detailOrEdit ? (
                  <span>
                    {convertDataText(orderDetail?.afterPaymentStatus) || "_"}
                  </span>
                ) : (
                  <>
                    {orderDetail?.afterPaymentStatus ? (
                      <select
                        className="card-detail-table__td__field card-detail-table__td__select"
                        defaultValue={{ value: "未" }}
                        style={{ width: 55, height: 26 }}
                        onChange={(e) => {
                          setDataOrderUpdate({
                            ...dataOrderUpdate,
                            afterPaymentStatus: e.target.value,
                          });
                        }}
                      >
                        <option value="Uncompleted">未</option>
                        <option value="Completed">済</option>
                      </select>
                    ) : (
                      "_"
                    )}
                  </>
                )}
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                注文合計金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.totalFee}円 </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                お手元送付分
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.numberOfCopiesAmountToHand}部</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                配布料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.distributionFee}円</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                印刷料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.printingFee || 0}円</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザイン料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.designFee || 0}円</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                お手元金額（送料込）
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.amountToHandFee || 0}円</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                小地域指定
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>
                  {orderDetail?.orderWithWards?.length ? (
                    <>
                      <span>あり</span>
                      <span
                        className="color-links ml-3 gx-font-weight-bold"
                        onClick={() => {
                          showModaListArea("only");
                        }}
                      >
                        詳細を見る
                      </span>
                    </>
                  ) : (
                    "_"
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="card-detail">
          <div className="card-detail__title">出荷元 1</div>
          <Row className="card-detail-table">
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                法人名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.companyName || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                部署名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.shippingSource?.departmentName || "_"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.firstName || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.shippingSource?.furiganaLastName || "_"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.phone || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                郵便番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.postCost || "_"}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{orderDetail?.shippingSource?.street || "_"}</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="card-detail">
          <div className="card-detail__title">サンプルお届け先</div>
          <Row className="card-detail-table">
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.lastName || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>
                  {orderDetail?.shippingSource?.furiganaLastName || "_"}
                </span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.companyName || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.companyName || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.phone || "_"}</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                郵便番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <span>{orderDetail?.shippingSource?.postCost || "_"}</span>
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <span>{orderDetail?.shippingSource?.street || "_"}</span>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-detail">
          <div className="card-detail__title">メモ</div>
          <textarea
            type="text"
            className="card-detail-table__td__field card-detail-table__td__input gx-ml-0 gx-pt-2 gx-pb-2"
            style={{ width: 790, height: 90 }}
            disabled={true}
            defaultValue={orderDetail?.customer?.note}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetail;
