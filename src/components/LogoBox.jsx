import React from "react";
import XLogo from "../assets/X-logo.svg";
import OLogo from "../assets/O-logo.svg";
function LogoBox() {
  return (
    <div className='logoBox'>
      <img src={XLogo} alt='X' />
      <img src={OLogo} alt='O' />
    </div>
  );
}

export default LogoBox;
