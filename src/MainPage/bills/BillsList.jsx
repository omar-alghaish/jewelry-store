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
import ModalContent from "./Modal";
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

const BillsList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [moves, setMoves] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrendRecord] = useState({});
  const [bills, setBills] = useState([]);
  const dispatch = useDispatch();
  const handleGetAll = () => {
    db.get("bills", function (err, value) {
      setMoves(value ? JSON.parse(value) : []);
    });
  };
  const handleShow = (record) => {
    let allBils = [...moves];
    const hidden = record.hidden ? 0 : 1;
    const index = allBils.findIndex((item) => item.id === record.id);
    allBils.splice(index, 1, { ...record, hidden });
    db.put("bills", JSON.stringify(allBils));
    handleGetAll();
  };
  useEffect(() => {
    // 1) Create our store    d
    db.get("bills", function (err, value) {
      setMoves(value ? JSON.parse(value) : []);
    });
  }, []);

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const history = useHistory();

  const columns = [
    {
      title: "رقم العميل",
      dataIndex: "customer_Number",
    },
    {
      title: "اسم العميل",
      dataIndex: "customer_name",
    },
    {
      title: "نوع العمليه",
      dataIndex: "operation_type",
    },
    {
      title: "النوع",
      dataIndex: "Type",
    },
    {
      title: "الفرع",
      dataIndex: "Sales_Center",
    },
    {
      title: "نوع العميل",
      dataIndex: "Buyer_Type",
    },

    {
      title: "تفاصيل",
      render: (_, record) => (
        <div>
          <button
            className="btn btn-submit me-2"
            style={{ width: "100px" }}
            onClick={() => {
              setBills(record.bills);
              setOpenPay(true);
              setCurrendRecord(record);
            }}
          >
            عرض
          </button>
        </div>
      ),
    },
    {
      title: "أوامر",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px", width: "max-content" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/dream-pos/moves/edit-move", {
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

  const columns2 = [
    {
      title: "العيار",
      dataIndex: "Caliber",
    },
    {
      title: "سعر بيع جرام/حبه",
      dataIndex: "Gram/Sold_Item_Price",
    },
    {
      title: "اجور الجرام",
      dataIndex: "Gram_Fees",
    },
    {
      title: "سعر الجرام",
      dataIndex: "Gram_Price",
    },
    {
      title: "اسم المنتج",
      dataIndex: "Item_Name",
    },
    {
      title: "رقم العمليه",
      dataIndex: "Item_Number",
    },
    {
      title: "الكميه",
      dataIndex: "Quantity",
    },
    {
      title: "وزن الحجر",
      dataIndex: "Stone_Weight",
    },
    {
      title: "اجمالي الوزن",
      dataIndex: "Total_Weight",
    },
    {
      title: "الاجمالي",
      dataIndex: "Total",
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
              <h4>قائمه الفواتير </h4>
              <h6>عرض وبحث فى القائمة</h6>
            </div>
            <div className="page-btn">
              <Link to="/dream-pos/bills/add-bills" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافه فاتوره
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                data={moves}
              />
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
                {moves && moves?.length ? (
                  <>
                    <Table
                      columns={columns}
                      dataSource={moves}
                      isPaginatoin={true}
                    />
                    <ModalContent setOpen={setOpenPay} isOpen={openPay}>
                        <div style={{paddingTop:"100px"}}>
                            <Table
                        columns={columns2}
                        dataSource={bills}
                        isPaginatoin={true}
                      />   
                        </div>
                   
                    </ModalContent>
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
export default BillsList;
