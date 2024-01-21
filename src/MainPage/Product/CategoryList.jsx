/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
// import { Categories } from "../../assets/data/Categories";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import leveljs from 'level-js';
const levelup = require('levelup');
// import { Categories } from "../../assets/data/Categories";
const db = levelup(leveljs('./db'));

const options = [
  { id: 1, text: "إختر فئه", text: "إختر فئه" },
  { id: 2, text: "الكمبيوترات", text: "الكمبيوترات" },
];
const options1 = [
  { id: 1, text: "إختر فئه فرعيه", text: "إختر فئه فرعيه" },
  { id: 2, text: "Fruits", text: "Fruits" },
];
const options2 = [
  { id: 1, text: "إختر ماركة فرعيه", text: "إختر ماركة فرعيه" },
  { id: 2, text: "ماركة", text: "ماركة" },
];

const CategoryList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [Categories, setCategories] = useState([]);
  const confirmText = (record) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showCancelButton: !0,
      cancelButtonText: 'لا',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    })
      .then(function (t) {
        let AllCategories = [...Categories];
        let newCategories = AllCategories.filter(
          (item) => item.id != record?.id
        );
        setCategories(AllCategories.filter((item) => item.id != record?.id));
        db.put("categories", JSON.stringify(newCategories));
        history.push("categorylist-product");
        toast.success("تمت الحذف بنجاح");
        setdelloading({
          id: null,
          loading: false,
        });
        const data_send = {
          category_id: record?.category_id,
        };
        axios
          .post("", JSON.stringify(data_send))
          .then((res) => {
            if (res.data.status == 'success') {
              toast.success(res.data.message);
            } else if (res.data.status == 'error') {
              toast.error(res.data.message);
            } else {
              toast.error("حدث خطأ ما");
            }
          })
          .catch((err) => console.log(err));
        // t.value &&
        //   Swal.fire({
        //     type: "success",
        //     title: "تم المسح!",
        //     text: "لقد تم حذف الملف الخاص بك",
        //     confirmButtonClass: "btn btn-success",
        //   });
      })
      .finally(() => {
        // setdelloading({
        //   id:null,
        //   loading:false
        // })
      });
  };
  useEffect(() => {
    // 1) Create our store    d
    db.get(
      'categories',

      function (err, value) {
        setCategories(value ? JSON.parse(value) : []);
      }
    );
  }, []);
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const history = useHistory();

  const columns = [
    {
      title: "الإسم",
      dataIndex: "name",
      render: (_, record) => {
        console.log(record?.image);
        return (
          <div className="productimgname">
            <Link to="#" className="product-img">
              <img
                alt=""
                src={
                  record?.catimg
                    ? record?.catimg
                    : require("../../assets/img/defultItem.jpg")
                }
              />
            </Link>
            <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
              {record?.category_name}
            </Link>
          </div>
        );
      },
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    // {
    //   title: "الكود",
    //   dataIndex: "cat_code",
    //   sorter: (a, b) => a.categoryCode.length - b.categoryCode.length
    // },
    {
      title: " وصف",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    // {
    //   title: "بواسطة",
    //   dataIndex: "created_by",
    //   sorter: (a, b) => a.createdBy.length - b.createdBy.length
    // },
    {
      title: "أوامر",
      render: (_, record) => (
        <>
          <>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push("/dream-pos/product/editcategory-product", {
                  catdata: record,
                });
              }}
              className="me-3"
            >
              <img src={EditIcon} alt="img" />
            </span>
            <Link
              className="confirm-text"
              to="#"
              onClick={() => {
                if (delloading.loading == false) {
                  setdelloading({
                    id: record?.category_id,
                    loading: true,
                  });
                  confirmText(record);
                }
              }}
            >
              {delloading.id == record?.category_id && delloading.loading ? (
                <Loader />
              ) : (
                <img src={DeleteIcon} alt="img" />
              )}
            </Link>
          </>
        </>
      ),
    },
  ];

  const [delloading, setdelloading] = useState({
    id: null,
    loading: false,
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>قائمه فئات المنتجات </h4>
              <h6>عرض وبحث فى المنتج</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/product/addcategory-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافه فئه
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
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Choose Category",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12 me-2">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options1}
                          options={{
                            placeholder: "Choose Sub Category",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <Select2
                          className="select"
                          data={options2}
                          options={{
                            placeholder: "Choose Sub Brand",
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
                {Categories && Categories?.length ? (
                  <Table columns={columns} dataSource={Categories} />
                ) : (
                  "لا يوجد بيانات"
                )}
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default CategoryList;
