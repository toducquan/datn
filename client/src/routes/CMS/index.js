import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import CMSList from "../../components/CMS/CMSList";

const CMS = ({ match }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.url}/`} component={CMSList} />
      </Switch>
    </React.Fragment>
  );
};

export default CMS;
