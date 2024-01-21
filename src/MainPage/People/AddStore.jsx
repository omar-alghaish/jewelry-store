import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "feather-icons-react/build/IconComponents";

const AddStore = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [storeData,setStoreData]=useState({
    store_name:'',
    user_name:'',
    password:'',
    phone:'',
    email:'',
    store_img:'',
  })
  const [img,setimg]=useState(null)
  const [addLoading,setaddLoading]=useState(false)
  const [imgloading,setimgloading]=useState(false)
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
          setStoreData({...storeData,store_img:res.data});
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
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleEditBrand=()=>{
    if(storeData.store_name==""||storeData.user_name==""||storeData.password==""||storeData.phone==""||storeData.email==""||storeData.email==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    setaddLoading(true)
    const data_send={...storeData}
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error("حدث خطأ ما")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
      setaddLoading(false)
    })
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>أدر متجرك</h4>
              <h6>إضافة/تحديث المتجر</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المتجر</label>
                    <input onChange={(e)=>{
                      setStoreData({...storeData,store_name:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المدير</label>
                    <input onChange={(e)=>{
                      setStoreData({...storeData,user_name:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>كلمة المرور</label>
                    <div className="pass-group">
                      <input
                        onChange={(e)=>{
                          setStoreData({...storeData,password:e.target.value})
                        }}
                        type={passwordShown ? "text" : "password"}
                        className=" pass-input"
                      />
                      <span
                        className={`fas toggle-password ${
                          passwordShown ? "fa-eye" : "fa-eye-slash"
                        }`}
                        onClick={togglePassword}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      onChange={(e)=>{
                        setStoreData({...storeData,phone:e.target.value})
                      }}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>البريد الإلكترنى</label>
                    <input
                      onChange={(e)=>{
                        setStoreData({...storeData,email:e.target.value})
                      }} type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> صوره المتجر</label>
                    <div className="image-upload">
                      <input onChange={(e)=>{
                        setimg(e.target.files[0])
                      }} type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>قم بسحب وإسقاط الملف للتحميل</h4>
                      </div>
                    </div>
                  </div>
                  <div style={{
                  textAlign:'center',
                }}>
                  <button
                    disabled={imgloading}
                    onClick={()=>{
                      handleuploadimg()
                    }}
                    style={{cursor:imgloading?'no-drop':'pointer', width:'200px',padding:'10px',borderRadius:'10px',border:'none',backgroundColor:'#ffc107',color:'white' }}
                  >{imgloading?<Loader/>:'رفع الصوره'}</button>
                </div>
                </div>
                <div className="col-lg-12">
                <div className="col-lg-12">
          <button
            onClick={()=>{
              handleEditBrand()
            }}
            disabled={addLoading}
            style={{ cursor:addLoading?'no-drop':'pointer' }}
            className="btn btn-submit me-2">
              {
                addLoading?<Loader/>:'تعديل'
              }
          </button>
            <span  className="btn btn-cancel">
              إلغاء
            </span>
          </div>
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

export default AddStore;
