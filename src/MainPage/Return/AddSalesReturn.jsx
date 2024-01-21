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
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "antd";
import retrunitem from "../../assets/data/returnitem";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";



const AddSalesReturn = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [addloading,setaddloading]=useState(false)
  const options1 = [
    { id: 1, text: "مكتمل", text: "مكتمل" },
    { id: 2, text: "فى العمليه", text: "فى العمليه" },
  ];
  const options = [
    { id: 1, text: "إختر عميل", text: "إختر عميل" },
    { id: 2, text: "عميل", text: "عميل" },
  ];

  const handleadd=()=>{
    setaddloading(true)
    if(retdata.customer_name==""||retdata.quotation_date==""||retdata.ref_no==""||retdata.product_name==""||retdata.tax_order==""||retdata.discount==""||retdata.shipping==""||retdata.status==""||retdata.description==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    const data_send={
      ...retdata
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
    }).catch((err)=>console.log(err))
    .finally(()=>{
      setaddloading(false)
    })
  }
  const deleteRow =()=>{
    $(document).on("click",".delete-set",function () {
		$(this).parent().parent().hide();
	});
  }
  const [data,setdata] = useState([
    {
      id: 1,
      image: EarpodIcon,
      productName: "Apple Earpods",
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
      productName: "Macbook Pro",
      netUnitPrice: "15.00",
      stock: "6000.00",
      qty: "100.00",
      discount: "0.00",
      tax: "1000.00",
      subTotal: "1000.00",
    },
  ]);

  const [retdata,setretdata]=useState({
    customer_name:'',
    quotation_date:'',
    ref_no:'',
    product_name:'',
    tax_order:'',
    discount:'',
    shipping:'',
    status:'',
    description:'',
  });

  useEffect(()=>{
    setdata(retrunitem)
  },[])

  const columns = [
    {
      title: "إسم المنتج",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img style={{ width:'30px' }} alt="" src={record?.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.productName}
          </Link>
        </div>
      ),
    },
    {
      title: "صافي سعر الوحدة(ر.س)",
      dataIndex: "qty",
    },
    {
      title: "التخزين",
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
      title: "السعر الكلى($)",
      dataIndex: "subTotal",
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>إنشاء عائد المبيعات</h4>
              <h6>إضافة/تحديث مرتجع المبيعات</h6>
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
                          data={options}
                          options={{
                            placeholder: "إختر العميل",
                          }}
                        /> */}
                        <select onChange={(e)=>{
                          setretdata({...retdata,customer_name:e.target.value})
                        }} style={{ width:'100%',padding:'10px',borderRadius:'4px' }} name="" id="">
                          {
                            options.map((item,index)=>{
                              return(
                                <option key={index} value={item.id}>{item.text}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="col-lg-2 col-sm-2 col-2 ps-0">
                        <div className="add-icon">
                          <Link to="#">
                            <img src={Plus} alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>تاريخ الاقتباس </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setretdata({...retdata,quotation_date:date})}//setStartDate(date)
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>رقم المرجع.</label>
                    <input onChange={(e)=>{
                          setretdata({...retdata,ref_no:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>منتج</label>
                    <div className="input-groupicon">
                      <input
                        onChange={(e)=>{
                          setretdata({...retdata,product_name:e.target.value})
                        }}
                        type="text"
                        placeholder="Scan/Search Product by code and select..."
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
                        <h5>$ 0.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>ضريبه الطلب</label>
                    <input onChange={(e)=>{
                          setretdata({...retdata,tax_order:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input onChange={(e)=>{
                          setretdata({...retdata,discount:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input onChange={(e)=>{
                          setretdata({...retdata,shipping:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الحاله</label>
                          <select onChange={(e)=>{
                          setretdata({...retdata,status:e.target.value})
                        }} style={{ width:'100%',padding:'10px',borderRadius:'4px' }} name="" id="">
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
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>الوصف</label>
                    <textarea onChange={(e)=>{
                          setretdata({...retdata,description:e.target.value})
                        }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    style={{ cursor:addloading?'no-drop':'pointer' }} onClick={()=>{
                      handleadd()
                    }}
                    disabled={addloading}
                    className="btn btn-submit me-2"
                  >
                    {
                      addloading?<Loader/>:'إنشاء'
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

export default AddSalesReturn;
