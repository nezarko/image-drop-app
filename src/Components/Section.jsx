import React, { forwardRef } from "react";
import "../App.css";
import SectionDate from "./SectionDate";
import Person from "./Person";

const Section = forwardRef(({ height, section, index }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className={`section section-${index} contianer-section-img-set`}
        style={{ height: height }}
        key={index}
        data-fall={`section-${index}`}
      >
        <SectionDate date={section.date} />

        <div className="section-image" data-scroll data-scroll-speed="0.3">
          {section.dataPerson.map((person, index) => (
            <Person
              date={section.date}
              key={person.id}
              person={person}
              index={index}
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
