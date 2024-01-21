/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { Link, span } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ClosesIcon,
  Noimage,
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
import { useDispatch } from "react-redux";
import { addItem } from "../../stroe/reducers/editItemReducer";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import leveljs from "level-js";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const SupplierList = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [inputfilter, setInputfilter] = useState(false);
  const [allSuppliers, setAllSuppliers] = useState([]);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const handleGetAll = () => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  };
  const handleShow = (record) => {
    let allData = [...allSuppliers];
    const hidden = record.hidden ? 0 : 1;
    const index = allData.findIndex((item) => item.id === record.id);
    allData.splice(index, 1, { ...record, hidden });
    db.put("suppliers", JSON.stringify(allData));
    handleGetAll();
  };

  useEffect(() => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  }, []);

  console.log(allSuppliers);
  const columns = [
    {
      title: "إسم المورد",
      dataIndex: "supplier_name",
      render: (text, record) => (
        <div className="productimgname">
          <span>{text}</span>
        </div>
      ),
      sorter: (a, b) => a.supplierName.length - b.supplierName.length,
      width: "250px",
    },
    {
      title: "الهاتف",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "أوامر",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px", width: "max-content" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/dream-pos/people/editsupplier-people", {
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Supplier List</h4>
              <h6>Manage your Supplier</h6>
            </div>
            <div className="page-btn">
              <span
                onClick={() => {
                  history.push("/dream-pos/people/addsupplier-people");
                }}
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                أضف مورد
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Tabletop data={allSuppliers} inputfilter={inputfilter} togglefilter={togglefilter} />
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Supplier Code" />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-12">
                      <div className="form-group">
                        <input type="text" placeholder="Enter Supplier" />
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
                <Table isPaginatoin={false} columns={columns} dataSource={allSuppliers} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default SupplierList;
