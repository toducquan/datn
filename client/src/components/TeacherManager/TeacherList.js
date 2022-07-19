import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import moment from 'moment';
import { SearchIcon } from '../Icons/SearchIcon'

const TeacherList = () => {
  const [teacherList, setTeacherList] = useState();
  const [searchOption, setSearchOption] = useState({
    role: "2",
  })

  useEffect(() => {
    getTeachers();
  }, [])

  const getTeachers = () => {
    httpClient.get('http://localhost:5000/user', {
      params: {
        ...searchOption,
      }
    }).then((res) => {
      setTeacherList(res.data)
    })
      .catch((err) => console.log('err: ', err))
  }

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "username",
      width: 50,
      sorter: (a, b) => a.username - b.username,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 50,
      sorter: (a, b) => (a.email - b.email),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      width: 50,

    },
    {
      title: "Tuổi",
      dataIndex: "age",
      width: 30,
      sorter: (a, b) => (a.age - b.age),
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      width: 100,
    },
    {
      title: "",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/teacher-manager/teacher-detail/${record.id}`}>
            <button type="primary" className='btn_success'>Chi tiết</button>
          </Link>
        </Space>
      ),
    }
  ]
  return (
    <React.Fragment>
      <div className="modalMount" id="list_notification">
        <Card className="card-table " title="Danh sách giáo viên">
          <Row className="header-navbar-custom" >
            <Col span={7}>
              <Input
                className="search-field"
                placeholder="Nhập tên giáo viên"
                onChange={(e) => setSearchOption({ ...searchOption, username: e.target.value })}
                prefix={<SearchIcon />}
              />
            </Col>
            <Col span={7}>
              <Input
                className="search-field"
                onChange={(e) => setSearchOption({ ...searchOption, email: e.target.value })}
                placeholder="Nhập email giáo viên"
                prefix={<SearchIcon />}
              />
            </Col>
            <Col span={7}>
              <select className="delivery_status" defaultdefaultValue="Chọn khối" onChange={(e) => setSearchOption({ ...searchOption, major: e.target.value })}>
                <option disabled selected hidden>Chuyên môn</option>
                <option value="Math">Toán học</option>
                <option value="Chemistry">Hóa học</option>
                <option value="English">Tiếng anh</option>
                <option value="History">Lịch sử</option>
              </select>
            </Col>
            <Col span={2}>
              <button className="btn_search" onClick={getTeachers}>Tìm kiếm</button>
            </Col>
          </Row>
          <Table
            columns={columns}
            className='notification__list'
            dataSource={teacherList}

            scroll={{ y: 479 }}
          />
        </Card>
      </div>
      {/* <Modal
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
      </Modal> */}
    </React.Fragment>
  )
}

export default TeacherList