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

const ReceiptsList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const [moves, setMoves] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrendRecord] = useState({});
  const [bills, setBills] = useState([]);

  const [data, setData] = useState([]);
  // const [bills, setbills] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [customerNumber, setCustomerNumber] = useState();
  const [billNumber, setBillNumber] = useState("");

  const [endTime, setEndTime] = useState("");
  const [startMove, setStartMove] = useState("");
  const [endMove, setEndMove] = useState("");
  const [movementTypeFilter, setMovementTypeFilter] = useState("");
  const [mainData, setMainData] = useState([]);

  const dispatch = useDispatch();
  const handleGetAll = () => {
    db.get("receipts", function (err, value) {
      setBills(value ? JSON.parse(value) : []);
    });
  };
  const handleShow = (record) => {
    let allBils = [...bills];
    const hidden = record.hidden ? 0 : 1;
    const index = allBils.findIndex((item) => item.id === record.id);
    allBils.splice(index, 1, { ...record, hidden });
    db.put("receipts", JSON.stringify(allBils));
    handleGetAll();
  };

  const shouldDisplayData =
    customerNumber || billNumber ||
    (startTime && endTime) ||
    (startMove && endMove) ||
    movementTypeFilter;
  console.log(bills);
  const applyFilters = () => {
    let filteredData = [...bills];

    if (customerNumber) {
      filteredData = filteredData.filter((item) => {
        return item.customer_Number == customerNumber;
      });
    }
    if (startTime && endTime) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.documentDate);
        const startFilterDate = new Date(startTime);
        const endFilterDate = new Date(endTime);
        return itemDate >= startFilterDate && itemDate <= endFilterDate;
      });
    }

    if (billNumber) {
        filteredData = filteredData.filter((item) => {
          return +item.id == +billNumber;
        });
      }

    // if (startMove && endMove) {
    //   filteredData = filteredData.filter(
    //     (item) => item.id >= parseInt(startMove) && item.id <= parseInt(endMove)
    //   );
    // }

    if (movementTypeFilter) {
      filteredData = filteredData.filter(
        (item) => item.operation_type === movementTypeFilter
      );
    }
    setData(filteredData);
  };
console.log(data)
  useEffect(() => {
    applyFilters();
  }, [bills, startTime, endTime, movementTypeFilter, customerNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      case "startMove":
        setStartMove(value);
        break;
      case "endMove":
        setEndMove(value);
        break;
      case "customer_Number":
        setCustomerNumber(value);
        break;
        case "billNumber":
        setBillNumber(value);
        break;
      case "movementTypeFilter":
        setMovementTypeFilter(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // 1) Create our store    d
    db.get("receipts", function (err, value) {
      setBills(value ? JSON.parse(value) : []);
    });
  }, []);

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const history = useHistory();

  const columns = [
    {
      title: "رقم المورد",
      dataIndex: "customer_Number",
    },
    {
      title: "اسم المورد",
      dataIndex: "customer_name",
    },
    {
      title: "",
      dataIndex: "customer_phone",
    },
    // {
    //   title: "اسم المشتري",
    //   dataIndex: "buyer_name",
    // },
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
      title: "الضريبه",
      dataIndex: "tax",
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
      title: " السعر قبل الضريبه",
      dataIndex: "priceBeforeTax",
    },
    {
      title: "اجمالي الوزن",
      dataIndex: "Total_Weight",
    },
    {
      title: "المتفق عليه",
      dataIndex: "agrement_price",
    },

    {
      title: "الاجمالي",
      dataIndex: "Total",
    },
    {
      title: "الاجمالي بعد الضريبه",
      dataIndex: "priceAfterTax",
    },
  ];
  console.log(moves);
  const [delloading, setdelloading] = useState({
    id: null,
    loading: false,
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="header1">
            <div className="time-row row">
              <div className="form-group equal-width">
                <label>من تاريخ</label>
                <input
                  type="date"
                  name="startTime"
                  value={startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>الي تاريخ</label>
                <input
                  type="date"
                  name="endTime"
                  value={endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* <div className="move-row row">
            <div className="form-group equal-width">
              <label>من حركه رقم</label>
              <input
                type="text"
                name="startMove"
                value={startMove}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>الي حركه رقم</label>
              <input
                type="text"
                name="endMove"
                value={endMove}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
            <div className="type-row row">
              <div className="form-group equal-width">
                <label>رقم العميل</label>
                <input
                  type="text"
                  name="customer_Number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>رقم الفاتوره</label>
                <input
                  type="text"
                  name="billNumber"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>نوع الفاتوره</label>
                <select
                  name="movementTypeFilter"
                  value={movementTypeFilter}
                  onChange={handleInputChange}
                >
                  <option value="فاتورة كسر">فاتورة كسر</option>
                  <option value="فاتورة اجور">فاتورة اجور</option>
                  <option value="اجل ذهب">اجل ذهب</option>
                </select>
              </div>
            </div>
            {shouldDisplayData && (
              <div>
                <Table
                  columns={columns}
                  dataSource={data}
                  isPaginatoin={true}
                />
                <ModalContent setOpen={setOpenPay} isOpen={openPay}>
                  <div style={{ paddingTop: "100px" }}>
                    <Table
                      columns={columns2}
                      dataSource={currentRecord.bills}
                      isPaginatoin={true}
                    />
                  </div>
                </ModalContent>
                {/* <div style={{ marginTop: "30px" }}>
                <button className="btn btn-submit me-2" onClick={submition}>
                  ترحيل
                </button>
              </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ReceiptsList;
