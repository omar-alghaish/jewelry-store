/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { span } from "react-router-dom";
import {
  Pdf,
  Excel,
  Product7,
  Printer,
  EditIcon,
  Calendar,
  Product8,
  Product1
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  useHistory,
  useLocation
} from "react-router-dom/cjs/react-router-dom.min";
import ModalContent from "./Modal";
import PayDetails from "./PayDetails";

const SalesDetail = () => {
  const options = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Inprogess", text: "Inprogess" }
  ];
const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation();
  const { sale } = location.state;
  // console.log(sale)
  const history = useHistory();
  useEffect(() => {
    if (location.state == null) {
      history.goBack();
    }
  }, []);
console.log(sale)
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>تفاصيل البيع</h4>
            <h6>عرض تفاصيل البيع</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-sales-split">
              <h2>تفاصيل البيع : {sale?.id}</h2>
              <ul>
                <li>
                  <span>
                    <img src={EditIcon} alt="img" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={Pdf} alt="img" />
                  </span>
                </li>
                <li>
                  <span>
                    <img src={Excel} alt="img" />
                  </span>
                </li>
                <li>
                  <span onClick={()=> window.print()}>
                    <img src={Printer} alt="img" />
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="invoice-box table-height"
              style={{
                maxWidth: 1600,
                width: "100%",
                overflow: "auto",
                margin: "15px auto",
                padding: 0,
                fontSize: 14,
                lineHeight: "24px",
                color: "#555"
              }}
            >
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{
                  width: "100%",
                  lineHeight: "24px",
                  textAlign: "left"
                }}
              >
                <tbody>
                  <tr className="top">
                    <td
                      colSpan={6}
                      style={{ padding: 5, verticalAlign: "top" }}
                    >
                      <table
                        style={{
                          width: "100%",
                          lineHeight: "24px",
                          textAlign: "left"
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: 5,
                                verticalAlign: "top",
                                textAlign: "left",
                                paddingBottom: 20
                              }}
                            >
                              <font
                                style={{
                                  verticalAlign: "top",
                                  marginBottom: 25
                                }}
                              >
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#7367F0",
                                    fontWeight: 600,
                                    lineHeight: "35px"
                                  }}
                                >
                                  معلومات العميل
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  {sale?.client_name}
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  {sale?.client_phone}
                                </font>
                              </font>
                              <br />
                            </td>
                            <td
                              style={{
                                padding: 5,
                                verticalAlign: "top",
                                textAlign: "left",
                                paddingBottom: 20
                              }}
                            >
                              <font
                                style={{
                                  verticalAlign: "top",
                                  marginBottom: 25
                                }}
                              >
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#7367F0",
                                    fontWeight: 600,
                                    lineHeight: "35px"
                                  }}
                                >
                                  معلومات الفاتورة
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  المرجع{" "}
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  حالة الدفع
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  الحاله
                                </font>
                              </font>
                              <br />
                            </td>
                            <td
                              style={{
                                padding: 5,
                                verticalAlign: "top",
                                textAlign: "right",
                                paddingBottom: 20
                              }}
                            >
                              <font
                                style={{
                                  verticalAlign: "top",
                                  marginBottom: 25
                                }}
                              >
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#7367F0",
                                    fontWeight: 600,
                                    lineHeight: "35px"
                                  }}
                                >
                                  &nbsp;
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#000",
                                    fontWeight: 400
                                  }}
                                >
                                  {sale.Reference}{" "}
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#2E7D32",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  {sale.Payment == 'Paid' ||
                                  sale.Payment == 'paid'
                                    ? 'مدفوع'
                                    : 'غير مدفوع'}
                                </font>
                              </font>
                              <br />
                              <font style={{ verticalAlign: "top" }}>
                                <font
                                  style={{
                                    verticalAlign: "top",
                                    fontSize: 14,
                                    color: "#2E7D32",
                                    fontWeight: 400
                                  }}
                                >
                                  {" "}
                                  {sale.Status == 'Completed' ||
                                  sale.Status == 'completed'
                                    ? 'مكتمل'
                                    : 'فى الإنتظار'}
                                </font>
                              </font>
                              <br />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="heading " style={{ background: "#F3F2F7" }}>
                    <td
                      style={{
                        padding: 10,
                        verticalAlign: "middle",
                        fontWeight: 600,
                        color: "#5E5873",
                        fontSize: 14
                      }}
                    >
                      إسم المنتج
                    </td>
                    <td
                      style={{
                        padding: 10,
                        verticalAlign: "middle",
                        fontWeight: 600,
                        color: "#5E5873",
                        fontSize: 14
                      }}
                    >
                      الكميه
                    </td>
                    <td
                      style={{
                        padding: 10,
                        verticalAlign: "middle",
                        fontWeight: 600,
                        color: "#5E5873",
                        fontSize: 14
                      }}
                    >
                      السعر
                    </td>
                  </tr>
                  {sale?.elements?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="details"
                        style={{ borderBottom: "1px solid #E9ECEF" }}
                      >
                        <td
                          style={{
                            padding: 10,
                            verticalAlign: "top",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <img
                            src={item?.image}
                            alt="img"
                            className="me-2"
                            style={{ width: 40, height: 40, margin: "0 20px" }}
                          />
                          {item?.product_name}
                        </td>
                        <td style={{ padding: 10, verticalAlign: "top" }}>
                          {item?.quantity}
                        </td>
                        <td style={{ padding: 10, verticalAlign: "top" }}>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(item?.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>ضريبة الطلب</label>
                  <input
                    value={new Intl.NumberFormat('ar-EG', {
                      style: 'currency',
                      currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                    }).format(sale?.tax)}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الخصم</label>
                  <input
                    value={new Intl.NumberFormat('ar-EG', {
                      style: 'currency',
                      currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                    }).format(sale?.discount)}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الدمغة</label>
                  <input
                    value={new Intl.NumberFormat('ar-EG', {
                      style: 'currency',
                      currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                    }).format(sale?.dam)}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>الحاله</label>
                  {/* <Select2
                    className="select"
                    data={options}
                    options={{
                      placeholder: "Choose Status",
                    }}
                  /> */}
                  <select
                    value={sale?.Status}
                    style={{
                      borderRadius: '4px',
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      backgroundColor: 'transparent'
                    }}
                    id=""
                  >
                    {options.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                      <li>
                        <h4>ضريبة الطلب</h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.tax)}
                        </h5>
                      </li>
                      <li>
                        <h4>الخصم </h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.discount)}
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                      <li>
                        <h4>الدمغة</h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.dam)}
                        </h5>
                      </li>
                      <li className="total">
                        <h4>السعر الكلى</h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.grandPrice)}
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                      <li>
                        <h4>الدفعه الاولي</h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.initialPrice)}
                        </h5>
                      </li>
                      <li>
                        <h4>اجمالي المدفوع</h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.totalPayments)}
                        </h5>
                      </li>
                     
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="total-order w-100 max-widthauto m-auto mb-4">
                    <ul>
                     
                      <li>
                        <h4>المتبقي </h4>
                        <h5>
                          {new Intl.NumberFormat('ar-EG', {
                            style: 'currency',
                            currency: 'SAR', minimumFractionDigits: 0, maximumFractionDigits: 2
                          }).format(sale?.remain)}
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12" style={{margin:"50px 0"}}>
                <span  className="btn btn-submit me-2" onClick={()=>{setModalOpen(true)}}>
                  تحديث
                </span>
              </div>
              <ModalContent isOpen={modalOpen} setOpen={setModalOpen} header="تاريخ المدفوعات">
                <PayDetails data={sale}/>
              </ModalContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;
