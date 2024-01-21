/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./addKart.css"
import { Loader } from "feather-icons-react/build/IconComponents";
// import { Categories } from '../../assets/data/Categories';
import leveljs from "level-js";
const levelup = require("levelup");
import { useHistory } from "react-router-dom";
import { Switch } from "antd";

const AddProduct = () => {
  const [Categories, setCategories] = useState([]);

  const db = levelup(leveljs("./db"));

  const history = useHistory();
  const [prodloading, setprodloading] = useState(false);
  const [img, setimg] = useState(null);
  const [caliber_name, setCaliberName] = useState(0);
  const [imgloading, setimgloading] = useState(false);
  const [addloading, setaddloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [calibers, setCalibers] = useState([]);
  // setCalibers
  const [proddata, setproddata] = useState({
    product_name: "",
    category: "",
    sub_category: "",
    brand: "",
    weight: "",
    unit: "",
    sku: "",
    min_quantity: "",
    quantity: "",
    description: "",
    tax: "",
    tax_type: "",
    price: "",
    status: "",
    product_image: "",
  });

  useEffect(() => {
    db.get("products", function (err, value) {
      setProducts(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(() => {
    db.get("categories", function (err, value) {
      setCategories(value ? JSON.parse(value) : []);
    });
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
    });
  }, []);
  const handleuploadimg = () => {
    if (img == null) {
      toast.warn("إختر صوره أولا");
      return;
    }
    setimgloading(true);
    const formdata = new FormData();
    formdata.append("image", img);
    axios
      .post("https://camp-coding.tech/agancy/image_uplouder.php", formdata)
      .then((res) => {
        if (res.data !== "") {
          setproddata({ ...proddata, image: res.data });
          toast.success("تم الرفع بنجاح");
        } else {
          toast.error("لم يتم الرفع");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setimgloading(false);
      });
  };

  const handleaddproduct = () => {
    if (
      proddata.product_name == "" ||
      proddata.category == "" ||
      proddata.quantity == "" ||
      proddata.description == "" ||
      proddata.weight == "" ||
      proddata.price == ""
    ) {
      toast.warn("أكمل باقى البيانات");
      return;
    }

    const data_send = {
      ...proddata,
      caliber_name: caliber_name,
      id: products?.length + 1,
    };
    console.log(products);
    products.push(data_send);
    db.put("products", JSON.stringify(products));
    toast.success("تمت الإضافة بنجاح");
    history.push("productlist-product");
  };
  useEffect(() => {
    const caliber_price = calibers.filter(
      (item) => parseInt(item?.caliber_name) == parseInt(caliber_name)
    )[0]?.price;
    setproddata({
      ...proddata,
      caliber: caliber_price,
    });
  }, [caliber_name]);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>أضف منتج</h4>
              <h6>إنشاء منتج جديد</h6>
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
                        setproddata({
                          ...proddata,
                          product_name: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الوزن</label>
                    <input
                      onChange={(e) => {
                        setproddata({
                          ...proddata,
                          weight: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الفئه</label>
                    <select
                      onChange={(e) => {
                        console.log(e.target.value);
                        setproddata({ ...proddata, category: e.target.value });
                      }}
                      value={proddata.category}
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
                      ;
                      {Categories?.map((item, index) => {
                        return (
                          <option key={index} value={item.category_name}>
                            {item.category_name}
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
                        setCaliberName(e.target.value);

                        console.log(e);
                      }}
                      value={caliber_name}
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
                      ;
                      {calibers?.map((item, index) => {
                        return (
                          <option key={index} value={item.caliber_name}>
                            <button
                              style={{
                                width: "100%",
                                display: "block",
                                height: "100%",
                              }}
                            >
                              {item.caliber_name}
                            </button>
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
                        setproddata({
                          ...proddata,
                          quantity: e.target.value,
                          stock: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea
                      onChange={(e) => {
                        setproddata({
                          ...proddata,
                          description: e.target.value,
                        });
                      }}
                      className="form-control"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="changePrice">
                    {" "}
                    <span> تحديد سعر</span>
                    <Switch
                      onChange={(e) => {
                        console.log(e);

                        if (e) {
                          setproddata({
                            ...proddata,
                            price:
                              parseInt(proddata.weight) *
                              parseInt(proddata.caliber),
                            autoCalc: true,
                          });
                        } else {
                          setproddata({
                            ...proddata,
                            price: 0,
                            autoCalc: false,
                          });
                        }
                      }}
                    />
                    <span> السعر بالجرام</span>
                  </div>
                  <div className="form-group">
                    <label>السعر</label>
                    <input
                      onChange={(e) => {
                        setproddata({ ...proddata, price: e.target.value });
                      }}
                      value={proddata.price}
                      type="text"
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

                              setproddata({ ...proddata, image: base64Image });
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
                <div className="col-lg-12">
                  <button
                    disabled={prodloading}
                    style={{ cursor: prodloading ? "no-drop" : "pointer" }}
                    onClick={() => {
                      handleaddproduct();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {prodloading ? <Loader /> : "إنشاء"}
                  </button>
                  <button className="btn btn-cancel">إلغاء</button>
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
export default AddProduct;
