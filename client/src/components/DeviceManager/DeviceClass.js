import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { getAllSemester } from '../../appRedux/actions/semester';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { IconDanger } from '../Icons/IconDanger';
import { SearchIcon } from '../../components/Icons/SearchIcon'
import moment from 'moment';

const DeviceClass = () => {
  const [deviceClassList, setDeviceClassList] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newDevice, setNewDevice] = useState();
  const [id, setId] = useState();
  const [deviceList, setDeviceList] = useState();
  const [classInSchool, setClassInSchool] = useState();

  useEffect(() => {
    getClassDeviceList()
    getAllClassInSC()
    getDeviceList()
  }, [])

  const getAllClassInSC = () => {
    httpClient.get('http://localhost:5000/class')
      .then(res => {
        setClassInSchool(res.data)
      })
      .catch(err => console.log('err: ', err));
  }
  const getDeviceList = () => {
    httpClient.get('http://localhost:5000/device')
      .then(res => {
        setDeviceList(res.data)
      })
      .catch(err => console.log('err: ', err))
  }

  const columns = [
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      width: 50,
      render: (text, record) => (
        <p>{record.device.name}</p>
      )
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      width: 50,
    },
    {
      title: "Giá mỗi đơn vị",
      dataIndex: "price",
      width: 50,
      render: (text, record) => (
        <p>{record.device.price}</p>
      )
    },
    {
      title: "Lớp",
      width: 110,
      render: (text, record) => (
        <p>{record.class.name}</p>
      )
    },
    {
      title: "Ngày bàn giao",
      width: 110,
      render: (text, record) => (
        <p>{moment(record.createdAt).format('DD/MM/YYYY')}</p>
      )
    },

  ]

  const getClassDeviceList = () => {
    httpClient.get('http://localhost:5000/class-device')
      .then(res => {
        setDeviceClassList(res.data)
      })
      .catch(err => console.log('err: ', err))
  }
  const handleAddClassDevice = () => {
    httpClient.post('http://localhost:5000/class-device', {
      ...newDevice
    })
      .then(res => {
        getClassDeviceList()
        setModalVisible(false)
      })
      .catch(err => console.log('err: ', err))
  }


  return (
    <React.Fragment>
      <div className="modalMount" id="list_class_device">
        <Card className="card-table " title="Danh sách thiết bị bàn giao">
          <Row className="header-navbar-custom" >
            <Col span={7}></Col>
            <Col span={7}>
              <div style={{ display: 'flex' }}>
                <Input
                  className="search-field search"
                  placeholder="Nhập tên thiết bị"
                  prefix={<SearchIcon />}
                  width={660}
                />
              </div>
            </Col>
            <Col span={3}>
              <button className="btn_search" onClick={() => setModalVisible(true)}>Bàn giao</button>
            </Col>
          </Row>
          <Table
            columns={columns}
            className='notification__list'
            dataSource={deviceClassList}
            pagination={{
              position: ["bottomCenter"],
            }}
            scroll={{ y: 479 }}
          />
        </Card>
      </div>
      <Modal
        title="Thêm thiết bị mới"
        className="status-modal status-modal__success modal-edit"
        centered
        closable={false}
        visible={modalVisible}
        getContainer="#list_class_device"
        footer={null}
        width={500}
      >
        <Row className='custom-row'>
          <Col>
            <div className='row-custom-table'>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Lớp</b></div>
                <div className="__td">
                  <select className="delivery_status" defaultdefaultValue="Chọn lớp" onChange={(e) => setNewDevice({ ...newDevice, classId: e.target.value })}>
                    <option disabled selected hidden>Chọn lớp</option>
                    {
                      classInSchool?.map((item) => {
                        return (
                          <option value={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="col-custom-table">
                <div className="__th background-gray"><b>Thiết bị</b></div>
                <div className="__td">
                  <select className="delivery_status" defaultdefaultValue="Chọn thiết bị" onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}>
                    <option disabled selected hidden>Chọn thiết bị</option>
                    {
                      deviceList?.map((item) => {
                        return (
                          <option value={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="col-custom-table">
                <div className="__th background-gray"><b>Số lượng</b></div>
                <div className="__td">
                  <input type="text" placeholder="" onChange={(e) => setNewDevice({ ...newDevice, count: parseInt(e.target.value) })} />
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
            <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddClassDevice()}>Lưu</button>
          </Col>
        </Row>
      </Modal>


    </React.Fragment>
  )
}

export default DeviceClass