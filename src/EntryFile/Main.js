/* eslint-disable no-unused-vars */
import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "../InitialPage/App";
// import config from "config";
import { Provider } from "react-redux";
// import "../assets/plugins/fontawesome/css/fontawesome.min.css";
// import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/js/bootstrap.bundle.min.js";
// import "../assets/css/font-awesome.min.css";
import "../assets/css/line-awesome.min.css";
import "../assets/css/style.css";
import { store } from "../stroe";
import RightSideBar from "../components/rightSidebar";
import { ToastContainer } from "react-toastify";

const MainApp = () => {
  const config = "/template/react";

  return (
    <Provider store={store}>
      <Router basename={`${config}`}>
        <RightSideBar />
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default MainApp;
