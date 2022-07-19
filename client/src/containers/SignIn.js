import React from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "../authentication";
import AppNotificationContainer from "../components/AppNotificationContainer";
import logoImg from '../assets/vendors/images/thcs.jpg';
import { IconUser, IconPassword } from "../components/Icons/IconLogin";


const SignIn = () => {
  const { isLoading, error, userLogin } = useAuth();

  const onFinishFailed = errorInfo => {
  };

  const onFinish = values => {
    userLogin(values);
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-login-main-content-logo"><img width={100} src={logoImg} alt="Logo" /></div>
          <div className="gx-app-login-main-content-title">Trường THCS Lĩnh Nam</div>
          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="gx-signin-form gx-form-row0">

            <Form.Item
              rules={[{ required: true, message: 'Please input your Username!' }]} name="email">
              <Input className="gx-app-login-main-content-field" type="text" placeholder="Nhập email" prefix={<IconUser />} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Please input your Password!' }]} name="password">
              <Input className="gx-app-login-main-content-field" type="password" placeholder="Nhập password" prefix={<IconPassword />} />
            </Form.Item>
            <Form.Item>
              <Button className="gx-app-login-main-content-btn" type="primary" htmlType="submit">Đăng nhập</Button>
            </Form.Item>
          </Form>
          <AppNotificationContainer loading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
