/* eslint-disable react/prop-types */
import React from "react";

const Details = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <h2>{data.description}</h2>
        <p>
          <strong>رقم مرجعي: </strong> {data.id}
        </p>
        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>نوع الحركه: </strong> {data.movementType}
          </p>
          <p>
            <strong>نوع السند: </strong> {data.documentType}
          </p>
          
        <p>
          <strong>الرقم: </strong> {data.number}
        </p>
          <p>
            <strong>شيك: </strong> {data.check ? "نعم" : "لا"}
          </p>
        </div>

        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>القسم: </strong> {data.section}
          </p>
          <p>
            <strong>اسم الفرع: </strong> {data.branchName}
          </p>{" "}
          <p>
            <strong>التاريخ: </strong> {data.documentDate}
          </p>{" "}
          <p>
            <strong>مدخل السند: </strong> {data.documentEntry}
          </p>
          <p>
            <strong>الوصف: </strong> {data.description}
          </p>
        </div>
        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>الفرق: </strong> {data.difference}
          </p>
          <p>
            <strong>نسبة الخصم: </strong> {data.discountAmount}
          </p>
          <p>
            <strong>مبلغ فارق العيار: </strong> {data.caliberDifferenceAmount}
          </p>
       
        </div>

        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>مدفوع الصندوق\البنك:</strong> {data.fundBank}
          </p>
          <p>
            <strong>اجمالي الذهب الكسر:</strong> {data.totalGoldBroken}
          </p>
          <p>
            <strong>حساب الصندوق\البنك:</strong> {data.fundAccount}
          </p>
        </div>

        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
        <p>
            <strong>طريقة الدفع:</strong> {data.row3_paymentMethod}
          </p>
          <p><strong>المبلغ:</strong>{data.row3_moneyAmount}</p>
          {
            data?.goldItems?.map((item)=>(
              <>
                <p>
              <strong>الوزن ذهب كسر عيار{item?.carat}: {item?.weight}</strong> 
            </p>
              </>
            
            ))
          }
          
        </div>
        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>النوع:</strong> {data.selectedType}
          </p>
          <p>
            <strong>رمز العميل:</strong> {data.supplierCode}
          </p>
          <p>
            <strong>اسم العميل: </strong> {data.radioText}
          </p>
        </div>
        <div style={{ padding: "50px 0", borderBottom: "1px solid black" }}>
          <p>
            <strong>اجمالي عمله محليه: </strong> {data.totalLocalCurrency}
          </p>
          <p>
            <strong>اجمالي الوزن عيار21: </strong> {data.totalWeight21}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
