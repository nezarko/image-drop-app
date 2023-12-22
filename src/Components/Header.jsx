import React, { useRef } from 'react';
import '../assets/css/header.css';
import logo from '../assets/imags/oo.png'
import scrollIcon from '../assets/imags/scrollIcon.svg';
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
          {/* <div className='flex justify-space-between items-align-center'>
          <p>dont scroll</p>
          <img src={scrollIcon} alt="" />
          </div> */}
      </div>
    </div>
  );
}

export default Header;
