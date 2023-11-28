import React, { forwardRef, useEffect, useLayoutEffect } from "react";
import "../App.css";
import SectionDate from "./SectionDate";
import Person from "./Person";
// import { doc } from "firebase/firestore";

const Section = forwardRef((props, ref) => {
  const { height, section, sectionIndex, ...$props } = props;
  return (
    <>
      <div  
        ref={ref}
        className={`section section-${sectionIndex} contianer-section-img-set`}
        style={{ height: height }}
        key={sectionIndex}
        data-fall={`section-${sectionIndex}`}
        {...$props}
      >
        <SectionDate
          date={new Date(section.date)}
          title={section.numberOfRoses}
        />

        <div
          className="section-image"
          data-scroll
          data-scroll-speed="0.1"
          // data-scroll-call="scrollEvent"
          // data-scroll-postion="end,start"
          // data-scroll-offset="50%,50%"
          // data-scroll-event-progress="progressEvent"
        >
          {section.dataPerson.roses.map((person, index) => (
            <Person
              date={new Date(section.date)}
              key={crypto.randomUUID()}
              person={person}
              index={index}
              sectionIndex={sectionIndex}
              height={height}
            />
          ))}

        </div>
      </div>
    </>
  );
});

export default Section;

/**
 *
 * Create a queue to solve appending issue and animation to reciver section
 * Do a worker to compute havay calcluation
 *
 * Plan :
 *
 * render section data on reciver and tage each section with data indicator
 * toggle animation from a queue each section start falling floawer (animation) enquue incrument in queue
 *
 */
