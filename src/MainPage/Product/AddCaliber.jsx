/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "feather-icons-react/build/IconComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addData } from "./addData";
import leveljs from "level-js";
const levelup = require("levelup");

const AddCaliber = () => {
  const [imgloading, setimgloading] = useState(false);
  const [calibers, setCalibers] = useState([]);
  const [caliberData, setcaliberData] = useState({
    caliber_name: "",
    caliber_code: "",
    description: "",
    catimg: "",
    hidden:false
  });
  const history = useHistory();
  const [img, setimg] = useState(null);
  const [catloading, setcatloading] = useState(false);

  useEffect(() => {
    // 1) Create our store
    const db = levelup(leveljs("./db"));
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
    });
  }, []);
  const handleAddCaliber = () => {
    if (caliberData.caliber_name == "" || caliberData.price == "") {
      toast.warn("أكمل باقى البيانات");
      return;
    }

    const data_send = {
      ...caliberData,
      id: calibers?.length + 1,
    };
    calibers.push(data_send);
    const db = levelup(leveljs("./db"));
    db.put("calibers", JSON.stringify(calibers));
    setcatloading(true);
    // history.push("caliberlist-product");
    toast.success("تمت الإضافة بنجاح");
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
        } else if (res.data.status == "error") {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setcatloading(false);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إضافه عيار ذهب</h4>
              <h6>إضافة عيار جديد</h6>
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
                      onChange={(e) => {
                        setcaliberData({
                          ...caliberData,
                          caliber_name: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>سعر العيار</label>
                    <input
                      onChange={(e) => {
                        setcaliberData({
                          ...caliberData,
                          price: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <button
                    disabled={catloading}
                    style={{ cursor: catloading ? "no-drop" : "pointer" }}
                    onClick={() => {
                      handleAddCaliber();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {catloading ? <Loader /> : "إنشاء"}
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

export default AddCaliber;
