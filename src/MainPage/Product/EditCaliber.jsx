/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Macbook, Product, Upload } from "../../EntryFile/imagePath";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";
import leveljs from "level-js";
import { useSelector } from "react-redux";
const levelup = require("levelup");

const EditCaliber = () => {
  const db = levelup(leveljs("./db"));
  const { editItem } = useSelector((state) => state.editItem);
  const history = useHistory();
  const [img, setimg] = useState(null);
  const location = useLocation();
  const [imgloading, setimgloading] = useState(false);
  const [category, setcategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [caliberda, setcaliberda] = useState(editItem);
  const [ProductsData, setProductsData] = useState([]);
  const caliberData = location?.state?.caliberData || {};
  const [AllCalibers, setAllCalibers] = useState([]);
  console.log(caliberData);
  const [Calibers, setCalibers] = useState([]);
  if (caliberData == null || caliberData == undefined) {
    history.goBack();
  }
  console.log(Calibers)
  useEffect(() => {
    db.get("products", function (err, value) {
      setProductsData(value ? JSON.parse(value) : []);
    });

    setcaliberda(editItem);
  }, []);

  const handleedit = () => {
    // setcaliberda(editItem)
    const updatedCalibers = AllCalibers.map((item) =>
    
      item?.id === editItem?.id ? {...item, ...caliberda } : item
    );

    setAllCalibers(updatedCalibers);
    db.put("calibers", JSON.stringify(updatedCalibers));

    // Apply changes to the products
    const updatedProducts = ProductsData.map((obj) =>
      obj.caliber_name === caliberda.caliber_name && obj.autoCalc && obj.autoCalc === true
        ? {
            ...obj,
            price: obj.weight * caliberda.price,
            caliber: caliberda.price,
          }
        : obj
    );

    db.put("products", JSON.stringify(updatedProducts));
    
    toast.success("تم التعديل بنجاح");
  };

  useEffect(() => {
    // 1) Create our store    d
    const db = levelup(leveljs("./db"));
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
      setAllCalibers(JSON.parse(value));
    });
  }, []);
  useEffect(() => {
    setcaliberda(caliberData);
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>تحديث فئة المنتج</h4>
              <h6>تحديث</h6>
              {console.log(ProductsData)}
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم العيار</label>
                    <input
                      type="text"
                      value={caliberda.caliber_name}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>سعر العيار</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setcaliberda({...caliberda,caliber_name: editItem.caliber_name , price: e.target.value });
                      }}
                      value={caliberda.price}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={() => {
                      handleedit();
                    }}
                    className="btn btn-submit me-2"
                  >
                    تحديث
                  </button>
                  <button
                    onClick={() => {
                      history.push("/dream-pos/product/caliber");
                    }}
                    className="btn btn-cancel"
                  >
                    إلغاء
                  </button>
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

export default EditCaliber;
