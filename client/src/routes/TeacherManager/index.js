import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import TeacherList from "../../components/TeacherManager/TeacherList";
import { Tabs } from 'antd';
import TeacherDetail from "../../components/TeacherManager/TeacherDetail";
import TeacherAdd from "../../components/TeacherManager/TeacherAdd";

const { TabPane } = Tabs;

const TeacherManager = ({ match }) => {
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1" className="custom-tabs">
        <TabPane tab="Danh sách giáo viên" key="1">
          <Switch>
            <Route exact path={`${match.url}/teacher-detail/:id`} component={() => (<TeacherDetail/>)} />
            <Route exact path={`${match.url}/`} component={() => (<TeacherList/>)} />
          </Switch>
        </TabPane>
        <TabPane tab="Thêm mới giáo viên" key="2">
          <TeacherAdd />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default TeacherManager;
