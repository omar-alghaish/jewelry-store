/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import "./style/main.css";
import leveljs from "level-js";
import { toast } from "react-toastify";
import { getCurrentDate } from "../../functions/uniqeId";
import AddToStore from "./AddToStore";

const levelup = require("levelup");
const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.random() * 1000000000;
  const randomBase36 = Math.floor(randomNumber).toString(36);
  const uniqueId = `${timestamp}${randomBase36}`;
  return uniqueId;
};
const Moves8 = () => {
  const [allData, setAllData] = useState([]);
  const [calibers, setCalibers] = useState([]);

  const [formData, setFormData] = useState({
    id: allData.length + 1,
    // section: "",
    movementType: "حركة صرف",
    // documentType: "",
    // accountNumber: "",
    check: false,
    // branchName: "",
    // documentEntry: "",
    // documentDate: "",
    // description: "",
    // supplierCode: "",
    // radioText: "",
    // paymentMethod: "",
    // goldWeight24: "",
    // goldWeight22: "",
    // goldWeight21: "",
    // goldWeight18: "",
    // fundBank: "",
    // totalGoldBroken: "",
    // fundAccount: "",
    // caliberDifferenceAmount: "",
    // discountAmount: "",
    // caliberDifferenceRadio: false,
    // discountRadio: false,
    // paymentMethodRadio1: false,
    // paymentMethodRadio2: false,
    // cashPaymentAmount: "",
    // otherPaymentAmount: "",
    // totalLocalCurrency: "",
    // totalWeight21: "",
    // difference: "",
    // customerType: "",
    // wayToPay: "",
    // row3_paymentMethod: "",
    // row3_goldWeight24: "",
    // row3_goldWeight22: "",
    // row3_goldWeight21: "",
    // row3_goldWeight18: "",
    // row7_wayToPay: "",
    // row7_goldWeight24: "",
    // row7_goldWeight22: "",
    // row7_goldWeight21: "",
    // row7_goldWeight18: "",
    documentDate: getCurrentDate(),
    goldItems: [{ carat: "", weight: "" }],
    difference: 0,
  });

  const calculateTotalPrice = (goldItems) => {
    console.log("totalPrice");

    if (!Array.isArray(goldItems)) {
      return 0;
    }

    if (calibers.length === 0) {
      return 0;
    }

    const totalPrice = goldItems.reduce((total, item) => {
      const carat = item.carat;
      const weight = parseFloat(item.weight);

      const caratPrice =
        calibers.find((c) => c.caliber_name === carat)?.price || 0;

      return total + weight * caratPrice;
    }, 0);

    return totalPrice;
  };

  console.log(calibers);

  // const handleInputChange = (e) => {
  //   const { name, type, checked, value } = e.target;
  //         console.log("totalPrice")
  //         const totalPrice = calculateTotalPrice(formData.goldItems);

  //   if (name.startsWith("goldItems")) {
  //     const [index, itemName] = name.split("_").slice(1);
  //     setFormData((prevFormData) => {
  //       const newGoldItems = [...prevFormData.goldItems];
  //       newGoldItems[index][itemName] = type === 'checkbox' ? checked : value;
  //       const totalPrice = calculateTotalPrice(newGoldItems);

  //       return {
  //         ...prevFormData,
  //         goldItems: newGoldItems,
  //         totalGoldPrice: totalPrice,

  //       };
  //     });
  //   } else {
  //     setFormData((prevFormData) => {
  //       let updatedFormData = {
  //         ...prevFormData,
  //         [name]: type === 'checkbox' ? checked : value,
  //         totalGoldPrice: totalPrice,
  //         caliberDifferenceAmount:totalPrice - formData.fundBank ,
  //         difference: formData.totalGoldPrice > formData.fundBank ? "فارق لنا" : "فارق عليهم"
  //       };

  //       // Reset goldItems and row3_moneyAmount when payment method changes
  //       if (name === "row3_paymentMethod") {
  //         updatedFormData = {
  //           ...updatedFormData,
  //           goldItems: [{ carat: "", weight: "" }],
  //           row3_moneyAmount: "",
  //         };
  //       }

  //       return updatedFormData;
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (name.startsWith("goldItems")) {
      const [index, itemName] = name.split("_").slice(1);
      setFormData((prevFormData) => {
        const newGoldItems = [...prevFormData.goldItems];
        newGoldItems[index][itemName] = type === "checkbox" ? checked : value;

        return {
          ...prevFormData,
          goldItems: newGoldItems,
        };
      });
    } else {
      setFormData((prevFormData) => {
        let updatedFormData = {
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value,
        };

        // Reset goldItems and row3_moneyAmount when payment method changes
        if (name === "row3_paymentMethod") {
          updatedFormData = {
            ...updatedFormData,
            goldItems: [{ carat: "", weight: "" }],
            row3_moneyAmount: "",
          };
        }

        return updatedFormData;
      });
    }

    setFormData((prevFormData) => {
      const totalPrice =
        (calculateTotalPrice(prevFormData.goldItems) || 0) +
        +prevFormData.row3_moneyAmount;

      return {
        ...prevFormData,
        totalGoldPrice: totalPrice,
        caliberDifferenceAmount: totalPrice - prevFormData.fundBank || 0,
        difference:
          +totalPrice > +prevFormData.fundBank ? "فارق لهم" : "فارق لنا",
        afterDiscountAmount:
          +prevFormData.caliberDifferenceAmount -
            (+prevFormData.caliberDifferenceAmount *
              +prevFormData.discountAmount) /
              100 || 0,
      };
    });
  };

  // useEffect(() => {
  //   // Run calculations when formData changes

  // }, [formData]);

  const db = levelup(leveljs("./db"));
  const handleAdd = () => {
    setAllData((prevAllData) => {
      const newData = [...prevAllData, {...formData, id: allData.length + 1,totalLocalCurrency : formData.afterDiscountAmount}];
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
  console.log(formData);
  useEffect(() => {
    db.get("movements", function (err, value) {
      setAllData(value ? JSON.parse(value) : []);
    });
  }, []);

  useEffect(() => {
    db.get("calibers", function (err, value) {
      setCalibers(value ? JSON.parse(value) : []);
    });
  }, []);
  const handleGoldItemChange = (index, name, value) => {
    // setFormData((prevFormData) => {
    //   const newGoldItems = [...prevFormData.goldItems];
    //   newGoldItems[index][name] = value;
    //   return {
    //     ...prevFormData,
    //     goldItems: newGoldItems,
    //   };
    // });
    setFormData((prevFormData) => {
      const totalPrice =
        (calculateTotalPrice(prevFormData.goldItems) || 0) +
        +prevFormData.row3_moneyAmount;
        const newGoldItems = [...prevFormData.goldItems];
        newGoldItems[index][name] = value;
      return {
        ...prevFormData,
        totalGoldPrice: totalPrice,
        goldItems: newGoldItems,

        caliberDifferenceAmount: totalPrice - prevFormData.fundBank || 0,
        difference:
          +totalPrice > +prevFormData.fundBank ? "فارق لهم" : "فارق لنا",
        afterDiscountAmount:
          +prevFormData.caliberDifferenceAmount -
            (+prevFormData.caliberDifferenceAmount *
              +prevFormData.discountAmount) /
              100 || 0,
      };
    });
  };

  const handleAddGoldItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      goldItems: [...prevFormData.goldItems, { carat: "", weight: "" }],
    }));
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="cus-row row1">
          <div className="form-group equal-width">
            <label>القسم\القطاع</label>
            <select
              name="section"
              id=""
              value={formData.section}
              onChange={handleInputChange}
            >
              <option value="سند صرف">سند صرف</option>
              <option value="سند استلام">سند استلام</option>
            </select>
          </div>
          <div className="form-group equal-width">
            <label>نوع الحركه</label>
            <select
              name="movementType"
              id=""
              value={formData.movementType}
              onChange={handleInputChange}
            >
              <option value="حركة صرف">حركة صرف</option>
              <option value="حركة قبض">حركة قبض</option>
              <option value="حركه نقديه">حركه نقديه</option>
            </select>
          </div>
          <div className="form-group equal-width">
            <label>نوع السند</label>
            <select
              name="documentType"
              id=""
              value={formData.documentType}
              onChange={handleInputChange}
            >
              <option value="سند صرف">سند صرف</option>
              <option value="سند استلام">سند استلام</option>
            </select>
          </div>
          <div className="form-group equal-width">
            <label>الرقم</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label>شيك</label>
            <label className="container">
              <input
                name="check"
                checked={formData.check}
                type="checkbox"
                onChange={handleInputChange}
              />
              <div className="checkmark"></div>
            </label>
          </div>
        </div>
        {formData.movementType === "حركة قبض" && (
          <>
            <AddToStore data={formData} />
          </>
        )}

        {formData.movementType === "حركة صرف" && (
          <>
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
                <label>مدخل السند</label>
                <input
                  type="text"
                  name="documentEntry"
                  value={formData.documentEntry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>تاريخ السند</label>
                <input
                  type="date"
                  name="documentDate"
                  value={formData.documentDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group full-width">
                <label> الوصف</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="row4">
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
              <div className="form-group input">
                <label>
                  رمز
                  {formData.customerType === "supplier"
                    ? "المورد"
                    : formData.customerType === "customer"
                    ? "العميل"
                    : formData.customerType === "account"
                    ? "الحساب"
                    : ""}
                </label>
                <input
                  type="text"
                  name="supplierCode"
                  value={formData.supplierCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group input">
                <label htmlFor="">
                  اسم{" "}
                  {formData.customerType === "supplier"
                    ? "المورد"
                    : formData.customerType === "customer"
                    ? "العميل"
                    : formData.customerType === "account"
                    ? " الحساب"
                    : ""}
                </label>
                <input
                  type="text"
                  name="radioText"
                  value={formData.radioText}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className="row3">
          <h5>ذهب كسر مدفوع من صنادق الكسر</h5>
          <div className="column1">
            <div className="form-group input">
              <label>طريقة الدفع</label>
              <select
                name="row3_paymentMethod"
                value={formData.row3_paymentMethod}
                onChange={handleInputChange}
              >
                <option value="ذهب كسر">ذهب كسر </option>
                <option value="مبالغ ماليه">مبالغ ماليه</option>
                <option value="ذهب كسر ومبالغ ماليه">ذهب كسر و مبالغ ماليه</option>
              </select>
            </div>
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار24</label>
              <input
                type="text"
                name="row3_goldWeight24"
                value={formData.row3_goldWeight24}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار22</label>
              <input
                type="text"
                name="row3_goldWeight22"
                value={formData.row3_goldWeight22}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار21</label>
              <input
                type="text"
                name="row3_goldWeight21"
                value={formData.row3_goldWeight21}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار18</label>
              <input
                type="text"
                name="row3_goldWeight18"
                value={formData.row3_goldWeight18}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div> */}

            <div className="row3">
              <h5>ذهب كسر مدفوع من صنادق الكسر</h5>
              <div className="column1">
                <div className="form-group input">
                  <label>طريقة الدفع</label>
                  <select
                    name="row3_paymentMethod"
                    value={formData.row3_paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="ذهب كسر">ذهب كسر </option>
                    <option value="مبالغ ماليه">مبالغ ماليه</option>
                    <option value="ذهب كسر ومبالغ ماليه">
                      ذهب كسر و مبالغ ماليه
                    </option>
                  </select>
                </div>

                {/* Conditional rendering based on selected payment method */}
                {formData.row3_paymentMethod === "ذهب كسر" && (
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
                              handleGoldItemChange(
                                index,
                                "carat",
                                e.target.value
                              )
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
                              handleGoldItemChange(
                                index,
                                "weight",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn btn-submit me-2"
                      onClick={handleAddGoldItem}
                    >
                      إضافة عيار جديد
                    </button>
                  </div>
                )}

                {formData.row3_paymentMethod === "مبالغ ماليه" && (
                  <div className="form-group input">
                    <label>المبلغ المالي المدفوع</label>
                    <input
                      type="text"
                      name="row3_moneyAmount"
                      value={formData.row3_moneyAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {formData.row3_paymentMethod === "ذهب كسر ومبالغ ماليه" && (
                  <div>
                    <div className="form-group input">
                      <label>المبلغ المالي المدفوع</label>
                      <input
                        type="text"
                        name="row3_moneyAmount"
                        value={formData.row3_moneyAmount}
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
                              handleGoldItemChange(
                                index,
                                "carat",
                                e.target.value
                              )
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
                              handleGoldItemChange(
                                index,
                                "weight",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn btn-submit me-2"
                      onClick={handleAddGoldItem}
                    >
                      إضافة عيار جديد
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="row5">
              <div className="form-group equal-width">
                <label>مدفوع من الصندوق\البنك</label>
                <input
                  type="text"
                  name="fundBank"
                  value={formData.fundBank}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>اجمالي الذهب الكسر</label>
                <input
                  type="text"
                  name="totalGoldBroken"
                  value={formData.totalGoldBroken}
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div className="form-group equal-width">
                <label>حساب الصندوق\البنك</label>
                <input
                  type="text"
                  name="fundAccount"
                  value={formData.fundAccount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row6">
              <div className="form-group equal-width">
                <label>مبلغ فارق العيار</label>
                <input
                  type="text"
                  name="caliberDifferenceAmount"
                  value={formData.caliberDifferenceAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group equal-width">
                <label>مبلغ الخصم</label>
                <input
                  type="text"
                  name="discountAmount"
                  value={formData.discountAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>اختر الفارق</label>
                <select
                  name="difference"
                  value={formData.difference}
                  onChange={handleInputChange}
                >
                  <option value="فارق لنا">فارق لنا</option>
                  <option value="فارق لهم">فارق لهم</option>
                </select>
              </div>
              {/* <div className="form-group equal-width">
            <label>حساب فارق العيار</label>
            <input
              type="text"
              name="caliberDifferenceAmount"
              value={formData.caliberDifferenceAmount}
              onChange={handleInputChange}
            />
          </div>{" "} */}
              <div className="form-group equal-width">
                <label>حساب بعد الخصم</label>
                <input
                  type="text"
                  name="afterDiscountAmount"
                  value={formData.afterDiscountAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className="row7">
  <h5>طريقة السداد</h5>
  <div className="column1">
    <div className="form-group">
      <label>اختر طريقه</label>
      <select
        name="row7_wayToPay"
        value={formData.row7_wayToPay}
        onChange={handleInputChange}
      >
        <option value=" ذهب كسر لسداد ذهب و مبالغ">
          ذهب كسر لسداد ذهب و مبالغ
        </option>
        <option value="مبلغ لسداد ذهب ومبالغ">
          مبلغ لسداد ذهب ومبالغ
        </option>
      </select>
    </div>
    <div className="form-group input">
      <label>الوزن ذهب كسر عيار24</label>
      <input
        type="text"
        name="row7_goldWeight24"
        value={formData.row7_goldWeight24}
        onChange={handleInputChange}
      />
    </div>{" "}
    <div className="form-group input">
      <label>الوزن ذهب كسر عيار22</label>
      <input
        type="text"
        name="row7_goldWeight22"
        value={formData.row7_goldWeight22}
        onChange={handleInputChange}
      />
    </div>{" "}
    <div className="form-group input">
      <label>الوزن ذهب كسر عيار21</label>
      <input
        type="text"
        name="row7_goldWeight21"
        value={formData.row7_goldWeight21}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group input">
      <label>الوزن ذهب كسر عيار18</label>
      <input
        type="text"
        name="row7_goldWeight18"
        value={formData.row7_goldWeight18}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group input">
      <label>المبلغ المطلوب سداده نقدا</label>
      <input
        type="text"
        name="row7_cashPaymentAmount"
        value={formData.row7_cashPaymentAmount}
        onChange={handleInputChange}
      />
    </div>
  </div>
</div> */}

            <div className="row8">
              <h5>اجماليات السند</h5>
              <div className="column1">
                <div className="form-group input">
                  <label> الاجمالي عمله محليه</label>
                  <input
                    type="text"
                    name="totalLocalCurrency"
                    value={formData.afterDiscountAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group input">
                  <label> الاجمالي الوزن عيار21</label>
                  <input
                    type="text"
                    name="totalWeight21"
                    value={formData.totalWeight21}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-submit me-2" onClick={handleAdd}>
              اضافه
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Moves8;

//  <div className="row3">
//           <h5>ذهب كسر مدفوع من صنادق الكسر</h5>
//           <div className="column1">
//             <div className="form-group input">
//               <label>طريقة الدفع</label>
//               <select
//                 name="row3_paymentMethod"
//                 value={formData.row3_paymentMethod}
//                 onChange={handleInputChange}
//               >
//                 <option value="ذهب كسر">ذهب كسر </option>
//                 <option value="مبالغ ماليه">مبالغ ماليه</option>
//                 <option value="ذهب كسر ومبالغ ماليه">
//                   ذهب كسر و مبالغ ماليه
//                 </option>
//               </select>
//             </div>

//             {/* Conditional rendering based on selected payment method */}
//             {formData.row3_paymentMethod === "ذهب كسر" && (
//               <div>
//                 <div className="form-group input">
//                   <label>عيار الذهب</label>
//                   <input
//                     type="text"
//                     name="row3_goldCarat"
//                     value={formData.row3_goldCarat}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group input">
//                   <label>وزن الذهب</label>
//                   <input
//                     type="text"
//                     name="row3_goldWeight"
//                     value={formData.row3_goldWeight}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             )}

//             {formData.row3_paymentMethod === "مبالغ ماليه" && (
//               <div className="form-group input">
//                 <label>المبلغ المالي المدفوع</label>
//                 <input
//                   type="text"
//                   name="row3_moneyAmount"
//                   value={formData.row3_moneyAmount}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             )}

//             {formData.row3_paymentMethod === "ذهب كسر ومبالغ ماليه" && (
//               <div>
//                 <div className="form-group input">
//                   <label>عيار الذهب</label>
//                   <input
//                     type="text"
//                     name="row3_goldCarat"
//                     value={formData.row3_goldCarat}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group input">
//                   <label>وزن الذهب</label>
//                   <input
//                     type="text"
//                     name="row3_goldWeight"
//                     value={formData.row3_goldWeight}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="form-group input">
//                   <label>المبلغ المالي المدفوع</label>
//                   <input
//                     type="text"
//                     name="row3_moneyAmount"
//                     value={formData.row3_moneyAmount}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
