/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/main.css";
import { getCurrentDate } from "../../functions/uniqeId";
import leveljs from "level-js";
import { toast } from "react-toastify";

const levelup = require("levelup");
const Moves7 = () => {
  const db = levelup(leveljs("./db"));
  const [allData, setAllData] = useState([]);
  const [calibers, setCalibers] = useState([]);
  const [retrieves, setRetrieves] = useState([]);
  const [formData, setFormData] = useState({
    id: allData.length + 1,
    movementType: "شراء كسر نقدي",
    documentDate: getCurrentDate(),
    goldItems: [{ carat: "", weight: "", totalCaratPrice: 0 }],
    total: 0,
    paymentMethod: "ذهب كسر",
    isCurrentPayCustomer: false,
    isCurrentPayOwner: false,
    installmentDateOwner: getCurrentDate(),
    installmentDateCustomer: getCurrentDate(),
  });

  useEffect(() => {
    db.get("movements", function (err, value) {
      setAllData(value ? JSON.parse(value) : []);
    });
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
    });
    db.get("retrieves", function (err, value) {
      setRetrieves(value ? JSON.parse(value) : []);
    });
  }, []);

  const handleAddGoldItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      goldItems: [...prevFormData.goldItems, { carat: "", weight: "" }],
    }));
  };

  //   const handleInputChange = (e) => {
  //     const { name, type, checked, value } = e.target;

  //     let selectedCaliber
  //     let goldValue
  //     if (name == "goldCarat"){
  //        selectedCaliber = calibers.find(
  //         (caliber) => caliber.caliber_name === value
  //       );
  //     }
  //     console.log(selectedCaliber)
  // if(name === "goldWeight"){
  //       goldValue = selectedCaliber?.price * parseFloat(value) || 0;

  // }

  //     setFormData((prevFormData) => {
  //       let updatedFormData = {
  //         ...prevFormData,
  //         [name]: type === "checkbox" ? checked : value,
  //         goldValue
  //       };

  //       // Reset goldItems when movementType changes
  //       if (name === "movementType") {
  //         updatedFormData = {
  //           ...updatedFormData,
  //           goldItems: [{ carat: "", weight: "" }],
  //         };
  //       }

  //       return updatedFormData;
  //     });
  //   };

  // Add this new function outside of the component
  const calculateGoldValue = (carat, weight, calibers) => {
    const selectedCaliber = calibers.find(
      (caliber) => caliber.caliber_name === carat
    );
    const goldWeight = parseFloat(weight) || 0;
    return selectedCaliber?.price * goldWeight || 0;
  };

  // Your component code remains mostly the same, but update the handleInputChange function
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevFormData) => {
      let updatedFormData = {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };

      // Calculate goldValue when either goldCarat or goldWeight changes
      if (name === "goldCarat" || name === "goldWeight") {
        const goldValue = calculateGoldValue(
          updatedFormData.goldCarat,
          updatedFormData.goldWeight,
          calibers
        );
        updatedFormData = {
          ...updatedFormData,
          goldValue: goldValue,
          id: allData.length + 1,
        };
      }

      // Reset goldItems when movementType changes
      if (name === "movementType") {
        updatedFormData = {
          ...updatedFormData,
          goldItems: [{ carat: "", weight: "" }],
          id: allData.length + 1,
        };
      }

      return updatedFormData;
    });
  };

  console.log(calibers);
  const calculateTotalWeightAndPrice = () => {
    let totalWeight = 0;
    let totalLocalCurrency = 0;

    formData.goldItems.forEach((item) => {
      const selectedCaliber = calibers.find(
        (caliber) => caliber.caliber_name === item.carat
      );

      if (selectedCaliber) {
        totalWeight += parseFloat(item.weight) || 0;
        totalLocalCurrency +=
          selectedCaliber.price * parseFloat(item.weight) || 0;
      }
    });

    return {
      totalWeight: totalWeight.toFixed(2),
      totalLocalCurrency: totalLocalCurrency.toFixed(2),
    };
  };

  const updateTotalWeightAndPrice = () => {
    const { totalWeight, totalLocalCurrency } = calculateTotalWeightAndPrice();

    setFormData((prevFormData) => ({
      ...prevFormData,
      totalWeight,
      totalLocalCurrency,
    }));
  };

  useEffect(() => {
    updateTotalWeightAndPrice();
  }, [formData.goldItems, calibers]);

  // ... (your existing code)

  const handleGoldItemChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const newGoldItems = [...prevFormData.goldItems];
      newGoldItems[index][field] = value;

      // Calculate the total weight and total price when weight or carat changes
      if (field === "weight" || field === "carat") {
        const selectedCaliber = calibers.find(
          (caliber) => caliber.caliber_name === newGoldItems[index].carat
        );

        if (selectedCaliber) {
          newGoldItems[index].totalCaratPrice =
            selectedCaliber.price * parseFloat(newGoldItems[index].weight) || 0;
        }

        const { totalWeight, totalLocalCurrency } =
          calculateTotalWeightAndPrice();

        updateTotalWeightAndPrice();
      }
      updateTotal();
      return {
        ...prevFormData,
        goldItems: newGoldItems,
      };
    });
  };

  const updateTotal = () => {
    const { totalWeight, totalLocalCurrency, moneyAmount } = formData;

    // Calculate total by adding totalLocalCurrency and moneyAmount
    const total = (+totalLocalCurrency || 0.0) + (+moneyAmount || 0.0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: total.toFixed(2),
    }));
  };

  useEffect(() => {
    updateTotal();
  }, [formData.totalLocalCurrency, formData.moneyAmount]);

  console.log(formData);
  console.log(allData);
  const handleAdd = () => {
    setAllData((prevAllData) => {
      const newData = [...prevAllData, { ...formData, id: allData.length + 1 }];
      db.put("movements", JSON.stringify(newData), function (err) {
        if (err) {
          console.error("Error saving to database", err);
          toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
        } else {
          toast.success("تمت الإضافة بنجاح");
        }
      });
      return newData;
    });
  };

  const handleRetrieve = () => {
    setRetrieves((prevAllData) => {
      const newData = [
        ...prevAllData,
        { ...formData, id: retrieves.length + 1 },
      ];
      db.put("retrieves", JSON.stringify(newData), function (err) {
        if (err) {
          toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
        } else {
          toast.success("تم الاسترجاع بنجاح");
        }
      });
      return newData;
    });

    setAllData((prevAllData) => {
      const newData = [...prevAllData, { ...formData, id: allData.length + 1 }];
      db.put("movements", JSON.stringify(newData), function (err) {
        if (err) {
          console.error("Error saving to database", err);
          toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
        } else {
          toast.success("تمت الإضافة بنجاح");
        }
      });
      return newData;
    });
  };

  return (
    <div className="page-wrapper">
      <div className="content moves7">
        <div className="row1" style={{ display: "flex" }}>
          <div className="form-group ">
            <label>نوع الحركه</label>
            <select
              name="movementType"
              value={formData.movementType}
              onChange={handleInputChange}
            >
              <option value="شراء كسر نقدي">شراء كسر نقدي</option>
              <option value="مرتجع شراء كسر نقدي">مرتجع شراء كسر نقدي</option>
              <option value="شراء كسر اجل">شراء كسر اجل</option>
              <option value="مرتجع شراء كسر اجل">مرتجع شراء كسر اجل</option>
              <option value="مرتجع بيع كسر نقدي"> مرتجع بيع كسر نقدي</option>
              <option value="بيع كسر اجل">بيع كسر اجل</option>
              <option value="مرتجع بيع كسر اجل">مرتجع بيع كسر اجل</option>
            </select>
          </div>
          <div className="form-group ">
            <label>اسم الفرع</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label>تاريخ السند</label>
            <input
              type="date"
              name="documentDate"
              value={formData.documentDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row2">
          <div className="form-group">
            <label>اختر النوع</label>
            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleInputChange}
            >
              <option value="مورد">مورد</option>
              <option value="عميل">عميل</option>
              <option value="حساب">حساب</option>
            </select>
          </div>
          <div className="form-group ">
            <label>رقم الجوال</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label>رقم الهويه</label>
            <input
              type="text"
              name="identityNumber"
              value={formData.identityNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label>رقم الحساب</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group full-width">
            <label>
              {formData.movementType.startsWith("مرتجع")
                ? "سبب الاسترجاع"
                : "الوصف"}{" "}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label>اختر وقت الدفع</label>
            <select
              name="isCurrentPayOwner"
              value={formData.isCurrentPayOwner}
              onChange={handleInputChange}
            >
              <option value="الدفع الان">الدفع الان</option>
              <option value="الدفع لاحقا">الدفع لاحقا</option>
            </select>
          </div>
          {formData.isCurrentPayOwner === "الدفع لاحقا" && (
            <div className="form-group ">
              <label>تاريخ الدفع</label>
              <input
                type="date"
                name="installmentDateOwner"
                value={formData.installmentDateOwner}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <div className="row3" style={{ flexDirection: "column" }}>
          <h4>
            {formData.isCurrentPayOwner === "الدفع لاحقا"
              ? "الدفعه الاولي"
              : "القيمه المدفوعه للعميل"}
          </h4>
          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-group ">
              <label>عيار الذهب</label>
              <input
                type="text"
                name="goldCarat"
                value={formData.goldCarat}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group ">
              <label>الوزن</label>
              <input
                type="text"
                name="goldWeight"
                value={formData.goldWeight}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group ">
              <label>القيمه</label>
              <input
                type="text"
                name="goldValue"
                value={formData.goldValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row4">
          <div style={{ display: "flex", gap: "20px" }}>
            {(formData.movementType === "شراء كسر اجل" ||
              formData.movementType === "مرتجع شراء كسر اجل" ||
              formData.movementType === "بيع كسر اجل" ||
              formData.movementType === "مرتجع بيع كسر اجل") && (
              <div className="form-group ">
                <label>تاريخ الدفع</label>
                <input
                  type="date"
                  name="installmentDateCustomer"
                  value={formData.installmentDateCustomer}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="form-group input">
              <label>طريقة الدفع</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="ذهب كسر">ذهب كسر </option>
                <option value="مبالغ ماليه">مبالغ ماليه</option>
                <option value="ذهب كسر ومبالغ ماليه">
                  ذهب كسر و مبالغ ماليه
                </option>
              </select>
            </div>
          </div>

          {formData.paymentMethod === "مبالغ ماليه" && (
            <div className="form-group input">
              <label>المبلغ المالي المدفوع</label>
              <input
                type="text"
                name="moneyAmount"
                value={formData.moneyAmount}
                onChange={handleInputChange}
              />
            </div>
          )}
          {formData.paymentMethod === "ذهب كسر" && (
            <div>
              {formData.goldItems.map((item, index) => (
                <div
                  style={{ display: "flex", gap: "20px", width: "100%" }}
                  key={index}
                >
                  <div className="form-group input">
                    <label>عيار {formData.goldItems[index].carat}</label>
                    <input
                      type="text"
                      value={item.carat}
                      onChange={(e) =>
                        handleGoldItemChange(index, "carat", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group input">
                    <label>
                      الوزن للعيار {formData.goldItems[index].carat}
                    </label>
                    <input
                      type="text"
                      value={item.weight}
                      onChange={(e) =>
                        handleGoldItemChange(index, "weight", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group input">
                    <label>
                      اجمالي قيمة عيار{formData.goldItems[index].carat}
                    </label>
                    <input
                      type="text"
                      value={item.totalCaratPrice}
                      onChange={(e) =>
                        handleGoldItemChange(
                          index,
                          "totalCaratPrice",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: "20px", width: "100%" }}>
                <div
                  className="form-group input"
                  style={{ opacity: "0", cursor: "default" }}
                >
                  <label> </label>
                  <input type="text" disabled />
                </div>
                <div className="form-group input">
                  <label>اجمالي الوزن</label>
                  <input
                    type="text"
                    value={formData?.totalWeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group input">
                  <label>اجمالي القيمه</label>
                  <input
                    type="text"
                    value={formData?.totalLocalCurrency}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-submit me-2"
                onClick={handleAddGoldItem}
              >
                إضافة عيار جديد
              </button>
            </div>
          )}
          {formData.paymentMethod === "ذهب كسر ومبالغ ماليه" && (
            <div>
              <div className="form-group input">
                <label>المبلغ المالي المدفوع</label>
                <input
                  type="text"
                  name="moneyAmount"
                  value={formData.moneyAmount}
                  onChange={handleInputChange}
                />
              </div>
              {formData.goldItems.map((item, index) => (
                <div
                  style={{ display: "flex", gap: "20px", width: "100%" }}
                  key={index}
                >
                  <div className="form-group input">
                    <label>عيار {formData.goldItems[index].carat}</label>
                    <input
                      type="text"
                      value={item.carat}
                      onChange={(e) =>
                        handleGoldItemChange(index, "carat", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group input">
                    <label>
                      الوزن للعيار {formData.goldItems[index].carat}
                    </label>
                    <input
                      type="text"
                      value={item.weight}
                      onChange={(e) =>
                        handleGoldItemChange(index, "weight", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group input">
                    <label>
                      اجمالي قيمة عيار{formData.goldItems[index].carat}
                    </label>
                    <input
                      type="text"
                      value={item.totalCaratPrice}
                      onChange={(e) =>
                        handleGoldItemChange(
                          index,
                          "totalCaratPrice",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: "20px", width: "100%" }}>
                <div
                  className="form-group input"
                  style={{ opacity: "0", cursor: "default" }}
                >
                  <label> </label>
                  <input type="text" disabled />
                </div>
                <div className="form-group input">
                  <label>اجمالي الوزن</label>
                  <input
                    type="text"
                    value={formData?.totalWeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group input">
                  <label>اجمالي القيمه</label>
                  <input
                    type="text"
                    value={formData?.totalLocalCurrency}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-submit me-2"
                onClick={handleAddGoldItem}
              >
                إضافة عيار جديد
              </button>
            </div>
          )}
        </div>
        <div className="row5">
          <div className="form-group input">
            <label>المجموع</label>
            <input
              type="text"
              value={formData.total}
              onChange={handleInputChange}
              disabled
            />
          </div>
          {/* {(formData.movementType === "شراء كسر اجل" ||
            formData.movementType === "مرتجع شراء كسر اجل" ||
            formData.movementType === "بيع كسر اجل" ||
            formData.movementType === "مرتجع بيع كسر اجل") && (
            <div className="form-group input">
              <label>الدفعه الاولي</label>
              <input
                type="text"
                name="initialPayment"
                value={formData.initialPayment}
                onChange={handleInputChange}
              />
            </div>
          )} */}
        </div>
        <div className="" style={{ padding: "0 50px" }}>
          {formData.movementType === "مرتجع شراء كسر نقدي" ||
          formData.movementType === "مرتجع شراء كسر اجل" ||
          formData.movementType === "مرتجع بيع كسر نقدي" ||
          formData.movementType === "مرتجع بيع كسر اجل" ? (
            <button className="btn btn-submit me-2" onClick={handleRetrieve}>
              استرجاع
            </button>
          ) : (
            <button className="btn btn-submit me-2" onClick={handleAdd}>
              اضافه
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moves7;
