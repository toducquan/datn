import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { httpClient } from '../../util/Api';
import { Card, Table, Space, Row, Col, Input, Modal, notification, Button } from 'antd'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { SearchIcon } from '../Icons/SearchIcon'

const HonorList = ({ data }) => {
  const columns = [
    {
      title: "Lý do khen thưởng/kỷ luật",
      dataIndex: "reason",
    },
    {
      title: "Họ và tên",
      width: 130,
      dataIndex: ["user", "fullName"],
      render: (text, record) => (
        <p>{record.user.username}</p>
      )
    },
    {
      title: "Ngày đề xuất",
      width: 160,
      dataIndex: "lastModifiedOnDate",
      render: (text, record) => (
        <p>{moment(record.createdAt).format('DD/MM/YYYY')}</p>
      )
      
    },
    {
      title: "",
      width: 120,
      dataIndex: "preview",
      render: (text, record) => (
        <button type="primary" className='btn_success'>Chỉnh sửa</button>
      )
    },
  ];
  return (
    <Card className="custom-card custom-card-listpage" title="Danh sách khen thưởng/kỷ luật">
      <Row>
        <Col span={6}></Col>
        <Col span={9}>
          <Input
            placeholder="Họ và tên"
            prefix={<SearchIcon />}
            className="cms-page-custom-search-input"
          />
        </Col>
        <Col span={3}>
          <Button
            className="button-primary"
            type="primary"
          >
            Tìm kiếm
          </Button>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Table
        className="card-table"
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{ y: 479 }}
      />
    </Card>
  )
}

export default HonorList