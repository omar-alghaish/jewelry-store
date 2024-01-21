/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { addClient } from "../../stroe/reducers/clientReducer";

const options = [
  { id: 1, text: "India", text: "India" },
  { id: 2, text: "Australia", text: "Australia" }
];
const options1 = [
  { id: 1, text: "City1", text: "City1" },
  { id: 2, text: "City2", text: "City2" }
];

const AddCustomer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    description: '',
    avatar: ''
  });
  const [img, setimg] = useState(null);
  const [addloading, setaddloading] = useState(false);
  const [imgloading, setimgloading] = useState(false);
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
          setCustomerData({ ...customerData, avatar: res.data });
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
  const handleadd = () => {
    if (
      customerData.customer_name == "" ||
      // customerData.email == "" ||
      customerData.phone == ""
      // customerData.country == "" ||
      // customerData.city == "" ||
      // customerData.address == "" ||
      // customerData.description == ""
    ) {
      toast.warn("أكمل باقى البيانات");
      return;
    }
    setaddloading(true);
    const data_send = {
      ...customerData
    };
    dispatch(
      addClient({
        name: customerData?.customer_name,
        phone: customerData?.phone
      })
    );
    history.push("/dream-pos/people/customerlist-people");
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == 'success') {
          toast.success(res.data.message);
          history.push("/dream-pos/people/customerlist-people");
        } else if (res.data.status == 'error') {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setaddloading(false);
      });
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إدارة العملاء</h4>
              <h6>أضف عميل</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <input
                      onChange={(e) => {
                        setCustomerData({
                          ...customerData,
                          customer_name: e.target.value
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
                          phone: e.target.value
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <button
                    disabled={addloading}
                    style={{ cursor: addloading ? 'no-drop' : 'pointer' }}
                    onClick={() => {
                      handleadd();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {addloading ? <Loader /> : "تحديث"}
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

export default AddCustomer;

