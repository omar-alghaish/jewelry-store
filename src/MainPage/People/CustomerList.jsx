/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop"
// import { span } from "react-router-dom";
import Swal from "sweetalert2";
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
  Thomas,
  Benjamin,
  James,
  Bruklin,
  Beverly,
} from "../../EntryFile/imagePath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const CustomerList = () => {

  const history=useHistory();

  const [inputfilter, setInputfilter] = useState(false);

  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText:'لا',
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الملف الخاص بك.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  // const [data] = useState([
  //   {
  //     id: 1,
  //     image: Thomas,
  //     customerName: "Thomas",
  //     code: "201",
  //     customer: "Thomas",
  //     phone: "+12163547758",
  //     city:'new Yourk',
  //     email: "thomas@example.com",
  //     address:'tanta',
  //     product_name:'حلق',
  //     country: "USA",
  //     description:'description',
  //   },
  //   {
  //     id: 2,
  //     image: Benjamin,
  //     customerName: "Benjamin",
  //     code: "202",
  //     customer: "Benjamin",
  //     product_name:'حلق',
  //     address:'tanta',
  //     phone: "123-456-776",
  //     email: "benjamin@example.com",
  //     city:'new Yourk',
  //     description:'description',
  //     country: "Germany",
  //   },
  //   {
  //     id: 3,
  //     image: James,
  //     product_name:'حلق',
  //     customerName: "James",
  //     address:'tanta',
  //     code: "203",
  //     customer: "James",
  //     phone: "+123-890-876",
  //     city:'new Yourk',
  //     email: "james@example.com",
  //     description:'description',
  //     country: "Tailand",
  //   },
  //   {
  //     id: 4,
  //     address:'tanta',
  //     image: Bruklin,
  //     product_name:'حلق',
  //     customerName: "Bruklin",
  //     code: "204",
  //     customer: "Bruklin",
  //     phone: "+123-876-876",
  //     city:'new Yourk',
  //     email: "bruklin@example.com",
  //     description:'description',
  //     country: "Angola",
  //   },
  //   {
  //     id: 5,
  //     image: Beverly,
  //     customerName: "Beverly",
  //     address:'tanta',
  //     code: "205",
  //     city:'new Yourk',
  //     customer: "Beverly",
  //     product_name:'حلق',
  //     phone: "+0987652112",
  //     email: "beverly@example.com",
  //     country: "Albania",
  //     description:'description',
  //   },
  // ]);
  const data = useSelector((state) => state.client?.clients);


  const columns = [
    {
      title: "إسم العميل",
      dataIndex: "customerName",
      render: (text, record) => (
        <div className="productimgname">
          {/* <span  style={{ width: "30%" }} className="product-img"> */}
            {/* <img alt="" src={record?.image} /> */}
          {/* </span> */}
          <span  style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.name}
          </span>
        </div>
      ),
      sorter: (a, b) => a.customerName.length - b.customerName.length,
      width: "170px",
    },
    // {
    //   title: "الكود",
    //   dataIndex: "code",
    //   sorter: (a, b) => a.code.length - b.code.length,
    // },
    // {
    //   title: "المنتج",
    //   dataIndex: "product_name",
    //   sorter: (a, b) => a.customer.length - b.customer.length,
    // },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    // {
    //   title: "البريد الإلكترونى",
    //   dataIndex: "email",
    //   sorter: (a, b) => a.email.length - b.email.length,
    // },
    // {
    //   title: "البلد",
    //   dataIndex: "country",
    //   sorter: (a, b) => a.country.length - b.country.length,
    // },
    {
      title: "الأوامر",
      render: (_,record) => (
        <>
          <span onClick={()=>{
            history.push("/dream-pos/people/editcustomer-people",{customer:record})
          }} style={{ cursor:'pointer' }} className="me-3" >
            <img src={EditIcon} alt="img" />
          </span>
          <span style={{ cursor:'pointer' }} className="confirm-text"  onClick={confirmText}>
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
              <h4>قائمة العملاء</h4>
              <h6>أدر عملائك</h6>
            </div>
            <div className="page-btn">
              <span
                onClick={()=>{
                  history.push("/dream-pos/people/addcustomer-people")
                }}
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف عميل
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
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Customer Code" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Customer Name" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Phone Number" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Email" />
                      </div>
                    </div>
                    <div className="col-lg-1 col-sm-6 col-12  ms-auto">
                      <div className="form-group">
                        <a className="btn btn-filters ms-auto">
                          <img src={search_whites} alt="img" />
                        </a>
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
export default CustomerList;
