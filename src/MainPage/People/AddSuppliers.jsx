/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { addClient } from "../../stroe/reducers/clientReducer";
import leveljs from "level-js";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const options = [
  { id: 1, text: "India", text: "India" },
  { id: 2, text: "Australia", text: "Australia" },
];
const options1 = [
  { id: 1, text: "City1", text: "City1" },
  { id: 2, text: "City2", text: "City2" },
];

const AddSuppliers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [customerData, setCustomerData] = useState({
    supplier_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    description: "",
    avatar: "",
  });
  const [img, setimg] = useState(null);
  const [addloading, setaddloading] = useState(false);
  const [imgloading, setimgloading] = useState(false);

  const handleadd = () => {
    if (customerData.supplier_name == "" || customerData.phone == "") {
      toast.warn("أكمل باقى البيانات");
      return;
    }
    setaddloading(true);

    const updatedData = [
      ...allSuppliers,
      { ...customerData, id: allSuppliers.length + 1 },
    ];
    db.put("suppliers", JSON.stringify(updatedData), function (err) {
      if (err) {
        console.error("Error saving to database", err);
        toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
      } else {
        toast.success("تمت الإضافة بنجاح");
      }
    });
    setaddloading(false);
    history.push("/dream-pos/people/supplierlist-people");
  };

  useEffect(() => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إدارة الموردين</h4>
              <h6>أضف مورد</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المورد</label>
                    <input
                      onChange={(e) => {
                        setCustomerData({
                          ...customerData,
                          supplier_name: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                {/* <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>البريد الإلكترونى</label>
                    <input
                      onChange={(e) => {
                        setCustomerData({
                          ...customerData,
                          email: e.target.value
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div> */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      onChange={(e) => {
                        setCustomerData({
                          ...customerData,
                          phone: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <button
                    disabled={addloading}
                    style={{ cursor: addloading ? "no-drop" : "pointer" }}
                    onClick={() => {
                      handleadd();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {addloading ? <Loader /> : "اضافه"}
                  </button>
                  <button
                    onClick={() => {
                      history.push("/dream-pos/people/customerlist-people");
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
      <ToastContainer />
    </>
  );
};

export default AddSuppliers;
