/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
// import { span } from "react-router-dom";
import { Upload } from "../../EntryFile/imagePath";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "feather-icons-react/build/IconComponents";
import axios from "axios";

const EditStore = () => {
  const location=useLocation();
  const history=useHistory();
  const {store}=location.state;
  console.log(store)
  const [img,setimg]=useState(null)
  const [editLoading,setEditLoading]=useState(false)
  const [imgloading,setimgloading]=useState(false)
  const [storeData,setStoreData]=useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const deleteImage =()=>{
    $(document).on("click",".hideset",function () {
		$(this).parent().parent().parent().hide();
	});
  }
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
          setbrand({...brand,img:res.data});
          // seticon(res.data);
          // setadddata({ ...adddata, image: res.data });
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
  const handleEdit=()=>{
    setEditLoading(true)
    const data_send={...storeData}
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if (res.data.status=='error'){
        toast.error(res.data.message);
      }
      else{
        toast.error("حدث خطأ ما")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
      setupdateloaidng(false)
    })
  }
  useEffect(()=>{
    if(location.state==null){
      history.push("/dream-pos/people/storelist-people")
    }
    setStoreData(store);
  },[])
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>أدر المتجر</h4>
              <h6>تحرير/تحديث المتجر</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المتجر</label>
                    <input
                      type="text"
                      value={storeData.storeName}
                      onChange={(e)=>{
                        setStoreData({...storeData,storeName:e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المدير</label>
                    <input
                      type="text"
                      value={storeData.userName}
                      onChange={(e)=>{
                        setStoreData({...storeData,userName:e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>كلمة المرور</label>
                    <div className="pass-group">
                      <input
                        value={storeData.password}
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
                      value={storeData.phone}
                      onChange={(e)=>{
                        setStoreData({...storeData,phone:e.target.value})
                      }}
                      type="text"
                      defaultValue={123456879}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>البريد الإلكترنى</label>
                    <input
                      type="text"
                      defaultValue="abc@gmail.com"
                      value={storeData.email}
                      onChange={(e)=>{
                        setStoreData({...storeData,email:e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> صورة المتجر</label>
                    <div className="image-upload">
                      <input onChange={(e)=>{
                        setimg(e.target.files[0])
                      }} type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>قم بسحب وإسقاط الملف للتحميل</h4>
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
                </div>
                <div className="col-12">
                  <div className="product-list">
                    <ul className="row">
                      <li className="ps-0">
                        <div className="productviews">
                          <div className="productviewsimg">
                            <img style={{ width:'30px' }} src={storeData.avatar} alt="img" />
                          </div>
                          <div className="productviewscontent">
                            <div className="productviewsname">
                              <h2>{storeData.storeName}</h2>
                              {/* <h3>581kb</h3> */}
                            </div>
                            <span  className="hideset" onClick={deleteImage}>x</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={()=>{
                      handleEdit()
                    }}
                    className="btn btn-submit me-2">
                    {
                      editLoading?<Loader/>:'تعديل'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/people/storelist-people");
                  }} className="btn btn-cancel">
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

export default EditStore;
