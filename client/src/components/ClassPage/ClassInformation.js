import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Col, Row, Modal, notification } from 'antd';
import moment from 'moment';
import { useAuth } from "../../authentication";

const ClassInformation = () => {
    const { id } = useParams();
    const { authUser } = useAuth();

    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];
    const [classInfor, setClassInfor] = useState();
    const [teacher, setTeacher] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [teacherClass, setTeacherClass] = useState(false);

    useEffect(() => {
        getClassInfor();
        getAllTeacher();
    }, [])



    const getClassInfor = () => {
        httpClient.get('http://localhost:5000/class-teacher', {
            params: {
                classId: id,
                semesterId: currentSemesteer.id
            }
        }).then((res) => {
            setClassInfor(res.data[0])
        })
            .catch((err) => console.log('err: ', err))
    }

    const getAllTeacher = () => {
        httpClient.get('http://localhost:5000/user', {
            params: {
                role: 2,
            }
        }).then((res) => {
            setTeacher(res.data)
        })
            .catch((err) => console.log('err: ', err))
    }

    const handleModalVisible = (id) => {
        if (currentSemesteer.status != 'Preparing') {
            notification['warning']({
                message: 'Chức năng không khả dụng',
                description:
                    'Bạn chỉ có thể phân công giảng dạy khi học kì mới vừa bắt đầu',
            });
        } else {
            setModalVisible(true)
        }
    }

    const handleAddTeacherClass = () => {
        httpClient.post('http://localhost:5000/class-teacher', {
            ...teacherClass,
            classId: id,
            semesterId: String(currentSemesteer.id)
        }).then((res) => {
            getClassInfor();
            setModalVisible(false)
        })
            .catch((err) => console.log('err: ', err))
    }

    return (
        <React.Fragment>
            <div id='addNewPurchase'>
                <Card
                    className="custom-card custom-card-listpage"
                    title="Thông tin chung"
                    style={{ paddingBottom: "27px" }}
                >
                    <Row style={{ marginBottom: "27px" }}>
                        <Col span={1}>
                        </Col>
                        <Col span={18}>
                            {
                                authUser.role == 1 && (
                                    <button type="primary" className='btn_success' onClick={handleModalVisible}>Phân công</button>
                                )
                            }
                        </Col>
                        <Col span={4}>
                            <span style={{ fontSize: 12 }}>Ngày tạo: {moment(classInfor?.createdAt).format("DD/MM/YYYY")}</span>
                        </Col>
                    </Row>
                    <div className="custom-table-mail">
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Tên lớp: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.class.name}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Khối: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.class.grade}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">GVCN: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.managerTeacher.username}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">GV Toán: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.mathTeacher.username}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">GV Tiếng Anh: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.englishTeacher.username}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">GV Hóa: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.chemistryTeacher.username}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">GV Sử: </div>
                            <div className="__td">
                                <div className="__td_child">{classInfor?.historyTeacher.username}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <Modal
                title="Phân công giảng dạy"
                className="status-modal status-modal__success modal-edit"
                centered
                closable={false}
                visible={modalVisible}
                getContainer="#addNewPurchase"
                footer={null}
                width={500}
            >
                <Row className='custom-row' style={{ marginTop: "20px" }}>
                    <Col>
                        <div className='row-custom-table'>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Giáo viên chủ nhiệm</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn giáo viên chủ nhiệm" onChange={(e) => setTeacherClass({ ...teacherClass, managerId: e.target.value })}>
                                        <option selected hidden>Chọn giáo viên chủ nhiệm</option>
                                        {
                                            teacher?.map((item) => {
                                                return (
                                                    <option value={item.id}>{item.username}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Giáo viên toán</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn giáo viên toán" onChange={(e) => setTeacherClass({ ...teacherClass, mathId: e.target.value })}>
                                        <option selected hidden>Chọn giáo viên toán</option>
                                        {
                                            teacher?.map((item) => {
                                                if (item.major == "Math")
                                                    return (
                                                        <option value={item.id}>{item.username}</option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Giáo viên tiếng anh</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn giáo viên tiếng anh" onChange={(e) => setTeacherClass({ ...teacherClass, englishId: e.target.value })}>
                                        <option selected hidden>Chọn giáo viên tiếng anh</option>
                                        {
                                            teacher?.map((item) => {
                                                if (item.major == "English")
                                                    return (
                                                        <option value={item.id}>{item.username}</option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Giáo viên hóa</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn giáo viên hóa" onChange={(e) => setTeacherClass({ ...teacherClass, chemistryId: e.target.value })}>
                                        <option selected hidden>Chọn giáo viên hóa</option>
                                        {
                                            teacher?.map((item) => {
                                                if (item.major == "Chemistry")
                                                    return (
                                                        <option value={item.id}>{item.username}</option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Giáo viên sử</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn giáo viên sử" onChange={(e) => setTeacherClass({ ...teacherClass, historyId: e.target.value })}>
                                        <option selected hidden>Chọn giáo viên sử</option>
                                        {
                                            teacher?.map((item) => {
                                                if (item.major == "History")
                                                    return (
                                                        <option value={item.id}>{item.username}</option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col span={8}></Col>
                    <Col span={5}>
                        <button className="btn btn-back" style={{ width: 100 }} onClick={() => setModalVisible(false)}>Thoát</button>
                    </Col>
                    <Col span={11}>
                        <button className="btn btn-confirm" style={{ width: 100 }} onClick={handleAddTeacherClass}>Lưu</button>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default ClassInformation