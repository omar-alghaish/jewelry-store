/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop"
// import { span } from "react-router-dom";
import Swal from "sweetalert2";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  PlusIcon,
  MacbookIcon,
  IphoneIcon,
  search_whites,
  EarpodIcon,
  OrangeImage,
  StawberryImage,
  AvocatImage,
  EditIcon,
  DeleteIcon,
  UnpaidGray,
} from "../../EntryFile/imagePath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const QuotationList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const history=useHistory();
  const options = [
    { id: 1, text: "Choose Product", text: "Choose Product" },
    { id: 2, text: "Macbook pro", text: "Macbook pro" },
    { id: 3, text: "Orange", text: "Orange" },
  ];
  const options2 = [
    { id: 1, text: "Choose Category", text: "Choose Category" },
    { id: 2, text: "Computers", text: "Computers" },
    { id: 3, text: "Fruits", text: "Fruits" },
  ];
  const options3 = [
    { id: 1, text: "Choose Sub Category", text: "Choose Sub Category" },
    { id: 2, text: "Computers", text: "Computers" },
  ];
  const options4 = [
    { id: 1, text: "Brand", text: "Brand" },
    { id: 2, text: "N/D", text: "N/D" },
  ];
  const options5 = [
    { id: 1, text: "Price", text: "Price" },
    { id: 2, text: "150.00", text: "150.00" },
  ];

  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الإقتباس الخاص بك.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const [data] = useState([
    {
      id: 1,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      reference: "PT001",
      customerName: "Thomas",
      status: "Sent",
      grandTotal: "550",
      discount: "0.00",
      tax: "2000.00",
      discription:'discription',
      shipping:'shi',
      subTotal: "500.00",
      products:[
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
      ]
    },
    {
      id: 2,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      reference: "PT002",
      customerName: "Raina",
      status: "Orderded",
      grandTotal: "789",
      discount: "0.00",
      discription:'discription',
      tax: "2000.00",
      shipping:'shi',
      subTotal: "500.00",
      products:[
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
      ]
    },
    {
      id: 3,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      discription:'discription',
      reference: "PT003",
      shipping:'shi',
      customerName: "Dhoni",
      status: "Pending",
      grandTotal: "765",
      discount: "0.00",
      tax: "2000.00",
      subTotal: "500.00",
      products:[
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
      ]
    },
    {
      id: 4,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      discription:'discription',
      reference: "PT004",
      customerName: "Rohit",
      status: "Sent",
      grandTotal: "909",
      shipping:'shi',
      order_tax:'23',
      discount:'43',
      shipping:'ee',
      description:'descripiton',
      products:[
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
      ]
    },
    {
      id: 5,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      discription:'discription',
      reference: "PT005",
      customerName: "Rahul",
      shipping:'shi',
      status: "Orderded",
      grandTotal: "879",
      products:[
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
      ]
    },
    {
      id: 6,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      discription:'discription',
      reference: "PT006",
      customerName: "Conway",
      shipping:'shi',
      status: "Pending",
      grandTotal: "887",
      order_tax:'23',
      discount:'43',
      shipping:'ee',
      description:'descripiton',
      products:[
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
      ]
    },
    {
      id: 7,
      image: require("../../assets/Golds/ring1.webp"),
      productName: "حلق",
      reference: "PT007",
      customerName: "Boult",
      status: "Sent",
      grandTotal: "980",
      order_tax:'23',
      shipping:'shi',
      discount:'43',
      discription:'discription',
      shipping:'ee',
      description:'descripiton',
      products:[
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
      ]
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
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "مرجع",
      dataIndex: "reference",
      sorter: (a, b) => a.reference.length - b.reference.length,
    },
    {
      title: "إسم الفئه",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "الحاله",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={
            text === "Sent"
              ? "badges bg-lightgreen"
              : text == "Pending"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {
            text =='Sent'? "أرسلت":text=='Ordered'?'وصلت':'فى الإنتظار'
          }
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "المجموع الإجمالي",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "الأوامر",
      render: (_,record) => (
        <>
          <span style={{ cursor:'pointer' }} onClick={()=>{
            history.push("/dream-pos/quotation/editquotation-quotation",{quotation:record})
          }} className="me-3" >
            <img src={EditIcon} alt="img" />
          </span>
          <span className="confirm-text"  onClick={confirmText}>
            <img src={DeleteIcon} alt="img" />
          </span>
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
              <h4>قائمة الإقتباسات</h4>
              <h6>أدر إقتباساتك</h6>
            </div>
            <div className="page-btn">
              <span
                to="/dream-pos/quotation/addquotation-quotation"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف إقتباس جديد
              </span>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${ inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" :"none"}}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "Choose Product",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "Choose Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options3}
                              options={{
                                placeholder: "Choose Sub Category",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options4}
                              options={{
                                placeholder: "Brand",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12 ">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Price",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1 col-sm-6 col-12">
                          <div className="form-group">
                            <a className="btn btn-filters ms-auto">
                              <img src={search_whites} alt="img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default QuotationList;
