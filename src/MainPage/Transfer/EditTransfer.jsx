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
  MinusIcon,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "antd";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";

const options1 = [
  { id: 1, text: "Store 1", text: "Store 1" },
  { id: 2, text: "Store 2", text: "Store 2" },
];
const options2 = [
  { id: 1, text: "Sent", text: "Sent" },
  { id: 2, text: "Inprogess", text: "Inprogess" },
  { id: 3, text: "Completed", text: "Completed" },
];
const deleteRow = () => {
  $(document).on("click", ".delete-set", function () {
    $(this).parent().parent().hide();
  });
};

const EditTransfer = () => {
  const location=useLocation();
  const history=useHistory()
  const {trans}=location.state;
  // console.log(trans)
  const [editLoading,setEditLoading]=useState(false)
  const [transData,setTransData]=useState({});
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  const [data] = useState([
    {
      id: 1,
      image: EarpodIcon,
      productName: "Apple Earpods",
      price: "1500.00",
      stock: "500.00",
      discount: "0.00",
      tax: "2000.00",
      totalCost: "500.00",
    },
  ]);

  const columns = [
    {
      title: "Product Name",
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
      title: "QTY",
      dataIndex: "qty",
      render: () => (
        <div className="input-group form-group mb-0">
          <button
            onClick={() => setCount(count + 1)}
            className="scanner-set input-group-text"
          >
            <img src={Plus} alt="img" />
          </button>
          <input type="text" value={count} className="calc-no" />
          <button
            onClick={() => setCount(count - 1)}
            className="scanner-set input-group-text"
          >
            <img src={MinusIcon} alt="img" />
          </button>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total Cost($)",
      dataIndex: "totalCost",
    },
    {
      render: () => (
        <>
          <Link className="confirm-text" to="#" onClick={deleteRow}>
            <img src={DeleteIcon} alt="img" />
          </Link>
        </>
      ),
    },
  ];

  const editTrans=()=>{
    setEditLoading(true)
    const data_send={
      ...transData
    }
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
      setEditLoading(false)
    })
  }

  useEffect(()=>{
    if(location.state==null){
      history.push("/dream-pos/transfer/transferlist-transfer");
    }
    setTransData(trans);
  },[])

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>تعديل النقل</h4>
              <h6>نقل المنتجات الخاصة بك إلى متجر آخر</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>التاريخ </label>
                    <div className="input-groupicon">
                      <DatePicker
                        value={transData.date}
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date)
                          setTransData({...transData,date:date})
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
                    <label>من</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Store 1",
                      }}
                    /> */}
                    <select value={transData.from} onChange={(e)=>{
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
                        placeholder: "Store 2",
                      }}
                    /> */}
                    <select value={transData.to} onChange={(e)=>{
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
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                        value={transData.product_name}
                        onChange={(e)=>{
                          setTransData({...transData,product_name:e.target.value})
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
                        <h4>الخصم </h4>$
                        <h5>$ 0.00</h5>
                      </li>
                      <li>
                        <h4>الشحن</h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li className="total">
                        <h4>السعر الكى</h4>
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
                    <input value={transData.order_tax}
                        onChange={(e)=>{
                          setTransData({...transData,order_tax:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input value={transData.discount}
                        onChange={(e)=>{
                          setTransData({...transData,discount:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input value={transData.shipping}
                        onChange={(e)=>{
                          setTransData({...transData,shipping:e.target.value})
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
                        placeholder: "Sent",
                      }}
                    /> */}
                    <select value={transData.status} onChange={(e)=>{
                      setTransData({...transData,status:e.target.value})
                    }} style={{
                      width:'100%',
                      padding:'10px',
                      borderRadius:'4px',
                      backgroundColor:'transparent',
                      border:'1px solid #ccc',
                    }} name="" id="">
                      {
                        options2.map((item,index)=>{
                          return (
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
                    <textarea value={transData.description}
                        onChange={(e)=>{
                          setTransData({...transData,description:e.target.value})
                        }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button disabled={editLoading} style={{ cursor:editLoading?'no-drop':'pointer' }} className="btn btn-submit me-2">
                    {
                      editLoading?<Loader/>:'تعديل'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/transfer/transferlist-transfer");
                  }} className="btn btn-cancel">إلغاء</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTransfer;
