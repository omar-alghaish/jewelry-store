/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import lodash from "lodash/lodash";

import leveljs from "level-js";
const levelup = require("levelup");

// 1) Create our store
// import { Categories } from "../../assets/data/Categories";
// import PosData from "../../assets/data/PosData";

import "./pos.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stroe/reducers/clientCartReducer";
import { toast } from "react-toastify";
const Posleft = ({
  setselectedcate,
  data,
  updatedata,
  setdata,
  setselectedProducts,
  originaldata,
  selectedcate,
  client_id,
}) => {
  // const Categories = localStorage.getItem("categories")
  //   ? JSON.parse(localStorage.getItem("categories"))
  //     ? JSON.parse(localStorage.getItem("categories"))
  //     : []
  //   : [];
  const [Categories, setCategories] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  const [selcatname, setselcatname] = useState("");
  const [searchtxt, setSearchTxt] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    // 1) Create our store
    const db = levelup(leveljs("./db"));

    db.get("categories", function (err, value) {
      setCategories(value ? JSON.parse(value) : false);
    });
  }, []);
  function searchType(e) {
    setSearchTxt(e);
    const formattedQuery = e.toLowerCase();
    const filteredData = lodash.filter(originaldata, (item) => {
      return contains(item, formattedQuery);
    });
    updatedata(filteredData);
  }

  const contains = (items, query) => {
    const { name, category } = items;
    if (
      name?.toLowerCase().includes(query) ||
      category?.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setselcatname(Categories[0]?.cat);
    setselectedcate(Categories[0]?.cat_name);
  }, [Categories]);

  useEffect(() => {
    if (originaldata && originaldata?.length)
      setselectedProducts(originaldata?.filter((item) => item.active));
  }, [filteredData, originaldata]);
  useEffect(() => {
    if (originaldata && originaldata?.length)
      setFilteredData([...originaldata]);
  }, [originaldata]);

  return (
    <div className="col-lg-8 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>الفئات</h4>
          <h6>أدر فروعك</h6>
        </div>
      </div>
      <ul className=" tabs owl-carousel owl-theme owl-product  border-0 ">
        <OwlCarousel
          className="owl-theme"
          items={10}
          margin={10}
          dots={false}
          nav
        >
          {Categories && Categories?.length
            ? Categories?.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      setselectedcate(item?.category_name);
                    }}
                    key={index}
                    id={item.cat}
                    // className={"item"}
                    className={selectedcate === item?.category_name
                      ? "col-lg-2 col-sm-3 d-flex active"
                      : "col-lg-2 col-sm-3 d-flex"}
                    style={{}}
                  >
                    <div className="product-details">
                      <img
                        style={{
                          height: "60px",
                          width: "70px",
                          borderRadius: "4px",
                          margin: "auto",
                        }}
                        src={
                          item?.catimg
                            ? item?.catimg
                            : require("../../assets/img/defultItem.jpg")
                        }
                        alt="img"
                      />
                      <h6>{item?.category_name}</h6>
                    </div>
                  </li>
                );
              })
            : null}
        </OwlCarousel>
      </ul>
      <div className="row ">
        {data && data.length ? (
          data?.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  item.active
                    ? "col-lg-2 col-sm-3 d-flex active"
                    : "col-lg-2 col-sm-3 d-flex"
                }
                onClick={(e) => {
                  if (!client_id?.length) {
                    return toast.error("رجاءا قم بتحديد عميل أولا");
                  }
                  const data = { client_id, element: item };
                  if (item?.quantity > 0) {
                    dispatch(addToCart(data));
                  } else {
                    toast.warn("المنتج غير متاح حاليا");
                  }
                  // console.log({ client_id, element: item });
                  // updateActiveData(item);
                }}
              >
                <div
                  className={
                    item.active
                      ? "productset flex-fill active"
                      : "productset flex-fill"
                  }
                >
                  <div className="productsetimg">
                    <img src={item.image} alt="img" />
                    <h6>الكميه: {item.quantity}</h6>
                    <div className="check-product active">
                      <i className="fa fa-check" />
                    </div>
                  </div>
                  <div className="productsetcontent">
                    <h5>{item.category}</h5>
                    <h4>{item.product_name}</h4>
                    <h6>
                      {new Intl.NumberFormat("ar-EG", {
                        style: "currency",
                        currency: "SAR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(item?.price)}
                    </h6>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h2>أختر فئة أولا من الفئات</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posleft;
Posleft.propTypes = {
  selectedcatfunc: PropTypes.func,
  updatedselectedproducts: PropTypes.func,
  selectedProducts: PropTypes.array,
  setselectedProducts: PropTypes.func,
  handleupdatecat: PropTypes.func,
  data: PropTypes.array,
  setselectedcate: PropTypes.string,
  originaldata: PropTypes.array,
  updatedata: PropTypes.func,
  updateprodact: PropTypes.func,
  selectedcate: PropTypes.func,
  setdata: PropTypes.func,
  client_id: PropTypes.string,
};
