/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Logout, Avatar1 } from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { data } from "../App";
const Header = (props) => {
  const [toggle, SetToggle] = useState(false);

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const sidebarOverlay = () => {};
  const [users, setUsers] = useState(false);

  return (
    <>
      <div className="header">
        {/* Logo */}
        <div
          className={`header-left ${toggle ? "" : "active"}`}
          onMouseLeave={expandMenu}
          onMouseOver={expandMenuOpen}
        >
          <Link to="/dream-pos/dashboard" className="logo logo-normal">
            <img src={require("../../assets/img/IMG-6041.PNG")} alt="" />
          </Link>
          <Link to="/dream-pos/dashboard" className="logo logo-white">
            <img src={require("../../assets/img/IMG-6041.PNG")} alt="" />
          </Link>
          <Link to="/dream-pos/dashboard" className="logo-small">
            <img src={require("../../assets/img/IMG-6041.PNG")} alt="" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}

          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  <img src={data?.img} alt="" className="img-fluid" />
                </span>
                <span className="user-detail">
                  {console.log(data?.img)}
                  <span className="user-name">{data?.name}</span>
                  {/* <span className="user-role">Super Admin</span> */}
                </span>
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  <span className="user-img">
                    <img src={data?.img} alt="" className="img-fluid" />
                    <span className="status online" />
                  </span>
                  <div className="profilesets">
                    <h6>{data?.name}</h6>
                  </div>
                </div>
                <hr className="m-0" />

                <hr className="m-0" />
                <Link className="dropdown-item logout pb-0" to="/signIn">
                  <img src={Logout} className="me-2" alt="img" />
                  تسجيل الخروج
                </Link>
              </div>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="/signIn">
              تسجيل الخروج
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;
