/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AddToStore from "./AddToStore";
import StoreList from "./StoreList";
import ProductRecalls from "./ProductRecalls";
import AddBillsList from "./AddBills";
import RecallsBillsList from "./RecallsBills";
import MoveToMainFiles from "./MoveToMainFiles";

const StoreIndex = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/moves-store/add-to-store`} component={AddToStore} />
    <Route path={`${match.url}/store-list`} component={StoreList} />
    <Route path={`${match.url}/moves-store/store-recalls`} component={ProductRecalls} />
    <Route path={`${match.url}/moves-store/move-to-main-files`} component={MoveToMainFiles} />

    <Route path={`${match.url}/bills-store/store-add-bills-list`} component={AddBillsList} />

    <Route path={`${match.url}/bills-store/store-recalls-bills-list`} component={RecallsBillsList} />

    
  </Switch>
);

export default StoreIndex;
