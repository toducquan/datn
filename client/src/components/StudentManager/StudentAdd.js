import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { useSelector } from 'react-redux';
import moment from 'moment';

const StudentAdd = () => {
    const [newTeacher, setNewTeacher] = useState({
        role: "3"
    })
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];


    const handleAddTeacher = () => {
        if (currentSemesteer.status != 'Preparing') {
            notification['warning']({
                message: 'Chức năng không khả dụng',
                description:
                    'Bạn chỉ có thể thêm học sinh khi học kì mới vừa bắt đầu',
            });
        } else {
            httpClient.post('http://localhost:5000/user', {
                ...newTeacher,
            }).then((res) => {
                notification['success']({
                    message: 'Thêm thành công',
                    description:
                        'Tài khoản tạo thành công',
                });
            })
                .catch((err) => console.log('err: ', err))
        }
    }

    return (
        <React.Fragment>
            <div id="addNewPurchase">
                <Card
                    className="custom-card custom-card-listpage"
                    title="Nhập thông tin học sinh"
                    style={{ paddingBottom: 30 }}
                >
                    <Row style={{ marginBottom: "7px" }}>
                        <Col span={19}></Col>
                        <Col span={4}>
                            <span style={{ fontSize: 12 }}>Ngày：12/07/2022</span>
                        </Col>
                    </Row>
                    <div className="custom-table-mail">
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Họ Tên</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Email</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Password</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Ngày sinh</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, dob: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Tuổi</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, age: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Nơi sinh</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Dân tộc</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Tôn giáo</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Khối</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <select
                                        className="search-option"
                                        defaultValue={"Chọn khối"}
                                        style={{ width: 188 }}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, grade: parseInt(e.target.value) })}
                                    >
                                        <option disabled selected hidden>Chọn khối</option>
                                        <option value="6">Khối 6</option>
                                        <option value="7">Khối 7</option>
                                        <option value="8">Khối 8</option>
                                        <option value="9">Khối 9</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row style={{ marginTop: "17px" }}>
                        <Col span={6}></Col>
                        <Col span={3}>
                            <Link to={`/teacher-manager`}>
                                <button
                                    className="btn btn-back"
                                    style={{ width: 120, height: 35, fontSize: 16 }}
                                >
                                    Quay lại
                                </button>
                            </Link>
                        </Col>
                        <Col span={11}>
                            <button
                                className="btn btn-confirm"
                                style={{ width: 120, height: 35, fontSize: 16 }}
                                onClick={handleAddTeacher}
                            >
                                Lưu
                            </button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default StudentAdd