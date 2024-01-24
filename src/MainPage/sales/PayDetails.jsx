/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import leveljs from "level-js";
import { toast } from "react-toastify";
import ModalContent from "./Modal";
import { getCurrentDate } from "../../functions/uniqeId";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const PayDetails = ({ data }) => {
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [payes, setPayes] = useState(data?.PayDetails);
  const [openPayModal, setOpenPayModal] = useState(false);

  const handleGetAll = () => {
    db.get("orders", function (err, value) {
      setStore(value ? JSON.parse(value) : []);
    });
  };

  useEffect(() => {
    handleGetAll();
    const theProduct = store.find((item) => +item?.id === +data?.id);
    setProduct(theProduct);
    setPayes(product?.PayDetails);
  }, [store, data?.id]);

  const handlePay = () => {
    const parsedAmount = parseFloat(paymentAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const remain = parseFloat(product?.remain) - parsedAmount;

    if (remain >= 0) {
      const updatedStore = store.map((item) => {
        if (+item.id === +data.id) {
          const newPayment = {
            date: getCurrentDate(),
            id: item?.PayDetails.length + 1,
            total: parsedAmount.toFixed(2),
          };
          const totalPayments = item?.PayDetails.reduce(
            (total, payment) => total + parseFloat(payment.total),
            0
          );
          const updatedItem = {
            ...item,
            remain,
            totalPayments: totalPayments + parsedAmount,
          };
          updatedItem?.PayDetails.push(newPayment);
          return updatedItem;
        }
        return item;
      });

      setStore(updatedStore);

      db.put("orders", JSON.stringify(updatedStore), function (err) {
        if (err) {
          toast.error("حدث خطأ");
        } else {
          toast.success("تم الدفع بنجاح");
          // Trigger re-render after the state has been updated
          handleGetAll();
        }
      });
    } else {
      toast.warning("المبلغ المدفوع أكبر من المبلغ المتبقي");
    }
  };

  useEffect(() => {
    // Check if data.PayDetails has changed
    // and update the product state accordingly
    const theProduct = store.find((item) => +item.id === +data.id);
    setProduct(theProduct);
  }, [data?.PayDetails]);

  const columns = [
    {
      title: "رقم",
      dataIndex: "id",
    },
    {
      title: "التاريخ",
      dataIndex: "date",
    },
    {
      title: "المبلغ المدفوع",
      dataIndex: "total",
    },
  ];

  return (
    <div style={{marginTop:"50px",display:"flex", flexDirection:"column", gap:"50px"}}>
      <div
        className="top"
        style={{ display: "flex", alignItems: "center", gap: "50px" }}
      >
        <div>
          <h5>الدفعه المبدأيه</h5> <h5>{product?.initialPrice}</h5>
        </div>
        <div>
          <h5>المبلغ المتبقي</h5> <h5>{product?.remain}</h5>
        </div>
        <div>
          <h5>إجمالي المدفوعات</h5> <h5>{product?.totalPayments}</h5>
        </div>
        {/* Conditionally render the payment button based on remaining amount */}
        {product?.remain > 0 && (
          <button
            className="btn btn-submit me-2"
            style={{ margin: "50px" }}
            onClick={() => setOpenPayModal(true)}
          >
            دفع
          </button>
        )}
        {product?.remain === 0 && (
          <p style={{ color: "green", margin: "10px 0" }}>
            لا يوجد مبلغ متبقي للدفع
          </p>
        )}
      </div>
      <ModalContent
        isOpen={openPayModal}
        setOpen={setOpenPayModal}
        header="تاكيد عملية الدفع"
      >
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            className="form-group"
            style={{ width: "300px", height: "200px !important", margin: "0" }}
          >
            <label>المبلغ المدفوع</label>
            <input
              type="text"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <button
            className="btn btn-submit me-2"
            style={{ margin: "0px", width: "300px" }}
            onClick={() => {
              handlePay();
              setOpenPayModal(false);
              setPaymentAmount("");
            }}
          >
            تاكيد
          </button>
        </div>
      </ModalContent>
      {data?.PayDetails && (
        <>
          <Table columns={columns} dataSource={payes} />
        </>
      )}
    </div>
  );
};

export default PayDetails;
