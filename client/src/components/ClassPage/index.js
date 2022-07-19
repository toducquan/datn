import React, { useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Tabs } from 'antd';
import ClassInformation from './ClassInformation';
import ClassStudent from './ClassStudent';
import ListTest from './Test/ListTest';
import TestDetail from './Test/TestDetail';
import MoneyDetail from './Money/MoneyDetail';
import ListMoney from './Money/ListMoney';
import { Switch, Route } from "react-router-dom";

const { TabPane } = Tabs;

const ClassPage = () => {
  const [detail, setDetail] = useState(false);
  const [detailMoney, setDetailMoney] = useState(false);
  const [id, setId] = useState();
  const [idMoney, setIdMoney] = useState();
  return (
    <div>
      <React.Fragment >
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane tab="Thông tin chung" key="1">
            <ClassInformation />
          </TabPane>
          <TabPane tab="Danh sách học sinh" key="2">
            <ClassStudent />
          </TabPane>
          <TabPane tab="Danh sách bài test" key="3">
            {detail ? (<TestDetail id={id} setDetail={setDetail} />) : (<ListTest setDetail={setDetail} setId={setId} />)}
          </TabPane>
          <TabPane tab="Danh sách học phí" key="4">
            {detailMoney ? (<MoneyDetail id={idMoney} setDetail={setDetailMoney} />) : (<ListMoney setDetail={setDetailMoney} setId={setIdMoney} />)}
          </TabPane>
        </Tabs>
      </React.Fragment>
    </div>
  )
}

export default ClassPage