/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useEffect, useState } from "react";
import Header from "./posheader";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import POS from "./posleft";
import Transactions from "./transactions";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  Product34,
  wallet1,
  transcation,
  trash12,
  scan,
  Edit6,
  pause1,
  debitcard,
  cash,
  Product30,
  Product31,
  Product35,
  delete2,
  ellipise1,
  scanner1,
} from "../../EntryFile/imagePath";
import PosData from "../../assets/data/PosData";
import { useDispatch } from "react-redux";
import { addClient, getClients } from "../../stroe/reducers/clientReducer";
import { useSelector } from "react-redux";
import {
  removeCart,
  removeFromCart,
  updateCart,
} from "../../stroe/reducers/clientCartReducer";
// import ProductsData from "../../assets/data/ProductsData";
import { toast } from "react-toastify";
// import { Categories } from "../../assets/data/Categories";
import leveljs from "level-js";
const levelup = require("levelup");
import * as userData from "../App";
import { getCurrentDate } from "../../functions/uniqeId";
const Pos = () => {
  // const ProductsData = localStorage.getItem("products")
  // ? JSON.parse(localStorage.getItem("products"))
  //   ? JSON.parse(localStorage.getItem("products"))
  //   : []
  // : [];
  const [ProductsData, setProductsData] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const options1 = [
    { id: 1, text: "المنتج", text1: "المنتج" },
    { id: 2, text: "الباركود", text2: "الباركود" },
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state?.cart?.cart);
  console.log(cart);

  const [tax, setTax] = useState(0);
  const [dam, setDam] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [allPrice, setAllPrice] = useState(0);
  // dam
  //  discount
  const clients = useSelector((state) => state.client?.clients);
  const [data, setdata] = useState(ProductsData);

  const [originaldata, setoriginaldata] = useState(ProductsData);
  const db = levelup(leveljs("./db"));
  const [client_data, setClientData] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setselectedProducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [client_id, setClientId] = useState("");
  const [filtereddata, setfiltereddata] = useState([]);
  const [filteredCart, setfilteredCart] = useState({});
  const [selectedcate, setselectedcate] = useState();
  const [itemId, setItemId] = useState(false);
  const [reset, setreset] = useState("");
  const [val, setVal] = useState("");
  const [lastval, setlastval] = useState("");
  const [originalReste, setOriginalReset] = useState(400);
  useEffect(() => {
    // if(originalReste*1-val*1<0){
    //   toast.warn('يجب ان يكون الباقى اكبر من او يساوى صفر')
    //   setVal(lastval)
    //   return;
    // }
    setreset(val * 1 - originalReste * 1);
    setlastval(val);
  }, [val]);
  useEffect(() => {
    // 1) Create our store

    db.get(
      "categories",

      function (err, value) {
        setCategories(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  useEffect(() => {
    db.get("orders", function (err, value) {
      setOrders(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(() => {
    // 1) Create our store

    db.get(
      "products",

      function (err, value) {
        setProductsData(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  useEffect(() => {
    setoriginaldata(ProductsData);
  }, [ProductsData]);
  useEffect(() => {
    if (Categories && Categories?.length)
      setselectedcate(Categories[0]?.category_name);
  }, [Categories]);
  useEffect(() => {
    $("ul.tabs li").click(function () {
      var $this = $(this);
      var $theTab = $(this).attr("id");
      if ($this.hasClass("active")) {
        // do nothing
      } else {
        $this
          .closest(".tabs_wrapper")
          .find("ul.tabs li, .tabs_container .tab_content")
          .removeClass("active");
        $(
          '.tabs_container .tab_content[data-tab="' +
            $theTab +
            '"], ul.tabs li[id="' +
            $theTab +
            '"]'
        ).addClass("active");
      }
    });
    $(document).on("click", ".productset", function () {
      $(this).toggleClass("active");
    });
  });
  useEffect(() => {
    if (itemId) confirmText();
  }, [itemId]);
  useEffect(() => {
    if (
      selectedcate &&
      selectedcate?.length &&
      originaldata &&
      originaldata?.length
    ) {
      setdata([
        ...originaldata?.filter((item) => item.category == selectedcate),
      ]);
    }
  }, [selectedcate, originaldata]);
  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showLoaderOnConfirm: true,
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      if (t.isConfirmed) {
        dispatch(
          removeFromCart({
            client_id,
            cart_id: filteredCart?.cart_id,
            element_id: itemId,
          })
        );
      }
      t.value &&
        Swal.fire({
          showLoaderOnConfirm: true,
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الملف الخاص بك.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };

  useEffect(() => {
    if (
      selectedcate &&
      selectedcate?.length &&
      originaldata &&
      originaldata?.length
    ) {
      setdata([
        ...originaldata?.filter((item) => item.category == selectedcate),
      ]);
    }
  }, [originaldata]);
  useEffect(() => {
    if (originaldata && originaldata?.length) {
      setfilteredCart(cart?.filter((item) => item?.client_id == client_id)[0]);
      originaldata?.map((item) => (item.active = false));
      setoriginaldata([...originaldata]);
    }
  }, [client_id, cart]);
  useEffect(() => {
    setfiltereddata(
      cart?.filter((item) => item?.client_id == client_id)[0]?.elements
    );
  }, [filteredCart, cart]);
  useEffect(() => {
    if (originaldata && originaldata?.length) {
      originaldata?.map((item) => {
        filtereddata?.map((f_item) => {
          if (item?.id == f_item?.id) {
            item.active = true;
          }
        });
      });
      setoriginaldata([...originaldata]);
    }
  }, [filtereddata]);
  return (
    <>
      <div className="main-wrappers">
        <Header />
        <div style={{ margin: "0px" }} className="page-wrapper ms-0">
          <div className="content">
            <div className="row">
              <POS
                updatedata={() => null}
                originaldata={originaldata}
                data={data}
                setdata={setdata}
                setselectedProducts={setselectedProducts}
                selectedProducts={selectedProducts}
                selectedcatfunc={() => null}
                handleupdatecat={() => null}
                setselectedcate={setselectedcate}
                selectedcate={selectedcate}
                client_id={client_id}
              />
              <div className="col-lg-4 col-sm-12 ">
                <div className="order-list">
                  <div className="orderid">
                    <h4>قائمة الطلبات</h4>
                  </div>
                </div>
                <div className="card card-order">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <Link
                          to="#"
                          className="btn btn-adds"
                          data-bs-toggle="modal"
                          data-bs-target="#create"
                        >
                          {"  "}{" "}
                          <i
                            className="fa fa-plus me-2"
                            style={{ margin: "0 5px" }}
                          />{" "}
                          <span>إضافة عميل</span>{" "}
                        </Link>
                      </div>
                      <div className="col-lg-12">
                        <div className="select-split ">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              onChange={(e) => setClientId(e?.target?.value)}
                              data={
                                clients && clients?.length
                                  ? clients.map((item) => {
                                      return {
                                        id: item?.client_cart_id,
                                        text: item?.name,
                                      };
                                    })
                                  : []
                              }
                              value={client_id}
                              options={{
                                placeholder: "العملاء",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>
                        العدد الكلى :{" "}
                        {filteredCart?.cart_total_quantity
                          ? filteredCart?.cart_total_quantity
                          : 0}
                      </h4>
                      <Link
                        to="#"
                        onClick={() => {
                          dispatch(
                            removeCart({ cart_id: filteredCart?.cart_id })
                          );
                        }}
                      >
                        مسح الكل
                      </Link>
                    </div>
                    <div className="product-table">
                      {filtereddata && filtereddata?.length
                        ? filtereddata?.map((item, index) => {
                            console.log(item?.quantity);
                            return (
                              <ul key={index} className="product-lists">
                                <li>
                                  <div className="productimg">
                                    <div className="productimgs">
                                      <img src={item.image} alt="img" />
                                    </div>
                                    <div className="productcontet">
                                      <h4>{item.name}</h4>
                                      <div className="productlinkset">
                                        <h5>{item.category}</h5>
                                      </div>
                                      <div className="increment-decrement">
                                        <div className="input-groups">
                                          <input
                                            onClick={() =>
                                              dispatch(
                                                updateCart({
                                                  client_id,
                                                  cart_id:
                                                    filteredCart?.cart_id,
                                                  element_id: item?.id,
                                                  type: "-",
                                                  element_quantity:
                                                    item?.originQuantity,
                                                })
                                              )
                                            }
                                            type="button"
                                            defaultValue="-"
                                            className="button-minus dec button"
                                          />
                                          <input
                                            type="text"
                                            name="child"
                                            value={item?.quantity}
                                            className="quantity-field"
                                          />
                                          <input
                                            onClick={() => {
                                              console.log(item);
                                              dispatch(
                                                updateCart({
                                                  client_id,
                                                  cart_id:
                                                    filteredCart?.cart_id,
                                                  element_id: item?.id,
                                                  type: "+",
                                                  element_quantity:
                                                    item?.originQuantity,
                                                })
                                              );
                                            }}
                                            type="button"
                                            defaultValue="+"
                                            className="button-plus inc button "
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  {new Intl.NumberFormat("ar-EG", {
                                    style: "currency",
                                    currency: "SAR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                  }).format(item?.price)}{" "}
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="confirm-text"
                                    onClick={() => {
                                      setItemId(item?.id);
                                    }}
                                  >
                                    <img src={delete2} alt="img" />
                                  </Link>
                                </li>
                              </ul>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li>
                          <h5>المجموع الفرعي </h5>
                          <h6>
                            {new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(
                              filteredCart?.cart_total_price
                                ? filteredCart?.cart_total_price
                                : 0
                            )}
                          </h6>
                        </li>

                        <div className="formGroups">
                          {/* <div className="col-lg-3 col-sm-6 col-12"> */}
                          <div className="form-group">
                            <label htmlFor="tax">
                              <span>نسبة الضريبة</span>
                            </label>
                            <input
                              type="text"
                              min={0}
                              max={100}
                              name="tax"
                              id="tax"
                              value={tax}
                              onChange={(e) => {
                                // alert(e.target.value)
                                if (
                                  parseInt(e.target.value) >= 0 &&
                                  parseInt(e.target.value) <= 100
                                )
                                  setTax(parseInt(e.target.value));
                                else setTax(0);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="tax">
                              <span>نسبة الدمغة</span>
                            </label>
                            <input
                              type="text"
                              min={0}
                              max={100}
                              name="dam"
                              id="dam"
                              value={dam}
                              onChange={(e) => {
                                // alert(e.target.value)
                                if (
                                  parseInt(e.target.value) >= 0 &&
                                  parseInt(e.target.value) <= 100
                                )
                                  setDam(parseInt(e.target.value));
                                else setDam(0);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="tax">
                              <span>نسبة الخصم</span>
                            </label>
                            <input
                              type="text"
                              min={0}
                              max={100}
                              name="discount"
                              id="discount"
                              value={discount}
                              onChange={(e) => {
                                if (
                                  parseInt(e.target.value) >= 0 &&
                                  parseInt(e.target.value) <= 100
                                )
                                  setDiscount(parseInt(e.target.value));
                                else setDiscount(0);
                              }}
                            />
                          </div>
                        </div>
                        {/* </div> */}
                        <li>
                          <h5>الضرائب </h5>
                          <h6>
                            {new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(
                              !filteredCart?.cart_total_price ||
                                tax == 0 ||
                                !tax ||
                                tax == ""
                                ? 0
                                : (
                                    parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)
                                  ).toFixed(2)
                            )}
                          </h6>
                        </li>
                        <li>
                          <h5>الدمغات </h5>
                          <h6>
                            {new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(
                              !filteredCart?.cart_total_price ||
                                dam == 0 ||
                                !dam ||
                                dam == ""
                                ? 0
                                : (
                                    parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100)
                                  ).toFixed(2)
                            )}
                          </h6>
                        </li>
                        <li>
                          <h5>الخصم </h5>
                          <h6>
                            {new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(
                              !filteredCart?.cart_total_price ||
                                discount == 0 ||
                                !discount ||
                                discount == ""
                                ? 0
                                : (
                                    parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100)
                                  ).toFixed(2)
                            )}
                          </h6>
                        </li>
                        {/* <li className="total-value">
                          <h5>السعر الكلى</h5>
                          <h6>
                            {filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0 + filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0 * (5 / 100)}
                            $
                          </h6>
                        </li> */}
                      </ul>
                    </div>
                    {/* <div className="setvaluecash">
                      <ul>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={cash} alt="img" className="me-2" />
                            Cash
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={debitcard} alt="img" className="me-2" />
                            Debit
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={scan} alt="img" className="me-2" />
                            فحص
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    <div
                      className="btn-totallabel"
                      style={{ cursor: "pointer" }}
                    >
                      <h5>الدفع</h5>
                      <h6>
                        {" "}
                        {!isNaN(
                          filteredCart?.cart_total_price -
                            parseFloat(filteredCart?.cart_total_price) *
                              (parseInt(discount) / 100) +
                            parseFloat(filteredCart?.cart_total_price) *
                              (parseInt(dam) / 100) +
                            parseFloat(filteredCart?.cart_total_price) *
                              (parseInt(tax) / 100)
                        )
                          ? new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(
                              filteredCart?.cart_total_price -
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(discount) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(dam) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(tax) / 100)
                            )
                          : new Intl.NumberFormat("ar-EG", {
                              style: "currency",
                              currency: "SAR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(0)}
                      </h6>
                    </div>
                    <div className="btn-pos">
                      <ul>
                        {/* <li>
                          <Link to="#" className="btn">
                            <img src={pause1} alt="img" className="me-1" />
                            أوقف
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={Edit6} alt="img" className="me-1" />
                            سؤال
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={trash12} alt="img" className="me-1" />
                            تجنب
                          </Link>
                        </li> */}
                        <div className="num_pad">
                          <div className="value">
                            {/* Use controlled input to dynamically update the value */}
                            <input
                              style={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                              }}
                              max={(filteredCart?.cart_total_price -
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(discount) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(dam) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(tax) / 100))}
                              type="text"
                              value={val}
                              onChange={(e) => {
                                const enteredValue = e.target.value;
                                if (
                                  !isNaN(enteredValue) &&
                                  +enteredValue <=
                                    +filteredCart?.cart_total_price
                                ) {
                                  setVal(enteredValue);
                                }
                              }}
                              // max={filteredCart?.cart_total_price}
                              placeholder="0.00"
                            />

                            {/* <span>ر.س</span> */}
                          </div>
                          <div className="numbers">
                            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((item, index) => {
                              return (
                                <p
                                  onClick={() => {
                                    // if()
                                    if (val == 0) {
                                      setVal(item);
                                    }  else if (+val.toString().concat(item) <= (filteredCart?.cart_total_price -
                                      parseFloat(filteredCart?.cart_total_price) *
                                        (parseInt(discount) / 100) +
                                      parseFloat(filteredCart?.cart_total_price) *
                                        (parseInt(dam) / 100) +
                                      parseFloat(filteredCart?.cart_total_price) *
                                        (parseInt(tax) / 100))) { 
                                      setVal(val.toString().concat(item));
                                    }
                                  }}
                                >
                                  {item}
                                </p>
                              );
                            })}
                            <p
                              onClick={() => {
                                setVal("0");
                              }}
                            >
                              x
                            </p>
                            <p
                              onClick={() => {
                                if (val == "0") {
                                  setVal("0");
                                } else {
                                  setVal(val.toString().concat("0"));
                                }
                              }}
                            >
                              0
                            </p>
                            <p
                              onClick={() => {
                                if (val == "0") {
                                  setVal("0");
                                } else {
                                  setVal(val.toString().concat("00"));
                                }
                              }}
                            >
                              00
                            </p>
                          </div>
                          <div className="bignumbers">
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 100 )  setVal("100");
                              }}
                            >
                              100
                            </p>
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 50 )  setVal("50");
                              }}
                            >
                              50
                            </p>
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 20 )  setVal("20");
                              }}
                            >
                              20
                            </p>
                            <p
                              onClick={() => {
                                setVal("10");
                              }}
                            >
                              10
                            </p>
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 2000 )  setVal("2000");
                              }}
                            >
                              2000
                            </p>
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 1000 )  setVal("1000");
                              }}
                            >
                              1000
                            </p>
                            {/* <p
                              onClick={() => {
                               if( (filteredCart?.cart_total_price -
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(discount) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(dam) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(tax) / 100)) >= 100 ) setVal("100");
                              }}
                            >
                              100
                            </p> */}
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 500 ) setVal("500");
                              }}
                            >
                              500
                            </p>
                            <p
                              onClick={() => {
                                if( (filteredCart?.cart_total_price -
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(discount) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(dam) / 100) +
                                  parseFloat(filteredCart?.cart_total_price) *
                                    (parseInt(tax) / 100)) >= 200 )  setVal("200");
                              }}
                            >
                              200
                            </p>
                          </div>
                          <div className="reset_div">
                            <h4 className="">الباقى</h4>
                            <p className="reset">
                              <span>
                                {Math.abs(val -
                                  (filteredCart?.cart_total_price -
                                    parseFloat(filteredCart?.cart_total_price) *
                                      (parseInt(discount) / 100) +
                                    parseFloat(filteredCart?.cart_total_price) *
                                      (parseInt(dam) / 100) +
                                    parseFloat(filteredCart?.cart_total_price) *
                                      (parseInt(tax) / 100)))  || 0.00}
                              </span>
                              <span>ر.س</span>
                            </p>
                          </div>
                        </div>
                        <li
                          onClick={() => {
                            const order = {
                              totalPrice:
                                filteredCart?.cart_total_price -
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(discount) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(dam) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(tax) / 100),
                              initialPrice: val,
                              remain: filteredCart?.cart_total_price -
                              parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(discount) / 100) +
                              parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(dam) / 100) +
                              parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(tax) / 100) - val,
                              PayDetails: [
                                { date: getCurrentDate(), id: 1, total: val },
                              ],
                              totalPayments: val,
                              discount:
                                parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(discount) / 100),
                              discountRate: discount,
                              tax:
                                parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(tax) / 100),
                              taxRate: tax,
                              dam:
                                parseFloat(filteredCart?.cart_total_price) *
                                (parseInt(dam) / 100),
                              damRate: dam,
                              grandPrice:
                                filteredCart?.cart_total_price -
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(discount) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(dam) / 100) +
                                parseFloat(filteredCart?.cart_total_price) *
                                  (parseInt(tax) / 100),
                              elements: filteredCart?.elements,
                              client_id: filteredCart?.client_id,
                              totalQuantity: filteredCart?.cart_total_quantity,
                              client_name: clients?.filter(
                                (item) =>
                                  parseInt(item?.client_cart_id) ==
                                  parseInt(client_id)
                              )[0]?.name,
                              client_phone: clients?.filter(
                                (item) =>
                                  parseInt(item?.client_cart_id) ==
                                  parseInt(client_id)
                              )[0]?.phone,
                              date: new Date(),
                              sellerName: userData?.data?.name,
                              sellerMobile: userData?.data?.phone,
                              Status: "pending",
                            };
                            filteredCart?.elements?.map((item) => {
                              ProductsData.map((p_item) => {
                                if (p_item?.id == item?.id)
                                  p_item.quantity -= item?.quantity;
                              });
                            });
                            setfiltereddata(false);
                            setfilteredCart(false);
                            setoriginaldata(false);
                            db.put("products", JSON.stringify(ProductsData));

                            orders.push({ ...order, id: orders.length + 1 });
                            toast.success("تم الدفع بنجاح");
                            dispatch(
                              removeCart({ cart_id: filteredCart?.cart_id })
                            );

                            db.put("orders", JSON.stringify(orders));
                            localStorage.setItem(
                              "orders",
                              JSON.stringify(orders)
                            );

                            history.push("/dream-pos/sales/saleslist");
                          }}
                        >
                          <Link to="#" className="btn">
                            <img src={wallet1} alt="img" className="me-1" />
                            دفع
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">إنشاء</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setClientData({ ...client_data, name: e.target.value });
                      }}
                      value={client_data?.name}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>الهاتف</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setClientData({
                          ...client_data,
                          phone: e.target.value,
                        });
                      }}
                      value={client_data?.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Link
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  to="#"
                  className="btn btn-submit me-2"
                  onClick={() => {
                    dispatch(addClient(client_data));
                    setClientData({});
                  }}
                >
                  تسجيل
                </Link>
                <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
                  إلغاء
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transactions />
    </>
  );
};

export default Pos;
