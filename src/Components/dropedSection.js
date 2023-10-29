import React from 'react'
import "../App.css";
function DropedSection() {
  return (
   
        <div
          className="section"
          id="receiver-section"
          style={{
            height: '1100px',
            width: '95%',
            marginBottom: '10px',
            marginTop: '10px',
            position: 'relative',
          }}
        >
          <div
            className="zigzag-border"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '0.5%',
              zIndex: -1,
            }}
          ></div>
        </div>
     
  )
}

export default DropedSection