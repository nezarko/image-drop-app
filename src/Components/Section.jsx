import "../App.css";

import React, { useRef, useLayoutEffect, useState } from "react";
import SectionDate from "./SectionDate";
import Person from "./Person";
import Fog from "./fog/Fog";
import Smoke from "./smoke/Smoke";
import { fall, _dispatchEvent } from "../Common/functions";

const Section = (props) => {
  const [showFog, setShowFog] = useState(false);
  const [sectionImageReact ,setReact] = useState();
  const { height, section, sectionIndex, ...$props } = props;



  /**
   * 
   * A try to handler intersection obsever only on single section component 
   * 
   * A way to handle observer unobserve when section is not droping and complete droping
   */

  // attach observer

  // this component is a frowerd ref to parrent in order to attache observer

  const section_ref = useRef(null);

  const sectionImageRef = useRef(null)

  useLayoutEffect(() => {
    // attach obserevre 


      const observer = new IntersectionObserver((enteris, observer) => {

      const entry = enteris[0];

      const start_fall = Boolean(entry.target.getAttribute("start-fall"));

      if (start_fall) observer.unobserve(entry.target)
      // the tototla of childred down bellow * sttager (Transition delay) convert to Ms by * 1000 + transtion duration 

      const stagger = 0.025;
      const duration = 2000;
      const time = (sectionImageRef.current.children.length * stagger) * 1000 + duration
      const r = Math.floor(entry.intersectionRatio * 100);
      if (entry.boundingClientRect.top <= -15 && r >= 8 && !start_fall) {
        fall(entry.target, _dispatchEvent("section:fall", entry.target.getAttribute("data-fall")))
        setTimeout(() => {
          setShowFog(true)
        }, time);
      }

    }, {
      threshold: 0.81,
    });
    if (section_ref.current) {

      observer.observe(section_ref.current)
    }

    if(sectionImageRef) {
 //     const h = sectionImageRef.current.getBoundingClientRect() ;
      setReact(sectionImageRef.current.getBoundingClientRect());
    }
 
    return () => {
      observer.unobserve(section_ref.current)
    }
  }, [])
  return (
    <>
      <div
        ref={section_ref}
        className={`section section-${sectionIndex} contianer-section-img-set`}
        style={{ height: height }}
        key={sectionIndex}
        data-fall={`section-${sectionIndex}`}
        data-index={sectionIndex}
        {...$props}
      >
        <SectionDate
          date={new Date(section.date)}
          title={section.numberOfRoses}
        />



        <div
          ref={sectionImageRef}
          className="section-image relative"

        >
{/* 
          {
            showFog && <Smoke width={sectionImageReact.width} height={sectionImageReact.height} />
          } */}
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
}

export default Section;

