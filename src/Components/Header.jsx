import React, { useRef } from 'react';
import '../assets/css/header.css';
import logo from '../assets/imags/oo.png'

import scrollimg from "../assets/imags/scro.png";
function Header() {
  
  // const loco = useRef(new LocomotiveScroll())
  // function s(target , o = {}) {
  //    loco.current.scrollTo(target , o)
  // }

  //   const scrollToBottom = () => {
  //     // Scroll to the bottom of the page
  //     window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  //   };


  return (
    <div className="header">
      <div className="flower-container">
        <img src={logo} alt="flower" className="flower-image" />

        <img
          src={scrollimg}
          alt="flower"
          style={{marginTop:"250px",height:"80px",marginBottom:"40px"}}
          className="flower-image2"
        />
      </div>
    </div>
  );
}

export default Header;
