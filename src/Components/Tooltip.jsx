import React from "react";

const Tooltip = ({ text, position, isVisible }) => {
  const tooltipStyle = {
    display: isVisible ? "block" : "none",
    position: "absolute",
    top: position.top,
    left: position.left,
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
  };

  return <div style={tooltipStyle}>{text}</div>;
};

export default Tooltip;
