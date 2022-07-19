import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import moment from 'moment';
import { SearchIcon } from '../../Icons/SearchIcon'
import { httpClient } from '../../../util/Api';

const MoneyDetail = ({ id, setDetail }) => {
  const semester = useSelector(({ semester }) => semester.semesters);
  const currentSemesteer = semester[0];
  const [classInfor, setClassInfor] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [morality, setMorality] = useState();
  const [moralityy, setMoralityy] = useState();
  useEffect(() => {
    getTestInfo();
  }, [])

  console.log(classInfor)

  const handleChangeMorality = () => {
    httpClient.patch('http://localhost:5000/student-money/', [
      {
        id: selectedStudent?.id,
        paid: parseInt(morality),
        rest: parseInt(moralityy),
      }
    ]).then(res => {
      getTestInfo();
      setModalVisible(false)
    })
      .catch(err => console.log('err: ', err));
  }
  const handleModalVisible = (id) => {

    const data = classInfor?.filter((item) => item.id == id);
    setSelectedStudent(data[0])
    setMorality(data[0].paid)
    setMoralityy(data[0].rest)
    setModalVisible(true)

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
      title: "Đã đóng",
      dataIndex: "dob",
      width: 50,
      render: (text, record) => (
        <p>{record.paid}</p>
      )
    },
    {
      title: "Còn dư",
      dataIndex: "dob",
      width: 200,
      render: (text, record) => (
        <p>{record.rest}</p>
      )
    },
    {
      title: "",
      width: 110,
      render: (text, record) => (
        <Space size="middle">
          <button type="primary" className='btn_search' onClick={() => handleModalVisible(record.id)}>Điều chỉnh</button>
        </Space>
      ),
    }
  ]

  const getTestInfo = () => {
    httpClient.get('http://localhost:5000/class-money/' + id).then((res) => {
      setClassInfor(res.data)
    })
      .catch((err) => console.log('err: ', err))
  }
  return (
    <React.Fragment>
      <div className="modalMount" id="list_notificationnn">
        <Card className="card-table " title="Chi tiết khoản thu">
          <Row className="header-navbar-custom" >
            <Col span={12}>
              <Input
                className="search-field"
                placeholder="Nhập tên học sinh"
                prefix={<SearchIcon />}
              />
              <button className="btn btn-search" >Tìm kiếm</button>
              <button className="btn btn_success" onClick={() => setDetail(false)}>Quay lại</button>
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
        title="Nhập điểm"
        className="status-modal status-modal__success modal-edit"
        centered
        closable={false}
        visible={modalVisible}
        getContainer="#list_notificationnn"
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
                <div className="__th background-gray"><b>Đã nộp</b></div>
                <div className="__td">
                  <input type="text" placeholder="nhập điểm" value={morality} onChange={(e) => setMorality(e.target.value)}/>
                </div>
              </div>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Còn dư</b></div>
                <div className="__td">
                  <input type="text" placeholder="nhập điểm" value={moralityy} onChange={(e) => setMoralityy(e.target.value)}/>
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

export default MoneyDetail