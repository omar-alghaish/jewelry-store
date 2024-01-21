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
  // DeleteIcon,
  Calendar,
  // Product8,
  // Product1,
} from "../../EntryFile/imagePath";
// import Swal from "sweetalert2";
// import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";
const Addsales = () => {
  const history=useHistory();
  const [products,setproducts]=useState([
    {
      id:1,
      image:require("../../assets/Golds/anklet2.webp"),
      product_name:'خلخال',
      qty:3,
      price:33,
      discount:3443,
      tax:.12,
      subtotal:122,
      checked:false
    },
    {
      id:2,
      image:require("../../assets/Golds/anklet2.webp"),
      product_name:'خلخال',
      qty:3,
      price:33,
      discount:3443,
      tax:.12,
      subtotal:122,
      checked:false
    },
    {
      id:3,
      image:require("../../assets/Golds/anklet2.webp"),
      product_name:'خلخال',
      qty:3,
      price:33,
      discount:3443,
      tax:.12,
      subtotal:122,
      checked:false

    },
  ]);
  const [saledata,setsaledata]=useState({
    coustomer:'',
    date:'',
    supplier:'',
    product_name:'',
    order_tax:'',
    discount:'',
    shipping:'',
    status:'',
  })
  const [addloading,setaddloading]=useState();
  const [startDate, setStartDate] = useState(new Date());
  const options = [
    { id: 1, text: "Choose", text: "Choose" },
    { id: 2, text: "Costumer Name", text: "Costumer Name" },
  ];
  const options1 = [
    { id: 1, text: "Choose", text: "Choose" },
    { id: 2, text: "Supplier Name", text: "Supplier Name" },
  ];
  const options2 = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Inprogess", text: "Inprogess" },
  ];

  const handleaddsale=()=>{
    if(saledata.coustomer==""||saledata.date==""||saledata.supplier==""||saledata.product_name==""||saledata.order_tax==""||saledata.discount==""||saledata.shipping==""||saledata.status==""){
      toast.warn("أكمل البيانات")
      return;
    }
    let products_id="";
    let allProducts=[...products];
    for(let i=0;i<allProducts.length;i++){
      if(allProducts[i].checked){
        if(i==0){
          products_id+=allProducts[i].id;
        }
        else {
          products_id+='***'+allProducts[i].id;
        }
      }
    }
    setaddloading(true);
    const data_send={
      ...saledata,
      products_id
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
      setaddloading(false)
    })
  }

  useEffect(() => {
    $(document).on("click", ".delete-set", function () {
      $(this).parent().parent().hide();
    });
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>أضف بيع</h4>
            <h6>أضف مبيعاتك الجديدة</h6>
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
                        onChange={(e)=>{
                          setsaledata({...saledata,coustomer:e.target.value})
                        }}
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Choose",
                        }}
                      /> */}
                        <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',border:'1px solid #cddc',borderRadius:'4px' }}
                          onChange={(e)=>{
                            setsaledata({...saledata,coustomer:e.target.value})
                          }}
                        name="" id="">
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
                        <span>
                          <img src={Plus} alt="img" />
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>التاريخ</label>
                  <div className="input-groupicon">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date)
                        setsaledata({...saledata,date:date})
                      }}
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
                    onChange={(e)=>{
                      setsaledata({...saledata,supplier:e.target.value})
                    }}
                    className="select"
                    data={options1}
                    options={{
                      placeholder: "Choose",
                    }}
                  /> */}
                    <select style={{ width:'100%',padding:'10px',backgroundColor:'transparent',border:'1px solid #cddc',borderRadius:'4px' }}
                      onChange={(e)=>{
                        setsaledata({...saledata,supplier:e.target.value})
                      }}
                      name="" id="">
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
                      type="text"
                      placeholder="إكتب كود المنتج"
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
                      <th>إسم المنتج</th>
                      <th>الكميه</th>
                      <th>السعر</th>
                      <th>الخسم</th>
                      <th>الضريبه</th>
                      <th>السعر الجزئى</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products?.map((item,index)=>{
                        return (
                          <tr key={index}>
                          <td>{item.id}</td>
                          <td className="productimgname">
                            <span  className="product-img">
                              <img src={item.image} alt="product" />
                            </span>
                            <span >{item.product_name}</span>
                          </td>
                          <td>{item.qty}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>{item.tax}</td>
                          <td>{item.subtotal}</td>
                          <td>
                            <input onClick={()=>{
                              let allporducts=[...products];
                              allporducts[index]['checked']=!products[index]['checked'];
                              setproducts(allporducts)
                            }} type="checkbox" checked={item.checked} />
                          </td>
                        </tr>
                        )
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
                  <input onChange={(e)=>{
                    setsaledata({...saledata,order_tax:e.target.value})
                  }} type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الخصم</label>
                  <input onChange={(e)=>{
                    setsaledata({...saledata,discount:e.target.value})
                  }} type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الشحن</label>
                  <input onChange={(e)=>{
                    setsaledata({...saledata,shipping:e.target.value})
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
                        setsaledata({...saledata,status:e.target.value})
                      }}  name="" id="">
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
                        <h4>السعر الكلى</h4>
                        <h5>$ 0.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <button onClick={()=>{
                  handleaddsale()
                }} style={{ cursor:addloading?'no-drop':'pointer' }} className="btn btn-submit me-2">
                  {
                    addloading?<Loader/>:"إضافه"
                  }
                </button>
                <button  onClick={()=>{
                  history.push("/dream-pos/sales/saleslist")
                }} className="btn btn-cancel">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addsales;
