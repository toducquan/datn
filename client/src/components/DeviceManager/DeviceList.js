import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { getAllSemester } from '../../appRedux/actions/semester';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { IconDanger } from '../Icons/IconDanger';
import { SearchIcon } from '../../components/Icons/SearchIcon'
import moment from 'moment';

const DeviceList = () => {
    const [deviceList, setDeviceList] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [newDevice, setNewDevice] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        getDeviceList()
    }, [])
    console.log(deviceList)

    const columns = [
        {
            title: "Tên thiết bị",
            dataIndex: "name",
            width: 50,
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
        },
        {
            title: "Ngày nhập kho",
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
                    <button type="primary" className='btn_delete' onClick={() => {
                        setId(record.id)
                        setModalDeleteVisible(true)
                    }}>Xóa bỏ</button>
                </Space>
            ),
        }
    ]

    const getDeviceList = () => {
        httpClient.get('http://localhost:5000/device')
            .then(res => {
                setDeviceList(res.data)
            })
            .catch(err => console.log('err: ', err))
    }
    const handleAddDevice = () => {
        httpClient.post('http://localhost:5000/device', {
            ...newDevice
        })
            .then(res => {
                getDeviceList()
                setModalVisible(false)
            })
            .catch(err => console.log('err: ', err))
    }
    const handleOkModalStatus = () => {
        httpClient.delete('http://localhost:5000/device/' + id)
            .then(res => {
                getDeviceList()
                setModalDeleteVisible(false)
            })
            .catch(err => console.log('err: ', err))
    }

    return (
        <React.Fragment>
            <div className="modalMount" id="list_device">
                <Card className="card-table " title="Danh sách thiết bị">
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
                            <button className="btn_search" onClick={() => setModalVisible(true)}>Nhập kho</button>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        className='notification__list'
                        dataSource={deviceList}
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
                getContainer="#list_device"
                footer={null}
                width={500}
            >
                <Row className='custom-row'>
                    <Col>
                        <div className='row-custom-table'>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Tên thiết bị</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Mô tả</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Nơi nhập</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Số lượng</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewDevice({ ...newDevice, count: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Đơn giá</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" onChange={(e) => setNewDevice({ ...newDevice, price: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className="col-custom-table">
                                <div className="__th background-gray"><b>Bảo hành (tháng)</b></div>
                                <div className="__td">
                                    <input type="text" placeholder="" />
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
                        <button className="btn btn-confirm" style={{ width: 100 }} onClick={() => handleAddDevice()}>Lưu</button>
                    </Col>
                </Row>
            </Modal>
            <Modal
                title="Xóa thiết bị"
                className="status-modal purchase-modal"
                centered
                closable={false}
                visible={modalDeleteVisible}
                getContainer="#list_device"
                footer={null}
                width={465}
                height={285}
            >
                <div className="status-modal-content">
                    <IconDanger />
                    <p>Bạn có muốn xóa thiết bị này không?</p>
                    <button className="status-modal-btn status-modal-btn-red" onClick={handleOkModalStatus}>Xác nhận</button>
                    <button className="status-modal-btn status-modal-btn-grey" onClick={() => setModalDeleteVisible(false)}>Quay lại</button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default DeviceList