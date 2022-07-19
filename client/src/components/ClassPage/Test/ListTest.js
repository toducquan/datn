import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { httpClient } from "../../../util/Api";
import { useAuth } from "../../../authentication";
import { SearchIcon } from '../../../components/Icons/SearchIcon'
import { Card, Table, Space, Row, Col, Input, Select, Tabs, Button, Modal } from 'antd'

const { Meta } = Card;

const ListTest = ({ setDetail, setId }) => {
    const { id } = useParams();
    const { authUser } = useAuth();
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];
    const [testInClass, setTestInClass] = useState();
    const [name, setName] = useState();
    const [major, setMajor] = useState();
    const [dataSearch, setDataSearch] = useState();
    const [newTest, setNewTest] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getAllTestInClass();
    }, [])

    const getAllTestInClass = () => {
        httpClient.get('http://localhost:5000/class-test', {
            params: {
                classId: id,
                semesterId: currentSemesteer.id
            }
        })
            .then(res => {
                setTestInClass(res.data)
                setDataSearch(res.data)
            })
            .catch(err => console.log('err: ', err));
    }

    const handleSearch = () => {
        let data = [];
        if (name) {
            data = testInClass?.filter((item) => item.name.includes(name))
        }
        if (major) {
            data = testInClass?.filter((item) => item.major == major)
        }
        if (major && name) {
            data = testInClass?.filter((item) => item.major == major && item.name.includes(name))
        }
        setDataSearch([...data])
    }
    const handleAddTest = () => {
        httpClient.post('http://localhost:5000/class-test', {
            ...newTest,
            classId: id,
            semesterId: String(currentSemesteer.id),
            creator: String(authUser.id)
        })
            .then(res => {
                getAllTestInClass();
                setModalVisible(false);
            })
            .catch(err => console.log('err: ', err));
    }

    return (
        <React.Fragment>
            <div className="modalMount" id="modalMountt">
                <Card className="card-table card-mail" title="Tìm kiếm bài test">
                    <Row className="header-navbar-custom" >
                        <Col span={20}>
                            <div style={{ display: 'flex' }}>
                                <Input
                                    className="search-field search"
                                    placeholder="Nhập tên bài test"
                                    prefix={<SearchIcon />}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <select className="delivery_status" defaultdefaultValue="Chọn khối" onChange={(e) => setMajor(e.target.value)}>
                                    <option value="Math">Toán học</option>
                                    <option value="English">Tiếng anh</option>
                                    <option value="Chemistry">Hóa học</option>
                                    <option value="History">Lịch sử</option>
                                </select>
                                <button type="primary" className='btn_search' onClick={handleSearch}>Tìm kiếm</button>
                                {
                                    authUser.role != 3 && (
                                        <button type="primary" className='btn_success' style={{ marginLeft: 15 }} onClick={() => setModalVisible(true)}>Thêm test</button>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
                <div className="card_class">
                    {
                        dataSearch?.map((item, index) => {
                            return (
                                <>
                                    <Card
                                        key={index}
                                        hoverable
                                        style={{
                                            width: 240,
                                            marginRight: 30
                                        }}
                                        cover={<img alt="example" src="https://i0.wp.com/lawsblog.london.ac.uk/wp-content/uploads/2017/10/exam-paper.jpg?fit=3648%2C2736&ssl=1" />}
                                    >
                                        <Meta title={`Tên : ${item.testName}`} description={`Môn: ${item.major}`} />
                                        <button type="primary" className='btn_detail' onClick={() => { setDetail(true); setId(item.id) }}>Chi tiết</button>
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Modal
                title="Thêm mới test"
                className="status-modal status-modal__success modal-edit"
                centered
                closable={false}
                visible={modalVisible}
                getContainer="#modalMountt"
                footer={null}
                width={500}
            >
                <Row className='custom-row'>
                    <Col>
                        <div className='row-custom-table'>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Tên </b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Hệ số </b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewTest({ ...newTest, factor: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Chuyên ngành</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Chọn chuyên ngành" onChange={(e) => setNewTest({ ...newTest, major: e.target.value })}>
                                        <option disabled selected hidden>Chọn chuyên ngành</option>
                                        <option value="Math">Toán học</option>
                                        <option value="English">Tiếng anh</option>
                                        <option value="Chemistry">Hóa học</option>
                                        <option value="History">Lịch sử</option>
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
                        <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddTest()}>Lưu</button>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default ListTest