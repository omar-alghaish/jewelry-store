/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "feather-icons-react/build/IconComponents";

const options1 = [
  { id: 1, text: "Store 1", text: "Store 1" },
  { id: 2, text: "Store 2", text: "Store 2" },
];

const status = [
  { value: "Completed", label: "Completed" },
  { value: "Inprogress", label: "Inprogress" },
];
const ImportTransfer = () => {
  const history=useHistory()
  const [select, setSelect] = useState(false);
  const [imgloading,setimgloading]=useState(false)
  // console.log(select, "select");
  const [transLoading,setTransLoading]=useState(false)
  const handleTrans=()=>{
    if(transData.from==""||transData.to==""||transData.status==""||transData.shipping==""||transData.description==""){
      toast.warn("أكمل البيانات")
      return
    }
    setTransLoading(true)
    const data_send={
      ...transData
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error("حدث خطأ ما")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
    setTransLoading(false)
    })
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "2.4rem",
      minHeight: "fit-content",
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: "2.4rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      marginBottom: "14px",
    }),
  };
  const [transData,setTransData]=useState({
    from:'',
    to:'',
    status:'',
    file:'',
    shipping:'',
    description:'',
  })
  const [img,setimg]=useState(null);
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
          setTransData({...transData,img:res.data});
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>نقل الاستيراد</h4>
              <h6>إضافة/تحديث النقل</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>من</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose",
                      }}
                    /> */}
                    <select onChange={(e)=>{
                      setTransData({...transData,from:e.target.value})
                    }} style={{
                      width:'100%',
                      padding:'10px',
                      borderRadius:'4px',
                      backgroundColor:'transparent',
                      border:'1px solid #ccc',
                    }} name="" id="">
                      {
                        options1.map((item,index)=>{
                          return (
                            <option key={index} value={item.id}>{item.text}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إلى</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose",
                      }}
                    /> */}
                      <select onChange={(e)=>{
                      setTransData({...transData,to:e.target.value})
                    }} style={{
                      width:'100%',
                      padding:'10px',
                      borderRadius:'4px',
                      backgroundColor:'transparent',
                      border:'1px solid #ccc',
                    }} name="" id="">
                      {
                        options1.map((item,index)=>{
                          return (
                            <option key={index} value={item.id}>{item.text}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label> الحاله </label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Choose status",
                      }}
                    /> */}
                    <select onChange={(e)=>{
                      setTransData({...transData,status:e.target.value})
                    }} style={{
                      width:'100%',
                      padding:'10px',
                      borderRadius:'4px',
                      backgroundColor:'transparent',
                      border:'1px solid #ccc',
                    }} name="" id="">
                      {
                        status.map((item,index)=>{
                          return (
                            <option key={index} value={item.value}>{item.label}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      {/* <div className="form-group">
                        <a className="btn btn-submit w-100">
                        تحميل ملف العينة
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>تحميل ملف CSV </label>
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
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input onChange={(e)=>{
                      setTransData({...transData,shipping:e.target.value})
                    }} type="text" defaultValue={0} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea  onChange={(e)=>{
                      setTransData({...transData,description:e.target.value})
                    }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button disabled={transLoading} style={{ cursor:transData?'no-drop':'pointer' }} onClick={()=>{
                    handleTrans()
                  }} className="btn btn-submit me-2">
                    {
                      transLoading?<Loader/>:'تحويل'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/transfer/transferlist-transfer");
                  }} className="btn btn-cancel">
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportTransfer;
