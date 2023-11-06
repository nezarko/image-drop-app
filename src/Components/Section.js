import React, { useState, useEffect, memo, useLayoutEffect, useRef, useMemo } from "react";
import "../App.css";
import Store from "../Common/Store";
import Image from "./Image";

const Section = memo(({ sectionNumber }) => {
  const [numImages, setNumImages] = useState(
    // Math.floor(Math.random() * 51) + 70
     140
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
          <div className="section-image" >

            {Array.from({ length: numImages }).map((_, i) => (
              <Image
                key={i}
                url={Store.getImage().url}
                top={Math.random()  * (sectionHeight - 100)}
                left={Math.random() * 90}
                date={date}
                index={i}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
});

export default Section;
