import React from "react";
import CloseIcon from "@mui/icons-material/Close";

// eslint-disable-next-line react/prop-types, no-unused-vars
const ModalContent = ({ isOpen, setOpen, children, header }) => {
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #ccc",
        position:"fixed",
        top:"0",
        left:isOpen ?"0" : "100%",
        zIndex:"1111111",
        width:"100vw",
        height:  "100vh" ,
        overflow:"scroll",
        transition:".3s"
        
      }}
    >
      <div style={{  zIndex:"1111",justifyContent: "flex-end", position:'fixed', top:"50px", left:"50px", display: isOpen ? "flex" : "none" }}>
        <CloseIcon onClick={closeModal} style={{ cursor: "pointer" }} />
      </div>
      <div> {header &&   <h2>{header}</h2>}
      
        {children}
      </div>
    </div>
  );
};

export default ModalContent;
