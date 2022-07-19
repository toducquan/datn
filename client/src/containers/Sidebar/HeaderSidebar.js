import React from 'react'
import logoImg from '../../assets/vendors/images/thcs.jpg';

export default function HeaderSidebar() {
    return (
        <div className="sidebar-menu__header">
            <img width={45} src={logoImg} alt="Logo" style={{ marginRight: 8}}/>
            Lĩnh Nam CMS
        </div>
    )
}
