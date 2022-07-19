import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Col, Row, Modal, notification } from 'antd';
import moment from 'moment';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState();
  const [teachHistory, setTeachHistory] = useState();

  useEffect(() => {
    handleGetUser();
    handleGetTeachHis();
  }, [])

  const handleGetUser = () => {
    httpClient.get('http://localhost:5000/user/' + id,)
      .then((res) => {
        setTeacher(res.data)
      })
      .catch((err) => console.log('err: ', err))
  }
  const handleGetTeachHis = () => {
    httpClient.get('http://localhost:5000/class-teacher/' + id,)
      .then((res) => {
        setTeachHistory(res.data)
      })
      .catch((err) => console.log('err: ', err))
  }

  return (
    <React.Fragment>
      <div id='modalPurchaseDetail'>
        <Card className="custom-card custom-card-listpage" title="Thông tin giáo viên" style={{ paddingBottom: 30 }}>
          <Row style={{ marginBottom: "7px" }}>
            <Col span={17}></Col>
            <Col span={6}><span style={{ fontSize: 12 }}>Ngày bắt đầu công tác: 07/07/2022</span></Col>
          </Row>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Họ Tên</div>
              <div className='__td'>
                <div className='__td_child'>{teacher?.username}</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Email</div>
              <div className='__td'>
                <div className='__td_child'>{teacher?.email}</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Vai trò</div>
              <div className='__td'>
                <div className='__td_child'>Giáo viên</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Tuổi</div>
              <div className='__td'>
                <div className='__td_child'>{teacher?.age}</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Ngày sinh</div>
              <div className='__td'>
                <div className='__td_child'>{teacher?.dob}</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Nơi sinh</div>
              <div className='__td'>
                <div className='__td_child'>Lâm Đồng</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Dân tộc</div>
              <div className='__td'>
                <div className='__td_child'>Kinh</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Tôn Giáo</div>
              <div className='__td'>
                <div className='__td_child'>Không</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Chuyên ngành</div>
              <div className='__td'>
                <div className='__td_child'>{teacher?.major}</div>
              </div>
            </div>
          </div>
          <div className="custom-table-mail">
            <div className="table-row bd-bottom">
              <div className="__th bd-right">Lịch sử giảng dạy</div>
              <div className='__td'>
                {
                  teachHistory?.map((item) => {
                    return (
                      <div className='__td_child'><span>Học kì: {item.semester.name}</span> <span style={{ width: 70, display: 'inline-block' }}></span> <span>Lớp: {item.class.name}</span> </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default TeacherDetail