import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { useSelector } from 'react-redux';
import moment from 'moment';

const StudentClass = () => {
    const [teacherList, setTeacherList] = useState();
    const [searchOption, setSearchOption] = useState({
        role: "3",
    })
    const [newHonor, setNewHonor] = useState()
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];
    const [classInSchool, setClassInSchool] = useState();

    const getTeachers = () => {
        console.log(searchOption)
        httpClient.get('http://localhost:5000/user', {
            params: {
                ...searchOption,
            }
        }).then((res) => {
            setTeacherList(res.data[0])
        })
            .catch((err) => console.log('err: ', err))
    }

    useEffect(() => {
        getAllClassInSC()
    }, [])

    const getAllClassInSC = () => {
        httpClient.get('http://localhost:5000/class')
            .then(res => {
                setClassInSchool(res.data)
            })
            .catch(err => console.log('err: ', err));
    }

    const handleAddNewHonor = () => {
        if (currentSemesteer.status != 'Preparing') {
            notification['warning']({
                message: 'Chức năng không khả dụng',
                description:
                    'Bạn chỉ có thể thêm học sinh vào lớp khi học kì mới vừa bắt đầu',
            });
        } else {
            httpClient.post('http://localhost:5000/class-student', {
                ...newHonor,
                studentId: String(teacherList?.id),
                semesterId: String(currentSemesteer?.id),
            }).then((res) => {
                notification['success']({
                    message: 'Thêm thành công',
                    description:
                        'Học sinh đã được thêm vào lớp',
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
                                <div className="__td_child">Học sinh</div>
                            </div>
                        </div>
                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Khối</div>
                            <div className="__td">
                                <div className="__td_child">{teacherList?.grade}</div>
                            </div>
                        </div>

                        <div className="table-row bd-bottom">
                            <div className="__th bd-right">Chọn lớp:</div>
                            <div className="__td">
                                <div className="__td_child">
                                    <select
                                        className="search-option"
                                        defaultValue={"Chọn lớp"}
                                        style={{ width: 188 }}
                                        onChange={(e) => setNewHonor({ ...newHonor, classId: e.target.value })}
                                    >
                                        <option disabled selected hidden>Chọn lớp</option>
                                        {
                                            classInSchool?.map((item) => {
                                                return (
                                                    <option value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
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

export default StudentClass