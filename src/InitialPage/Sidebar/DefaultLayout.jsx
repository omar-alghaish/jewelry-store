/* eslint-disable react/prop-types */
import React from "react";
import { Route, withRouter } from "react-router-dom";

import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./Sidebar"

const DefaultLayout = (props) => {
  const { match } = props;
  console.log(match)
  console.log(routerService)
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div>
          {routerService &&
            routerService.map((route, key) => (
           
              <Route
                key={key}
                path={`${match.url}/${route.path}`}
                component={route.component}
              />
           
             
            ))}
          
        </div>
        <Sidebar />
      </div>
      <div className="sidebar-overlay"></div>
    </>
  );
}

export default withRouter(DefaultLayout);
