/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
// import { span } from "react-router-dom";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  search_whites,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PurchaseList = () => {
  const history=useHistory();
  const [inputfilter, setInputfilter] = useState(false);

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

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const [data] = useState([
    {
      id: 1,
      supplierName: "Apex Computers",
      reference: "PT001",
      date: "19 Nov 2022",
      status: "Received",
      grandTotal: "550",
      paid: "120",
      productname:'prodname',
      tax:12,
      discount:23,
      shipping:'shipping',
      description:'description',
      due: "470",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      supplierName: "Best Power Tools",
      reference: "PT001",
      date: "19 Nov 2022",
      status: "Pending",
      grandTotal: "550",
      paid: "120",
      productname:'prodname',
      tax:12,
      discount:23,
      shipping:'shipping',
      description:'description',
      due: "470",
      productname:'prodname',
      paymentStatus: "Unpaid",
    },
    {
      id: 3,
      supplierName: "Modern Automobile",
      reference: "PT001",
      date: "19 Nov 2022",
      productname:'prodname',
      tax:12,
      discount:23,
      shipping:'shipping',
      description:'description',
      status: "Received",
      grandTotal: "550",
      productname:'prodname',
      paid: "120",
      due: "470",
      paymentStatus: "Paid",
    },
    {
      id: 4,
      supplierName: "AIM Infotech",
      reference: "PT001",
      date: "19 Nov 2022",
      productname:'prodname',
      tax:12,
      discount:23,
      shipping:'shipping',
      description:'description',
      status: "Ordered",
      grandTotal: "550",
      paid: "120",
      productname:'prodname',
      due: "470",
      paymentStatus: "Partial",
    },
  ]);

  const columns = [
    {
      title: "إسم المورد",
      dataIndex: "supplierName",
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
    },
    {
      title: "المرجع",
      dataIndex: "reference",
      sorter: (a, b) => a.reference.length - b.reference.length,
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "الحاله",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={
            text === "Received"
              ? "badges bg-lightgreen"
              : text == "Pending"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text === "Received"
              ? "تم الإستلام"
              : text == "Pending"
              ? "فى الانتظار"
              : "تم التوصيل"}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "السعر الكلى",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
      width: "125px",
    },
    {
      title: "مدفوع",
      dataIndex: "paid",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "الباقى",
      dataIndex: "due",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "حالة الدفع",
      dataIndex: "paymentStatus",
      render: (text, record) => (
        <span
          className={
            text === "Paid"
              ? "badges bg-lightgreen"
              : text == "Unpaid"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text === "Paid"
              ? "مدفوع"
              : text == "Unpaid"
              ? "غير مدفوع"
              : "تم دفع جزء"}
        </span>
      ),
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
      width: "120px",
    },
    {
      title: "أوامر",
      render: (_,record) => (
        <>
          <span onClick={()=>{
            history.push("/dream-pos/purchase/editpurchase-purchase",{purshdata:record})
          }} style={{cursor:'pointer'}} className="me-3" >
            <img src={EditIcon} alt="img" />
          </span>
          <span className="confirm-text">
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
              <h4>Purchase List</h4>
              <h6>Manage your Purchase</h6>
            </div>
            <div className="page-btn">
              <span
                onClick={()=>{
                  history.push("/dream-pos/purchase/addpurchase-purchase")
                }}
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافة عملية شراء جديدة
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
                                placeholder: "Choose Sub Category",
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
                                placeholder: "Brand",
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
export default PurchaseList;
