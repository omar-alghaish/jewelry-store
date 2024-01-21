/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import leveljs from "level-js";
import { toast } from "react-toastify";
import "./style/main.css";
import PayDetails from "./PayDetails";
const levelup = require("levelup");

const db = levelup(leveljs("./db"));

const AddToStore = () => {
  const [allData, setAllData] = useState([]);
  const [calibers, setCalibers] = useState([]);
  const [customerNumber, setCustomerNumber] = useState("");
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [store, setStore] = useState([]);
  const [isPriceWithCaliber, setIsPriceWithCaliber] = useState(true);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: store.length + 1,
    documentType: "سند استلام",
    itemType: "",
    customer_Number: "",
    customer_name: "",
    caliber: "",
    branchName: "",
    documentDate: new Date().toISOString().split("T")[0],
    quantity: "",
    weight: "",
    date: "",
    initialPayment: "",
    itemPrice: "",
    total: "",
    isPriceWithCaliber: true,
    productName: "",
    category: "",
    caliberPrice: 0,
    remain: 0,
    totalPayments:0,
    moveType: "اضافه",
    PayDetails: [{ date: new Date(), id: 1, total: 0 }],
  });
  console.log(calibers);
  console.log(allData);
  const calculateTotal = () => {
    if (isPriceWithCaliber) {
      const caliber = calibers.find(
        (item) => item.caliber_name === formData.caliber
      );
      if (caliber) {
        const total = +formData.weight * +formData.quantity * +caliber.price;
        const itemPrice = +formData.weight * +caliber.price;
        setFormData((prevData) => ({
          ...prevData,
          total: total.toFixed(2),
          itemPrice: itemPrice.toFixed(2),
          caliberPrice: caliber.price,
        }));
      }
    }
  };

  useEffect(() => {
    db.get("categories", function (err, value) {
      setCategories(value ? JSON.parse(value) : []);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsPriceWithCaliber(checked);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      id: store.length + 1,
    }));
    // if (type !== "checkbox" || checked) {
    //   calculateTotal();
    // }
  };

  useEffect(() => {
    calculateTotal();
  }, [
    calibers,
    formData.caliber,
    formData.weight,
    formData.quantity,
    isPriceWithCaliber,
  ]);
  useEffect(() => {
    if (!isPriceWithCaliber) {
      setFormData((prevData) => ({ ...prevData, total: 0, itemPrice: 0 }));
    } else {
      calculateTotal();
    }
  }, [isPriceWithCaliber]);

  console.log(categories);
  useEffect(() => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(() => {
    db.get("stores", function (err, value) {
      setStore(value ? JSON.parse(value) : []);
    });
  }, []);
  useEffect(() => {
    // 1) Create our store
    const db = levelup(leveljs("./db"));
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
    });
  }, []);

  const handleCustomerNumberChange = (event) => {
    const number = event.target.value;
    setCustomerNumber(number);

    const foundSupplier = allSuppliers.find(
      (supplier) => supplier?.id === +number
    );
    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      customer_Number: foundSupplier?.id,
      customer_name: foundSupplier?.supplier_name || "",
      customer_phone: foundSupplier?.phone || "",
    }));
  };
  console.log(formData);
  const saveData = () => {
    const updatedData = [
      ...store,
      {
        ...formData,
        PayDetails: [
          { date: new Date(), id: 1, total: formData.initialPayment },
        ],
        remain: formData.total - formData.initialPayment,
        totalPayments: formData.initialPayment,
      },
    ];
    db.put("stores", JSON.stringify(updatedData), function (err) {
      if (err) {
        toast.success("حدث خطأ");
      } else {
        toast.success("تمت الاضافه بنجاح");
      }
    });
  };
  console.log(store);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="inputs-container">
          <div className="cus-row row1">
            <div className="form-group ful-width">
              <label>نوع السند</label>
              <select
                name="documentType"
                id=""
                value={formData.documentType}
                onChange={handleInputChange}
                disabled
              >
                <option value="سند استلام">سند استلام</option>
              </select>
            </div>
            <div className="form-group equal-width">
              <label>نوع العنصر</label>
              <select
                name="itemType"
                value={formData.itemType}
                onChange={handleInputChange}
              >
                <option value="كسر">كسر</option>
                <option value="مشغولات">مشغولات</option>
              </select>
            </div>

            <div className="form-group equal-width">
              <label>رقم المورد</label>
              <input
                type="text"
                onChange={handleCustomerNumberChange}
                value={customerNumber}
              />
            </div>
            <div className="form-group equal-width">
              <label>اسم المنتج</label>
              <input
                type="text"
                value={formData.productName}
                name="productName"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group equal-width">
              <label>اسم المورد</label>
              <input
                type="text"
                value={formData.customer_name}
                onChange={handleInputChange}
                name="customer_name"
              />
            </div>

            <div className="form-group equal-width">
              <label>العيار</label>
              <input
                type="text"
                name="caliber"
                value={formData.caliber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>الفئه</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories?.map((item) => (
                  <option value={item.category_name}>
                    {item?.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cus-row row2">
            <div className="form-group equal-width">
              <label>اسم الفرع</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>{isPriceWithCaliber ? "سعر بالعيار" : "سعر يدوي"}</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="isPriceWithCaliber"
                  checked={isPriceWithCaliber}
                  onChange={handleInputChange}
                />
                <div className="toggle-switch-background">
                  <div className="toggle-switch-handle"></div>
                </div>
              </label>
            </div>

            <div className="form-group equal-width">
              <label>الكمية</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>الوزن</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>تاريخ</label>
              <input
                type="date"
                name="documentDate"
                disabled
                value={formData.documentDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>الدفعة المبدئية</label>
              <input
                type="text"
                name="initialPayment"
                value={formData.initialPayment}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>
                {isPriceWithCaliber
                  ? "سعر الوحده بالعيار"
                  : "قم بادخال سعر الوحده"}
              </label>
              <input
                type="text"
                name="total"
                value={formData.itemPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group equal-width">
              <label>
                {isPriceWithCaliber ? "الاجمالي" : "قم بادخال السعر"}
              </label>
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <button className="btn btn-submit me-2" onClick={saveData}>
            اضافه
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToStore;
