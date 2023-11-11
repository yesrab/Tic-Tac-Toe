import React from "react";
import "../styles/inputSquare.css";
import XLogo from "../assets/X-logo.svg";
import OLogo from "../assets/O-logo.svg";
function InputSquare(props) {
  return (
    <div className='inputSquare' {...props}>
      {props.x ? <img src={XLogo} /> : props.o ? <img src={OLogo} /> : ""}
    </div>
  );
}

export default InputSquare;
