import React, { useEffect, useState } from "react";
import { httpClient } from "../../util/Api";
import { Card, Table, Space, Row, Col, Input, Select, Tabs, Button, Modal } from 'antd'
import { SearchIcon } from '../../components/Icons/SearchIcon'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useAuth } from "../../authentication";

const { Meta } = Card;

export default function HomePageAdmin() {
  const [classInSchool, setClassInSchool] = useState();
  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [dataSearch, setDataSearch] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newClass, setNewClass] = useState();
  const { authUser } = useAuth();

  useEffect(() => {
    getAllClassInSC();
  }, [])

  const getAllClassInSC = () => {
    httpClient.get('http://localhost:5000/class')
      .then(res => {
        setClassInSchool(res.data)
        setDataSearch(res.data)
      })
      .catch(err => console.log('err: ', err));
  }

  const handleSearch = () => {
    let data = [];
    if (name) {
      data = classInSchool?.filter((item) => item.name.includes(name))
    }
    if (grade) {
      data = classInSchool?.filter((item) => item.grade == grade)
    }
    if (grade && name) {
      data = classInSchool?.filter((item) => item.grade == grade && item.name.includes(name))
    }
    setDataSearch([...data])
  }
  const handleAddClass = () => {
    httpClient.post('http://localhost:5000/class', {
      ...newClass
    })
      .then(res => {
        getAllClassInSC();
        setModalVisible(false);
      })
      .catch(err => console.log('err: ', err));
  }

  return (
    <React.Fragment>
      <div className="modalMount" id="modalMount">
        <Card className="card-table card-mail" title="Tìm kiếm lớp">
          <Row className="header-navbar-custom" >
            <Col span={20}>
              <div style={{ display: 'flex' }}>
                <Input
                  className="search-field search"
                  placeholder="Nhập tên lớp"
                  prefix={<SearchIcon />}
                  onChange={(e) => setName(e.target.value)}
                />
                <select className="delivery_status" defaultdefaultValue="Chọn khối" onChange={(e) => setGrade(e.target.value)}>
                  <option value="9">Khối 9</option>
                  <option value="8">Khối 8</option>
                  <option value="7">Khối 7</option>
                  <option value="6">Khối 6</option>
                </select>
                <button type="primary" className='btn_search' onClick={handleSearch}>Tìm kiếm</button>
                {
                  authUser.role == 1 && (
                    <button type="primary" className='btn_success' style={{ marginLeft: 15 }} onClick={() => setModalVisible(true)}>Thêm lớp</button>
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
                    cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmcvuNk67fdoeQXTx1rpYPY1mQpNsGuYgOBA&usqp=CAU" />}
                  >
                    <Meta title={`Lớp: ${item.name}`} description={`Khối: ${item.grade}`} />
                    <Link to={`/class-detail/${item.id}`}>
                      <button type="primary" className='btn_detail' onClick={() => { console.log('hehe') }}>Chi tiết</button>
                    </Link>
                  </Card>
                </>
              )
            })
          }
        </div>
      </div>
      <Modal
        title="Thêm mới lớp học"
        className="status-modal status-modal__success modal-edit"
        centered
        closable={false}
        visible={modalVisible}
        getContainer="#modalMount"
        footer={null}
        width={500}
      >
        <Row className='custom-row'>
          <Col>
            <div className='row-custom-table'>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Tên lớp</b></div>
                <div className="__td">
                  <input type="text" placeholder="" onChange={(e) => setNewClass({ ...newClass, name: e.target.value})}/>
                </div>
              </div>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Khối</b></div>
                <div className="__td">
                  <input type="text" placeholder="" onChange={(e) => setNewClass({ ...newClass, grade: parseInt(e.target.value)})}/>
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
            <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddClass()}>Lưu</button>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
}
