/* eslint-disable react/prop-types */
import React from "react";
import Table from "./datatable";
import { useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';

useSelector;
const Print = ({data, columns}) => {
  const printRef = useReactToPrint({
    content: () => document.getElementById('table-to-print'),
  });  return (
    <>
      <html>
      <Table
        //   isPaginatoin={true}
        id="table-to-print"
        columns={data}
        dataSource={columns}
      />
    </html>
    <button onClick={printRef}>Print</button>
    </>
  
  );
};

export default Print;
