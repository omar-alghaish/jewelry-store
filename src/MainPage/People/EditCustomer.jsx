/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { toast } from "react-toastify";

const options = [
  { id: 1, text: "United States", text: "United States" },
  { id: 2, text: "India", text: "India" },
];
const options1 = [
  { id: 1, text: "City1", text: "City1" },
  { id: 2, text: "City2", text: "City2" },
];


const EditCustomer = () => {
  const history=useHistory();
  const location=useLocation();
  const {customer}=location.state;
  console.log(customer)
  const [customerData,setCustomerData]=useState({});
  const [updateLoading,setUpdateLoading]=useState(false)

  const handleUpdate=()=>{
    // if(customerData.customer==""||customerData.email==""||customerData.phone==""||customerData.country==""||customerData.)
    setUpdateLoading(true)
    const data_send={...customerData}
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
      setUpdateLoading(false)
    })
  }

  useEffect(()=>{
    if(location.state==null){
      history.go(-1)
    }
    setCustomerData(customer);
  },[])
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>تعديل إدارة العملاء</h4>
              <h6>تعديل/تحديث العميل</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <input value={customerData.customerName} onChange={(e)=>{
                      setCustomerData({...customerData,customerName:e.target.value})
                    }} type="text" defaultValue="Thomas" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>البريد الالكترونى</label>
                    <input  value={customerData.email} onChange={(e)=>{
                      setCustomerData({...customerData,email:e.target.value})
                    }}  type="text" defaultValue="Thomas@example.com" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input value={customerData.phone} onChange={(e)=>{
                      setCustomerData({...customerData,phone:e.target.value})
                    }}type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إختر البلد</label>
                    {/* <Select2
                      className="select"
                      data={options}
                      options={{
                        placeholder: "United States",
                      }}
                    /> */}
                    <select
                      value={customerData.country} onChange={(e)=>{
                        setCustomerData({...customerData,country:e.target.value})
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
                        placeholder: "New York",
                      }}
                    /> */}
                      <select
                      value={customerData.city} onChange={(e)=>{
                        setCustomerData({...customerData,city:e.target.value})
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
                    <input
                      type="text"
                      value={customerData.address} onChange={(e)=>{
                        setCustomerData({...customerData,address:e.target.value})
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea
                      value={customerData.description} onChange={(e)=>{
                        setCustomerData({...customerData,description:e.target.value})
                      }}
                      className="form-control"
                      defaultValue={
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text "
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button onClick={()=>{
                    handleUpdate()
                  }} disabled={updateLoading} style={{ cursor:updateLoading?'no-drop':'pointer' }} className="btn btn-submit me-2">
                    {
                      updateLoading?<Loader/>:'تعديل'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/people/customerlist-people")
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

export default EditCustomer;
