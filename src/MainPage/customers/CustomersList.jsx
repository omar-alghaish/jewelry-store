/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "./style/style.css";
import Table from "../../EntryFile/datatable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModalContent from "./Modal";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { useDispatch } from "react-redux";
import { EditIcon } from "../../EntryFile/imagePath";
import leveljs from "level-js";
import { Link } from "react-router-dom";
import { addItem } from "../../stroe/reducers/editItemReducer";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const Customer = () => {
  const [data, setData] = useState([]);
  // const [bills, setbills] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [startTime, setStartTime] = useState("");
  const [customerNumber, setCustomerNumber] = useState();
  const [endTime, setEndTime] = useState("");
  const [startMove, setStartMove] = useState("");
  const [endMove, setEndMove] = useState("");
  const [movementTypeFilter, setMovementTypeFilter] = useState("");
  const [mainData, setMainData] = useState([]);
  const [bills, setBills] = useState([]);
  const [moves, setMoves] = useState([])

  const dispatch = useDispatch();

  const shouldDisplayData = customerNumber;
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
      case "movementTypeFilter":
        setMovementTypeFilter(value);
        break;
      default:
        break;
    }
  };
  
  const handleGetAll = () => {
    db.get("movements", function (err, value) {
      setMoves(value ? JSON.parse(value) : []);
    });
  };
  const handleShow = (record) => {
    let allBils = [...bills];
    const hidden = record.hidden ? 0 : 1;
    const index = allBils.findIndex((item) => item.id === record.id);
    allBils.splice(index, 1, { ...record, hidden });
    db.put("bills", JSON.stringify(allBils));
    handleGetAll();
  };
  useEffect(() => {
    // 1) Create our store    d
    db.get("bills", function (err, value) {
      setBills(value ? JSON.parse(value) : []);
    });
  }, []);
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
              // setBills(record.bills);
              setOpenPay(true);
              setCurrentRecord(record);
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
              {record?.hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="header1">
          {/* <div className="time-row row">
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
          </div> */}
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
              <Table columns={columns} dataSource={data} isPaginatoin={true} />
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
  );
};

export default Customer;
