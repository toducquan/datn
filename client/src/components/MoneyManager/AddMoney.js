import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { getAllSemester } from '../../appRedux/actions/semester';
import { Card, Table, Space, Row, Col, Input, Modal, notification } from 'antd'
import { IconDanger } from '../Icons/IconDanger';
import { SearchIcon } from '../../components/Icons/SearchIcon'
import moment from 'moment';

const AddMoney = () => {
  const [newMoney, setNewMoney] = useState();
  const [classInSchool, setClassInSchool] = useState();
  const semester = useSelector(({ semester }) => semester.semesters);
  const currentSemesteer = semester[0];
  useEffect(() => {
    getAllClassInSC()
  }, [])

  const getAllClassInSC = () => {
    httpClient.get('http://localhost:5000/class')
      .then(res => {
        setClassInSchool(res.data)
      })
      .catch(err => console.log('err: ', err));
  }

  const handleAddNewMoney = () => {
    httpClient.post('http://localhost:5000/class-money', {
        ...newMoney,
        semesterId: String(currentSemesteer?.id),
    }).then((res) => {
        notification['success']({
            message: 'Tạo khoản thu thành công',
            description:
                'Khoản thu của bạn đã được tạo',
        });
    })
        .catch((err) => console.log('err: ', err))
}

  return (
    <React.Fragment>
      <Card
        className="custom-card custom-card-listpage"
        title="Thêm mới khoản thu"
        style={{ paddingBottom: 30 }}
      >
        <Row style={{ marginBottom: "7px" }}>
          <Col span={19}></Col>
          <Col span={4}>
            <span style={{ fontSize: 12 }}>Ngày：12/07/2022</span>
          </Col>
        </Row>
        <div className="custom-table-mail">
          <div className="table-row bd-bottom">
            <div className="__th bd-right">Tên khoản thu</div>
            <div className="__td">
              <div className="__td_child">
                <input
                  type="text"
                  className="text-field"
                  name=""
                  id=""
                  style={{ width: 700 }}
                  onChange={(e) => setNewMoney({ ...newMoney, name: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="table-row bd-bottom">
            <div className="__th bd-right">Số tiền phải thu</div>
            <div className="__td">
              <div className="__td_child">
                <input
                  type="text"
                  className="text-field"
                  name=""
                  id=""
                  style={{ width: 700 }}
                  onChange={(e) => setNewMoney({ ...newMoney, cost: parseInt(e.target.value) })}

                />
              </div>
            </div>
          </div>
          <div className="table-row bd-bottom">
            <div className="__th bd-right">Hình Thức</div>
            <div className="__td">
              <div className="__td_child">
                <select
                  className="search-option"
                  defaultValue={"Chọn lớp"}
                  style={{ width: 188 }}
                  onChange={(e) => setNewMoney({ ...newMoney, classId: e.target.value })}
                >
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
          </div>
        </div>
        <Row style={{ marginTop: "17px" }}>
          <Col span={10}></Col>
          <Col span={11}>
            <button
              className="btn btn-confirm"
              style={{ width: 120, height: 35, fontSize: 16 }}
              onClick={handleAddNewMoney}
            >
              Tạo mới
            </button>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  )
}

export default AddMoney