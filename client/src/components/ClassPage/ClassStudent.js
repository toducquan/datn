import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import moment from 'moment';
import { SearchIcon } from '../Icons/SearchIcon'

const ClassStudent = () => {
    const { id } = useParams();
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];
    const [classInfor, setClassInfor] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [morality, setMorality] = useState("Good");
    useEffect(() => {
        getClassInfor();
    }, [])

    console.log(classInfor)

    const handleChangeMorality = () => {
        httpClient.patch('http://localhost:5000/class-student', [
            {
                studentId: selectedStudent?.student.id,
                classId: selectedStudent?.class.id,
                semesterId: selectedStudent?.semester.id,
                morality: morality,
            }
        ]).then(res => {
            getClassInfor();
            setModalVisible(false)
        })
            .catch(err => console.log('err: ', err));
    }
    const handleModalVisible = (id) => {
        if (currentSemesteer.status != 'Closing') {
            notification['warning']({
                message: 'Chức năng không khả dụng',
                description:
                    'Bạn chỉ có thể đánh giá hạnh kiểm khi học kì ở trạng thái chuẩn bị kết thúc',
            });
        } else {
            const data = classInfor?.filter((item) => item.id == id);
            setSelectedStudent(data[0])
            setModalVisible(true)
        }
    }

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "username",
            width: 50,
            sorter: (a, b) => a.student.username - b.student.username,
            render: (text, record) => (
                <p>{record.student.username}</p>
            )
        },
        {
            title: "email",
            dataIndex: "email",
            width: 50,
            sorter: (a, b) => (a.student.emai - b.student.email),
            render: (text, record) => (
                <p>{record.student.email}</p>
            )
        },
        {
            title: "Ngày sinh",
            dataIndex: "dob",
            width: 50,
            sorter: (a, b) => (a.student.dob, - b.student.dob),
            render: (text, record) => (
                <p>{record.student.dob}</p>
            )
        },
        {
            title: "Điểm trung bình",
            dataIndex: "dob",
            width: 110,
            render: (text, record) => (
                <p>{record.totalGrade / record.totalFactor}</p>
            )
        },
        {
            title: "Hạnh kiểm",
            dataIndex: "dob",
            width: 50,
            render: (text, record) => (
                <p>{record.morality == null ? 'Chưa đánh giá' : record.morality}</p>
            )
        },
        {
            title: "",
            width: 110,
            render: (text, record) => (
                <Space size="middle">
                    <button type="primary" className='btn_search' onClick={() => handleModalVisible(record.id)}>Đánh giá</button>
                    {(currentSemesteer.type == "Lastern" && record.student.grade != 9) && (
                        <button type="primary" className='btn_success' onClick={() => handleUpgradeStudent(record.student.id, record.student.grade)}>Lên lớp</button>
                    )}
                    {(currentSemesteer.type == "Lastern" && record.student.grade == 9) && (
                        <button type="primary" className='btn_success' onClick={() => handleGraStudent(record.student.id)}>Tốt nghiệp</button>
                    )}
                </Space>
            ),
        }
    ]

    const handleUpgradeStudent = (id, grade) => {
        httpClient.patch('http://localhost:5000/user/' + id, {
            grade: grade + 1
        }).then(res => {
            notification['success']({
                message: 'Lên lớp thành công',
                description:
                    'Xác nhận lên lớp thành công',
            });
            getClassInfor();
        })
            .catch(err => console.log('err: ', err));
    }
    const handleGraStudent = (id) => {
        httpClient.patch('http://localhost:5000/user/' + id, {
            status: 'Delete'
        }).then(res => {
            notification['success']({
                message: 'Tốt nghiệp thành công',
                description:
                    'Xác nhận tốt nghiệp thành công',
            });
            getClassInfor();
        })
            .catch(err => console.log('err: ', err));
    }

    const getClassInfor = () => {
        httpClient.get('http://localhost:5000/class-student', {
            params: {
                classId: id,
                semesterId: currentSemesteer.id
            }
        }).then((res) => {
            setClassInfor(res.data)
        })
            .catch((err) => console.log('err: ', err))
    }
    return (
        <React.Fragment>
            <div className="modalMount" id="list_notification">
                <Card className="card-table " title="Danh sách học sinh">
                    <Row className="header-navbar-custom" >
                        <Col span={12}>
                            <Input
                                className="search-field"
                                placeholder="Nhập tên học sinh"
                                prefix={<SearchIcon />}
                            />
                            <button className="btn btn-search" >Tìm kiếm</button>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        className='notification__list'
                        dataSource={classInfor}

                        scroll={{ y: 479 }}
                    />
                </Card>
            </div>
            <Modal
                title="Đánh giá hạnh kiểm"
                className="status-modal status-modal__success modal-edit"
                centered
                closable={false}
                visible={modalVisible}
                getContainer="#list_notification"
                footer={null}
                width={500}
            >
                <Row className='custom-row'>
                    <Col>
                        <div className='row-custom-table'>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Họ tên</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="名前を入力" value={selectedStudent?.student.username} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Hạnh kiểm</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn hạnh kiểm" onChange={(e) => setMorality(e.target.value)}>
                                        <option disabled selected hidden>Chọn hạnh kiểm</option>
                                        <option value="Good">Tốt</option>
                                        <option value="Weak">Khá</option>
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
                        <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleChangeMorality()}>Lưu</button>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default ClassStudent