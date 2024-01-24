
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

const AddBills = () => {
  // const [tableData, setTableData] = useState([
  //   {
  //     id: generateUniqueId(),
  //     Item_Number: "",
  //     Item_Name: "",
  //     Caliber: "",
  //     Quantity: "",
  //     Total_Weight: "",
  //     Gram_Price: "",
  //     Gram_Fees: "",
  //     "Gram/Sold_Item_Price": "",
  //     Stone_Weight: "",
  //     Total: "",
  //     Sales_Center: "",
  //     Type: "",
  //     operation_type: "",
  //     Customer_Number: "",
  //     Customer_Name: "",
  //     Description: "",
  //     Address: "",
  //     Buyer_Type: "",
  //   },
  // ]);

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
    debtorLocalCurrency:0,
    foreignCurrencyCredit:0,
    localCurrencyCredit:0,
    debtorForeignCurrency:0,
  });

  const [allData, setAllData] = useState([]);
  const [products, setProducts] = useState([]);

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
      title: "سعر بيع جرام/حبه",
      render: (_, record, index) => (
        <div className="form-group table_input">
          <input
            type="text"
            value={record["Gram/Sold_Item_Price"]}
            onChange={(e) =>
              handleInputChange(index, "Gram/Sold_Item_Price", e.target.value)
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

  const [users, setUsers] = useState([
    {
      customer_Number: "1",
      customer_name: "omar mohammed alghaihs",
      address: "8 elsayed hassed street almahala alkubra",
      discripton: "this is test",
      Buyer_Type: "عميل",
    },
    {
      customer_Number: "2",
      customer_name: "ismail mohammed alghaihs",
      address: "8 elsayed hassed street almahala alkubra",
      discripton: "this is test",
      Buyer_Type: "مورد",
    },
    {
      customer_Number: "3",
      customer_name: "belal mohammed alghaihs",
      address: "8 elsayed hassed street almahala alkubra",
      discripton: "this is test",
      Buyer_Type: "حساب",
    },
  ]);

  const handleInputChange = (index, name, value, e) => {
    setTableData((prevData) => ({
      ...prevData,
      bills: prevData.bills.map((bill, i) => {
        if (i === index) {
          const theProduct = products.find((product) => product.id == value);
          bill[name] = value;
  
          if (name === "Item_Number" && value !== "") {
            // Update other fields when Item_Number is not empty
            bill["Caliber"] = theProduct?.caliber_name;
            bill["Item_Name"] = theProduct?.product_name;
            bill["Quantity"] = 1;
            bill["Gram_Price"] = theProduct?.caliber;
            bill["Total_Weight"] = theProduct?.weight;
            bill["Total"] = theProduct
              ? parseFloat(theProduct?.caliber) * 1 * parseFloat(theProduct?.weight)
              : 0;
          } else if (name === "Item_Number" && value === "") {
            // Reset other fields when Item_Number is empty
            bill["Caliber"] = "";
            bill["Item_Name"] = "";
            bill["Quantity"] = 0;
            bill["Gram_Price"] = 0;
            bill["Total_Weight"] = 0;
            bill["Total"] = 0;
          }
  
          return bill;
        } else {
          return bill;
        }
      }),
    }));
  };
  
  useEffect(() => {
    setTableData((prevData) => ({
      ...prevData,
      bills: prevData.bills.map((bill) => {
        let gramPrice = parseFloat(bill["Gram_Price"]) || 0;
        let totalWeight = parseFloat(bill["Total_Weight"]) || 0;
        let quantity = parseFloat(bill["Quantity"]) || 0;
        bill["Total"] = gramPrice * quantity * totalWeight;
      
        return bill;
      }),
    }));
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

  
  // eslint-disable-next-line no-undef
  const db = levelup(leveljs("./db"));
  useEffect(() => {
    db.get("bills", function (err, value) {
      setAllData(value ? JSON.parse(value) : []);
    });
    db.get("products", function (err, value) {
      setProducts(value ? JSON.parse(value) : []);
    });
  }, []);
  console.log(products);
  console.log(allData);

  
  const handleAddBill = () => {
    const updatedData =  [...allData, { ...tableData, id: allData.length + 1 }];
    db.put("bills", JSON.stringify(updatedData), function (err) {
      // if (err) {
      //   console.error("Error saving to database", err);
      //   toast.error("حدثت مشكلة أثناء الحفظ في قاعدة البيانات");
      // } else {
      // }
    });
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
      id:0
    });
  };

  console.log(tableData);
  const handleCustomerNumberChange = (event) => {
    const number = event.target.value;
    setCustomerNumber(number);
    const foundUser = users.find((user) => user.customer_Number === number);
    setFundUser(foundUser);
    if (foundUser) {
      setTableData((prevData) => ({
        ...prevData,
        ...foundUser,
      }));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
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
              </select>
            </div>
            <div className="form-group equal-width">
              <label>النوع 2</label>
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
                <label>رقم العميل</label>
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
                <label>الوصف</label>
                <input
                  disabled
                  value={fundUser?.discripton || ""}
                  type="text"
                />
              </div>
              <div className="form-group equal-width">
                <label>العنوان</label>
                <input type="text" disabled value={fundUser?.address || ""} />
              </div>
              <div className="form-group equal-width">
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
              </div>
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

export default AddBills;
