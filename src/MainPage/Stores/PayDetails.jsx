/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import leveljs from "level-js";
import { toast } from "react-toastify";
const levelup = require("levelup");
const db = levelup(leveljs("./db"));

const PayDetails = ({ data }) => {
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [payes, setPayes] = useState(data.PayDetails);

  const handleGetAll = () => {
    db.get("stores", function (err, value) {
      setStore(value ? JSON.parse(value) : []);
    });
  };

  useEffect(() => {
    handleGetAll();
    const theProduct = store.find((item) => +item.id === +data.id);
    setProduct(theProduct);
    setPayes(product?.PayDetails);
  }, [store, data.id]);

  const handlePay = () => {
    const parsedAmount = parseFloat(paymentAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const updatedStore = store.map((item) => {
      if (+item.id === +data.id) {
        const newPayment = {
          date: new Date(),
          id: item.PayDetails.length + 1,
          total: parsedAmount.toFixed(2),
        };
        const remain = parseFloat(item.remain) - parsedAmount;
        const totalPayments = item.PayDetails.reduce(
          (total, payment) => total + parseFloat(payment.total),
          0
        );
        const updatedItem = {
          ...item,
          remain,
          totalPayments: totalPayments + parsedAmount,
        };
        updatedItem.PayDetails.push(newPayment);
        return updatedItem;
      }
      return item;
    });

    setStore(updatedStore);

    db.put("stores", JSON.stringify(updatedStore), function (err) {
      if (err) {
        toast.error("حدث خطأ");
      } else {
        toast.success("تم الدفع بنجاح");
        // Trigger re-render after the state has been updated
        handleGetAll();
      }
    });
  };

  useEffect(() => {
    // Check if data.PayDetails has changed
    // and update the product state accordingly
    const theProduct = store.find((item) => +item.id === +data.id);
    setProduct(theProduct);
  }, [data.PayDetails]);

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
    <div>
      <div
        className="top"
        style={{ display: "flex", alignItems: "center", gap: "50px" }}
      >
        <div className="form-group equal-width">
          <label>المبلغ المدفوع</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>
        <div>
          <h1>الدفعه المبدأيه</h1> <h5>{product?.initialPayment}</h5>
        </div>
        <div>
          <h1>المبلغ المتبقي</h1> <h5>{product?.remain}</h5>
        </div>
        <div>
          <h1>إجمالي المدفوعات</h1> <h5>{product?.totalPayments}</h5>
        </div>
        <button
          className="btn btn-submit me-2"
          style={{ margin: "50px" }}
          onClick={handlePay}
        >
          دفع
        </button>
      </div>

      {data.PayDetails && (
        <>
          <Table columns={columns} dataSource={payes} />
        </>
      )}
    </div>
  );
};

export default PayDetails;
