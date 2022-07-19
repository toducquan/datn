import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import TeacherAdd from "../../components/TeacherManager/TeacherAdd";
import AddNewHonor from "../../components/HonorCenter/AddNewHonor";
import HonorList from "../../components/HonorCenter/HonorList";
import { httpClient } from '../../util/Api';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const HonorCenter = ({ match }) => {
    const [listPr, setListPr] = useState();
    const [listCr, setListCr] = useState();
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];

    useEffect(() => {
        getListPr();
        getListCr();
    }, [])

    const getListPr = () => {
        httpClient.get('http://localhost:5000/honor', {
            params: {
                semesterId: String(currentSemesteer?.id),
                type: 'Praise'
            }
        }).then((res) => {
            setListPr(res.data)
        })
            .catch((err) => console.log('err: ', err))
    }

    const getListCr = () => {
        httpClient.get('http://localhost:5000/honor', {
            params: {
                semesterId: String(currentSemesteer?.id),
                type: 'Critique'
            }
        }).then((res) => {
            setListCr(res.data)
        })
            .catch((err) => console.log('err: ', err))
    }

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" className="custom-tabs">
                <TabPane tab="Đề xuất" key="1">
                    <AddNewHonor />
                </TabPane>
                <TabPane tab="Danh sách khen thưởng" key="2">
                    <HonorList data={listPr}/>
                </TabPane>
                <TabPane tab="Danh sách kỉ luật" key="3">
                    <HonorList data={listCr}/>
                </TabPane>
            </Tabs>
        </React.Fragment>
    );
};

export default HonorCenter;
