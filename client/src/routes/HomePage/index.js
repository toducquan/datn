import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePageAdmin from "../../components/HomePage/HomePageAdmin";
import ClassPage from "../../components/ClassPage";

const HomePage = ({ match }) => {

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${match.url}class-detail/:id`} component={() => (<ClassPage/>)} />
        <Route path={`${match.url}/`} component={HomePageAdmin} />
      </Switch>
    </React.Fragment>
  );
};

export default HomePage;
