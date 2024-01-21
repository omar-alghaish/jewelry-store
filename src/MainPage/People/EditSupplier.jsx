/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import leveljs from "level-js";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));
import { Loader } from "feather-icons-react/build/IconComponents";
import { useSelector } from "react-redux";

const options = [
  { id: 1, text: "United States", text: "United States" },
  { id: 2, text: "India", text: "India" },
];
const options1 = [
  { id: 1, text: "City1", text: "City1" },
  { id: 2, text: "City2", text: "City2" },
];

const EditSupplier = () => {
  const history = useHistory();
  const location = useLocation();
  const { supplier } = location.state;
  const { editItem } = useSelector((state) => state.editItem);

  const [uodateLoading, setUpdateLoading] = useState(false);
  const [supplierData, setSupplierData] = useState(editItem);
  const [img, setimg] = useState(null);
  const [imgloading, setimgloading] = useState(false);
  const [allSuppliers, setAllSuppliers] = useState([]);

  console.log(editItem);

  console.log(supplierData);
  useEffect(() => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  }, []);

  const handleedit = () => {
    const updatedData = allSuppliers.map((sup) =>
      sup.id === supplierData.id ? supplierData : sup
    );
    db.put("suppliers", JSON.stringify(updatedData), function (err) {
      if (err) {
        console.error("Error saving to database", err);
        toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
      } else {
        toast.success("تم التعديل بنجاح");
        history.push("/dream-pos/people/supplierlist-people");
      }
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إدارة الموردين</h4>
              <h6>تعديل/تحديث العميل</h6>
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
                      value={supplierData?.supplier_name}
                      onChange={(e) => {
                        setSupplierData({
                          ...supplierData,
                          supplier_name: e.target.value,
                        });
                      }}
                      type="text"
                      defaultValue="Apex Computers"
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      value={supplierData?.phone}
                      onChange={(e) => {
                        setSupplierData({
                          ...supplierData,
                          phone: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <a
                    onClick={() => {
                      handleedit();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {uodateLoading ? <Loader /> : "تحديث"}
                  </a>
                  <a
                    onClick={() => {
                      history.push("/dream-pos/people/supplierlist-people");
                    }}
                    className="btn btn-cancel"
                  >
                    إلغاء
                  </a>
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

export default EditSupplier;
