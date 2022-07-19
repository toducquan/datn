import React, { useEffect, useState } from "react";
import { Card, Modal, Table } from "antd";
import { httpClient } from "../../util/Api";

export default function ModalAreaList(props) {
  const {
    modalVisible,
    modalCloseFunc,
    isDistributionAreaList,
    areaBlock,
    listSelected,
  } = props;
  const [dataWard, setDataWard] = useState([]);

  useEffect(() => {
    if (!isDistributionAreaList) {
      getDistricByName(areaBlock);
    } else {
      setDataWard(listSelected);
    }
  }, [isDistributionAreaList, areaBlock]);

  const getDistricByName = async (areaBlock) => {
    httpClient
      .get(`district/get-wards-by-district-name?page=1&size=20`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { name: areaBlock },
      })
      .then((res) => {
        setDataWard(res.data);
      })
      .catch((err) => console.log(err));
  };

  const column = [
    {
      title: <span className="gx-font-weight-bold">町丁目</span>,
      dataIndex: "chochoOrCharacter",
      width: 180,
      className: "gx-text-left",
    },
    {
      title: <span className="gx-font-weight-bold">戸数</span>,
      dataIndex: "numberOfCopiesDistributed",
      width: 140,
    },
    {
      title: (
        <span className="gx-font-weight-bold gx-text-center">対象エリア名</span>
      ),
      dataIndex: "name",
      width: 180,
      className: "gx-text-left",
    },
  ];
  return (
    <React.Fragment>
      <div className="">
        <Modal
          title={
            !isDistributionAreaList ? (
              "エリアブロック内地域一覧"
            ) : (
              <div>
                <p className="gx-mb-0">配布地域一覧 \</p>（小地域指定あり）
              </div>
            )
          }
          className="custom-modal gx-p-0 custom-modal-area-list"
          visible={modalVisible}
          footer={false}
          closable={modalCloseFunc}
        >
          <Card title="千代田区・中央区" className="custom-card-modal gx-p-0">
            <h3 className="gx-font-weight-bold gx-mb-0 gx-pt-2 gx-pb-2 gx-text-center gx-w-100">
              GoodLife (本誌) ポスト投函【成立前】 合計 126,685
            </h3>
            <Table
              className=""
              columns={column}
              dataSource={dataWard}
              pagination={false}
              scroll={{ y: 700 }}
              style={{ width: 590 }}
              footer={false}
            ></Table>
            <div className="gx-d-flex justify-content-center mt-20 mb-22">
              <button
                className="btn-cancel-modal-list"
                onClick={modalCloseFunc}
              >
                <span>戻る</span>
              </button>
            </div>
          </Card>
        </Modal>
      </div>
    </React.Fragment>
  );
}
