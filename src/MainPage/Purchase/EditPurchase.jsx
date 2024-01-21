/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Scanner,
  DeleteIcon,
  EditIcon,
  MacbookIcon,
  EarpodIcon,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Table } from "antd";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";

const options = [
  { id: 1, text: "Apex Computer", text: "Apex Computer" },
  { id: 2, text: "Computers", text: "Computers" },
];
const options1 = [
  { id: 1, text: "MacBook Pro", text: "MacBook Pro" },
];
const options2 = [
  { id: 1, text: "Delivered", text: "Delivered" },
  { id: 2, text: "Completed", text: "Completed" },
];
const deleteRow = () => {
  $(document).on("click", ".delete-set", function () {
    $(this).parent().parent().hide();
  });
};
const AddPurchase = () => {
  const location=useLocation();
  const history=useHistory();
  const {purshdata}=location.state;
  // console.log(purshdata)
  const [purchase,setpurchase]=useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [editloading,seteditloading]=useState(false)
  const [data] = useState([
    {
      id: 1,
      image: EarpodIcon,
      productName: "Apple Earpods",
      qty: "10.00",
      purchasePrice: "2000.00",
      discount: "500.00",
      tax: "0.00",
      taxAmount: "0.00",
      unitCost: "2000.00",
      totalCost: "2000.00",
    },
    {
      id: 2,
      image: MacbookIcon,
      productName: "Macbook Pro",
      qty: "15.00",
      purchasePrice: "6000.00",
      discount: "100.00",
      tax: "0.00",
      taxAmount: "0.00",
      unitCost: "1000.00",
      totalCost: "1000.00",
    },
  ]);

  const columns = [
    {
      title: "إسم المنتج",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record?.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.productName}
          </Link>
        </div>
      ),
    },
    {
      title: "الكميه",
      dataIndex: "qty",
    },
    {
      title: "سعر الشراء(ر.س)",
      dataIndex: "purchasePrice",
    },
    {
      title: "الخصم(ر.س)",
      dataIndex: "discount",
    },
    {
      title: "الضريبه%",
      dataIndex: "tax",
    },
    {
      title: "كميه الضريبه(ر.س)",
      dataIndex: "taxAmount",
    },
    {
      title: "تكلفة الوحدة(ر.س)",
      dataIndex: "unitCost",
    },
    {
      title: "التكلفه الكليه(ر.س)",
      dataIndex: "totalCost",
    },
    {
      render: () => (
        <>
          <Link className="delete-set" to="#" onClick={deleteRow}>
            <img src={DeleteIcon} alt="img" />
          </Link>
        </>
      ),
    },
  ];

  const handleedit=()=>{
    seteditloading(true)
    const data_send={
      ...purchase
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.stauts=='success'){
        toast.success(res.data.message);
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error("حدث خطأ ما")
      }
    })
    .catch(err=>console.log(err))
    .finally(()=>{
      seteditloading(false)
    })
  }

  useEffect(()=>{
    if(location.state==null){
      history.push("/dream-pos/purchase/editpurchase-purchase")
    }
    setpurchase(purchase)
  },[])

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إضافه شراء جديد</h4>
              <h6>إضافة/تحديث الشراء</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المورد</label>
                    <div className="row">
                      <div className="col-lg-10 col-sm-10 col-10">
                        {/* <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Apex Computer",
                          }}
                        /> */}
                        <select
                          onChange={(e)=>{}}
                          style={{ width:'100%',padding:'10px',border:'1px solid #ccc', backgroundColor:'transparent'}}
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
                      {/* <div className="col-lg-2 col-sm-2 col-2 ps-0">
                        <div className="add-icon">
                          <Link to="#">
                            <img src={Plus} alt="img" />
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>تاريخ الشراء </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date)
                          setpurchase({...purchase,date:date})
                        }}
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "MacBook Pro",
                      }}
                    /> */}
                    <select
                      value={purchase.productname}
                      onChange={(e)=>{
                        setpurchase({...purchase,productname:e.target.value})
                      }}
                      style={{ width:'100%',padding:'10px',border:'1px solid #ccc', backgroundColor:'transparent'}}
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
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الرقم المرجعى.</label>
                    <input value={purchase.reference}
                      onChange={(e)=>{
                        setpurchase({...purchase,reference:e.target.value})
                      }} type="text"  />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                      value={purchase.productname}
                      onChange={(e)=>{
                        setpurchase({...purchase,productname:e.target.value})
                      }}
                        type="text"
                        placeholder="Scan/Search Product by code and select..."
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
                        <h4>ضريبه الطلب</h4>
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
                    <label>ضريبه الطلب</label>
                    <input type="text" defaultValue="20" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input type="text" defaultValue="10" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input type="text" defaultValue="10" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الحاله</label>
                    {/* <Select2
                      className="select"
                      data={options2}
                      options={{
                        placeholder: "Delivered",
                      }}
                    /> */}
                    <select
                          value={purchase.status}
                          onChange={(e)=>{
                            setpurchase({...purchase,status:e.target.value})
                          }}
                          style={{ width:'100%',padding:'10px',border:'1px solid #ccc', backgroundColor:'transparent'}}
                        >
                          {
                            options2.map((item,index)=>{
                              return(
                                <option key={index} value={item.id}>{item.text}</option>
                              )
                            })
                          }
                        </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea value={purchase.description}
                      onChange={(e)=>{
                        setpurchase({...purchase,description:e.target.value})
                      }} className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button onClick={()=>{
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

export default AddPurchase;
