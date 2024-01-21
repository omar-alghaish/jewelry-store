/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import * as XLSX from "xlsx";

import {
    ClosesIcon,
    Excel,
    Filter,
    Pdf,
    Printer,
    Search
  } from "../EntryFile/imagePath";

const Tabletop = ({inputfilter,togglefilter,data,onUpdateData}) => {
    const [searchQuery, setSearchQuery] = useState('');

  const exportToExcel = (data, fileName, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || fileName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };
  
    // const filteredData = data?.filter(item => {
    //     return Object.values(item)?.some(value =>
    //         value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // });
    
    // console.log(filteredData)
    // onUpdateData(filteredData);
    return (
    <div className="table-top">
      <div className="search-set">
        <div className="search-path">
          <a
            className={` btn ${
              inputfilter ? "btn-filter setclose" : "btn-filter"
            } `}
            id="filter_search"
            onClick={() => togglefilter(!inputfilter)}
          >
            <img src={Filter} alt="img" />
            <span>
              <img src={ClosesIcon} alt="img" />
            </span>
          </a>
        </div>
        <div className="search-input">
          <input
            className="form-control form-control-sm search-icon"
            type="search"
            placeholder="Search..."
            value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to="#" className="btn btn-searchset">
            <img src={Search} alt="img" />
          </Link>
        </div>
      </div>
      <div className="wordset">
        <ul>
          <ReactTooltip place="top" type="dark" effect="solid" />
          <li>
            <a data-tip="Pdf">
              <img src={Pdf} alt="img" />
            </a>
          </li>
          <li style={{cursor:"pointer"}} onClick={()=>exportToExcel(data, "data", "data")}>
            <a data-tip="Excel">
              <img src={Excel} alt="img" />
            </a>
          </li>
          <li onClick={handlePrint} style={{cursor:"pointer"}}>
            <a data-tip="Print" >
              <img src={Printer} alt="img" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabletop;


// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Tooltip as ReactTooltip } from 'react-tooltip';
// import * as XLSX from "xlsx";

// import {
//     ClosesIcon,
//     Excel,
//     Filter,
//     Pdf,
//     Printer,
//     Search
// } from "../EntryFile/imagePath";

// const Tabletop = ({ data, setData }) => {
//     const [searchQuery, setSearchQuery] = useState('');

//     const filteredData = data.filter(item => {
//         return Object.values(item).some(value =>
//             value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     });
// setData(filteredData)
//     const exportToExcel = (data, fileName, sheetName) => {
//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || fileName);
//         XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="table-top">
//             <div className="search-set">
//                 <div className="search-path">
//                     <a
//                         className={` btn btn-filter`}
//                         id="filter_search"
//                         // onClick={() => togglefilter(!inputfilter)}
//                     >
//                         <img src={Filter} alt="img" />
//                         <span>
//                             <img src={ClosesIcon} alt="img" />
//                         </span>
//                     </a>
//                 </div>
//                 <div className="search-input">
//                     <input
//                         className="form-control form-control-sm search-icon"
//                         type="search"
//                         placeholder="Search..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <Link to="#" className="btn btn-searchset">
//                         <img src={Search} alt="img" />
//                     </Link>
//                 </div>
//             </div>
//             <div className="wordset">
//                 <ul>
//                     <ReactTooltip place="top" type="dark" effect="solid" />
//                     <li>
//                         <a data-tip="Pdf">
//                             <img src={Pdf} alt="img" />
//                         </a>
//                     </li>
//                     <li style={{ cursor: "pointer" }} onClick={() => exportToExcel(filteredData, "data", "data")}>
//                         <a data-tip="Excel">
//                             <img src={Excel} alt="img" />
//                         </a>
//                     </li>
//                     <li onClick={handlePrint} style={{ cursor: "pointer" }}>
//                         <a data-tip="Print" >
//                             <img src={Printer} alt="img" />
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Tabletop;
