/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  MacbookIcon,
  search_whites,
  Samsung,
  EarpodIcon,
  OrangeImage,
  PineappleImage,
  Adidas,
  Colgate,
  EyeIcon,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BrandList = () => {
  const history=useHistory();
  const [inputfilter, setInputfilter] = useState(false);
  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmText = () => {
    Swal.fire({
      title: "هل  أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:'إلغاء',
      confirmButtonText: "نعم، احذفه!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الماركه الخاص بك.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };

  const [data] = useState([
    {
      id: 1,
      image: require("../../assets/Golds/gold1.jpg"),
      brandName: "كارتييه",
      brandDescription: "تعتبر كارتييه من العلامات العريقة في صناعة المجوهرات الملكية",
    },
    {
      id: 2,
      image: require("../../assets/Golds/gold3.jpg"),
      brandName: "لوڤ",
      brandDescription: "تحمل معنى مميز يرمز إلى الحب المتحرر من القيود",
    },
    {
      id: 3,
      image: require("../../assets/Golds/gold5.jpg"),
      brandName: "آن كلو",
      brandDescription: "تعتبر هذه المجموعة أيضاً من المجموعات الشهيرة في كارتييه",
    },
  ]);
  const columns = [
    {
      title: "صوره",
      dataIndex: "image",
      className: "text-center",
      render: (text, record) => (
        <Link to="#" className="product-img text-center">
          <img
            alt=""
            src={record?.image}
            style={{ height: "40px", width: "40px" }}
          />
        </Link>
      ),
      sorter: (a, b) => a.image.length - b.image.length,
      width: "150px",
    },
    {
      title: "إسم الماركه",
      dataIndex: "brandName",
      sorter: (a, b) => a.brandName.length - b.brandName.length,
    },
    {
      title: "وصف الماركه",
      dataIndex: "brandDescription",
      sorter: (a, b) => a.brandDescription.length - b.brandDescription.length,
    },
    {
      title: "أوامر",
      render: (_,record) => (
        <>
          <>
            <span style={{ cursor:'pointer' }} onClick={()=>{
              history.push("/dream-pos/product/editbrand-product",{brandData:record})
            }} className="me-3">
              <img src={EditIcon} alt="img" />
            </span>
            <Link className="confirm-text" to="#" onClick={confirmText}>
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
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
              <h4>إسم الماركه</h4>
              <h6>أدر ماركاتك</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/product/addbrand-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافة الماركه
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
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="form-group">
                            <input type="text" placeholder="Enter Brand Name" />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Enter Brand Description"
                            />
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
export default BrandList;
