/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Upload } from '../../EntryFile/imagePath';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader } from 'feather-icons-react/build/IconComponents';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addData } from './addData';
import leveljs from 'level-js';
const levelup = require('levelup');

const AddCategory = () => {
  const [imgloading, setimgloading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catdata, setcatdata] = useState({
    category_name: '',
    category_code: '',
    description: '',
    catimg: '',
  });
  const history = useHistory();
  const [img, setimg] = useState(null);
  const [catloading, setcatloading] = useState(false);

  useEffect(() => {
    // 1) Create our store
    const db = levelup(leveljs('./db'));
    db.get(
      'categories',

      function (err, value) {
        setCategories(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  const handleaddcat = () => {
    if (catdata.category_name == "" || catdata.description == "") {
      toast.warn("أكمل باقى البيانات");
      return;
    }

    const data_send = {
      ...catdata,
      id: categories?.length + 1,
    };
    categories.push(data_send);
    const db = levelup(leveljs('./db'));
    db.put("categories", JSON.stringify(categories));
    setcatloading(true);
    history.push("categorylist-product");
    toast.success("تمت الإضافة بنجاح");
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == 'success') {
          toast.success(res.data.message);
        } else if (res.data.status == 'error') {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setcatloading(false);
      });
  };

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
          // seticon(res.data);
          setcatdata({ ...catdata, catimg: res?.data });
          toast.success("تم الرفع بنجاح");
          // social_accounts[i]["icon"] = res.data;
        } else {
          toast.error("لم يتم الرفع");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setimgloading(false);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إضافه فئه منتج</h4>
              <h6>إضافة فئه جديده</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم الفئه</label>
                    <input
                      onChange={(e) => {
                        setcatdata({
                          ...catdata,
                          category_name: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>كود الفئه</label>
                    <input
                      onChange={(e) => {
                        setcatdata({
                          ...catdata,
                          category_code: e.target.value
                        });
                      }}
                      type="text"
                    />
                  </div>
                </div> */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea
                      onChange={(e) => {
                        setcatdata({ ...catdata, description: e.target.value });
                      }}
                      className="form-control"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> صورة الفئة</label>
                    <div className="image-upload">
                      <input
                        onChange={(e) => {
                          var reader = new FileReader();
                          reader.onloadend = function () {
                            if (reader.readyState === FileReader.DONE) {
                              const base64Image = reader.result;
                              setimg(base64Image);
                              console.log(base64Image);
                              setcatdata({ ...catdata, catimg: base64Image });
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
                        <h4>إسحب الصوره هنا</h4>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {/* <button
                      disabled={imgloading}
                      onClick={() => {
                        handleuploadimg();
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
                      {imgloading ? <Loader /> : 'رفع الصوره'}
                    </button> */}
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
                    disabled={catloading}
                    style={{ cursor: catloading ? 'no-drop' : 'pointer' }}
                    onClick={() => {
                      handleaddcat();
                    }}
                    className="btn btn-submit me-2"
                  >
                    {catloading ? <Loader /> : 'إنشاء'}
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

export default AddCategory;
