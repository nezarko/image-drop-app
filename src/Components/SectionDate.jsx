import { useState } from "react";
import "../App.css";
import "../assets/css/dots.css"
const SectionDate = ({ date, title }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDot, setSelectedDot] = useState(null);
  
    const handleDotClick = (number) => {
      setSelectedDot(title);
      setShowPopup(true);
  
      // Hide the popup after 2 seconds (adjust the delay as needed)
      setTimeout(() => {
        setShowPopup(false);
        setSelectedDot(null);
      }, 2000);
    };
  return (
    <div className="section-number">
      <span className="dot"></span>
      <div className="section-numberT">
        {date.toLocaleString("default", { month: "short" })} {date.getDate()}
      </div>
      <div className="dotsGIF-container">
        <div className="dotGIF" onClick={() => handleDotClick(1)}></div>
        <div className="dotGIF" onClick={() => handleDotClick(2)}></div>
        <div className="dotGIF" onClick={() => handleDotClick(3)} ></div>
        <div className="dotGIF" onClick={() => handleDotClick(4)}></div>
        <div className="dotGIF" onClick={() => handleDotClick(5)} ></div>
        <div className="dotGIF" onClick={() => handleDotClick(6)}></div>
        {/* Add more dots as needed */}
       
        {showPopup && <div className="popup">{selectedDot}</div>}
      </div>
    </div>
  );
};

export default SectionDate;
