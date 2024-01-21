/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
// import ProductsData from "../../assets/data/ProductsData";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import leveljs from 'level-js';
const levelup = require('levelup');
const db = levelup(leveljs('./db'));
const ProductList = () => {
  // const ProductsData = localStorage.getItem("products")
  // ? JSON.parse(localStorage.getItem("products"))
  //   ? JSON.parse(localStorage.getItem("products"))
  //   : []
  // : [];
  const [ProductsData, setProductsData] = useState([]);
  useEffect(() => {
    db.get(
      'products',

      function (err, value) {
        setProductsData(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  console.log(ProductList);
  const [inputfilter, setInputfilter] = useState(false);
  let history = useHistory();
  //select2
  const options = [
    { id: 1, text: "Choose Product", text: "Choose Product" },
    { id: 2, text: "Macbook pro", text: "Macbook pro" },
    { id: 3, text: "Orange", text: "Orange" },
  ];
  const options2 = [
    { id: 1, text: "Choose Category", text: "Choose Category" },
    { id: 2, text: "Computers", text: "Computers" },
    { id: 3, text: "Fruits", text: "Fruits" },
  ];
  const options3 = [
    { id: 1, text: "Choose Sub Category", text: "Choose Sub Category" },
    { id: 2, text: "Computers", text: "Computers" },
  ];
  const options4 = [
    { id: 1, text: "Brand", text: "Brand" },
    { id: 2, text: "N/D", text: "N/D" },
  ];
  const options5 = [
    { id: 1, text: "Price", text: "Price" },
    { id: 2, text: "150.00", text: "150.00" },
  ];
console.log(ProductsData)
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmText = (record) => {
    Swal.fire({
      title: "هل أنت متأكد?",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      cancelButtonText: 'لا',
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      let AllProducts = [...ProductsData];
      let PushedProducts = AllProducts.filter((item) => item.id !== record?.id);
      console.log(PushedProducts);
      setProductsData(PushedProducts);
      db.put("products", JSON.stringify(PushedProducts));
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };

  const columns = [
    {
      title: "إسم لمنتج",
      dataIndex: "product_name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record?.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.product_name}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.product_name.length - b.product_name.length,
    },
    // {
    //   title: "رمز التخزين التعريفي",
    //   dataIndex: "sku",
    //   sorter: (a, b) => a.sku.length - b.sku.length,
    // },
    {
      title: "الفئه",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    // {
    //   title: "العلامة التجاريه",
    //   dataIndex: "brand",
    //   sorter: (a, b) => a.brand.length - b.brand.length,
    // },
    {
      title: "السعر",
      dataIndex: "price",
      render: (_, record) => {
        console.log(record);
        return (
          <b>
            {new Intl.NumberFormat('ar-EG', {
              style: 'currency',
              currency: 'SAR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(record?.price)}
          </b>
        );
      },
    },
    // {
    //   title: "الوحده",
    //   dataIndex: "unit",
    //   sorter: (a, b) => a.unit.length - b.unit.length,
    // },
    {
      title: "الوزن",
      dataIndex: "weight",
      sorter: (a, b) => a.qty.length - b.qty.length,
    },
    {
      title: "العيار",
      dataIndex: "caliber_name",
    },
    {
      title: "سعر العيار بالجرام",
      dataIndex: "caliber",
      render: (_, record) => {
        return (
          <b>
            {new Intl.NumberFormat('ar-EG', {
              style: 'currency',
              currency: 'SAR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(record?.caliber)}
          </b>
        );
      },
    },
    {
      title: "المخزون",
      dataIndex: "stock",
      sorter: (a, b) => a.stock.length - b.stock.length,
    },
    {
      title: "الكمية المتبقية",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.length - b.quantity.length,
    },
    {
      title: "الأوامر",
      render: (_, record) => (
        <>
          <>
            {/* <Link className="me-3" to="/dream-pos/product/product-details">
              <img src={EyeIcon} alt="img" />
            </Link> */}
            <span
              onClick={() => {
                handlenavigate(record);
              }}
              style={{ cursor: 'pointer' }}
              className="me-3"
              to=""
            >
              <img src={EditIcon} alt="img" />
            </span>
            <Link
              className="confirm-text"
              to="#"
              onClick={() => {
                confirmText(record);
              }}
            >
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
        </>
      ),
    },
  ];

  const handlenavigate = (record) => {
    console.log(record);
    history.push({
      pathname: "/dream-pos/product/editproduct-product",
      productdata: record,
    });
  };


  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>قائمة المنتجات</h4>
              <h6>أدر منتجاتك</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/product/addproduct-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف منتج جديد
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} data={ProductsData} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "إختر منتج",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "إختر فئه",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options3}
                              options={{
                                placeholder: "إختر فئه فرعيه",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "العلامة التجاريه",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12 ">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "السعر",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1 col-sm-6 col-12">
                          <div className="form-group">
                            <a className="btn btn-filters ms-auto">
                              <img src={search_whites} alt="img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table isPaginatoin={true} columns={columns} dataSource={ProductsData} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default ProductList;
