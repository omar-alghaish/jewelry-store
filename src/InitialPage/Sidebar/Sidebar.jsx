/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import "../app.css";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const history = useHistory();

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    history.push(`/dream-pos/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;
  console.log(location);

  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);
  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-four",
    "/reactjs/template/dream-pos/index-two",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseOver={expandMenuOpen}
              onMouseLeave={expandMenu}
            >
              <ul>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">الرئيسيه</h6>
                  <ul>
                    <li
                      className={pathname.includes("dashboard") ? "active" : ""}
                    >
                      <Link to="/dream-pos/dashboard">
                        {/* <i data-feather="grid" /> */}
                        <FeatherIcon icon="grid" />
                        <span>لوحة التحكم</span>
                      </Link>
                    </li>
                    {/* <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/application")
                            ? "subdrop active"
                            : "" || isSideMenu == "Application"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "Application" ? "" : "Application"
                          )
                        }
                      >
                        <FeatherIcon icon="smartphone" />
                        <span> التطبيقات</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Application" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/application/chat"
                              className={
                                pathname.includes("chat") ? "active" : ""
                              }
                            >
                              الدردشه
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/application/calendar"
                              className={
                                pathname.includes("calendar") ? "active" : ""
                              }
                            >
                              النتيجه
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/application/email"
                              className={
                                pathname.includes("email") ? "active" : ""
                              }
                            >
                              البريد الإلكترونى
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li> */}
                    <li>
                      <Link to="/pos">
                        <FeatherIcon icon="hard-drive" />
                        <span>نقاط البيع</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="submenu-open">
                  <h6 className="submenu-hdr">الحركات</h6>
                  <ul></ul>
                </li> */}

                <li className="submenu-open">
                  <h6 className="submenu-hdr">حسابات</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/accounts-files")
                            ? "subdrop active"
                            : "" || isSideMenu == "accounts-files"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "accounts-files"
                              ? ""
                              : "accounts-files"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>الملفات الرئيسيه</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "accounts-files" ? (
                        <ul>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/accounts/accounts-list"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/accounts/accounts-list"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/accounts/accounts-list"
                            >
                              <p>ملف دليل الحسابات</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/accounts/stores-moves"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/accounts/stores-moves"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/accounts/stores-moves"
                            >
                              <p>عرض ترحيلات المخزن</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/accounts/enter-opening-list"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/accounts/enter-opening-list"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/accounts/enter-opening-list"
                            >
                              <p>ادخال الارصده الافتتاحيه للحسابات</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/accounts/main-data")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/accounts/main-data"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/accounts/main-data"
                            >
                              <p> عرض الترحيلات</p>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>

                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/moves")
                            ? "subdrop active"
                            : "" || isSideMenu == "moves"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "moves" ? "" : "moves")
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>حركات</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "moves" ? (
                        <ul>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/move1")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/moves/move1")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/move1"
                            >
                              <p>اضافة حركه يومية</p>
                            </Link>
                          </li>

                          <li
                            className={
                              pathname.includes("dream-pos/moves/move2")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("dream-pos/moves/move2")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/move2"
                            >
                              <p>اضافة حركة الصندوق</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/deportation")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/moves/deportation"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/deportation"
                            >
                              <p>تجهيز وترحيل حركات</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("gold-move-4") ? "active" : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("gold-move-4") ? "active" : ""
                              }
                              to="gold-move-4"
                            >
                              <p>اعداد قيود الاقفال</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("gold-move-5") ? "active" : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("gold-move-5") ? "active" : ""
                              }
                              to="gold-move-5"
                            >
                              <p>قيد اقفال حساب</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("gold-move-6") ? "active" : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("gold-move-6") ? "active" : ""
                              }
                              to="gold-move-6"
                            >
                              <p>ادخال باستخدام الاختصارات المعرفه</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/move7")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/moves/move7")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/move7"
                            >
                              <p>حركة شراء وبيع ذهب كسر</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/move8")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/moves/move8")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/move8"
                            >
                              <p>حركة صرف وقبض ذهب ومبالغ نقديه</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/move9")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/moves/move9")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/move9"
                            >
                              <p>حركة ذهب كسر عيار 24</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/moves/movesList")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/moves/movesList")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/moves/movesList"
                            >
                              <p style={{ fontSize: "13px" }}>قائمة الحركات</p>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>

                <li className="submenu-open">
                  <h6 className="submenu-hdr">المنتجات</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("productlist-product") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("productlist-") ? "active" : ""
                        }
                        to="/dream-pos/product/productlist-product"
                      >
                        <FeatherIcon icon="box" />
                        <span>المنتجات</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("addproduct-product") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("addproduct-") ? "active" : ""
                        }
                        to="/dream-pos/product/addproduct-product"
                      >
                        <FeatherIcon icon="plus-square" />
                        <span>إنشاء منتج</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("AddCaliber") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("AddCaliber") ? "active" : ""
                        }
                        to="/dream-pos/product/addkart"
                      >
                        <FeatherIcon icon="plus-square" />
                        <span>أضف عيار</span>
                      </Link>
                    </li>
                    <li
                      className={pathname.includes("Calibers") ? "active" : ""}
                    >
                      <Link
                        className={
                          pathname.includes("Calibers") ? "active" : ""
                        }
                        to="/dream-pos/product/caliber"
                      >
                        <FeatherIcon icon="plus-square" />
                        <span>عيارات الذهب</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("categorylist-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("categorylist-") ? "active" : ""
                        }
                        to="/dream-pos/product/categorylist-product"
                      >
                        <FeatherIcon icon="codepen" />
                        <span>الفئات</span>
                      </Link>
                    </li>
                    {/* <li
                      className={
                        pathname.includes("brandlist-product") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("brandlist-") ? "active" : ""
                        }
                        to="/dream-pos/product/brandlist-product"
                      >
                     
                        <FeatherIcon icon="tag" />
                        <span>العلامات التجارية</span>
                      </Link>
                    </li> */}
                    {/* <li
                      className={
                        pathname.includes("subcategorytable-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("subcategorytable-") ? "active" : ""
                        }
                        to="/dream-pos/product/subcategorytable-product"
                      >
                        <FeatherIcon icon="speaker" />
                        <span>تصنيف فرعي</span>
                      </Link>
                    </li> */}
                    {/* <li
                      className={
                        pathname.includes("printbarcode-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("printbarcode-") ? "active" : ""
                        }
                        to="/dream-pos/product/printbarcode-product"
                      >
                        <FeatherIcon icon="align-justify" />
                        <span>طباعة الباركود</span>
                      </Link>
                    </li> */}
                    <li
                      className={
                        pathname.includes("importproduct-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("importproduct-") ? "active" : ""
                        }
                        to="/dream-pos/product/importproduct-product"
                      >
                        {/* <i data-feather="minimize-2" /> */}
                        <FeatherIcon icon="minimize-2" />
                        <span>استيراد المنتجات</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="submenu-open">
                  <h6 className="submenu-hdr">مبيعات</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/bills")
                            ? "subdrop active"
                            : "" || isSideMenu == "expense"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "expense" ? "" : "expense"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>فواتير</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "expense" ? (
                        <ul>
                          <li
                            className={
                              pathname.includes("/dream-pos/bills/add-bills")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/bills/add-bills")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/bills/add-bills"
                            >
                              <p>اضافة فاتوره</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/bills/bills-list")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes("/dream-pos/bills/bills-list")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/bills/bills-list"
                            >
                              <p>عرض الفواتير</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes("/dream-pos/bills/add-receipt")
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/bills/add-receipt"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/bills/add-receipt"
                            >
                              <p>اضافة فاتورة شراء</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/bills/receipts-list"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/bills/receipts-list"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/bills/receipts-list"
                            >
                              <p>عرض فواتير الشراء</p>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li
                      className={pathname.includes("saleslist") ? "active" : ""}
                    >
                      <Link
                        className={
                          pathname.includes("saleslist") ? "active" : ""
                        }
                        to="/dream-pos/sales/saleslist"
                      >
                        <i data-feather="shopping-cart" />
                        <FeatherIcon icon="shopping-cart" />
                        <span>المبيعات</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("invoicereport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/invoicereport"
                        className={
                          pathname.includes("invoicereport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="file-text" /> */}
                        <FeatherIcon icon="file-text" />
                        <span>الفواتير</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("salesreturnlist-return")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("salesreturnlist-") ? "active" : ""
                        }
                        to="/dream-pos/return/salesreturnlist-return"
                      >
                        {/* <i data-feather="copy" /> */}
                        <FeatherIcon icon="copy" />
                        <span>المرتجعات</span>
                      </Link>
                    </li>
                    {/* <li
                      className={
                        pathname.includes("quotationlist-quotation")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("quotationlist-") ? "active" : ""
                        }
                        to="/dream-pos/quotation/quotationlist-quotation"
                      >
                        <FeatherIcon icon="save" />
                        <span>اقتباس</span>
                      </Link>
                    </li> */}

                    {/* <li className="submenu">
                      <span
                        style={{ cursor: 'pointer' }}
                        className={
                          pathname.includes("/dream-pos/transfer")
                            ? "subdrop active"
                            : "" || isSideMenu == "transfer"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "transfer" ? "" : "transfer"
                          )
                        }
                      >
                        {" "}
                        <FeatherIcon icon="shuffle" />
                        <span>النقل</span> <span className="menu-arrow"></span>
                      </span>
                      {isSideMenu == "transfer" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("transferlist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/transfer/transferlist-transfer"
                            >
                              قائمة النقل
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("importtransfer-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/transfer/importtransfer-transfer"
                            >
                              نقل الاستيراد
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li> */}
                    {/* <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/return")
                            ? "subdrop active"
                            : "" || isSideMenu == "return"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "return" ? "" : "return")
                        }
                      >
                        {" "}
                        <FeatherIcon icon="corner-up-left" /> <span>يعود</span>{" "}
                        <span className="menu-arrow"></span>
                      </Link>
                      {isSideMenu == "return" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("salesreturnlist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/return/salesreturnlist-return"
                            >
                              عائد المبيعات
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("purchasereturnlist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/return/purchasereturnlist-return"
                            >
                              عودة شراء
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li> */}
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">المخزن</h6>

                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/moves-store")
                            ? "subdrop active"
                            : "" || isSideMenu == "moves-store"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "moves-store" ? "" : "moves-store"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>حركات</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "moves-store" ? (
                        <ul>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/store/moves-store/add-to-store"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/store/moves-store/add-to-store"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/store/moves-store/add-to-store"
                            >
                              <p>اضف للمخزن</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/store/moves-store/store-recalls"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/store/moves-store/store-recalls"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/store/moves-store/store-recalls"
                            >
                              <p>سحب منتجات</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/store/moves-store/move-to-main-files"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/store/moves-store/move-to-main-files"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/store/moves-store/move-to-main-files"
                            >
                              <p>تجهيز وترحيل</p>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/bills-store")
                            ? "subdrop active"
                            : "" || isSideMenu == "bills-store"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "bills-store" ? "" : "bills-store"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>فواتر</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "bills-store" ? (
                        <ul>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/store/bills-store/store-recalls-bills-list"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/store/bills-store/store-recalls-bills-list"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/store/bills-store/store-recalls-bills-list"
                            >
                              <p>فواتير السحب</p>
                            </Link>
                          </li>
                          <li
                            className={
                              pathname.includes(
                                "/dream-pos/store/bills-store/store-add-bills-list"
                              )
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              className={
                                pathname.includes(
                                  "/dream-pos/store/bills-store/store-add-bills-list"
                                )
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/store/bills-store/store-add-bills-list"
                            >
                              <p>فواتير الاضافه</p>
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>

                    <li
                      className={
                        pathname.includes("/dream-pos/store/store-list")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("/dream-pos/store/store-list")
                            ? "active"
                            : ""
                        }
                        to="/dream-pos/store/store-list"
                      >
                        <FeatherIcon icon="shopping-bag" />
                        <span>عرض المخزن</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">المشتريات</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("purchaselist-purchase")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("purchaselist-") ? "active" : ""
                        }
                        to="/dream-pos/purchase/purchaselist-purchase"
                      >
                        {/* <i data-feather="shopping-bag" /> */}
                        <FeatherIcon icon="shopping-bag" />
                        <span>المشتريات</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("importpurchase-purchase")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("importpurchase-") ? "active" : ""
                        }
                        to="/dream-pos/purchase/importpurchase-purchase"
                      >
                        <FeatherIcon icon="minimize-2" />
                        <span>مشتريات الاستيراد</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("purchaseorderreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/purchaseorderreport"
                        className={
                          pathname.includes("purchaseorderreport")
                            ? "active"
                            : ""
                        }
                      >
                        <FeatherIcon icon="file-minus" />
                        <span>أمر شراء</span>
                      </Link>
                    </li>
                    {/*<li>
                      <Link to="/dream-pos/return/purchasereturnlist-return">
                        <FeatherIcon icon="refresh-cw" />
                        عودة شراء
                      </Link>
                    </li> */}
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">تمويل &amp; حسابات</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/expense")
                            ? "subdrop active"
                            : "" || isSideMenu == "expense"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "expense" ? "" : "expense"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>مصروف</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "expense" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("expenselist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/expense/expenselist-expense"
                            >
                              نفقات
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("expensecategory-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/expense/expensecategory-expense"
                            >
                              فئة النفقات
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">العملاء</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/customers")
                            ? "subdrop active"
                            : "" || isSideMenu == "customers"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "customers" ? "" : "customers"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>فواتير</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "customers" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("customerList")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/customers/customerList"
                            >
                              فواتير العملاء
                            </Link>
                          </li>
                       
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">الشعوب</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("customerlist-people") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("customerlist-") ? "active" : ""
                        }
                        to="/dream-pos/people/customerlist-people"
                      >
                        {/* <i data-feather="user" /> */}
                        <FeatherIcon icon="user" />
                        <span>عملاء</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes(
                          "/dream-pos/people/supplierlist-people"
                        )
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes(
                            "/dream-pos/people/supplierlist-people"
                          )
                            ? "active"
                            : ""
                        }
                        to="/dream-pos/people/supplierlist-people"
                      >
                        <FeatherIcon icon="users" />
                        <span>الموردين</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("userlist-people") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("userlist-") ? "active" : ""
                        }
                        to="/dream-pos/people/userlist-people"
                      >
                        {/* <i data-feather="user-check" /> */}
                        <FeatherIcon icon="user-check" />
                        <span>المستخدمين</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("storelist-people") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("storelist-") ? "active" : ""
                        }
                        to="/dream-pos/people/storelist-people"
                      >
                        <FeatherIcon icon="home" />
                        <span>متاجر</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">التقارير</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("salesreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/salesreport"
                        className={
                          pathname.includes("salesreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="bar-chart-2" /> */}
                        <FeatherIcon icon="bar-chart-2" />
                        <span>تقرير فواتير البيع</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("retrivesreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/retrivesreport"
                        className={
                          pathname.includes("retrivesreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="bar-chart-2" /> */}
                        <FeatherIcon icon="bar-chart-2" />
                        <span>تقرير المرتجعات</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("/dream-pos/report/reciepts")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/reciepts"
                        className={
                          pathname.includes("/dream-pos/report/reciepts")
                            ? "active"
                            : ""
                        }
                      >
                        {/* <i data-feather="bar-chart-2" /> */}
                        <FeatherIcon icon="bar-chart-2" />
                        <span>تقرير فواتير الشراء</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("inventoryreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/inventoryreport"
                        className={
                          pathname.includes("inventoryreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="credit-card" /> */}
                        <FeatherIcon icon="credit-card" />
                        <span>تقرير المخزونات</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("invoicereport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/invoicereport"
                        className={
                          pathname.includes("invoicereport") ? "active" : ""
                        }
                      >
                        <FeatherIcon icon="file" />
                        <span>تقرير الفاتورة</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("purchasereport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/purchasereport"
                        className={
                          pathname.includes("purchasereport") ? "active" : ""
                        }
                      >
                        <FeatherIcon icon="bar-chart" />
                        <span>تقرير الشراء</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("supplierreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/supplierreport"
                        className={
                          pathname.includes("supplierreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="database" /> */}
                        <FeatherIcon icon="database" />
                        <span>تقرير الموردين</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("customerreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/customerreport"
                        className={
                          pathname.includes("customerreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="pie-chart" /> */}
                        <FeatherIcon icon="pie-chart" />
                        <span>كشف حساب عميل</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">إدارةالمستخدم</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/users")
                            ? "subdrop active"
                            : "" || isSideMenu == "Users"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "Users" ? "" : "Users")
                        }
                      >
                        <FeatherIcon icon="users" />
                        <span>ادارة المستخدمين</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Users" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/users/newuser"
                              className={
                                pathname.includes("newuser") ? "active" : ""
                              }
                            >
                              مستخدم جديد{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/users/userlists"
                              className={
                                pathname.includes("userlists") ? "active" : ""
                              }
                            >
                              قائمة المستخدمين
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                {/* <li className="submenu-open">
                  <h6 className="submenu-hdr">الصفحات</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/authentication")
                            ? "subdrop active"
                            : "" || isSideMenu == "authentication"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "authentication"
                              ? ""
                              : "authentication"
                          )
                        }
                      >
                        <FeatherIcon icon="shield" />
                        <span>المصادقة</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "authentication" ? (
                        <ul>
                          <li>
                            <Link
                              to="/signIn"
                              className={
                                pathname.includes("signIn") ? "active" : ""
                              }
                            >
                              تسجيل الدخول
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/signUp"
                              className={
                                pathname.includes("signUp") ? "active" : ""
                              }
                            >
                              يسجل
                            </Link>
                          </li>
                          <li>
                            <Link to="/forgetpassword">هل نسيت كلمة السر</Link>
                          </li>
                        </ul>
                      ) : (
                        " "
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          isSideMenu == "error pages" ? "subdrop active" : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "error pages" ? "" : "error pages"
                          )
                        }
                      >
                        {" "}
                        <FeatherIcon icon="file-minus" />
                        <span> صفحات الخطأ </span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "error pages" ? (
                        <ul>
                          <li>
                            <Link to="/error-404">404 خطأ </Link>
                          </li>
                          <li>
                            <Link to="/error-500">500 خطأ </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/places")
                            ? "subdrop active"
                            : "" || isSideMenu == "places"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "places" ? "" : "places")
                        }
                      >
                        {" "}
                        <FeatherIcon icon="map" />
                        <span>أماكن</span> <span className="menu-arrow"></span>
                      </Link>
                      {isSideMenu == "places" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("countrylist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/places/countrylist-places"
                            >
                              بلدان
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("statelist-") ? "active" : ""
                              }
                              to="/dream-pos/places/statelist-places"
                            >
                              الولايات
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li
                      className={pathname.includes("blankpage") ? "active" : ""}
                    >
                      <Link
                        to="/dream-pos/blankpage"
                        onClick={() =>
                          toggleSidebar(isSideMenu == "" ? "" : "")
                        }
                      >
                        <FeatherIcon icon="file" />
                        <span>صفحة فارغة</span>{" "}
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("components") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/components"
                        onClick={() =>
                          toggleSidebar(isSideMenu == "" ? "" : "")
                        }
                      >
                        <FeatherIcon icon="pen-tool" />
                        <span>عناصر</span>{" "}
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {/* <li className="submenu-open">
                  <h6 className="submenu-hdr">واجهة المستخدم</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/elements")
                            ? "subdrop active"
                            : "" || isSideMenu == "elements"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "elements" ? "" : "elements"
                          )
                        }
                      >
                        <FeatherIcon icon="box" />
                        <span>عناصر </span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "elements" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/elements/sweetalerts"
                              className={
                                pathname.includes("sweetalerts") ? "active" : ""
                              }
                            >
                              تنبيهات حلوة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/tooltip"
                              className={
                                pathname.includes("tooltip") ? "active" : ""
                              }
                            >
                              تلميح
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("popover") ? "active" : ""
                              }
                              to="/dream-pos/elements/popover"
                            >
                              البوب
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/ribbon"
                              className={
                                pathname.includes("ribbon") ? "active" : ""
                              }
                            >
                              شريط
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/clipboard"
                              className={
                                pathname.includes("clipboard") ? "active" : ""
                              }
                            >
                              الحافظة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/drag-drop"
                              className={
                                pathname.includes("drag-drop") ? "active" : ""
                              }
                            >
                              يجر &amp; يسقط
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/rangeslider"
                              className={
                                pathname.includes("rangeslider") ? "active" : ""
                              }
                              onClick={(e) =>
                                pageRefresh("elements", "rangeslider")
                              }
                            >
                              نطاق المنزلق
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/rating"
                              className={
                                pathname.includes("rating") ? "active" : ""
                              }
                            >
                              تقييم
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/toastr"
                              className={
                                pathname.includes("toastr") ? "active" : ""
                              }
                            >
                              محمصة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/text-editor"
                              className={
                                pathname.includes("text-editor") ? "active" : ""
                              }
                            >
                              محرر النص
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/counter"
                              className={
                                pathname.includes("counter") ? "active" : ""
                              }
                            >
                              عداد
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/scrollbar"
                              className={
                                pathname.includes("scrollbar") ? "active" : ""
                              }
                            >
                              شريط التمرير
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/spinner"
                              className={
                                pathname.includes("spinner") ? "active" : ""
                              }
                            >
                              سبينر
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/notification"
                              className={
                                pathname.includes("notification")
                                  ? "active"
                                  : ""
                              }
                            >
                              إشعار
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/lightbox"
                              className={
                                pathname.includes("lightbox") ? "active" : ""
                              }
                            >
                              صندوق مضئ
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/stickynote"
                              className={
                                pathname.includes("stickynote") ? "active" : ""
                              }
                            >
                              ملاحظة خفيفة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/timeline"
                              className={
                                pathname.includes("timeline") ? "active" : ""
                              }
                            >
                              الجدول الزمني
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/elements/form-wizard"
                              className={
                                pathname.includes("form-wizard") ? "active" : ""
                              }
                              onClick={(e) =>
                                pageRefresh("elements", "form-wizard")
                              }
                            >
                              معالج النموذج
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/charts")
                            ? "subdrop active"
                            : "" || isSideMenu == "Charts"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "Charts" ? "" : "Charts")
                        }
                      >
                        <FeatherIcon icon="bar-chart-2" />
                        <span> الرسوم البيانية</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Charts" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/charts/chart-apex"
                              className={
                                pathname.includes("chart-apex") ? "active" : ""
                              }
                            >
                              مخططات أبيكسارتس
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/charts/chart-js"
                              className={
                                pathname.includes("chart-js") ? "active" : ""
                              }
                            >
                              مخطط شبيبة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/charts/chart-morris"
                              className={
                                pathname.includes("chart-morris")
                                  ? "active"
                                  : ""
                              }
                            >
                              مخططات موريس
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/charts/chart-flot"
                              className={
                                pathname.includes("chart-flot") ? "active" : ""
                              }
                            >
                              المخططات العائمة
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/icons")
                            ? "subdrop active"
                            : "" || isSideMenu == "Icons"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "Icons" ? "" : "Icons")
                        }
                      >
                        <FeatherIcon icon="award" />
                        <span> أيقونات</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Icons" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-fontawesome"
                              className={
                                pathname.includes("fontawesome") ? "active" : ""
                              }
                            >
                              أيقونات فونتاويسوم
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-feather"
                              className={
                                pathname.includes("feather") ? "active" : ""
                              }
                            >
                              أيقونات ريشة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-ionic"
                              className={
                                pathname.includes("ionic") ? "active" : ""
                              }
                            >
                              الأيقونات الأيونية
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-material"
                              className={
                                pathname.includes("material") ? "active" : ""
                              }
                            >
                              أيقونات المواد
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-pe7"
                              className={
                                pathname.includes("icon-pe7") ? "active" : ""
                              }
                            >
                              أيقونات Pe7
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-simpleline"
                              className={
                                pathname.includes("simpleline") ? "active" : ""
                              }
                            >
                              أيقونات بسيطة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-themify"
                              className={
                                pathname.includes("themify") ? "active" : ""
                              }
                            >
                              ثيمافي الأيقونات
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-weather"
                              className={
                                pathname.includes("weather") ? "active" : ""
                              }
                            >
                              أيقونات الطقس
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-typicon"
                              className={
                                pathname.includes("typicon") ? "active" : ""
                              }
                            >
                              أيقونات تايكون
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/icons/icon-flag"
                              className={
                                pathname.includes("icon-flag") ? "active" : ""
                              }
                            >
                              أيقونات العلم
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/forms")
                            ? "subdrop active"
                            : "" || isSideMenu == "Forms"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "Forms" ? "" : "Forms")
                        }
                      >
                        <FeatherIcon icon="edit" />
                        <span> نماذج</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Forms" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-basic-inputs"
                              className={
                                pathname.includes("form-basic-inputs")
                                  ? "active"
                                  : ""
                              }
                            >
                              المدخلات الأساسية{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-input-groups"
                              className={
                                pathname.includes("form-input-groups")
                                  ? "active"
                                  : ""
                              }
                            >
                              مجموعات الإدخال{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-horizontal"
                              className={
                                pathname.includes("horizontal") ? "active" : ""
                              }
                            >
                              النموذج الأفقي{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-vertical"
                              className={
                                pathname.includes("form-vertical")
                                  ? "active"
                                  : ""
                              }
                            >
                              {" "}
                              النموذج العمودي{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-mask"
                              className={
                                pathname.includes("form-mask") ? "active" : ""
                              }
                            >
                              قناع النموذج{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-validation"
                              className={
                                pathname.includes("validation") ? "active" : ""
                              }
                            >
                              التحقق من صحة النموذج{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-select2"
                              className={
                                pathname.includes("form-select2")
                                  ? "active"
                                  : ""
                              }
                            >
                              نموذج التحديد2{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/forms/form-fileupload"
                              className={
                                pathname.includes("fileupload") ? "active" : ""
                              }
                            >
                              تحميل الملف{" "}
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/table")
                            ? "subdrop active"
                            : "" || isSideMenu == "Table"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(isSideMenu == "Table" ? "" : "Table")
                        }
                      >
                        <FeatherIcon icon="layout" />
                        <span> الجدول</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Table" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/table/tables-basic"
                              className={
                                pathname.includes("tables-basic")
                                  ? "active"
                                  : ""
                              }
                            >
                              الجداول الأساسيه{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/table/data-tables"
                              className={
                                pathname.includes("data-tables") ? "active" : ""
                              }
                            >
                              جدول البيانات{" "}
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li> */}
                <li className="submenu-open">
                  <h6 className="submenu-hdr">الإعدادات</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/settings")
                            ? "subdrop active"
                            : "" || isSideMenu == "Settings"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "Settings" ? "" : "Settings"
                          )
                        }
                      >
                        {/* <img src={settings} alt="img" /> */}
                        <FeatherIcon icon="settings" />
                        <span> الإعدادات</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Settings" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/settings/generalsettings"
                              className={
                                pathname.includes("generalsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              الاعدادات العامة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/emailsettings"
                              className={
                                pathname.includes("emailsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              إعدادات البريد الإلكتروني
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/paymentsettings"
                              className={
                                pathname.includes("paymentsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              إعدادات الدفع
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/currencysettings"
                              className={
                                pathname.includes("currencysettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              إعدادات العملة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/grouppermissions"
                              className={
                                pathname.includes("permission") ? "active" : ""
                              }
                            >
                              أذونات المجموعة
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/taxrates"
                              className={
                                pathname.includes("taxrates") ? "active" : ""
                              }
                            >
                              معدلات الضرائب
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <Link
                        to="/signIn"
                        className={pathname.includes("signIn") ? "active" : ""}
                      >
                        <FeatherIcon icon="log-out" />
                        <span>تسجيل خروج</span>{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
