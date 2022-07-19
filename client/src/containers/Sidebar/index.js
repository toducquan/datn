import React from "react";
import {Layout} from "antd";
import MenuSideBar from "./MenuSideBar";
import HeaderSidebar from "./HeaderSidebar";
import {useAuth} from "../../authentication";
import {useHistory} from "react-router-dom";

const {Sider} = Layout;

const Sidebar = () => {
  const {userSignOut} = useAuth();
  const history = useHistory();
  const onLogoutClick = (e) => {
    e.preventDefault();
    userSignOut(() => {
      history.push('/');
    });
  }
  return (
    <Sider style={{ minWidth: 250 }} >
      <HeaderSidebar />
      <MenuSideBar />
      <div className="wrap-btn-signout">
          <a href="/" onClick={(e) => onLogoutClick(e)} className="btn-signout">Đăng xuất</a>
      </div>
    </Sider>
  )
};
export default Sidebar;
