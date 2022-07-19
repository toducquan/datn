import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Tabs } from 'antd';
import DeviceList from "../../components/DeviceManager/DeviceList";
import DeviceClass from "../../components/DeviceManager/DeviceClass";

const { TabPane } = Tabs;

const DeviceManager = ({ match }) => {
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1" className="custom-tabs">
        <TabPane tab="Thiết bị tồn kho" key="1">
          <DeviceList/>
        </TabPane>
        <TabPane tab="Thiêt bị đã bàn giao" key="2">
          <DeviceClass />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default DeviceManager;
