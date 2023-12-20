import React, { useState } from 'react';
import '../App.css';
// import dots from '../assets/imags/num.gif';

const ZoomTarget = ({ title }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleImageClick = () => {
    setIsPopupVisible(true);

    // Hide the popup after 2 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  };

  return (
    <div>
      <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        {/* <img className="img" src={dots} alt="Dots Loading..." /> */}
      </div>

      {isPopupVisible && (
        <div className="popup">
          <p>Fixed Number: 42</p>
        </div>
      )}

      <div>{title}</div>
    </div>
  );
};

export default ZoomTarget;
