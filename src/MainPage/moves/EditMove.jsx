/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import "./style/main.css";
import leveljs from "level-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const levelup = require("levelup");

const EditMove = () => {
  const { editItem } = useSelector((state) => state.editItem);
  const [MoveData, setMoveData] = useState(editItem);
  const [allData, setAllData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMoveData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const db = levelup(leveljs("./db"));
  const handleAdd = () => {
    setAllData((prevAllData) => {
      const newData = prevAllData.map((item) => {
        if (item.id === editItem.id) {
          return MoveData
        }
        return item;
      });
  
      db.put("movements", JSON.stringify(newData), function (err) {
        if (err) {
          console.error("Error saving to database", err);
          toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
        } else {
          toast.success("تمت التعديل بنجاح");
        }
      });
  
      return newData;
    });
  };
  

  useEffect(() => {
    db.get("movements", function (err, value) {
      setAllData(value ? JSON.parse(value) : []);
    });
  }, []);
  console.log(allData);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="cus-row row1">
          <div className="form-group equal-width">
            <label>القسم\القطاع</label>
            <select
              name="section"
              id=""
              value={MoveData.section}
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
              value={MoveData.movementType}
              onChange={handleInputChange}
            >
              <option value="سند صرف">سند صرف</option>
              <option value="سند استلام">سند استلام</option>
            </select>{" "}
          </div>
          <div className="form-group equal-width">
            <label>نوع السند</label>
            <select
              name="documentType"
              id=""
              value={MoveData.documentType}
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
              name="number"
              value={MoveData.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group ">
            <label>شيك</label>
            <label className="container">
              <input
                name="check"
                checked={MoveData.check}
                type="checkbox"
                onChange={handleInputChange}
              />
              <div className="checkmark"></div>
            </label>
          </div>
        </div>
        <div className="cus-row row2">
          <div className="form-group equal-width">
            <label>اسم الفرع</label>
            <input
              type="text"
              name="branchName"
              value={MoveData.branchName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group equal-width">
            <label>مدخل السند</label>
            <input
              type="text"
              name="documentEntry"
              value={MoveData.documentEntry}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group equal-width">
            <label>تاريخ السند</label>
            <input
              type="text"
              name="documentDate"
              value={MoveData.documentDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group full-width">
            <label> الوصف</label>
            <textarea
              name="description"
              value={MoveData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        {/* Continue adding similar code for the remaining input fields */}
        <div className="row4">
          <div className="form-group">
            <label>اختر النوع</label>
            <select
              name="selectedType"
              value={MoveData.selectedType}
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
              {MoveData.selectedType === "supplier"
                ? "المورد"
                : MoveData.selectedType === "customer"
                ? "العميل"
                : MoveData.selectedType === "account"
                ? "الحساب"
                : ""}
            </label>
            <input
              type="text"
              name="supplierCode"
              value={MoveData.supplierCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group input">
            <label htmlFor="">
              اسم{" "}
              {MoveData.selectedType === "supplier"
                ? "المورد"
                : MoveData.selectedType === "customer"
                ? "العميل"
                : MoveData.selectedType === "account"
                ? " الحساب"
                : ""}
            </label>
            <input
              type="text"
              name="radioText"
              value={MoveData.radioText}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row3">
          <h5>ذهب كسر مدفوع من صنادق الكسر</h5>
          <div className="column1">
            <div className="form-group input">
              <label>طريقة الدفع</label>
              <select
                name="row3_paymentMethod"
                value={MoveData.row3_paymentMethod}
                onChange={handleInputChange}
              >
                <option value="ذهب كسر">ذهب كسر </option>
                <option value="مبالغ ماليه">مبالغ ماليه</option>
                <option value="ذهب كسر ومبالغ ماليه">
                  ذهب كسر و مبالغ ماليه
                </option>
              </select>
            </div>
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار24</label>
              <input
                type="text"
                name="row3_goldWeight24"
                value={MoveData.row3_goldWeight24}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار22</label>
              <input
                type="text"
                name="row3_goldWeight22"
                value={MoveData.row3_goldWeight22}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار21</label>
              <input
                type="text"
                name="row3_goldWeight21"
                value={MoveData.row3_goldWeight21}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار18</label>
              <input
                type="text"
                name="row3_goldWeight18"
                value={MoveData.row3_goldWeight18}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row5">
          <div className="form-group equal-width">
            <label>مدفوع من الصندوق\البنك</label>
            <input
              type="text"
              name="fundBank"
              value={MoveData.fundBank}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group equal-width">
            <label>اجمالي الذهب الكسر</label>
            <input
              type="text"
              name="totalGoldBroken"
              value={MoveData.totalGoldBroken}
              onChange={handleInputChange}
            />
          </div>{" "}
          <div className="form-group equal-width">
            <label>حساب الصندوق\البنك</label>
            <input
              type="text"
              name="fundAccount"
              value={MoveData.fundAccount}
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
              value={MoveData.caliberDifferenceAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group equal-width">
            <label>مبلغ الخصم</label>
            <input
              type="text"
              name="discountAmount"
              value={MoveData.discountAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>اختر الفارق</label>
            <select
              name="difference"
              value={MoveData.difference}
              onChange={handleInputChange}
            >
              <option value="فارق لنا">فارق لنا</option>
              <option value="فارق بهم">فارق لهم</option>
            </select>
          </div>
          <div className="form-group equal-width">
            <label>حساب فارق العيار</label>
            <input
              type="text"
              name="caliberDifferenceAmount"
              value={MoveData.caliberDifferenceAmount}
              onChange={handleInputChange}
            />
          </div>{" "}
          <div className="form-group equal-width">
            <label>حساب الخصم</label>
            <input
              type="text"
              name="discountAmount"
              value={MoveData.discountAmount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row7">
          <h5>طريقة السداد</h5>
          <div className="column1">
            <div className="form-group">
              <label>اختر طريقه</label>
              <select
                name="row7_wayToPay"
                value={MoveData.row7_wayToPay}
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
                value={MoveData.row7_goldWeight24}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار22</label>
              <input
                type="text"
                name="row7_goldWeight22"
                value={MoveData.row7_goldWeight22}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار21</label>
              <input
                type="text"
                name="row7_goldWeight21"
                value={MoveData.row7_goldWeight21}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input">
              <label>الوزن ذهب كسر عيار18</label>
              <input
                type="text"
                name="row7_goldWeight18"
                value={MoveData.row7_goldWeight18}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input">
              <label>المبلغ المطلوب سداده نقدا</label>
              <input
                type="text"
                name="row7_cashPaymentAmount"
                value={MoveData.row7_cashPaymentAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row8">
          <h5>اجماليات السند</h5>
          <div className="column1">
            <div className="form-group input">
              <label> الاجمالي عمله محليه</label>
              <input
                type="text"
                name="totalLocalCurrency"
                value={MoveData.totalLocalCurrency}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input">
              <label> الاجمالي الوزن عيار21</label>
              <input
                type="text"
                name="totalWeight21"
                value={MoveData.totalWeight21}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-submit me-2" onClick={handleAdd}>
          تعديل
        </button>
      </div>
    </div>
  );
};

export default EditMove;
