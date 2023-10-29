import React, { useState, useEffect, memo } from "react";
import "../App.css";

const getImageUrl = () => {
  const imageIndex = Math.floor(Math.random() * 3) + 2;
  return `/imgs/Boys-0${imageIndex}.png`;
};

const Image = memo(({ sectionHeight }) => {
  const imageUrl = getImageUrl();
  const imageStyle = {
    top: `${Math.random() * (sectionHeight - 100)}px`,
    left: `${Math.random() * 95}%`,
    position: "absolute",
  };

  const tooltipText = "Name: Ahmad , Age : 3 Years, Gender: Male "; // Replace with your tooltip data or html

  return (
    <img
      src={imageUrl}
      alt="Random Image"
      className="section-img"
      style={imageStyle}
      loading="lazy"
      title={tooltipText} // Add the title attribute for the tooltip
    />
  );
});

const Section = memo(({ sectionNumber }) => {
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

  return (
    <>
      {dates.map((date, index) => (
        <div className="section" style={{ height: sectionHeight }} key={index}>
          <div className="section-number">
            <div className="section-numberT">
              <span className="dash">_</span>
              {date.toLocaleString("default", { month: "short" })}{" "}
              {date.getDate()}
            </div>

            <h1 className="title">
              <div className="title">{numImages} </div>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
            </h1>
          </div>
          <div className="section-image">
            {Array.from({ length: numImages }).map((_, i) => (
              <Image key={i} sectionHeight={sectionHeight} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
});

export default Section;
