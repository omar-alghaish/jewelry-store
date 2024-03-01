/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import lodash from 'lodash/lodash';
// import { Categories } from "../../assets/data/Categories";
// import PosData from "../../assets/data/PosData";
import './pos.css';
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
  client_id
}) => {
  const Categories = localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
      ? JSON.parse(localStorage.getItem("categories"))
      : []
    : [];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const [selcatname, setselcatname] = useState("");
  const [searchtxt, setSearchTxt] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
    setselcatname(Categories[0].cat);
    setselectedcate(Categories[0]?.cat_name);
  }, []);

  useEffect(() => {
    setselectedProducts(originaldata?.filter((item) => item.active));
  }, [filteredData, originaldata]);
  useEffect(() => {
    setFilteredData([...originaldata]);
  }, [originaldata]);

  const updateActiveData = (item) => {
    setFilteredData(
      originaldata?.map((product) => {
        if (product?.id == item?.id) {
          if (product.active) {
            product.active = false;
          } else {
            product.active = true;
          }
        }
        return product;
      })
    );
  };

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
          {Categories?.map((item, index) => {
            return (
              <li
                onClick={() => {
                  setselectedcate(item?.cat_name);
                }}
                key={index}
                id={item.cat}
                className={"item"}
              >
                <div className="product-details ">
                  <img
                    style={{
                      height: '60px',
                      width: '70px',
                      borderRadius: '4px',
                      margin: 'auto'
                    }}
                    src={item.img}
                    alt="img"
                  />
                  <h6>{item.cat_name}</h6>
                </div>
              </li>
            );
          })}
        </OwlCarousel>
      </ul>
      {/* <div className="search_div">
        <input
          placeholder="إبحث هنا..."
          type="text"
          value={searchtxt}
          onChange={(e) => {
            searchType(e.target.value);
          }}
        />
      </div> */}
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
                  dispatch(addToCart(data));
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
                    <h6>الكميه: {item.quant}</h6>
                    <div className="check-product active">
                      <i className="fa fa-check" />
                    </div>
                  </div>
                  <div className="productsetcontent">
                    <h5>{item.category}</h5>
                    <h4>{item.name}</h4>
                    <h6>{item.price} ريال</h6>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ width: '100%', height: '500px', textAlign: 'center' }}>
            <img
              style={{ width: '100%', maxHeight: '100%' }}
              src={require("../../assets/img/nodata.jpg")}
              alt=""
            />
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
  client_id: PropTypes.string
};
