import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { httpClient } from "../../../util/Api";
import { useAuth } from "../../../authentication";
import { SearchIcon } from '../../../components/Icons/SearchIcon'
import { Card, Table, Space, Row, Col, Input, Select, Tabs, Button, Modal } from 'antd'

const { Meta } = Card;

const ListMoney = ({ setDetail, setId }) => {
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
        httpClient.get('http://localhost:5000/class-money', {
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

    return (
        <React.Fragment>
            <div className="modalMount" id="modalMounttt">
                <Card className="card-table card-mail" title="Tìm kiếm">
                    <Row className="header-navbar-custom" >
                        <Col span={20}>
                            <div style={{ display: 'flex' }}>
                                <Input
                                    className="search-field search"
                                    placeholder="Nhập tên khoản thu"
                                    prefix={<SearchIcon />}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button type="primary" className='btn_search' onClick={handleSearch}>Tìm kiếm</button>
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
                                        cover={<img alt="example" src="https://media.istockphoto.com/vectors/money-flat-design-ecommerce-icon-vector-id912819716?k=20&m=912819716&s=612x612&w=0&h=vBpo0RPHjgGQ_hElRkAxRizlX6xnZbUv3KL1Z2E0mwA=" />}
                                    >
                                        <Meta title={`${item.name}`} description={`Phí: ${item.cost}vnđ`} />
                                        <button type="primary" className='btn_detail' onClick={() => { setDetail(true); setId(item.id) }}>Chi tiết</button>
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

export default ListMoney