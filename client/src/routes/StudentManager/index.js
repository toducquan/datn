import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import StudentList from "../../components/StudentManager/StudentList";
import { Tabs } from 'antd';
import StudentDetail from "../../components/StudentManager/StudentDetail";
import StudentAdd from "../../components/StudentManager/StudentAdd";
import StudentClass from "../../components/StudentManager/StudentClass";

const { TabPane } = Tabs;

const StudentManager = ({ match }) => {
  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1" className="custom-tabs">
        <TabPane tab="Danh sách học sinh" key="1">
          <Switch>
            <Route exact path={`${match.url}/student-detail/:id`} component={() => (<StudentDetail/>)} />
            <Route exact path={`${match.url}/`} component={() => (<StudentList/>)} />
          </Switch>
        </TabPane>
        <TabPane tab="Thêm mới học sinh" key="2">
          <StudentAdd />
        </TabPane>
        <TabPane tab="Thêm học sinh vào lớp" key="3">
          <StudentClass />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default StudentManager;
