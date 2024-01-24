/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/deportaion.css";
import Table from "../../EntryFile/datatable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModalContent from "./Modal";
import Details from "./Detail";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { useDispatch } from "react-redux";
import { EditIcon } from "../../EntryFile/imagePath";
import leveljs from "level-js";
import { Link } from "react-router-dom";
import { addItem } from "../../stroe/reducers/editItemReducer";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const Deportation = () => {
  const [data, setData] = useState([]);
  const [moves, setMoves] = useState([]);
  const [openPay, setOpenPay] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startMove, setStartMove] = useState("");
  const [endMove, setEndMove] = useState("");
  const [movementTypeFilter, setMovementTypeFilter] = useState("");
  const [mainData, setMainData] = useState([]);
  const dispatch = useDispatch();
  const handleGetAll = () => {
    db.get("movements", function (err, value) {
      setMoves(value ? JSON.parse(value) : []);
    });
  };

  const handleShow = (record) => {
    let allMoves = [...moves];
    const hidden = record.hidden ? 0 : 1;
    const index = allMoves.findIndex((item) => item.id === record.id);
    allMoves.splice(index, 1, { ...record, hidden });
    db.put("movements", JSON.stringify(allMoves));
    handleGetAll();
  };

  const shouldDisplayData =
    (startTime && endTime) || (startMove && endMove) || movementTypeFilter;

  const applyFilters = () => {
    let filteredData = [...moves];

    // Apply time filters
    if (startTime && endTime) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.documentDate);
        const startFilterDate = new Date(startTime);
        const endFilterDate = new Date(endTime);
        return itemDate >= startFilterDate && itemDate <= endFilterDate;
      });
    }

    // Apply move number filters
    if (startMove && endMove) {
      filteredData = filteredData.filter(
        (item) => item.id >= parseInt(startMove) && item.id <= parseInt(endMove)
      );
    }

    // Apply movement type filter
    if (movementTypeFilter) {
      filteredData = filteredData.filter(
        (item) => item.movementType === movementTypeFilter
      );
    }

    setData(filteredData);
  };

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
      case "movementTypeFilter":
        setMovementTypeFilter(value);
        break;
      default:
        break;
    }
  };
  const submition = () => {
    const updatedData = [...mainData, ...data];
    db.put("mainData", JSON.stringify(updatedData), function (err) {
      if (err) {
        console.error("Error saving to database", err);
        toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
      } else {
        toast.success("تمت الإضافة بنجاح");
      }
    });
  };
  console.log(mainData);
  useEffect(() => {
    db.get("mainData", function (err, value) {
      setMainData(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [moves, startTime, endTime, startMove, endMove, movementTypeFilter]);

  const columns = [
    {
      title: " الفرع",
      dataIndex: "branchName",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    // {
    //   title: "شيك",
    //   dataIndex: "check",
    //   sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    // },
    {
      title: "الوصف",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "الفارق",
      dataIndex: "difference",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "نوع الحركه",
      dataIndex: "movementType",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "نوع السند",
      dataIndex: "movementType",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "رقم الحساب",
      dataIndex: "accountNumber",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "القسم",
      dataIndex: "section",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "الفارق",
      dataIndex: "difference",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "نوع",
      dataIndex: "customerType",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "اجمال عمله محليه",
      dataIndex: "totalLocalCurrency",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    // {
    //   title: "اجمالي ذهب عيار21",
    //   dataIndex: "totalWeight21",
    //   sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    // },
    {
      title: "تفاصيل",
      render: (_, record) => (
        <div>
          <button
            className="btn btn-submit me-2"
            style={{ width: "100px" }}
            onClick={() => {
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
          <div style={{ display: "flex", gap: "20px",width:"max-content" }}>
            {/* <span
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
            </span> */}
            <Link
              className="confirm-text"
              to="#"
              onClick={() => {
                handleShow(record);
              }}
            >
              {
               record?.hidden ? (
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
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="header1">
                  <h3>ترحيل حركات</h3>

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
          <div className="move-row row">
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
          </div>
          <div className="type-row row">
            <div className="form-group equal-width">
              <label>نوع الحركه</label>
              <select
                name="movementTypeFilter"
                value={movementTypeFilter}
                onChange={handleInputChange}
              >
                <option value="حركة صرف">حركة صرف</option>
                <option value="حركة قبض">حركة قبض</option>
                <option value="حركه نقديه">حركه نقديه</option>
              </select>
            </div>
          </div>
          {data.length > 0 && shouldDisplayData && (
            <div>
              <Table columns={columns} dataSource={data} isPaginatoin={true} />
              <ModalContent setOpen={setOpenPay} isOpen={openPay}>
                <Details data={currentRecord} />
              </ModalContent>
              <div style={{ marginTop: "30px" }}>
                <button className="btn btn-submit me-2" onClick={submition}>
                  ترحيل
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deportation;
