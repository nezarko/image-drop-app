import React, { forwardRef, useRef, useEffect, useLayoutEffect, useState, useImperativeHandle } from "react";
import "../App.css";
import SectionDate from "./SectionDate";
import Person from "./Person";
import Fog from "./fog/Fog";
import { fall, _dispatchEvent } from "../Common/functions";
// import { doc } from "firebase/firestore";

const Section = (props) => {
  const [showFog, setShowFog] = useState(false);
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

      const index = entry.target.getAttribute('data-index');

      if (start_fall) observer.unobserve(entry.target)
       // the tototla of childred down bellow * sttager (Transition delay) convert to Ms by * 1000
      
      const stagger = 0.025; 
      const duration = 2000 ; 
      const time  =( sectionImageRef.current.children.length * stagger )  * 1000 + duration
      
      if (entry.isIntersecting) {
        
        fall(entry.target, _dispatchEvent("section:fall", entry.target.getAttribute("data-fall")))     
         setTimeout(() => {
          // entry.target.style.background  = "green"
          setShowFog(true)
          console.log("hello" , time )
         } , time);
      }

      

    
    }, {
      threshold:0.8,
      rootMargin: "100px 0px 0px 0px"
    });
    if (section_ref.current) {

      observer.observe(section_ref.current)
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

{
          showFog &&  <Fog />
         }

        <div
        ref={sectionImageRef}
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
} 

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
