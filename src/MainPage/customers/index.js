/* eslint-disable react/prop-types */
import React from "react";
import { Route, Switch } from "react-router-dom";

import CustomersList from "./CustomersList";

const CustomerIndex = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/customerList`} component={CustomersList} />
  </Switch>
);

export default CustomerIndex;
