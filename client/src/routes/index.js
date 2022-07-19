import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import { useAuth } from '../authentication'

const App = ({ match }) => {
  return (
    <>
          <div className="gx-main-content-wrapper">
            <Switch>
              <Route
                path={`${match.url}cms`}
                component={asyncComponent(() => import("./CMS"))}
              />
              <Route
                path={`${match.url}teacher-manager`}
                component={asyncComponent(() => import("./TeacherManager"))}
              />
              <Route
                path={`${match.url}student-manager`}
                component={asyncComponent(() => import("./StudentManager"))}
              />
              <Route
                path={`${match.url}honor-center`}
                component={asyncComponent(() => import("./HonorCenter"))}
              />
              <Route
                path={`${match.url}device-manager`}
                component={asyncComponent(() => import("./DeviceManager"))}
              />
              <Route
                path={`${match.url}money-manager`}
                component={asyncComponent(() => import("./MoneyManager"))}
              />
              <Route
                path={`${match.url}`}
                component={asyncComponent(() => import("./HomePage"))}
              />
            </Switch>
          </div>
    </>
  )
};

export default App;