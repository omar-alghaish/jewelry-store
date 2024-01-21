/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Tabletop from "../../EntryFile/tabletop";
import Swal from "sweetalert2";
import leveljs from "level-js";
const levelup = require("levelup");
import "react-datepicker/dist/react-datepicker.css";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Eye1,
  Calendar,
  Printer,
  search_whites,
  Search,
  PlusIcon,
  EditIcon,
  Dollar1,
  plusCircle,
  Download,
  delete1,
  DeleteIcon,
  datepicker,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment/moment";

const SalesList = (props) => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const [orders, setOrders] = useState([]);
  const [paidData, setPaidData] = useState({});
  const togglefilter = (value) => {
    setInputfilter(value);
  };
// console.log(or)
  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الملف الخاص بك",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const options = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Paid", text: "Paid" },
  ];
  const options1 = [
    { id: 1, text: "Cash", text: "Cash" },
    { id: 2, text: "Online", text: "Online" },
    { id: 3, text: "Inprogess", text: "Inprogess" },
  ];
  const db = levelup(leveljs("./db"));
  const [data, setData] = useState([]);
console.log(data)
  useEffect(() => {
    db.get("orders", function (err, value) {
      setData(value ? JSON.parse(value) : []);
    });
  }, []);

  const columns = [
    {
      title: "إسم العميل",
      dataIndex: "client_name",
      // sorter: (a, b) => a.Date.length - b.Date.length
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(text?.date).format("yy-mm-dd hh:mm:ss")}</>
      ),
      // sorter: (a, b) => a.Name.length - b.Name.length
    },
    {
      title: "الرقم المرجعى",
      dataIndex: "id",
      // sorter: (a, b) => a.Reference.length - b.Reference.length
    },
    {
      title: "اسم البائع",
      dataIndex: "sellerName",
    },
    {
      title: "تليفون البائع",
      dataIndex: "sellerMobile",
    },

    // {
    //   title: "الدفع",
    //   dataIndex: "Payment",
    //   render: (text, record) => (
    //     <>
    //       {text === "Paid" && (
    //         <span className="badges bg-lightgreen">مدفوع</span>
    //       )}
    //       {text === "Due" && (
    //         <span className="badges bg-lightred">غير مدفوع</span>
    //       )}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Payment.length - b.Payment.length
    // },
    {
      title: "الكلى",
      dataIndex: "grandPrice",
      render: (_, record) => {
        return (
          <b>
            {new Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "SAR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(record?.grandPrice)}
          </b>
        );
      },
    },
    // {
    //   title: "المدفوع",
    //   dataIndex: "Paid",
    //   render: (text, record) => (
    //     <>
    //       {text === 100 && <div className="text-green">{text}</div>}
    //       {text === 0 && <div>{text}</div>}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Paid.length - b.Paid.length
    // },
    // {
    //   title: "الباقى",
    //   dataIndex: "Due",
    //   render: (text, record) => (
    //     <>
    //       {text === 100 && <div className="text-red">{text}</div>}
    //       {text === 0 && <div>{text}</div>}
    //     </>
    //   ),
    //   sorter: (a, b) => a.Due.length - b.Due.length
    // },
    // {
    //   title: "من خلال",
    //   dataIndex: "Biller",
    //   sorter: (a, b) => a.Biller.length - b.Biller.length
    // },
    {
      title: "أوامر",
      render: (text, record) => (
        <>
          <div className="text-center">
            <span
              className="action-set"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </span>
            <ul className="dropdown-menu">
              <li>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/dream-pos/sales/sales-details", {
                      sale: record,
                    });
                  }}
                  className="dropdown-item"
                >
                  <img src={Eye1} className="me-2" alt="img" />
                  تفاصيل البيع
                </span>
              </li>
              {/* <li
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push("/dream-pos/sales/edit-sales", {
                    saledata: record
                  });
                }}
              >
                <span className="dropdown-item">
                  <img src={EditIcon} className="me-2" alt="img" />
                  تعديل البيع
                </span>
              </li>
              <li>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setPaidData(record);
                  }}
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#showpayment"
                >
                  <img src={Dollar1} className="me-2" alt="img" />
                  إظهار المدفوعات
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#createpayment"
                >
                  <img src={plusCircle} className="me-2" alt="img" />
                  إنشاء الدفع
                </span>
              </li>
              {/* <li>
                <Link  className="dropdown-item">
                  <img src={Download} className="me-2" alt="img" />
                  Download pdf
                </Link>
              </li> */}
              {/* <li>
                <span
                  className="dropdown-item confirm-text"
                  onClick={confirmText}
                >
                  <img src={delete1} className="me-2" alt="img" />
                  حذف البيع
                </span>
              </li>  */}
            </ul>
          </div>
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
              <h4>قائمة المبيعات</h4>
              <h6>أدر مبيعاتك</h6>
            </div>
            <div className="page-btn">
              <Link to="/dream-pos/sales/add-sales" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف المبيعات
              </Link>
            </div>
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
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Name" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Reference No" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Choose Suppliers",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <Link className="btn btn-filters ms-auto">
                          <img src={search_whites} alt="img" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Filter */}
              <div className="table-responsive">
                <Table props={props} columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <>
        <div
          className="modal fade"
          id="showpayment"
          tabIndex={-1}
          aria-labelledby="showpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">إظهار المدفوعات</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>التاريخ</th>
                        <th>الرقم المرجعى</th>
                        <th>الكميه </th>
                        <th>تم الدفع من خلال </th>
                        <th>أوامر </th>
                      </tr>
                    </thead>
                    {console.log(paidData)}
                    <tbody>
                      <tr className="bor-b1">
                        <td>{paidData.Date} </td>
                        <td>{paidData.Reference}</td>
                        <td>{paidData.quantity}</td>
                        <td>{paidData.pay_by}</td>
                        <td>
                          <Link className="me-2">
                            <img src={Printer} alt="img" />
                          </Link>
                          <Link
                            className="me-2"
                            data-bs-target="#editpayment"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                          >
                            <img src={EditIcon} alt="img" />
                          </Link>
                          <Link className="me-2 confirm-text">
                            <img src={DeleteIcon} alt="img" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* show payment Modal */}
        <div
          className="modal fade"
          id="createpayment"
          tabIndex={-1}
          aria-labelledby="createpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Customer</label>
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input type="text" defaultValue="INV/SL0101" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Received Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Paying Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Payment type</label>
                      <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Note</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* show payment Modal */}
        {/* edit payment Modal */}
        <div
          className="modal fade"
          id="editpayment"
          tabIndex={-1}
          aria-labelledby="editpayment"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Payment</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Customer</label>
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={datepicker} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Reference</label>
                      <input type="text" defaultValue="INV/SL0101" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Received Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Paying Amount</label>
                      <input type="text" defaultValue={0.0} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Payment type</label>
                      <Select2
                        className="select"
                        data={options1}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <label>Note</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SalesList;
