import React from "react";
import "../App.css";

function DropedSection() {
  return (
    <div
    className="section"
    id="receiver-section"
    style={{
      height: "1100px",
      width: "95%",
      marginBottom: "10px",
      marginTop: "10px",
      position: "relative",
      // background: "linear-gradient(to bottom, #fff 40%, #00f 100%)",
      // borderRadius: "10% / 700px 700px 100px 100px",
      boxSizing: "border-box",
      padding: "5px",
      margin: "10px"
    }}
  >
    <div
      className="zigzag-border"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "0.5%",
        zIndex: -1,
      }}
    ></div>
  </div>
);
}

export default DropedSection;
