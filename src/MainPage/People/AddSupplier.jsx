/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";

const options = [
  { id: 1, text: "India", text: "India" },
  { id: 2, text: "Australia", text: "Australia" },
];
const options1 = [
  { id: 1, text: "City1", text: "City1" },
  { id: 2, text: "City2", text: "City2" },
];

const AddSupplier = () => {

  const [supplier,setSupplier]=useState({
    supplier_name:'',
    email:'',
    phone:'',
    country:'',
    city:'',
    address:'',
    description:'',
    avatar:'',
  });
  const [img,setimg]=useState(null)
  const [addloading,setaddloading]=useState(false)
  const [imgloading,setimgloading]=useState(false)
  const handleadd=()=>{
    if(supplier.customer_name==""||supplier.email==""||supplier.phone==""||supplier.country==""||supplier.city==""||supplier.address==""||supplier.description==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    setaddloading(true)
    const data_send={
      ...supplier
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if (res.data.status=='error'){
        toast.error("حدث خطأ ما")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
      setaddloading(false)
    })
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
          setSupplier({...supplier,avatar:res.data})
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إدارة الموردين</h4>
              <h6>إضافة/تحديث المورد</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <input onChange={(e)=>{
                      setSupplier({...supplier,customer_name:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>البريد الإلكترونى</label>
                    <input onChange={(e)=>{
                      setSupplier({...supplier,email:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input onChange={(e)=>{
                      setSupplier({...supplier,phone:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إختر البلد</label>
                    {/* <Select2
                      className="select"
                      data={options}
                      options={{
                        placeholder: "Choose Country",
                      }}
                    /> */}
                    <select
                      value={supplier.country} onChange={(e)=>{
                        setSupplier({...supplier,country:e.target.value})
                      }}
                      style={{
                        width:'100%',
                        padding:'10px',
                        backgroundColor:'transparent',
                        border:'1px solid #ccc',
                        borderRadius:'4px'
                      }}
                    >
                      {
                        options.map((item,index)=>{
                          return(
                            <option key={index} value={item.id}>{item.text}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>المدينه</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose City",
                      }}
                    /> */}
                    <select
                      value={supplier.city} onChange={(e)=>{
                        setSupplier({...supplier,city:e.target.value})
                      }}
                      style={{
                        width:'100%',
                        padding:'10px',
                        backgroundColor:'transparent',
                        border:'1px solid #ccc',
                        borderRadius:'4px'
                      }}
                    >
                      {
                        options1.map((item,index)=>{
                          return(
                            <option key={index} value={item.id}>{item.text}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-9 col-12">
                  <div className="form-group">
                    <label>العنوان</label>
                    <input onChange={(e)=>{
                      setSupplier({...supplier,address:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea onChange={(e)=>{
                      setSupplier({...supplier,description:e.target.value})
                    }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>صوره رمزيه</label>
                    <div className="image-upload">
                      <input onChange={(e)=>{
                        setimg(e.target.files[0])
                      }} type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>قم بسحب وإسقاط الملف للتحميل</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign:'center',
                      }}
                    >
                      <button
                        disabled={imgloading}
                        onClick={()=>{
                          handleuploadimg()
                        }}
                        style={{cursor:imgloading?'no-drop':'pointer', width:'200px',padding:'10px',borderRadius:'10px',border:'none',backgroundColor:'#ffc107',color:'white' }}
                      >
                        {imgloading?<Loader/>:'رفع الصوره'}
                      </button>
                  </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button disabled={addloading} style={{ cursor:addloading?'no-drop':'pointer' }} onClick={()=>{
                    handleadd()
                  }} className="btn btn-submit me-2">
                    {
                      addloading?<Loader/>:"تحديث"
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/people/customerlist-people")
                  }} className="btn btn-cancel">إلغاء</button>
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

export default AddSupplier;
