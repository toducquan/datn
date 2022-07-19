import React, { useState } from "react";
import { Tabs } from 'antd';
import ListMoneyClass from "../../components/MoneyManager/ListMoneyClass";
import AddMoney from "../../components/MoneyManager/AddMoney";

const { TabPane } = Tabs;

const MoneyManager = ({ match }) => {
    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" className="custom-tabs">
                <TabPane tab="Danh sách khoản thu" key="1">
                    <ListMoneyClass />
                </TabPane>
                <TabPane tab="Thêm mới khoản thu" key="2">
                    <AddMoney />
                </TabPane>
            </Tabs>
        </React.Fragment>
    );
};

export default MoneyManager;
