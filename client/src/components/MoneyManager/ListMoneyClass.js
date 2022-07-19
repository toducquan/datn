import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { httpClient } from "../../util/Api";
import { useAuth } from "../../authentication";
import { SearchIcon } from '../../components/Icons/SearchIcon'
import { Card, Table, Space, Row, Col, Input, Select, Tabs, Button, Modal } from 'antd'

const { Meta } = Card;

const ListMoneyClass = () => {
    const { authUser } = useAuth();
    const semester = useSelector(({ semester }) => semester.semesters);
    const currentSemesteer = semester[0];
    const [testInClass, setTestInClass] = useState();
    const [name, setName] = useState();
    const [major, setMajor] = useState();
    const [newTest, setNewTest] = useState();
    const [classId, setClassId] = useState("1");
    const [classInSchool, setClassInSchool] = useState();

    useEffect(() => {
        getAllTestInClass();
        getAllClassInSC()
    }, [])

    const getAllTestInClass = () => {
        httpClient.get('http://localhost:5000/class-money', {
            params: {
                classId: classId,
                semesterId: currentSemesteer.id
            }
        })
            .then(res => {
                setTestInClass(res.data)
            })
            .catch(err => console.log('err: ', err));
    }

    const getAllClassInSC = () => {
        httpClient.get('http://localhost:5000/class')
            .then(res => {
                setClassInSchool(res.data)
            })
            .catch(err => console.log('err: ', err));
    }

    return (
        <React.Fragment>
            <div className="modalMount" id="modalMounttt">
                <Card className="card-table card-mail" title="Tìm kiếm khoản thu">
                    <Row className="header-navbar-custom" >
                        <Col span={7}>
                            <Input
                                className="search-field search"
                                placeholder="Nhập tên khoản thu"
                                prefix={<SearchIcon />}
                            />
                        </Col>
                        <Col span={13}>
                            <div style={{ display: 'flex' }}>

                                <select className="delivery_status" defaultdefaultValue="Chọn lớp" onChange={(e) => setClassId(e.target.value)}>
                                    <option disabled selected hidden>Chọn lớp</option>
                                    {
                                        classInSchool?.map((item) => {
                                            return (
                                                <option value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }

                                </select>
                                <button type="primary" className='btn_search' onClick={getAllTestInClass}>Tìm kiếm</button>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <div className="card_class">
                    {
                        testInClass?.map((item, index) => {
                            return (
                                <>
                                    <Card
                                        key={index}
                                        hoverable
                                        style={{
                                            width: 240,
                                            marginRight: 30
                                        }}
                                        cover={<img alt="example" src="https://media.istockphoto.com/vectors/money-flat-design-ecommerce-icon-vector-id912819716?k=20&m=912819716&s=612x612&w=0&h=vBpo0RPHjgGQ_hElRkAxRizlX6xnZbUv3KL1Z2E0mwA=" />}
                                    >
                                        <Meta title={`${item.name}`} description={`Phí: ${item.cost}vnđ`} />
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListMoneyClass