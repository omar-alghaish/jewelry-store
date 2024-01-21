/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import AccountsList from "./AccountsList";
import { Route, Switch } from "react-router-dom";
import EnterOpeningBalance from "./EnterOpeningBalance";
import MainData from "./MainData";
import StoresMoves from "./StoresMoves";


const BillsIndex = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/accounts-list`} component={AccountsList } />
    <Route path={`${match.url}/enter-opening-list`} component={EnterOpeningBalance } />
    <Route path={`${match.url}/main-data`} component={MainData } />
    <Route path={`${match.url}/stores-moves`} component={StoresMoves } />



  </Switch>
);

export default BillsIndex;
