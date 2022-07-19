import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import moment from 'moment';
import { IconDanger } from '../Icons/IconDanger';
import { SearchIcon } from '../Icons/SearchIcon'

const StudentList = () => {
  const [teacherList, setTeacherList] = useState();
  const [studentId, setStudentId] = useState();
  const [searchOption, setSearchOption] = useState({
    role: "3",
  })
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const semester = useSelector(({ semester }) => semester.semesters);
  const currentSemesteer = semester[0];

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
      title: "Khối",
      dataIndex: "grade",
      width: 100,
    },
    {
      title: "",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/student-manager/student-detail/${record.id}`}>
            <button type="primary" className='btn_success'>Chi tiết</button>
          </Link>
          <button type="primary" className='btn_delete' onClick={() => handleTH(record.id)}>Thôi học</button>
        </Space>
      ),
    }
  ]

  const handleTH = (id) => {
    if (currentSemesteer.status == 'Preparing') {
      notification['warning']({
        message: 'Chức năng không khả dụng',
        description:
          'Bạn chỉ có thể buộc thôi học khi học kì mới vừa bắt đầu',
      });
    } else {
      setModalDeleteVisible(true)
      setStudentId(id)
    }
  }
  const handleOkModalStatuss = () => {
    console.log('vao')
    httpClient.patch('http://localhost:5000/user/' + studentId, {
      status: 'Delete'
    })
      .then(res => {
        getTeachers()
        setModalDeleteVisible(false)
      })
      .catch(err => console.log('err: ', err))
  }

  return (
    <React.Fragment>
      <div className="modalMount" id="list_student">
        <Card className="card-table " title="Danh sách học sinh">
          <Row className="header-navbar-custom" >
            <Col span={7}>
              <Input
                className="search-field"
                placeholder="Nhập tên học sinh"
                onChange={(e) => setSearchOption({ ...searchOption, username: e.target.value })}
                prefix={<SearchIcon />}
              />
            </Col>
            <Col span={14}>
              <Input
                className="search-field"
                onChange={(e) => setSearchOption({ ...searchOption, email: e.target.value })}
                placeholder="Nhập email học sinh"
                prefix={<SearchIcon />}
              />
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
      <Modal
        title="Xóa học sinh"
        className="status-modal purchase-modal"
        centered
        closable={false}
        visible={modalDeleteVisible}
        getContainer="#list_student"
        footer={null}
        width={465}
        height={285}
      >
        <div className="status-modal-content">
          <IconDanger />
          <p>Xác nhận buộc học sinh thôi học?</p>
          <button className="status-modal-btn status-modal-btn-red" onClick={() => handleOkModalStatuss()}>Xác nhận</button>
          <button className="status-modal-btn status-modal-btn-grey" onClick={() => setModalDeleteVisible(false)}>Quay lại</button>
        </div>
      </Modal>
      
    </React.Fragment>
  )
}

export default StudentList