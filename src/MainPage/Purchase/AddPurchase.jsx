/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Table } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "feather-icons-react/build/IconComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const options = [
  { id: 1, text: "Select", text: "Select" },
  { id: 2, text: "Supplier", text: "Supplier" },
];
const options1 = [
  { id: 1, text: "Select", text: "Select" },
  { id: 2, text: "Supplier Name", text: "Supplier Name" },
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
const AddPurchase = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [addloading,setaddloading]=useState(false)
  const [pursh,setpursh]=useState({
    supplier_name:'',
    date:'',
    product_name:'',
    ref_name:'',
    order_tax:'',
    status:'',
    description:'',
    discount:'',
    shipping:'',
  })
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
          <span  className="product-img">
            <img alt="" src={record?.image} />
          </span>
          <span  style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.productName}
          </span>
        </div>
      ),
    },
    {
      title: "الكميه",
      dataIndex: "qty",
    },
    {
      title: "سعر عمليه الشراء(ر.س)",
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
      title: "قيمة الضريبه(ر.س)",
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
          <span className="delete-set"  onClick={deleteRow}>
            <img src={DeleteIcon} alt="img" />
          </span>
        </>
      ),
    },
  ];

  const history=useHistory();

  const handleadd=()=>{
    if(pursh.supplier_name==""||pursh.date==""||pursh.product_name==""||pursh.ref_name==""||pursh.order_tax==""||pursh.discount==""||pursh.shipping==""||pursh.status==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    const data_send={
      ...pursh
    }
    axios.post("",JSON.stringify)
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
  // const history=usehis
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Purchase Add</h4>
              <h6>Add/Update Purchase</h6>
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
                            placeholder: "Category",
                          }}
                        /> */}
                        <select
                          onChange={(e)=>{
                            setpursh({...pursh,supplier_name:e.target.value});
                          }}
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
                    <label>تاريخ عمليه الشراء</label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date)
                          setpursh({...pursh,supplier_name:e.target.value});
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
                    <select
                      onChange={(e)=>{
                        setpursh({...pursh,product_name:e.target.value});
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
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Category",
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الرقم المرجعى.</label>
                    <input   onChange={(e)=>{
                            setpursh({...pursh,ref_name:e.target.value});
                          }} type="text" />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>إسم المنتج</label>
                    <div className="input-groupicon">
                      <input
                        onChange={(e)=>{
                          setpursh({...pursh,product_name:e.target.value});
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
                    <input   onChange={(e)=>{
                            setpursh({...pursh,order_tax:e.target.value});
                          }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الخصم</label>
                    <input   onChange={(e)=>{
                            setpursh({...pursh,discount:e.target.value});
                          }} type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>الشحن</label>
                    <input   onChange={(e)=>{
                            setpursh({...pursh,shipping:e.target.value});
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
                            <select
                          onChange={(e)=>{
                            setpursh({...pursh,status:e.target.value});
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
                    <textarea   onChange={(e)=>{
                            setpursh({...pursh,description:e.target.value});
                          }} className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button disabled={addloading}  style={{ cursor:addloading?'no-drop':'pointer' }} onClick={()=>{
                    handleadd()
                  }} className="btn btn-submit me-2">
                    {
                      addloading?<Loader/>:'إضافه'
                    }
                  </button>
                  <button onClick={()=>{
                    history.push("/dream-pos/purchase/purchaselist-purchase")
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

export default AddPurchase;
