import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { getAllSemester } from '../../appRedux/actions/semester';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { SearchIcon } from '../../components/Icons/SearchIcon'
import moment from 'moment';

const CMSList = () => {
  const dispatch = useDispatch();
  const semester = useSelector(({ semester }) => semester.semesters);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState();
  const [types, setTypes] = useState();
  const [newSemester, setNewSemester] = useState();

  useEffect(() => {
    getAllSemesterss()
  }, [])

  console.log(selectedSemester)

  const handleSelected = (id) => {
    const data = semester?.filter((item) => {
      return item.id == id;
    })
    setSelectedSemester(data[0]);
    setModalEditVisible(true);
  }

  const handleModalVisible = (id) => {
    if (semester[0].status != 'End') {
      notification['warning']({
        message: 'Chức năng không khả dụng',
        description:
          'Bạn phải kết thúc học kì trước khi tạo học kì mới',
      });
    } else {
      setModalAddVisible(true)
    }
  }

  const columns = [
    {
      title: "Học kì",
      dataIndex: "name",
      width: 50,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 50,
    },
    {
      title: "Loại",
      dataIndex: "type",
      width: 50,
    },
    {
      title: "Ngày tạo",
      width: 110,
      render: (text, record) => (
        <p>{moment(record.createdAt).format('DD/MM/YYYY')}</p>
      )
    },
    {
      title: "",
      width: 110,
      render: (text, record) => (
        <Space size="middle">
          {record.status != "End" && (<button type="primary" className='btn_success' onClick={() => handleSelected(record.id)}>Thay đổi</button>)}
        </Space>
      ),
    }
  ]

  const handleChangeType = () => {
    httpClient.patch('http://localhost:5000/semester/' + selectedSemester?.id, {
      status: types
    }).then(() => {
      getAllSemesterss();
      setModalEditVisible(false)
    })
  }

  const handleAddSemester = () => {
    httpClient.post('http://localhost:5000/semester/', {
      ...newSemester
    }).then(() => {
      getAllSemesterss();
      setModalAddVisible(false)
    })
  }

  const getAllSemesterss = () => {
    httpClient.get('http://localhost:5000/semester')
      .then(res => {
        dispatch(getAllSemester(res.data))
      })
      .catch(err => console.log('err: ', err))
  }
  return (
    <React.Fragment>
      <div className="modalMount" id="list_cms">
        <Card className="card-table " title="Danh sách học kì">
          <Row className="header-navbar-custom" >
            <Col span={7}></Col>
            <Col span={7}>
              <div style={{ display: 'flex' }}>
                <Input
                  className="search-field search"
                  placeholder="Nhập tên kì học"
                  prefix={<SearchIcon />}
                  width={660}
                />
              </div>
            </Col>
            <Col span={3}>
              <button className="btn_search" onClick={handleModalVisible}>Thêm mới</button>
            </Col>
          </Row>
          <Table
            columns={columns}
            className='notification__list'
            dataSource={semester}
            pagination={{
              position: ["bottomCenter"],
            }}
            scroll={{ y: 479 }}
          />
        </Card>
      </div>
      <Modal
        title="Thay đổi trạng thái"
        className="status-modal status-modal__success modal-edit"
        centered
        closable={false}
        visible={modalEditVisible}
        getContainer="#list_cms"
        footer={null}
        width={500}
      >
        <Row className='custom-row'>
          <Col>
            <div className='row-custom-table'>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Kì học</b></div>
                <div className="__td">
                  <input type="text" placeholder="名前を入力" value={selectedSemester?.name} />
                </div>
              </div>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Trạng thái</b></div>
                <div className="__td">
                  <select className="delivery_status" defaultdefaultValue="Chọn trạng thái" onChange={(e) => setTypes(e.target.value)}>
                    <option disabled selected hidden>Chọn trạng thái</option>
                    <option value="Preparing">Chuẩn bị</option>
                    <option value="Inprocess">Đang diễn ra</option>
                    <option value="Closing">Sắp kết thúc</option>
                    <option value="End">Kết thúc</option>
                  </select>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={8}></Col>
          <Col span={5}>
            <button className="btn btn-back" style={{ width: 100 }} onClick={() => setModalEditVisible(false)}>Thoát</button>
          </Col>
          <Col span={11}>
            <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleChangeType()}>Lưu</button>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Thêm học kì mới"
        className="status-modal status-modal__success modal-edit"
        centered
        closable={false}
        visible={modalAddVisible}
        getContainer="#list_cms"
        footer={null}
        width={500}
      >
        <Row className='custom-row'>
          <Col>
            <div className='row-custom-table'>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Kì học</b></div>
                <div className="__td">
                  <input type="text" placeholder="tên học kì" onChange={(e) => setNewSemester({ ...newSemester, name: e.target.value })} />
                </div>
              </div>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Loại</b></div>
                <div className="__td">
                  <select className="delivery_status" defaultdefaultValue="Chọn loại" onChange={(e) => setNewSemester({ ...newSemester, type: e.target.value })}>
                    <option disabled selected hidden>Chọn loại</option>
                    <option value="Midtern">Giữa kì</option>
                    <option value="Lastern">Cuối kì</option>
                  </select>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={8}></Col>
          <Col span={5}>
            <button className="btn btn-back" style={{ width: 100 }} onClick={() => setModalAddVisible(false)}>Thoát</button>
          </Col>
          <Col span={11}>
            <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddSemester()}>Lưu</button>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>
  )
}

export default CMSList