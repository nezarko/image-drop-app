// Section.js
import React, { useState, useEffect, useRef } from "react";

const Section = ({ sectionNumber }) => {
  const [numImages, setNumImages] = useState(
    Math.floor(Math.random() * 51) + 70
  );
  const [sectionHeight, setSectionHeight] = useState(0);
  const startDate = new Date(new Date().getFullYear(), 9, 7);
  const currentDate = new Date();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dateArray = [];
    let currentDatePointer = new Date(startDate);

    while (currentDatePointer <= currentDate) {
      dateArray.push(new Date(currentDatePointer));
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    setDates(dateArray);
  }, []);

  useEffect(() => {
    // Calculate the section's height based on the number of images
    const calculatedHeight = 100 + numImages * 2;
    setSectionHeight(calculatedHeight);
  }, [numImages]);

  const getImageUrl = (imageNumber) => {
    const imageIndex = Math.floor(Math.random() * 3) + 1;
    return `/imgs/Boys-0${imageIndex}.png`;
  };

  const imageElements = [];
  for (let i = 0; i < numImages; i++) {
    const imageUrl = getImageUrl(i);
    const imageStyle = {
      top: `${Math.random() * (sectionHeight - 100)}px`,
      left: `${Math.random() * 95}%`,
      position: "absolute",
    };

    imageElements.push(
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <img
        key={i}
        src={imageUrl}
        alt={`Image ${i}`}
        className="section-img"
        style={imageStyle}
      />
    );
  }

  return (
    <>
      {dates.map((date, index) => (
        <>
          <div className="section" style={{ height: sectionHeight }}>
            <div className="section-number">
              <div className="section-numberT">
                <span className="dash">_</span>
                {date.toLocaleString("default", { month: "short" })}{" "}
                {date.getDate()}
              </div>

              <h1 class="title">
                <div className="title">{numImages} </div>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
              </h1>
            </div>
            <div className="section-image"> {imageElements}</div>
          </div>
        </>
      ))}
    </>
  );
};

export default Section;
