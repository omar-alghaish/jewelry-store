/* eslint-disable no-dupe-else-if */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PlusIcon, EditIcon, search_whites } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import "./style/main.css";
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

const AccountsList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [data, setdata] = useState([]);
  const [bills, setBills] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrendRecord] = useState({});
  const [filters, setFilters] = useState({ value: "الجميع" });

  const dispatch = useDispatch();
  const handleGetAll = (value) => {
    setFilters({ value });
    console.log(value);
    console.log(data);
    if (value === "واردات") {
      setdata(receipts);
    } else if (value === "مبيعات") {
      setdata(bills);
    } else if (value === "الجميع") {
      setdata([...bills, ...receipts]);
    }
  };
  //   const handleShow = (record) => {
  //     let alldata = [...data];
  //     const hidden = record.hidden ? 0 : 1;
  //     const index = alldata.findIndex((item) => item.id === record.id);
  //     alldata.splice(index, 1, { ...record, hidden });
  //     db.put("movements", JSON.stringify(alldata));
  //     handleGetAll();
  //   };
  useEffect(() => {
    db.get("receipts", function (err, value) {
      setReceipts(value ? JSON.parse(value) : []);
    });
    db.get("bills", function (err, value) {
      setBills(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(()=>{
        setdata([...receipts, ...bills]);

  },[bills,receipts])

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const history = useHistory();

  const columns = [
    {
      title: "رقم الحساب",
      dataIndex: "id",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "العمله",
      dataIndex: "coin",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "مدين عمله محليه",
      dataIndex: "debtorLocalCurrency",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "دائن عمله محليه",
      dataIndex: "localCurrencyCredit",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "مدين عمله اجنبيه",
      dataIndex: "debtorForeignCurrency",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "دائن عمله اجنبيه",
      dataIndex: "foreignCurrencyCredit",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "اسم الحساب",
      dataIndex: "operation_type" || "Type" || "type",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    // {
    //   title: "أوامر",
    //   render: (_, record) => (
    //     <>
    //       <div style={{ display: "flex", gap: "20px", width: "max-content" }}>
    //         <span
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             history.push("/dream-pos/data/edit-move", {
    //               catdata: record,
    //             });
    //             dispatch(addItem(record));
    //           }}
    //           className="me-3"
    //         >
    //           <img src={EditIcon} alt="img" />
    //         </span>
    //         <Link
    //           className="confirm-text"
    //           to="#"
    //           onClick={() => {
    //             handleShow(record);
    //           }}
    //         >
    //           {delloading.id == record?.caliber_id && delloading.loading ? (
    //             <Loader />
    //           ) : record?.hidden ? (
    //             <VisibilityOffIcon />
    //           ) : (
    //             <VisibilityIcon />
    //           )}
    //         </Link>
    //       </div>
    //     </>
    //   ),
    // },
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
              <h4>قائمه الحسابات </h4>
              <h6>عرض وبحث فى القائمة</h6>
            </div>

            <div className="page-btn">
              <Link to="/dream-pos/data/move7" className="btn btn-added">
                <img src={PlusIcon} alt="img" className="me-1" />
                إضافه حركه
              </Link>
            </div>
          </div>
          <div className="header2">
            <div className="form-group input-container">
              <label>مجموعة الحساب</label>
              <input type="text" />
            </div>
            <div className="form-group input-container">
              <label>نوع الحساب</label>
              <select
                name="filter"
                onChange={(e) => handleGetAll(e.target.value)}
              >
                <option value="واردات">شراء</option>
                <option value="مبيعات">بيع</option>
                <option value="الجميع">الجميع</option>
              </select>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop
                inputfilter={inputfilter}
                togglefilter={togglefilter}
                data={data}
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
                {data && data?.length ? (
                  <div>
                    <Table columns={columns} dataSource={data} />

                    <ModalContent
                      setOpen={setOpenPay}
                      isOpen={openPay}
                    ></ModalContent>
                  </div>
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
export default AccountsList;
