/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style/main.css";
import Table from "../../EntryFile/datatable";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { generateUniqueId } from "../../functions/uniqeId";
import leveljs from "level-js";
const levelup = require("levelup");
import { toast } from "react-toastify";

const AddReceipt = () => {
  const [tableData, setTableData] = useState({
    id: 0,
    bills: [
      {
        id: generateUniqueId(),
        Item_Number: "",
        Item_Name: "",
        Caliber: "",
        Quantity: "",
        Total_Weight: "",
        Gram_Price: "",
        Gram_Fees: "",
        "Gram/Sold_Item_Price": "",
        Stone_Weight: "",
        Total: "",
        agrement_price: "",
        debtorLocalCurrency: 0,
        foreignCurrencyCredit: 0,
        localCurrencyCredit: 0,
        debtorForeignCurrency: 0,
      },
    ],
    Sales_Center: "",
    Type: "فاتورة شراء",
    operation_type: "",
    customer_Number: "",
    customer_name: "",
    discripton: "",
    address: "",
    Buyer_Type: "",
    buyer_name: "",
  });

  const [allData, setAllData] = useState([]);
  const [products, setProducts] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);

  const columns = [
    {
      title: " رقم الصنف",
      render: (_, record, index) => (
        <div className="form-group table_input num">
          <input
            type="text"
            value={record["Item_Number"]}
            onChange={(e) => {
              handleInputChange(index, "Item_Number", e.target.value);
              // handleIdChange(index, "Item_Number", e);
            }}
          />
        </div>
      ),
    },
    {
      title: "اسم الصنف",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Item_Name"]}
            onChange={(e) =>
              handleInputChange(index, "Item_Name", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "العيار",
      render: (_, record, index) => (
        <div className="form-group table_input num">
          <input
            type="text"
            value={record["Caliber"]}
            onChange={(e) =>
              handleInputChange(index, "Caliber", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "العدد او الكميه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Quantity"]}
            onChange={(e) =>
              handleInputChange(index, "Quantity", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "الوزن الاجمالي",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Total_Weight"]}
            onChange={(e) =>
              handleInputChange(index, "Total_Weight", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "دفعه مبدأيه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["agrement_price"]}
            onChange={(e) =>
              handleInputChange(index, "agrement_price", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "سعر الجرام",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Gram_Price"]}
            onChange={(e) =>
              handleInputChange(index, "Gram_Price", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "اجور الجرام",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Gram_Fees"]}
            onChange={(e) =>
              handleInputChange(index, "Gram_Fees", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "السعر بدون ضريبه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["priceBeforeTax"]}
            onChange={(e) =>
              handleInputChange(index, "priceBeforeTax", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "وزن الحجر",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Stone_Weight"]}
            onChange={(e) =>
              handleInputChange(index, "Stone_Weight", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "الاجمالي",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Total"]}
            onChange={(e) => handleInputChange(index, "Total", e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "الضريبه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["tax"]}
            onChange={(e) => handleInputChange(index, "tax", e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "الاجمالي شامل الضريبه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["priceAfterTax"]}
            onChange={(e) =>
              handleInputChange(index, "priceAfterTax", e.target.value)
            }
          />
        </div>
      ),
    },
    {
      title: "حذف",
      render: (_, __, index) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteRow(index)}
        >
          <DeleteIcon />
        </span>
      ),
    },
  ];
  useEffect(() => {
    db.get("suppliers", function (err, value) {
      setAllSuppliers(value ? JSON.parse(value) : []);
    });
  }, []);
  const handleDeleteRow = (index) => {
    setTableData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.bills = [...updatedData.bills];
      updatedData.bills.splice(index, 1);
      return updatedData;
    });
  };
  const handleAddRow = () => {
    setTableData((prevData) => ({
      ...prevData,
      bills: [
        ...prevData.bills,
        {
          id: generateUniqueId(),
          Item_Number: "",
          Item_Name: "",
          Caliber: "",
          Quantity: "",
          Total_Weight: "",
          Gram_Price: "",
          Gram_Fees: "",
          "Gram/Sold_Item_Price": "",
          Stone_Weight: "",
          Total: "",
        },
      ],
    }));
  };
  const [customerNumber, setCustomerNumber] = useState("");

  const [fundUser, setFundUser] = useState({});

  const [users, setUsers] = useState([]);
  const handleInputChange = (index, name, value, e) => {
    setTableData((prevData) => ({
      ...prevData,
      bills: prevData.bills.map((bill, i) => {
        if (i === index) {
          const theProduct = products.find((product) => product.id == value);
          bill[name] = value;

          if (name === "Item_Number" && value !== "") {
            bill["Caliber"] = theProduct?.caliber_name;
            bill["Item_Name"] = theProduct?.product_name;
            bill["Quantity"] = 1;
            bill["Gram_Price"] = theProduct?.caliber;
            bill["Total_Weight"] = theProduct?.weight;
            bill["Total"] =
              theProduct &&
              parseFloat(theProduct.caliber) *
                1 *
                parseFloat(theProduct.weight);
          } else if (name === "Item_Number" && value === "") {
            bill["Caliber"] = "";
            bill["Item_Name"] = "";
            bill["Quantity"] = 0;
            bill["Gram_Price"] = 0;
            bill["Total_Weight"] = 0;
            bill["Total"] = 0;
          } else if (name === "tax") {
            const taxPercentage = parseFloat(value) || 0;
            const totalPriceBeforeTax = bill["Total"] || 0;
            const taxAmount = (taxPercentage / 100) * totalPriceBeforeTax;
            bill["tax"] = value;
            console.log(taxAmount);
            bill["priceAfterTax"] = totalPriceBeforeTax + taxAmount;
          }
          bill["debtorLocalCurrency"] =
            bill["priceAfterTax"] - bill["agrement_price"] || 0;

          return bill;
        } else {
          return bill;
        }
      }),
    }));
  };

  useEffect(() => {
    setTableData((prevData) => {
      const updatedBills = prevData.bills.map((bill) => {
        const gramPrice = parseFloat(bill["Gram_Price"]) || 0;
        const totalWeight = parseFloat(bill["Total_Weight"]) || 0;
        const quantity = parseFloat(bill["Quantity"]) || 0;
        bill["Total"] = gramPrice * quantity * totalWeight;
        bill["priceBeforeTax"] = gramPrice * quantity * totalWeight;

        const taxPercentage = parseFloat(bill["tax"]) || 0;
        const totalPriceBeforeTax = parseFloat(bill["priceBeforeTax"]) || 0;

        if (taxPercentage > 0) {
          const taxAmount = (taxPercentage / 100) * totalPriceBeforeTax;
          bill["priceAfterTax"] = totalPriceBeforeTax + taxAmount;
        } else {
          bill["priceAfterTax"] = totalPriceBeforeTax;
        }
        bill["debtorLocalCurrency"] =
          bill["priceAfterTax"] - bill["agrement_price"] || 0;

        return bill;
      });
      const sums = calculateSums();

      return {
        ...prevData,
        bills: updatedBills,
        debtorLocalCurrency: sums.debtorLocalCurrencySum,
        foreignCurrencyCredit: sums.foreignCurrencyCreditSum,
        localCurrencyCredit: sums.localCurrencyCreditSum,
        debtorForeignCurrency: sums.debtorForeignCurrencySum,
      };
    });
  }, [tableData.bills]);

  const handleSalesCenterChange = (value) => {
    setTableData((prevData) => ({
      ...prevData,
      Sales_Center: value,
    }));
  };

  const handleTypeChange = (value) => {
    setTableData((prevData) => ({
      ...prevData,
      Type: value,
    }));
  };

  const handleOperationTypeChange = (value) => {
    setTableData((prevData) => ({
      ...prevData,
      operation_type: value,
    }));
  };

  const db = levelup(leveljs("./db"));
  useEffect(() => {
    db.get("receipts", function (err, value) {
      setAllData(value ? JSON.parse(value) : []);
    });
    db.get("products", function (err, value) {
      setProducts(value ? JSON.parse(value) : []);
    });
  }, []);
  console.log(products);
  console.log(allData);

  const calculateSums = () => {
    let debtorLocalCurrencySum = 0;
    let foreignCurrencyCreditSum = 0;
    let localCurrencyCreditSum = 0;
    let debtorForeignCurrencySum = 0;

    tableData.bills.forEach((bill) => {
      debtorLocalCurrencySum += parseFloat(bill["debtorLocalCurrency"]) || 0;
      foreignCurrencyCreditSum +=
        parseFloat(bill["foreignCurrencyCredit"]) || 0;
      localCurrencyCreditSum += parseFloat(bill["localCurrencyCredit"]) || 0;
      debtorForeignCurrencySum +=
        parseFloat(bill["debtorForeignCurrency"]) || 0;
    });

    return {
      debtorLocalCurrencySum,
      foreignCurrencyCreditSum,
      localCurrencyCreditSum,
      debtorForeignCurrencySum,
    };
  };

  const handleAddBill = () => {
    const updatedData = [...allData, { ...tableData, id: allData.length + 1 }];
    db.put("receipts", JSON.stringify(updatedData), function (err) {
      // if (err) {
      //   console.error("Error saving to database", err);
      //   toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
      // } else {
      // }
    }
    );
        toast.success("تمت الإضافة بنجاح");

    setTableData({
      bills: [
        {
          id: generateUniqueId(),
          Item_Number: "",
          Item_Name: "",
          Caliber: "",
          Quantity: "",
          Total_Weight: "",
          Gram_Price: "",
          Gram_Fees: "",
          "Gram/Sold_Item_Price": "",
          Stone_Weight: "",
          Total: "",
        },
      ],
      Sales_Center: "",
      Type: "",
      operation_type: "",
      customer_Number: "",
      customer_name: "",
      discripton: "",
      address: "",
      Buyer_Type: "",
    });
  };
  console.log(tableData);
  const handleCustomerNumberChange = (event) => {
    const number = event.target.value;
    setCustomerNumber(number);
    const foundUsr = allSuppliers.find(
      (user) => user?.id == +event.target.value
    );
    const user = {
      customer_Number: foundUsr?.id,
      customer_name: foundUsr?.supplier_name,
      customer_phone: foundUsr?.phone,
    };
    setFundUser({
      customer_Number: foundUsr?.id,
      customer_name: foundUsr?.supplier_name,
      customer_phone: foundUsr?.phone,
    });
    if (foundUsr) {
      setTableData((prevData) => ({
        ...prevData,
        ...user,
      }));
    }
  };
  console.log(allSuppliers);
  return (
    <div className="page-wrapper">
      <div className="content">
        <h1>اضافة فاتورة شراء</h1>
        <div className="top-inputs">
          <div className="row1">
            <div className="form-group equal-width">
              <label>مركز البيع</label>
              <select
                name="Sales_Center"
                value={tableData.Sales_Center}
                onChange={(e) => handleSalesCenterChange(e.target.value)}
              >
                <option value="مبيعات الفرع الرئيسي">
                  مبيعات الفرع الرئيسي
                </option>
                <option value="مبيعات فرع اخر">مبيعات فرع اخر</option>
              </select>
            </div>
            <div className="form-group equal-width">
              <label>النوع</label>
              <select
                name="Type"
                value={tableData.Type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="فاتورة مبيعات">فاتورة مبيعات </option>
                <option value="فاتورة مبيعات اجله">فاتورة مبيعات اجله</option>
                <option value="فاتورة شراء">فاتورة شراء</option>
              </select>
            </div>

            <div className="form-group equal-width">
              <label>نوع العمليه</label>
              <select
                name="operation_type"
                value={tableData.operation_type}
                onChange={(e) => handleOperationTypeChange(e.target.value)}
              >
                <option value="فاتورة كسر">فاتورة كسر </option>
                <option value="اجل ذهب"> اجل ذهب</option>
                <option value="فاتورة اجور"> فاتورة اجور</option>
              </select>
            </div>
          </div>

          <div className="row2">
            <h2>بيانات العميل</h2>

            <div className="inputs-container">
              <div className="form-group equal-width">
                <label>رقم المورد</label>
                <input
                  type="text"
                  onChange={handleCustomerNumberChange}
                  value={customerNumber}
                />
              </div>
              <div className="form-group equal-width">
                <label>اسم العميل</label>
                <input
                  type="text"
                  disabled
                  value={fundUser?.customer_name || ""}
                />
              </div>
              <div className="form-group equal-width">
                <label>الهاتف</label>
                <input
                  disabled
                  value={fundUser?.customer_phone || ""}
                  type="text"
                />
              </div>
              {/* <div className="form-group equal-width">
                <label>الوصف</label>
                <input
                  disabled
                  value={fundUser?.discripton || ""}
                  type="text"
                />
              </div> */}
              {/* <div className="form-group equal-width">
                <label>العنوان</label>
                <input type="text" disabled value={fundUser?.address || ""} />
              </div> */}
              {/* <div className="form-group equal-width">
                <label>نوع المشتري</label>
                <select
                  name=""
                  id=""
                  disabled
                  value={fundUser?.Buyer_Type || ""}
                >
                  <option value="حساب"> حساب</option>
                  <option value="عميل"> عميل</option>
                  <option value="مورد"> مورد</option>
                </select>
              </div> */}
              <div className="form-group equal-width">
                <label>نوع المشتري</label>
                <select name="" id="" disabled value={"مورد"}>
                  <option value="مورد"> مورد</option>
                </select>
              </div>
              {/* <div className="form-group equal-width">
                <label>اسم المشتري</label>
                <input
                  value={tableData?.buyer_name || ""}
                  type="text"
                  onChange={(e) => {
                    setTableData((prevData) => ({
                      ...prevData,
                      buyer_name: e.target.value,
                    }));
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="main-table">
          <Table
            columns={columns}
            dataSource={tableData.bills}
            isPaginatoin={false}
          />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <span onClick={handleAddRow} className="btn">
              <AddIcon />
            </span>
            <button className="btn btn-submit me-2" onClick={handleAddBill}>
              اضافه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReceipt;
