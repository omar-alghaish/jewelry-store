/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Purchaseorder from './purchaseorder'
import Inventry from './inventry'
import Sales from './sales'
import Invoices from './invoices'
import Purchase from './purchase'
import Supplier from './supplier'
import Customer from './customer'
import ReceiptsList from './Reciepts';
import Retrives from './Retrives';





const AppIndex = ({ match}) =>(
    <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/purchaseorderreport`} /> */}
        <Route path={`${match.url}/purchaseorderreport`} component={Purchaseorder} />
        <Route path={`${match.url}/reciepts`} component={ReceiptsList} />

        <Route path={`${match.url}/inventoryreport`} component={Inventry} />
        <Route path={`${match.url}/salesreport`} component={Sales} />
        <Route path={`${match.url}/invoicereport`} component={Invoices} />
        <Route path={`${match.url}/purchasereport`} component={Purchase} />
        <Route path={`${match.url}/supplierreport`} component={Supplier} />
        <Route path={`${match.url}/customerreport`} component={Customer} />
        <Route path={`${match.url}/retrivesreport`} component={Retrives} />


    </Switch>
)

export default AppIndex