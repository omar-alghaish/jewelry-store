/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
// import { span } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import Tabletop from "../../EntryFile/tabletop";
import "react-select2-wrapper/css/select2.css";
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
} from "../../EntryFile/imagePath";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";

const StoreList = () => {

  const history=useHistory()

  const [inputfilter, setInputfilter] = useState(false);

  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد",
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
          text: "لقد تم حذف المتجر الخاص بك.          ",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const options = [
    { id: 1, text: "Disable", text: "Disable" },
    { id: 2, text: "Enable", text: "Enable" },
  ];
  const [data] = useState([
    {
      id: 1,
      storeName: "Thomas",
      userName: "Thomas71",
      phone: "+12163547758",
      email: "thomas@example.com",
      password:'222',
      avatar:require("../../assets/img/img-01.jpg"),
      status: true,
    },
    {
      id: 2,
      storeName: "Benjamin",
      userName: "Benjamin23",
      phone: "123-456-776",
      email: "benjamin@example.com",
      password:'222',
      avatar:require("../../assets/img/img-01.jpg"),
      status: false,
    },
    {
      id: 3,
      storeName: "James",
      userName: "James233",
      phone: "+123-890-876",
      password:'222',
      avatar:require("../../assets/img/img-01.jpg"),
      email: "james@example.com",
      status: false,
    },
    {
      id: 4,
      storeName: "Bruklin",
      userName: "Bruklin245",
      phone: "+123-876-876",
      password:'222',
      avatar:require("../../assets/img/img-01.jpg"),
      email: "bruklin@example.com",
      status: true,
    },
    {
      id: 5,
      storeName: "Franklin",
      userName: "Franklin898",
      phone: "+0987652112",
      password:'222',
      avatar:require("../../assets/img/img-01.jpg"),
      email: "beverly@example.com",
      status: false,
    },
  ]);

  const columns = [
    {
      title: "إسم المتجر",
      dataIndex: "storeName",
      sorter: (a, b) => a.storeName.length - b.storeName.length,
    },
    {
      title: "إسم المدير",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
    },
    {
      title: "رقم الهاتق",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "البريد الإلكترونى",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "الحاله",
      dataIndex: "status",
      key: "status",
      render: (e, record) => (
        <div className="status-toggle d-flex justify-content-between align-items-center">
          <input
            type="checkbox"
            id="user18"
            className="check"
            defaultChecked={e}
          />
          <label onClick={()=>{
            handlechangesatus(record)
          }} htmlFor="user18" className="checktoggle">
            checkbox
          </label>
        </div>
      ),
    },
    {
      title: "الأوامر",
      render: (_,record) => (
        <>
          <span style={{cursor:'pointer'}} className="me-3" onClick={()=>{
            history.push("/dream-pos/people/editstore-people",{store:record})
          }}>
            <img src={EditIcon} alt="img" />
          </span>
          <span style={{cursor:'pointer'}} className="confirm-text" to="#" onClick={confirmText}>
            <img src={DeleteIcon} alt="img" />
          </span>
        </>
      ),
    },
  ];
  const handlechangesatus=(record)=>{
    const data_send={
      status:record?.status=='1'?'0':'1',
      id:record?.id,
    }
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else [
        toast.error("حدث خطأ ما")
      ]
    })
    .catch(err=>console.log(err))
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>قائمة المتاجر</h4>
              <h6>أدر متاجرك</h6>
            </div>
            <div className="page-btn">
              <span onClick={()=>{
                history.push("/dream-pos/people/addstore-people")
              }} className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف متجر
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
                        <input type="text" placeholder="Enter User Name" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Phone" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Email" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Disable",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-1 col-sm-6 col-12 ms-auto">
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
export default StoreList;
