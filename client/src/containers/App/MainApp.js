import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import App from "../../routes/index";

import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "../../constants/ThemeSetting";
import {useRouteMatch} from "react-router-dom";
import {updateWindowWidth} from "../../appRedux/actions";
import AppSidebar from "./AppSidebar";
import TopbarDefault from "../Topbar/TopbarDefault";

const {Content} = Layout;

const getContainerClass = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return '';
  }
};


const MainApp = () => {
  const {navStyle} = useSelector(({settings}) => settings);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })
  }, [dispatch]);

  return (
    <Layout className="gx-app-layout">
      <AppSidebar navStyle={navStyle}/>
      <Layout>
        <TopbarDefault value={8}/>
        <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
          <App match={match}/>
        </Content>
      </Layout>
    </Layout>
  )
};
export default MainApp;

