/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
import React,{useState} from "react";
// import { span } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  // Plus,
  Scanner,
  // Product7,
  DeleteIcon,
  Calendar,
  // Product8,
  // Product1,
} from "../../EntryFile/imagePath";
// import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";
const Editsales = () => {
  const location=useLocation();
  const {saledata}=location.state;
  // console.log(location)
  const [editloading,seteditloading]=useState(false)
  const [sale,setsale]=useState({});
  const [otherdata,setotherdata]=useState({
    tax:'',
    customer_name:'',
    supplier:'',
    shipping:'',
    status:'',
    order_tax:'',
    discount:'',
  })
  const [products,setproducts]=useState([]);
  // const [startDate, setStartDate] = useState(new Date());
  const options = [
    { id: 1, text: "Walk-in-Costumer", text: "Walk-in-Costumer" },
    { id: 2, text: "Costumer Name", text: "Costumer Name" },
  ];
  const options1 = [
    { id: 1, text: "Store 1", text: "Store 1" },
    { id: 2, text: "Store 2", text: "Store 2" },
  ];
  const options2 = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Inprogess", text: "Inprogess" },
  ];

  const handleedit=()=>{
    seteditloading(true)
    let product_ids='';
    let allproducts=[...products];
    for(let i=0;i<allproducts.length;i++){
      if(i==0){
        product_ids+=allproducts[i].id;
      }
      else {
        product_ids+='***'+allproducts[i].id;
      }
    }
    const data_send={
      ...sale,
      product_ids
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else{
        toast.error("حدث خطأ ما")
      }
    }).finally(()=>{
      seteditloading(false)
    })
  }

  const handledelprod=(id)=>{
    setproducts(products.filter(item=>item.id!=id))
  }

  useEffect(() => {
    $(document).on("click", ".delete-set", function () {
      $(this).parent().parent().hide();
    });
  });
  useEffect(()=>{
    if(location.state==null){
      history.goBack()
    }
    setsale(saledata)
    setproducts(saledata.products);
  },[]);


  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>تعديل البيع</h4>
            <h6>تعديل بيعك الجديد</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>العميل</label>
                  <div className="row">
                    <div className="col-lg-10 col-sm-10 col-10">
                      {/* <Select2
                        value={otherdata.customer_name}
                        // onChange={(e)=>{
                        //   setotherdata({...otherdata,customer_name:e.target.value})
                        // }}
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Walk-in-Costumer",
                        }}
                      /> */}
                      <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',border:'1px solid #cddc',borderRadius:'4px' }} onChange={(e)=>{
                        setotherdata({...otherdata,customer_name:e.target.value})
                      }} value={otherdata.customer_name} name="" id="">
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
                      {/* <div className="add-icon">
                        <span>
                          <img src={Plus} alt="img" />
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>التاريخ</label>
                  <div className="input-groupicon">
                    <DatePicker
                    value={sale.Date}
                    onChange={(e)=>{
                      setsale({...sale,Date:e.target.value})
                    }}
                      selected={sale.name}
                      // onChange={(date) => setStartDate(date)}
                    />
                    <span  className="addonset">
                      <img src={Calendar} alt="img" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>المورد</label>
                  {/* <Select2
                  value={otherdata.suplier}
                  // onChange={(e)=>{
                  //   setotherdata({...otherdata,supplier:e.target.value})
                  // }}
                    className="select"
                    data={options1}
                    options={{
                      placeholder: "Store 1",
                    }}
                  /> */}
                  <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',border:'1px solid #cddc',borderRadius:'4px' }} onChange={(e)=>{
                        setotherdata({...otherdata,supplier:e.target.value})
                      }} value={otherdata.supplier} name="" id="">
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
              <div className="col-lg-12 col-sm-6 col-12">
                <div className="form-group">
                  <label>إسم المنتج</label>
                  <div className="input-groupicon">
                    <input
                    value={sale.Name}
                    onChange={(e)=>{
                      setsale({...sale,customer_name:e.target.value})
                    }}

                      type="text"
                      placeholder="Please type product code and select..."
                    />
                    <div className="addonset">
                      <img src={Scanner} alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="table-responsive mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> المنتج</th>
                      <th>الكميه</th>
                      <th>السعر</th>
                      <th>الخصم</th>
                      <th>الضريبه</th>
                      <th>السعر الجزئى</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products?.map((item,index)=>{
                        return<tr key={index}>
                          <td>{item.id}</td>
                          <td className="productimgname">
                            <span  className="product-img">
                              <img src={item.img} alt="product" />
                            </span>
                            <span>{item.product_name}</span>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>{item.tax}</td>
                          <td>{item.subprice}</td>
                          <td>
                            <span onClick={()=>{
                              handledelprod(item.id);
                            }} className="delete-set">
                              <img src={DeleteIcon} alt="svg" />
                            </span>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>ضريبة الطلب</label>
                  <input value={sale.tax} onChange={(e)=>{
                    setsale({...sale,tax:e.target.value})
                  }} type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الخصم</label>
                  <input value={sale.discount} onChange={(e)=>{
                    setsale({...sale,discount:e.target.value})
                  }} type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الشحن</label>
                  <input value={sale.shipping_price} onChange={(e)=>{
                    setsale({...sale,shipping_price:e.target.value})
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
                      placeholder: "Choose Status",
                    }}
                  /> */}
                  <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',border:'1px solid #cddc',borderRadius:'4px' }} onChange={(e)=>{
                        setsale({...saledata,Status:e.target.value})
                      }} value={sale.Status} name="" id="">
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
              <div className="row">
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                      <li>
                        <h4>ضريبة الطلب</h4>
                        <h5>$ 0.00 (0.00%)</h5>
                      </li>
                      <li>
                        <h4>الخصم </h4>
                        <h5>$ 0.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                      <li>
                        <h4>الشحن</h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li className="total">
                        <h4>الدفع الكلى</h4>
                        <h5>$ 1750.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <span onClick={()=>{
                  handleedit()
                }} style={{ cursor:editloading?'no-drop':'pointer' }} className="btn btn-submit me-2">
                  {
                    editloading?<Loader/>:'تعديل'
                  }
                </span>
                <span  className="btn btn-cancel">
                  إلغاء
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editsales;
