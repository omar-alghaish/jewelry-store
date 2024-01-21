/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { Loader } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const options1 = [
  { id: 1, text: "Store 1", text: "Store 1" },
  { id: 2, text: "Store 2", text: "Store 2" },
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

const AddTransfer = () => {
  const history=useHistory();
  const [addloading,setaddloading]=useState(false)
  const [transData,setTransData]=useState({
    from:'',
    to:'',
    date:'',
    product_name:'',
    order_tax:'',
    discount:'',
    shipping:'',
    status:'',
    description:'',
  })
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [data] = useState([
    {
      id: 1,
      image: EarpodIcon,
      productName: "حلق",
      price: "1500.00",
      stock: "500.00",
      discount: "0.00",
      tax: "2000.00",
      totalCost: "500.00",
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
      title: "السعر",
      dataIndex: "price",
    },
    {
      title: "التخزين",
      dataIndex: "stock",
    },
    {
      title: "الخصم",
      dataIndex: "discount",
    },
    {
      title: "الضريبه",
      dataIndex: "tax",
    },
    {
      title: "السعر الكلى(ر.س)",
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

  const handleAddTrans=()=>{
    if(transData.date==""||transData.from==""||transData.to==""||transData.product_name==""||transData.order_tax==""||transData.discount==""||transData.shipping==""||transData.status==""||transData.description==""){
      toast.warn("أكمل البيانات")
      return
    }
    setaddloading(true);
    const data_send={
      ...transData,
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
      setaddloading(false)
    })
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>أضف منقول جديد</h4>
              <h6>نقل الأسهم الخاصة بك إلى متجر آخر</h6>
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
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                        onChange={(e)=>{
                          setTransData({...transData,product_name:e.target.value})
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
                    <label>ضريبة الطلب</label>
                    <input onChange={(e)=>{
                          setTransData({...transData,order_tax:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input onChange={(e)=>{
                          setTransData({...transData,discount:e.target.value})
                        }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input onChange={(e)=>{
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
                    <textarea onChange={(e)=>{
                          setTransData({...transData,description:e.target.value})
                        }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={()=>{
                      handleAddTrans()
                    }}
                  disabled={addloading} style={{ cursor:addloading?'no-drop':'pointer' }} className="btn btn-submit me-2">
                    {
                      addloading?<Loader/>:'إضافه'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/transfer/transferlist-transfer")
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

export default AddTransfer;
