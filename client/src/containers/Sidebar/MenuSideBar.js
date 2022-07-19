import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeIcon, CmsIcon, MailIcon, NotificationIcon, CustomerIcon, ContractIcon, ContactIcon, ProfileIcon, SettingIcon, PlusIcon, BookIcon } from './IconSideBar'
import { useAuth } from '../../authentication'

export default function MenuSideBar() {
    const { authUser } = useAuth();

    return (
        <React.Fragment >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                style={{ height: '100%' }}
                className="sidebar-menu"
            >
                    <>
                        <Menu.Item key="1" icon={<HomeIcon />}>
                            <NavLink to="/" activeClassName="menu-link-active" className="sidebar-link">Quản Lý Lớp</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CmsIcon />}>
                            <NavLink to="/cms" activeClassName="menu-link-active" className="sidebar-link">Quản Lý Học Kì</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<NotificationIcon />}>
                            <NavLink to="/honor-center" activeClassName="menu-link-active" className="sidebar-link">Khen Thưởng/Kỉ Luật</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<CustomerIcon />}>
                            <NavLink to="/teacher-manager" activeClassName="menu-link-active" className="sidebar-link">Cán Bộ Nhân Viên</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<ContractIcon />}>
                            <NavLink to="/device-manager" activeClassName="menu-link-active" className="sidebar-link">Cơ Sở Vật Chất</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<ProfileIcon />}>
                            <NavLink to="/money-manager" activeClassName="menu-link-active" className="sidebar-link">Khoản Thu</NavLink>
                        </Menu.Item>
                        <Menu.Item key="7" icon={<ContactIcon />}>
                            <NavLink to="/student-manager" activeClassName="menu-link-active" className="sidebar-link">Quản Lý Học Sinh</NavLink>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<SettingIcon />}>
                            <NavLink to="/setting" activeClassName="menu-link-active" className="sidebar-link">Hồ Sơ Cá Nhân</NavLink>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<MailIcon />}>
                            <NavLink to="/mail-manager" activeClassName="menu-link-active" className="sidebar-link">Quản Lý Hòm Thư</NavLink>
                        </Menu.Item>
                    </>
               
            </Menu>
        </React.Fragment>
    );
}
