import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col, DatePicker, Select } from "antd";
import moment from "moment";
import { IconDropdown } from "../Icons/IconDropdown";

ModalEdit.propTypes = {
  modalVisible: PropTypes.bool,
  modalCloseFunc: PropTypes.func.isRequired,
  modalConfirmFunc: PropTypes.func.isRequired,
};

ModalEdit.defaultProps = {
  modalVisible: false,
};

function ModalEdit(props) {
  const { modalVisible, modalCloseFunc, modalConfirmFunc } = props;

  const customFormat = (value) => `${value.format("YYYY年MM月DD日")}`;

  const handleChangeDate = (value) => {
    if (value) {
      console.log(value._i);
    }
  };

  const { Option } = Select;
  return (
    <div>
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
            onClick={modalConfirmFunc}
          >
            編集
          </Button>,
          <Button
            type="text"
            className="custom-modal-footer custom-modal-footer__close"
            onClick={modalCloseFunc}
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
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="0000000000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                購入日
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="2021年00月00日 09:32"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="00000000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                配布完了日
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="2021年00月00日"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品種別
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="成立前"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                成立状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="未"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                商品大カテゴリ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="GoodLife(チラシ)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                商品小カテゴリ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ポスト投函/併"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                配布エリアブロック
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 170 }}
                  defaultValue="東京 / 千代田区・中央区"
                />
                <span className="color-links gx-font-weight-bold">詳細</span>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                配布部数
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 170 }}
                  defaultValue="000,000 部"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                商品名
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="商品名商品名商品名商品名商品名商品名商品"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                やること（お客様）
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="チラシデータアップロード未 / 即/決"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                やること（JOH）
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue=" 済（銀行振込）未"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会員ID
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000000 / 代理店(ゴールド)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="株式会社〇〇〇〇〇"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="〇〇〇〇〇"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="00000000000"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                郵便番号・住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="〒000-0000　住所住所住所住所"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                メールアドレス
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="samplesample0123@gmail.com"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                期限
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="データ入稿期限:2021年00月00日　直接送付期限:2021年00月00日　チラシ配布開始日:2021年00月00日"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                申し込み順
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue=" 1"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                割引率/値引済単価
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="23％ / 8.5円"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザインデータ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="印刷済みチラシを直接送付する"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                作成依頼内容 / オプション
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザインデータ確認
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                広告審査
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                サイズ / 折り加工
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="A4 / ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                カラー
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="両面カラー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                用紙の種類
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="マット"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                用紙の厚さ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="70kg"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                成立前デザイン料振込
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <select
                  className="card-detail-table__td__field card-detail-table__td__select"
                  defaultValue={{ value: "済" }}
                  style={{ width: 55, height: 26 }}
                >
                  <option value="済">済</option>
                </select>
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                用紙の重さ/ページ数
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー / ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                即 / 決済
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                {" "}
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                後 / 決済金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                即 / 決済状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                後 / 決済状況
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ー"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                注文合計金額
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                お手元送付分
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                配布料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                印刷料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                デザイン料金
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                お手元金額（送料込）
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000,000円 (税込 000,000円)"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                小地域指定
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 50 }}
                  defaultValue="あり"
                />

                <span className="color-links ml-3 gx-font-weight-bold">
                  詳細を見る
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
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="○○○○○○株式会社"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                部署名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input  custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="○○○○○○部"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="名前　名前"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ナマエ　ナマエ"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="0000000000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                郵便番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="0000000"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="住所住所住所住所住所住所住所住所住所住所住所住所住所"
                />
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
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="名前　名前"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="ナマエ　ナマエ"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="○○○○○○株式会社"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="カブシキガイシャ○○○"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="0000000000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                郵便番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="0000000"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="住所住所住所住所住所住所住所住所住所住所住所住所住所"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-detail">
          <div className="card-detail__title">代理店ユーザー情報</div>
          <Row className="card-detail-table">
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会員ID
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                電話番号
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="000-0000-0000"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                お名前
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="名前　名前"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="
                  ナマエ　ナマエ
                  "
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__th">
                会社名
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="○○○○○○株式会社"
                />
              </div>
            </Col>
            <Col span="12" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__th">
                会社名フリガナ
              </div>
              <div className="card-detail-table__item card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 198 }}
                  defaultValue="○○○○カブシキガイシャ"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                メールアドレス
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="samplesample0123@gmail.com"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                住所
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="住所住所住所住所住所住所住所住所住所住所住所住所住所"
                />
              </div>
            </Col>
            <Col span="24" className="card-detail-table-col">
              <div className="card-detail-table__item card-detail-table__item__left card-detail-table__item__bottom card-detail-table__th">
                メモ
              </div>
              <div className="card-detail-table__item card-detail-table__item__bottom card-detail-table__td">
                <input
                  type="text"
                  className="card-detail-table__td__field card-detail-table__td__input custom-input-home-page"
                  style={{ width: 593 }}
                  defaultValue="メモメモメモメモメモ"
                />
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
            defaultValue="メモを書き込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き  込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き込むことができますメモを書き込むことができます。"
          />
        </div>
      </Modal>
    </div>
  );
}

export default ModalEdit;
