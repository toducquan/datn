import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { useSelector } from 'react-redux';
import moment from 'moment';

const AddNewHonor = () => {
    const [teacherList, setTeacherList] = useState();
    const [searchOption, setSearchOption] = useState()
    const [newHonor, setNewHonor] = useState()
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];

    const getTeachers = () => {
        httpClient.get('http://localhost:5000/user', {
            params: {
                ...searchOption,
            }
        }).then((res) => {
            setTeacherList(res.data[0])
        })
            .catch((err) => console.log('err: ', err))
    }
    console.log(teacherList)

    const handleAddNewHonor = () => {
        httpClient.post('http://localhost:5000/honor', {
            ...newHonor,
            userId: String(teacherList?.id),
            semesterId: String(currentSemesteer?.id),
        }).then((res) => {
            notification['success']({
                message: 'Đề xuất thành công',
                description:
                    'Đề xuất của bạn được tạo thành công',
            });
        })
            .catch((err) => console.log('err: ', err))
    }

    return (
        <React.Fragment>
            <div id="addNewPurchase">
                <Card
                    className="custom-card custom-card-listpage"
                    title="Đề xuất khen thưởng/kỉ luật"
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
                            <div className="__th bd-right">Email</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setSearchOption({ ...searchOption, email: e.target.value })}
                                    />
                                    <button className="btn_search" onClick={() => getTeachers()}>Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Họ tên</div>
                            <div className="__td">
                                <div className="__td_child">{teacherList?.username}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Email</div>
                            <div className="__td">
                                <div className="__td_child">{teacherList?.email}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Vai trò</div>
                            <div className="__td">
                                <div className="__td_child">{teacherList?.role == 3 ? 'Học sinh' : 'Giáo viên'}</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Lí do khen thưởng</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <input
                                        type="text"
                                        className="text-field"
                                        name=""
                                        id=""
                                        style={{ width: 700 }}
                                        onChange={(e) => setNewHonor({ ...newHonor, reason: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Phụ Phí (nếu có)</div>
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
                            <div className="__th bd-right">Hình Thức</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <select
                                        className="search-option"
                                        defaultValue={"Chọn hình thức"}
                                        style={{ width: 188 }}
                                        onChange={(e) => setNewHonor({ ...newHonor, type: e.target.value })}
                                    >
                                        <option disabled selected hidden>Chọn hình thức</option>
                                        <option value="Praise">Khen Thưởng</option>
                                        <option value="Critique">Kỷ Luật</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row style={{ marginTop: "17px" }}>
                        <Col span={10}></Col>
                        <Col span={11}>
                            <button
                                className="btn btn-confirm"
                                style={{ width: 120, height: 35, fontSize: 16 }}
                                onClick={handleAddNewHonor}
                            >
                                Tạo mới
                            </button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default AddNewHonor