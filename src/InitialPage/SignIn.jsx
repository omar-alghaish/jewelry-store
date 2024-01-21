/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  LoginImage,
  Logo,
  MailIcon,
  GoogleIcon,
  FacebookIcon
} from '../EntryFile/imagePath';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const levelup = require('levelup');
import leveljs from 'level-js';
import { toast } from 'react-toastify';

const SignInPage = (props) => {
  const [eye, seteye] = useState(true);
  const [users, setUsers] = useState(false);
  const onEyeClick = () => {
    seteye(!eye);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
  });

  const {
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  // useEffect(() => {
  //   // 1) Create our store
  //   const db = levelup(leveljs('./db'));

  //   db.get(
  //     'users',

  //     function (err, value) {
  //       setUsers(JSON.parse(value));
  //     }
  //   );
  //   console.log(users)
  // }, []);



  useEffect(() => {
    const fetchData = async () => {
      const db = levelup(leveljs('./db'));

      try {
        const existingUsers = await new Promise((resolve, reject) => {
          db.get('users', (err, value) => {
            if (err) {
              reject(err);
            } else {
              setUsers(JSON.parse(value))
              resolve();
            }
          });
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    console.log(users)
  }, []);







  const logIn = (e) => {
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    let loggedIn = false;
    if (!users || !users?.length) {
      toast.error("الحساب غير موجود");
    } else {
      for (let i = 0; i < users?.length; i++) {
        const currentTemp = users[i];
        if (currentTemp?.email == data?.email) {
          if (currentTemp?.password == data?.password) {
            loggedIn = true;
            delete currentTemp.password;
            localStorage.setItem("useLoggIn", JSON.stringify(currentTemp));
            break;
          }
        }
      }
    }
    if (loggedIn) {
      toast.success("تم تسجيل الدخول بنجاح");
      props.history.push('/pos');
    } else {
      toast.error("الإيميل أو كلمة السر به خطأ");
    }
  };
  useEffect(() => {
    console.log('hi');

    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', true);
      window.location.reload();
    }
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <Helmet>
          <title>تسجيل الدخول - إسناد سوفت</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    logIn(e);
                  }}
                >
                  <div className="login-logo">
                    <img
                      src={require("../assets/img/IMG-6041.PNG")}
                      alt="img"
                    />
                  </div>
                  <div className="login-userheading">
                    <h3>تسجيل الدخول</h3>
                    <h4>من فضلك سجل الدخول إلى حسابك</h4>
                  </div>
                  <div className="form-login">
                    <label>البريد الالكتروني</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        // {...register('email')}
                        className={` ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="أدخل بريدك الالكتروني"
                        name="email"
                      />
                      <img src={MailIcon} alt="img" />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>كلمة السر</label>
                    <div className="pass-group">
                      <input
                        type={eye ? "password" : "text"}
                        className={` ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="أدخل كلمة السر"
                        // {...register('password')}
                        onChange={(e) => console.log(e.target.value)}
                        name="password"
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? "fa-eye-slash" : "fa-eye"
                        } `}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <div className="alreadyuser">
                      <h4>
                        <Link to="/forgetPassword" className="hover-a">
                          نسيت كلمة المرور
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="form-login">
                    <button className="btn btn-login">تسجيل الدخول</button>
                  </div>
                </form>
                {/* <div className="signinform text-center">
                                    <h4>
                                        Don’t have an account?{" "}
                                        <Link to="/signUp" className="hover-a">
                                            Sign Up
                                        </Link>
                                    </h4>
                                </div> */}
                {/* <div className="form-setlogin">
                                    <h4>Or sign up with</h4>
                                </div> */}
                {/* <div className="form-sociallink">
                                    <ul>
                                        <li>
                                            <Link to="/signin">
                                                <img
                                                    src={GoogleIcon}
                                                    className="me-2"
                                                    alt="google"
                                                />
                                                Sign Up using Google
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/signin">
                                                <img
                                                    src={FacebookIcon}
                                                    className="me-2"
                                                    alt="google"
                                                />
                                                Sign Up using Facebook
                                            </Link>
                                        </li>
                                    </ul>
                                </div> */}
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
