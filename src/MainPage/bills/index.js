/* eslint-disable react/prop-types */
import React from "react";
import { Route, Switch } from "react-router-dom";
import AddBills from "./AddBills";
import BillsList from "./BillsList";
import AddReceipt from "./AddReceipt";
import ReceiptsList from "./ReceiptsList";


const BillsIndex = ({ match }) => (
  <Switch>
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/move1`} /> */}
    <Route path={`${match.url}/add-bills`} component={AddBills } />
    <Route path={`${match.url}/bills-list`} component={BillsList } />
    <Route path={`${match.url}/add-receipt`} component={AddReceipt } />
    <Route path={`${match.url}/receipts-list`} component={ReceiptsList } />



    {/* <Route path={`${match.url}/move2`} component={Moves2} />
    <Route path={`${match.url}/move8`} component={Moves8} />
    <Route path={`${match.url}/move7`} component={Moves7} />
    <Route path={`${match.url}/edit-move`} component={EditMove} /> */}
  </Switch>
);

export default BillsIndex;
