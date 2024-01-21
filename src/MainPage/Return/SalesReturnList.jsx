/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop"
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  MacbookIcon,
  IphoneIcon,
  search_whites,
  EarpodIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  UnpaidGray,
} from "../../EntryFile/imagePath";
import Swal from "sweetalert2";
import retruns from "../../assets/data/returnsdata";
const SalesReturnList = () => {
  // const navigate=usenavigate
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!      ",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "تم!",
          text: "لقد تم حذف الملف الخاص بك.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };

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

  const [data,setdata] = useState([]);
  useEffect(()=>{
    setdata(retruns)
  },[])
  const columns = [
    {
      title: "إسم المنتج",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link  to="#" className="product-img">
            <img alt="" src={record?.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.productName}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "العميل",
      dataIndex: "customer",
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "الحاله",
      dataIndex: "stat_name",
      render: (text, record) => (
        <span
          className={
            record?.status === "Received"
              ? "badges bg-lightgreen"
              : record?.status == "Pending"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "السعر الكلى (ر.س)",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "المدفوع (ر.س)",
      dataIndex: "paid",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "حق (ر.س)",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "حالة الدفع",
      dataIndex: "paysta_name",
      render: (text, record) => (
        <span
          className={
            record?.paymentStatus === "Paid"
              ? "badges bg-lightgreen"
              : record?.paymentStatus == "Received"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
    },
    {
      title: "أوامر",
      render: (_,record) => (
        <>
          {/* <Link className="me-3" to="">

          </Link> */}
          <span onClick={()=>history.pushState("/dream-pos/return/editsalesreturn-return",{rowdata:record})}>
            <img src={EditIcon} alt="img" />
          </span>
          <Link className="confirm-text" to="#" onClick={confirmText}>
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
              <h4>Sales Return List</h4>
              <h6>Manage your Returns</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/return/addsalesreturn-return"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافة مرتجع مبيعات جديد
              </Link>
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
                                placeholder: "Choose sub Category",
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
export default SalesReturnList;
