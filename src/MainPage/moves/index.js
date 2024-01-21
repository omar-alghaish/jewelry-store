/* eslint-disable react/prop-types */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Moves1 from "./Moves1";
import Moves2 from "./Moves2";
import Moves8 from "./Moves8";
import Moves7 from "./Moves7";
import EditMove from "./EditMove"
import Deportation from "./Deportation";

const MovesIndex = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/move1`} component={Moves1 } />
    <Route path={`${match.url}/move2`} component={Moves2} />
    <Route path={`${match.url}/move8`} component={Moves8} />
    <Route path={`${match.url}/move7`} component={Moves7} />
    <Route path={`${match.url}/edit-move`} component={EditMove} />
    <Route path={`${match.url}/deportation`} component={Deportation} />
  </Switch>
);

export default MovesIndex;
