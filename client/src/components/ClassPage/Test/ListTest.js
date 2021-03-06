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
                <Card className="card-table card-mail" title="T??m ki???m b??i test">
                    <Row className="header-navbar-custom" >
                        <Col span={20}>
                            <div style={{ display: 'flex' }}>
                                <Input
                                    className="search-field search"
                                    placeholder="Nh???p t??n b??i test"
                                    prefix={<SearchIcon />}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <select className="delivery_status" defaultdefaultValue="Ch???n kh???i" onChange={(e) => setMajor(e.target.value)}>
                                    <option value="Math">To??n h???c</option>
                                    <option value="English">Ti???ng anh</option>
                                    <option value="Chemistry">H??a h???c</option>
                                    <option value="History">L???ch s???</option>
                                </select>
                                <button type="primary" className='btn_search' onClick={handleSearch}>T??m ki???m</button>
                                {
                                    authUser.role != 3 && (
                                        <button type="primary" className='btn_success' style={{ marginLeft: 15 }} onClick={() => setModalVisible(true)}>Th??m test</button>
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
                                        <Meta title={`T??n : ${item.testName}`} description={`M??n: ${item.major}`} />
                                        <button type="primary" className='btn_detail' onClick={() => { setDetail(true); setId(item.id) }}>Chi ti???t</button>
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Modal
                title="Th??m m???i test"
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
                                <div className="__th background-gray"><b>T??n </b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>H??? s??? </b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewTest({ ...newTest, factor: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Chuy??n ng??nh</b></div>
                                <div className="__td">
                                    <select className="delivery_status" defaultdefaultValue="Ch???n chuy??n ng??nh" onChange={(e) => setNewTest({ ...newTest, major: e.target.value })}>
                                        <option disabled selected hidden>Ch???n chuy??n ng??nh</option>
                                        <option value="Math">To??n h???c</option>
                                        <option value="English">Ti???ng anh</option>
                                        <option value="Chemistry">H??a h???c</option>
                                        <option value="History">L???ch s???</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Col span={8}></Col>
                    <Col span={5}>
                        <button className="btn btn-back" style={{ width: 100 }} onClick={() => setModalVisible(false)}>Tho??t</button>
                    </Col>
                    <Col span={11}>
                        <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddTest()}>L??u</button>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default ListTest