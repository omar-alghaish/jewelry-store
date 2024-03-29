/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import Swal from "sweetalert2";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { span } from "react-router-dom";
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

const TransferList = () => {
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

  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
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
          title: "تم المسح",
          text: "لقد تم حذف الملف الخاص بك",
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
      date: "19 Nov 2022",
      reference: "TR0101",
      from: "Store1",
      paid: "Store2",
      items: "10.00",
      order_tax:'12',
      discount:'23',
      shipping:'231',
      product_name:'حلق',
      description:'descripiton',
      to:'store2',
      grandTotal: "1550",
      status: "Completed",
    },
    {
      id: 2,
      date: "19 Nov 2022",
      product_name:'حلق',
      reference: "TR0102",
      from: "Store1",
      paid: "Store2",
      items: "10.00",
      order_tax:'12',
      discount:'23',
      shipping:'231',
      description:'descripiton',
      grandTotal: "4599",
      to:'store2',
      status: "Completed",
    },
    {
      id: 3,
      product_name:'حلق',
      date: "19 Nov 2022",
      reference: "TR0103",
      from: "Store1",
      paid: "Store2",
      order_tax:'12',
      discount:'23',
      shipping:'231',
      description:'descripiton',
      to:'store2',
      items: "10.00",
      grandTotal: "780",
      status: "Completed",
    },
    {
      id: 4,
      date: "19 Nov 2022",
      reference: "TR0104",
      from: "Store1",
      paid: "Store2",
      product_name:'حلق',
      order_tax:'12',
      to:'store2',
      discount:'23',
      shipping:'231',
      description:'descripiton',
      items: "10.00",
      grandTotal: "550",
      status: "Pending",
    },
    {
      id: 5,
      date: "19 Nov 2022",
      reference: "TR0105",
      product_name:'حلق',
      from: "Store1",
      paid: "Store2",
      order_tax:'12',
      to:'store2',
      discount:'23',
      shipping:'231',
      description:'descripiton',
      items: "10.00",
      grandTotal: "550",
      status: "Completed",
    },
  ]);

  const columns = [
    {
      title: "التاريخ",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "الرقم المرجعى",
      dataIndex: "reference",
      sorter: (a, b) => a.reference.length - b.reference.length,
    },
    {
      title: "من",
      dataIndex: "from",
      sorter: (a, b) => a.from.length - b.from.length,
    },
    {
      title: "المدفوع",
      dataIndex: "paid",
      sorter: (a, b) => a.paid.length - b.paid.length,
    },
    // {
    //   title: "Items",
    //   dataIndex: "items",
    //   sorter: (a, b) => a.items.length - b.items.length,
    // },
    {
      title: "السعر الكلى",
      dataIndex: "grandTotal",
      sorter: (a, b) => a.grandTotal.length - b.grandTotal.length,
    },
    {
      title: "الحاله",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={
            text === "Completed"
              ? "badges bg-lightgreen"
              : text == "Pending"
              ? "badges bg-lightred"
              : "badges bg-lightyellow"
          }
        >
          {
              text === "Completed"
              ? "مكتمل"
              : text == "Pending"
              ? "فى الإنتظار"
              : "badges bg-lightyellow"
          }
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "الأوامر",
      render: (_,record) => (
        <>
          <span
            style={{ cursor:'pointer' }}
            className="me-3"
            onClick={()=>{
              history.push("/dream-pos/transfer/edittransfer-transfer",{trans:record});
            }}
          >
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
              <h4>قائمة النقل</h4>
              <h6>نقل الأسهم الخاصة بك إلى متجر واحد متجر آخر</h6>
            </div>
            <div className="page-btn">
              <span
                onClick={()=>{
                  history.push("/dream-pos/transfer/addtransfer-transfer");
                }}
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافة نقل
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
export default TransferList;
