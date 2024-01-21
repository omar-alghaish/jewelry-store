/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import Select2 from "react-select2-wrapper";
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
// import { span } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";

const options1 = [
  { id: 1, text: "Select Customer", text: "Select Customer" },
  { id: 2, text: "Customer", text: "Customer" },
];
const options2 = [
  { id: 1, text: "choose Status", text: "choose Status" },
  { id: 2, text: "Inprogess", text: "Inprogess" },
  { id: 3, text: "Completed", text: "Completed" },
];
const deleteRow = () => {
  $(document).on("click", ".delete-set", function () {
    $(this).parent().parent().hide();
  });
};

const AddQuotation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [addloading,setaddloading]=useState(false)
  const [data,setdata] = useState([
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
      checked:false,
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
      checked:false,
    },
  ]);

  const columns = [
    {
      title: "Product",
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
      title: "Net Unit Price($)",
      dataIndex: "qty",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Qty",
      dataIndex: "qty",
    },
    {
      title: "Discount($)",
      dataIndex: "discount",
    },
    {
      title: "Tax %",
      dataIndex: "tax",
    },
    {
      title: "Sub Total($)",
      dataIndex: "subTotal",
    },
    {
      render: (_,record) => (
        <>
          <span  className="delete-set" onClick={deleteRow}>
            {/* <img src={DeleteIcon} alt="img" /> */}
            <input onClick={()=>{
              let alldata=[...data];

              setdata(alldata.map((item,index)=>{
                if(item.id==record?.id){
                  return {...item,checked:!item.checked}
                }
                else return {...item}
              }))
            }} checked={record?.checked} type="checkbox" name="" id="" />
          </span>
        </>
      ),
    },
  ];
  const [quotation,setquotation]=useState({
    customer_name:'',
    date:'',
    reference_no:'',
    prod_name:'',
    order_tax:'',
    discount:'',
    shipping:'',
    status:'',
    description:'',
  })

  const handleaddquot=()=>{
    if(quotation.customer_name==""||quotation.date==""||quotation.reference_no==""||quotation.prod_name==""||quotation.order_tax==""||quotation.discount==""||quotation.shipping==""||quotation.status==""||quotation.description==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    setaddloading(true)
    const data_send={
      ...quotation
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
        toast.error("حدث خطأ ما");
      }
    })
      .catch(err=>console.log(err))
      .finally(()=>{
        setaddloading(false)
    })
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>أضف إقتباس</h4>
              <h6>أضف وحدث الاقتباسات</h6>
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
                            placeholder: "Category",
                          }}
                        /> */}
                        <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',borderRadius:'4px',border:'1px solid #ccc' }} name="" onChange={(e)=>{
                          setquotation({...quotation,customer_name:e.target.value})
                        }} id="">
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
                          setquotation({...quotation,date:date})
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
                    <input onChange={(e)=>{
                          setquotation({...quotation,reference_no:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                        onChange={(e)=>{
                          setquotation({...quotation,prod_name:e.target.value})
                        }}
                        type="text"
                        placeholder="إختر المنتج"
                      />
                      <div className="addonset">
                        <img src={Scanner} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
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
                        <h4>المجموع الإجمالي</h4>
                        <h5>$ 0.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>ضريبة الشحن</label>
                    <input onChange={(e)=>{
                      setquotation({...quotation,order_tax:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input onChange={(e)=>{
                      setquotation({...quotation,discount:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input onChange={(e)=>{
                      setquotation({...quotation,shipping:e.target.value})
                    }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الحاله</label>

                    {/* <Select2
                      className="select"
                      data={options2}
                      options={{
                        placeholder: "Category",
                      }}
                    /> */}

                        <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',borderRadius:'4px',border:'1px solid #ccc' }} name="" onChange={(e)=>{
                          setquotation({...quotation,status:e.target.value})
                        }} id="">
                          {options2.map((item,index)=>{
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
                    <textarea onChange={(e)=>{
                      setquotation({...quotation,description:e.target.value})
                    }} className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button disabled={addloading} style={{ cursor:addloading?'no-drop':'pointer' }} className="btn btn-submit me-2"
                    onClick={()=>{
                      handleaddquot()
                    }}
                  >
                    {
                      addloading?<Loader/>:'إضافه'
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

export default AddQuotation;
