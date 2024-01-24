/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
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
import leveljs from "level-js";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModalContent from "../sales/Modal";
const levelup = require("levelup");

const Retrives = () => {
  const db = levelup(leveljs("./db"));

  const [inputfilter, setInputfilter] = useState(false);
  const [retrieves, setRetrieves] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRecored, setCurrentRecored] = useState({});
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

  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(retruns);
  }, []);
  const columns2 = [
    {
      title: "العيار",
      dataIndex: "carat",
    },
    {
      title: "الوزن",
      dataIndex: "weight",
    },
    {
      title: "اجمالي القيمه",
      dataIndex: "totalCaratPrice",
    },
  ];
  const columns = [
    {
      title: "نوع الحركه",
      dataIndex: "movementType",

      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "التاريخ",
      dataIndex: "documentDate",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "نوع العميل",
      dataIndex: "customerType",
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "رقم الهويه",
      dataIndex: "identityNumber",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    {
      title: "هاتف العميل",
      dataIndex: "phone",
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "الفرع",
      dataIndex: "branchName",
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "سبب الاسترجاع",
      dataIndex: "description",

      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "عيار الذهب المدفوع",
      dataIndex: "goldCarat",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "وزن الذهب المدفوع",
      dataIndex: "goldWeight",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "اجمالي قيمة الذهب المدفوع",
      dataIndex: "goldValue",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "طريقة الدفع",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "المدفوع المبلغ",
      dataIndex: "moneyAmount",
      sorter: (a, b) => a.due.length - b.due.length,
    },
    {
      title: "الذهب المدفوع",
      dataIndex: "goldItems",
      render: (_, record) => (
        <>
          <button
            className="btn btn-submit me-2"
            style={{width:"50px !important", padding:"10px 10px !important"}}
            onClick={() => {
              setModalOpen(true);
              setCurrentRecored(record);
            }}
          >
            عرض
          </button>
        </>
      ),
    },
    {
      title: "اجمالي الذهب المسترجع",
      dataIndex: "totalWeight",
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
    },
    {
      title: "اجمالي المبلغ المسترجع",
      dataIndex: "totalLocalCurrency",
      sorter: (a, b) => a.paymentStatus.length - b.paymentStatus.length,
    },
    {
      title: "أوامر",
      render: (_, record) => (
        <div style={{display:"flex", gap:"10px", width:"50px"}}>
          <span
          >
            <img src={EditIcon} alt="img" />
          </span>
         <span style={{cursor:"pointer"}} onClick={()=>handleShow(record)} 
              >{ record?.hidden ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}</span>
        </div>
      ),
    },
  ];
const handleGetAll = ()=>{
  db.get("retrieves", function (err, value) {
    setRetrieves(value ? JSON.parse(value) : []);
  });
}
  const handleShow = (record) => {
    let allRetrives = [...retrieves];
    const hidden = record.hidden ? 0 : 1;
    const index = allRetrives.findIndex((item) => item.id === record.id);
    allRetrives.splice(index, 1, { ...record, hidden });
    db.put("retrieves", JSON.stringify(allRetrives));
    handleGetAll();
  };


  useEffect(() => {
    db.get("retrieves", function (err, value) {
      setRetrieves(value ? JSON.parse(value) : []);
    });
  }, []);

  console.log(retrieves);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>قائمة المرتجعات</h4>
            </div>
            {/* <div className="page-btn">
              <Link
                // to="/dream-pos/return/addsalesreturn-return"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافة مرتجع مبيعات جديد
              </Link>
            </div> */}
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
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
              <ModalContent
                isOpen={modalOpen}
                setOpen={setModalOpen}
                header="بيانات الذهب المدفوع"
              >
                <div style={{marginTop:"50px"}}>
                   <Table
                  isPaginatoin={false}
                  columns={columns2}
                  dataSource={currentRecored?.goldItems}
                />
                </div>
               
              </ModalContent>
              <div className="table-responsive">
                <Table
                  isPaginatoin={true}
                  columns={columns}
                  dataSource={retrieves}
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default Retrives;
