/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
// import { Calibers } from "../../assets/data/Calibers";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import leveljs from "level-js";
import { addItem } from "../../stroe/reducers/editItemReducer";
const levelup = require("levelup");
// import { Calibers } from "../../assets/data/Calibers";
const db = levelup(leveljs("./db"));

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


const Moves7 = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [store, setstore] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrendRecord] = useState({});

  const dispatch = useDispatch();
  const handleGetAll = () => {
    db.get("stores", function (err, value) {
      setstore(value ? JSON.parse(value) : []);
    });
  };

  console.log(store)
  const handleShow = (record) => {
    let allstore = [...store];
    const hidden = record.hidden ? 0 : 1;
    const index = allstore.findIndex((item) => item.id === record.id);
    allstore.splice(index, 1, { ...record, hidden });
    db.put("stores", JSON.stringify(allstore));
    handleGetAll();
  };
  useEffect(() => {
    // 1) Create our store    d
    db.get("stores", function (err, value) {
      setstore(value ? JSON.parse(value) : []);
    });
  }, []);
console.log(store)
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const history = useHistory();

  const columns = [
    {
      title: "رقم",
      dataIndex: "id",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "الفئه",
      dataIndex: "category",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "رقم المورد",
      dataIndex: "customer_Number",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "اسم المورد",
      dataIndex: "customer_name",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "هاتف المورد",
      dataIndex: "customer_phone",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "التاريخ",
      dataIndex: "documentDate",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "النوع",
      dataIndex: "documentType",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
        title: "الوزن",
        dataIndex: "weight",
        sorter: (a, b) => a.createdBy.length - b.createdBy.length,
      },
  
    {
      title: "نوع العنصر",
      dataIndex: "itemType",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "اسم المنتج",
      dataIndex: "productName",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "الكميه",
      dataIndex: "quantity",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
        title: "الدفعه المبدأيه",
        dataIndex: "initialPayment",
        sorter: (a, b) => a.description.length - b.description.length,
      },
    {
      title: "الاجمالي",
      dataIndex: "total",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
   
    {
      title: "أوامر",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px",width:"max-content" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("", {
                  catdata: record,
                });
                dispatch(addItem(record));
              }}
              className="me-3"
            >
              <img src={EditIcon} alt="img" />
            </span>
            <Link
              className="confirm-text"
              to="#"
              onClick={() => {
                handleShow(record);
              }}
            >
              {delloading.id == record?.caliber_id && delloading.loading ? (
                <Loader />
              ) : record?.hidden ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </Link>
          </div>
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
              <h4>قائمه المخزن </h4>
              <h6>عرض وبحث فى القائمة</h6>
            </div>
            <div className="page-btn">
              <Link to="/dream-pos/store/add-to-store" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافه الي المخزن
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} data={store}/>
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
                            placeholder: "Choose Caliber",
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
                            placeholder: "Choose Sub Caliber",
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
                {store && store?.length ? (
                  <>
                    <Table columns={columns} dataSource={store} />
                 
                  </>
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
export default Moves7;
