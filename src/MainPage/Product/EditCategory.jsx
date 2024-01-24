/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from "react";
import { Macbook, Upload } from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import leveljs from 'level-js';
import { toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";
const levelup = require('levelup');
const options1 = [
  { id: 1, text: "Computers", text: "Computers" },
  { id: 2, text: "Mac", text: "Mac" },
];
const options2 = [
  { id: 1, text: "None", text: "None" },
  { id: 2, text: "Option1", text: "Option1" },
];
const options4 = [
  { id: 1, text: "Piece", text: "Piece" },
  { id: 2, text: "Kg", text: "Kg" },
];
const options5 = [
  { id: 1, text: "Choose Tax", text: "Choose Tax" },
  { id: 2, text: "2%", text: "2%" },
];
const options6 = [
  { id: 1, text: "Percentage", text: "Percentage" },
  { id: 2, text: "10%", text: "10%" },
  { id: 2, text: "20%", text: "20%" },
];
const options7 = [
  { id: 1, text: "Active", text: "Active" },
  { id: 2, text: "Open", text: "Open" },
];

const EditProduct = () => {
  const db = levelup(leveljs("./db"));

  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const productdata = location?.productdata;
  const [caliber_name, setCaliberName] = useState(null);
  console.log(productdata);
  const [img, setimg] = useState(null);
  const [imgloading, setimgloading] = useState(false);
  const [calibers, setCalibers] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [product, setproduct] = useState({});
  const [products, setProducts] = useState([]);
  const handleChangeValues = (name, val) => {
    console.log(products);
    let allProducts = [...products];
  };
  useEffect(() => {
    setproduct(productdata);
  }, []);
  useEffect(() => {
    // 1) Create our store    d
    const db = levelup(leveljs('./db'));
    db.get(
      'categories',

      function (err, value) {
        setCategories(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  useEffect(() => {
    // 1) Create our store    d
    db.get(
      "categories",

      function (err, value) {
        setCategories(value ? JSON.parse(value) : []);
      }
    );
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
      console.log(value);
    });
  }, []);
  useEffect(() => {
    db.get("products", function (err, value) {
      setProducts(value ? JSON.parse(value) : []);
    });
  }, []);
  const handleChange = () => {
    let AllProducts = [...products];
    let EditedProducts = AllProducts.filter((item) => item.id !== product.id);
    EditedProducts.push(product);
    db.put("products", JSON.stringify(EditedProducts));
    toast.success("تمت التعديل بنجاح");
    history.push("productlist-product");
  };
  useEffect(() => {
    if (caliber_name) {
      setproduct({
        ...product,
        caliber_name: caliber_name,
      });
    }
  }, [caliber_name]);
  if (!productdata) {
    history.goBack();
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>تعديل المنتج</h4>
              <h6>قم بتحديث منتجك</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <input
                      onChange={(e) => {
                        setproduct({
                          ...product,
                          product_name: e.target.value,
                        });
                        // handleChangeValues('product_name',e.target.value);
                      }}
                      value={product?.product_name}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الوزن</label>
                    <input
                      onChange={(e) => {
                        setproduct({ ...product, weight: e.target.value });
                        // handleChangeValues('weight',e.target.value);
                      }}
                      value={product?.weight}
                      type="text"
                    />
                  </div>
                </div>
                {/* <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الفئه</label>
                    <Select2
                      onChange={(e)=>{
                        console.log(e.target.value)
                        setproduct({...product,category:e.target.value})
                        let category_val=Categories.filter(item=>item.id=e.target.value);
                        console.log(Categories)
                        console.log(category_val)
                        handleChangeValues('category',e.target.value);
                      }} value={product.category}
                      className="select"
                      data={Categories.map((item,index)=>{
                        return { id: item.id, text: item.category_name, text: item.category_name }
                      })}
                      options={Categories.map((item,index)=>{
                        return { id: item.id, text: item.category_name, text: item.category_name }
                      })}
                    />

                  </div>
                </div> */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الفئه</label>
                    <select
                      onChange={(e) => {
                        console.log(e.target.value);
                        // handleChangeValues('category',e.target.value);
                        setproduct({ ...product, category: e.target.value });
                      }}
                      value={product?.category}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                      name=""
                      id=""
                    >
                      <option key={"00"} value={""}>
                        {"حدد تصنيف"}
                      </option>

                      {Categories?.map((item, index) => {
                        return (
                          <option key={index} value={item.category_name}>
                            {item?.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>العيار</label>
                    <select
                      onChange={(e) => {
                        let calibersdata = [...calibers];
                        let selectedCalibers = calibersdata.filter(
                          (item) => item.caliber_name == e.target.value
                        );
                        setproduct({
                          ...product,
                          caliber: selectedCalibers[0].price,
                        });
                        setCaliberName(selectedCalibers[0]?.caliber_name);
                        // handleChangeValues('caliber',selectedCalibers[0].price)
                      }}
                      value={product.caliber_name}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                      name=""
                      id=""
                    >
                      <option key={"00"} value={""}>
                        {"حدد عيار"}
                      </option>
                      {console.log(calibers)}
                      {calibers?.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.caliber_name}
                            onClick={() =>
                              setproduct({
                                ...product,
                                caliber: item.caliber_name,
                              })
                            }
                          >
                            {item.caliber_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الكميه</label>
                    <input
                      onChange={(e) => {
                        setproduct({ ...product, quantity: e.target.value });
                      }}
                      value={product.quantity}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>السعر</label>
                    <input
                      onChange={(e) => {
                        setproduct({ ...product, price: e.target.value });
                      }}
                      value={product.price}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea
                      onChange={(e) => {
                        setproduct({ ...product, description: e.target.value });
                      }}
                      value={product.description}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label> صورةالمنتج</label>
                    <div className="image-upload">
                      <input
                        onChange={(e) => {
                          var reader = new FileReader();
                          reader.onloadend = function () {
                            if (reader.readyState === FileReader.DONE) {
                              const base64Image = reader.result;
                              setimg(base64Image);

                              setproduct({ ...product, image: base64Image });
                            }
                          };
                          reader.onerror = function (error) {
                            console.log('Error reading file:', error);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        type="file"
                      />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>قم بسحب وإسقاط الملف للتحميل</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {/* <button
                        disabled={imgloading}
                        onClick={() => {
                          handleuploadimg();
                        }}
                        style={{
                          cursor: imgloading ? "no-drop" : "pointer",
                          width: "200px",
                          padding: "10px",
                          borderRadius: "10px",
                          border: "none",
                          backgroundColor: "#ffc107",
                          color: "white",
                        }}
                      >
                        {imgloading ? <Loader /> : "رفع الصوره"}
                      </button> */}
                    </div>
                  </div>
                </div>
                {img ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "250px" }} />
                    <button
                      disabled={imgloading}
                      onClick={() => {
                        setimg(false);
                      }}
                      style={{
                        cursor: imgloading ? 'no-drop' : 'pointer',
                        width: '200px',
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#ffc107',
                        color: 'white',
                      }}
                    >
                      {imgloading ? <Loader /> : 'حذف الصوره'}
                    </button>
                  </div>
                ) : null}
                <div className="col-12">
                  <div className="product-list">
                    <ul className="row">
                      <li>
                        <div className="productviews">
                          <div className="productviewsimg">
                            <img
                              style={{ width: '100px', height: '100px' }}
                              src={product.image}
                              alt="img"
                            />
                          </div>
                          <div className="productviewscontent">
                            <div className="productviewsname">
                              <h2>{product.product_name}</h2>
                              {/* <h3>581kb</h3> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={() => {
                      // handleChangeValues();
                      handleChange();
                    }}
                    className="btn btn-submit me-2"
                  >
                    تحديث
                  </button>
                  <Link
                    onClick={() => history.goBack()}
                    className="btn btn-cancel"
                  >
                    إلغاء
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
