/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  Calendar,
  Plus,
  Scanner,
  DeleteIcon,
  EditIcon,
  MacbookIcon,
  EarpodIcon,
} from "../../EntryFile/imagePath";
import { span } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "antd";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";

const options1 = [
  { id: 1, text: "Thomas", text: "Thomas"},
  { id: 2, text: "Customer", text: "Customer" },
];
const options2 = [
  { id: 1, text: "Sent", text: "Sent" },
  { id: 2, text: "Inprogess", text: "Inprogess" },
];
// const deleteRow = () => {
//   $(document).on("click", ".delete-set", function () {
//     $(this).parent().parent().hide();
//   });
// };

const EditQuotation = () => {
  const history=useHistory()
  const location=useLocation();
  const {quotation}=location.state;
  // console.log(quotation)
  const [quotdata,setquotedata]=useState({})
  const [editloading,seteditloading]=useState(false)
  const [startDate, setStartDate] = useState(new Date());

  const [data] = useState([
    {
      id: 1,
      image: EarpodIcon,
      product: "Apple Earpods",
      netUnitPrice: "10.00",
      stock: "500.00",
      qty: "500",
      discount: "0.00",
      tax: "2000.00",
      subTotal: "500.00",
    },
    {
      id: 2,
      image: MacbookIcon,
      product: "Macbook Pro",
      netUnitPrice: "15.00",
      stock: "6000.00",
      qty: "100.00",
      discount: "0.00",
      tax: "1000.00",
      subTotal: "1000.00",
    },
  ]);
  const [products,setproducts]=useState([]);
  const columns = [
    {
      title: "إسم المنتج",
      dataIndex: "product",
      render: (text, record) => (
        <div className="productimgname">
          <span  className="product-img">
            <img alt="" src={record?.image} />
          </span>
          <span  style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.product}
          </span>
        </div>
      ),
    },
    {
      title: "صافي سعر الوحدة(ر.س)",
      dataIndex: "netUnitPrice",
    },
    {
      title: "المخزون",
      dataIndex: "stock",
    },
    {
      title: "الكميه",
      dataIndex: "qty",
    },
    {
      title: "الخصم(ر.س)",
      dataIndex: "discount",
    },
    {
      title: "الضريبه %",
      dataIndex: "tax",
    },
    {
      title: "المجموع الفرعي(ر.س)",
      dataIndex: "subTotal",
    },
    {
      render: (_,record) => (
        <>
          <span
            onClick={()=>{
              let allproducts=[...products];
              setproducts(allproducts.filter(item=>item.id!==record?.id))
            }}
            style={{ cursor:'pointer' }} className="delete-set"  /* onClick={deleteRow} */>
            <img src={DeleteIcon} alt="img" />
          </span>
        </>
      ),
    },
  ];

  const handleedit=()=>{
    seteditloading(true)
    let products_ids='';
    let allProducts=[...products];
    for(let i=0; i<allProducts.length;i++){
      if(i==0){
        products_ids+=allProducts[i].id;
      }
      else {
        products_ids+="**"+allProducts[i].id;
      }
    }
    const data_send={
      ...quotdata,
      products_ids
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error("حدث خطأ ما")
      }
    })
    .catch((err)=>console.log(err))
    .finally(()=>{
      seteditloading(false)
    })
  }

  useEffect(()=>{
    if(location.state==null){
      history.go(-1);
    }
    setquotedata(quotation);
    setproducts(quotation?.products)
  },[])

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>تعديل الإقتباس</h4>
              {/* <h6>Add/Update Quotation</h6> */}
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <div className="row">
                      <div className="col-lg-10 col-sm-10 col-10">
                        {/* <Select2
                          className="select"
                          data={options1}
                          options={{
                            placeholder: "Thomas",
                          }}
                        /> */}
                        <select
                          value={quotdata.customerName}
                          style={{ width:'100%',padding:'10px',backgroundColor:'transparent',borderRadius:'4px',border:'1px solid #ccc' }}
                          name=""
                          onChange={(e)=>{
                            setquotedata({...quotdata,customerName:e.target.value})
                          }}
                          id=""
                        >
                          {options1.map((item,index)=>{
                            return (
                              <option key={index} value={item.id}>{item.text}</option>
                            )
                          })}
                        </select>
                      </div>
                      {/* <div className="col-lg-2 col-sm-2 col-2 ps-0">
                        <div className="add-icon">
                          <span >
                            <img src={Plus} alt="img" />
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>تاريخ الإقتباس </label>
                    <div className="input-groupicon">
                      <DatePicker

                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date)
                          setquotedata({...quotdata,date:date})
                        }}
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الرقم المرجعى.</label>
                    <input
                      type="text"
                      value={quotdata.reference}
                      onChange={(e)=>{setquotedata({...quotdata,reference:e.target.value})}}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                        value={quotdata.productName}
                        onChange={(e)=>{setquotedata({...quotdata,productName:e.target.value})}}
                        type="text"
                        placeholder="المنتج"//Scan/Search Product by code and select...
                      />
                      {/* <div className="addonset">
                        <img src={Scanner} alt="img" />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={products}
                    pagination={false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 float-md-right">
                  <div className="total-order">
                    <ul>
                      <li>
                        <h4>ضريبة الطلب</h4>
                        <h5>$ 0.00 (0.00%)</h5>
                      </li>
                      <li>
                        <h4>الخصم </h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li>
                        <h4>الشحن</h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li className="total">
                        <h4>السعر الكلى</h4>
                        <h5>$ 2000.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>ضريبة الطلب</label>
                    <input onChange={(e)=>{
                      setquotedata({...quotdata,tax:e.target.value})
                    }} value={quotdata.tax} type="text"  />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input  onChange={(e)=>{
                      setquotedata({...quotdata,discount:e.target.value})
                    }} value={quotdata.discount} type="text" defaultValue={10} />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input  onChange={(e)=>{
                      setquotedata({...quotdata,shipping:e.target.value})
                    }} value={quotdata.shipping} type="text" defaultValue={20} />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الحاله</label>
                    {/* <Select2
                      className="select"
                      data={options2}
                      options={{
                        placeholder: "Sent",
                      }}
                    /> */}
                    <select
                          value={quotdata.status}
                          style={{ width:'100%',padding:'10px',backgroundColor:'transparent',borderRadius:'4px',border:'1px solid #ccc' }}
                          name=""
                          onChange={(e)=>{
                            setquotedata({...quotdata,status:e.target.value})
                          }}
                          id=""
                        >
                          {options1.map((item,index)=>{
                            return (
                              <option key={index} value={item.id}>{item.text}</option>
                            )
                          })}
                        </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea  onChange={(e)=>{
                      setquotedata({...quotdata,discription:e.target.value})
                    }} value={quotdata.discription} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button style={{ cursor:editloading?'no-drop':'pointer' }} onClick={()=>{
                    handleedit()
                  }} className="btn btn-submit me-2">
                    {
                      editloading?<Loader/>:'تعديل'
                    }
                  </button>
                  <button className="btn btn-cancel">إلغاء</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuotation;
