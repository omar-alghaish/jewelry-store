/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  Calendar,
  Plus,
  Scanner,
  DeleteIcon,
  EditIcon,
  MacbookIcon,
  EarpodIcon,
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "antd";

import retruns from "../../assets/data/returnsdata";
import retrunitem from "../../assets/data/returnitem";

const EditSalesReturn = () => {
  const [startDate, setStartDate] = useState(new Date());

  const options1 = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Inprogess", text: "Inprogess" },
  ];
  const options = [
    { id: 1, text: "Thomas", text: "Thomas" },
    { id: 2, text: "Customer", text: "Customer" },
  ];

  const deleteRow =()=>{
    $(document).on("click",".delete-set",function () {
		$(this).parent().parent().hide();
	});
  }
  const [data,setdata] = useState();

  useEffect(()=>{
    // setdata(retruns)
    setdata(retrunitem)
  },[])

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img style={{ width:'30px' }} alt="" src={record?.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record?.productName}
          </Link>
        </div>
      ),
    },
    {
      title: "Net Unit Price($)",
      dataIndex: "qty",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Qty",
      dataIndex: "qty",
    },
    {
      title: "Discount($)",
      dataIndex: "discount",
    },
    {
      title: "Tax %",
      dataIndex: "tax",
    },
    {
      title: "Sub Total($)",
      dataIndex: "subTotal",
    },
    {
      render: () => (
        <>
          <Link className="delete-set" to="#" onClick={deleteRow}>
            <img src={DeleteIcon} alt="img" />
          </Link>
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
              <h4>Create Sales Return</h4>
              <h6>Add/Update Sales Return</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <div className="row">
                      <div className="col-lg-10 col-sm-10 col-10">
                        <Select2
                          className="select"
                          data={options}
                          options={{
                            placeholder: "Thomas",
                          }}
                        />
                      </div>
                      <div className="col-lg-2 col-sm-2 col-2 ps-0">
                        <div className="add-icon">
                          <Link to="#">
                            <img src={Plus} alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Quotation Date </label>
                    <div className="input-groupicon">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <div className="addonset">
                        <img src={Calendar} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Reference No.</label>
                    <input type="text" defaultValue="555444"/>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product</label>
                    <div className="input-groupicon">
                      <input
                        type="text"
                        placeholder="Scan/Search Product by code and select..."
                      />
                      <div className="addonset">
                        <img src={Scanner} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 float-md-right">
                  <div className="total-order">
                    <ul>
                      <li>
                        <h4>Order Tax</h4>
                        <h5>$ 0.00 (0.00%)</h5>
                      </li>
                      <li>
                        <h4>Discount </h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li>
                        <h4>Shipping</h4>
                        <h5>$ 0.00</h5>
                      </li>
                      <li className="total">
                        <h4>Grand Total</h4>
                        <h5>$ 20000.00</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Order Tax</label>
                    <input type="text" defaultValue="0"/>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Discount</label>
                    <input type="text" defaultValue="0" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Shipping</label>
                    <input type="text" defaultValue="0" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Status</label>
                    <Select2
                          className="select"
                          data={options1}
                          options={{
                            placeholder: "Completed",
                          }}
                        />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-submit me-2">Submit</button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSalesReturn;
