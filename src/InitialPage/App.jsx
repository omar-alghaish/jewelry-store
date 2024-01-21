/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  BrowserRouter,
  Router
} from 'react-router-dom';
import './app.css';
import SignIn from './SignIn';
import ForgetPassword from './ForgetPassword';
import SignUp from './SignUp';
import Pos from './pos/pos';
import DefaultLayout from './Sidebar/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from '../MainPage/ErrorPage/Error404';
import Error500 from '../MainPage/ErrorPage/Error500';
import HomeThree from '../MainPage/Home/home3';
import { ToastContainer } from 'react-toastify';
const levelup = require('levelup');
import leveljs from 'level-js';


export const data = localStorage.getItem("useLoggIn")
  ? JSON.parse(localStorage.getItem("useLoggIn"))
    ? JSON.parse(localStorage.getItem("useLoggIn"))
    : {}
  : {};
export default function App() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (
      location.pathname.includes('signIn') ||
      location.pathname.includes('signUp') ||
      location.pathname.includes('index-three') ||
      location.pathname.includes('forgetPassword')
    ) {
      document.body.classList.add('account-page');
    }
    return () => {
      document.body.classList.remove('account-page');
    };
  }, [location.pathname]);

  if (location.pathname === '/') {
    return <Redirect to="/signIn" />;
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Route path="/forgetPassword" component={ForgetPassword} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/dream-pos" component={DefaultLayout} />
        <Route path="/error-404" component={Error404} />
        <Route path="/error-500" component={Error500} />
        <Route path="/pos" component={Pos} />
        <Route path="/index-three" component={HomeThree} />
        <ToastContainer />
      </Switch>
    </div>
  );
}
