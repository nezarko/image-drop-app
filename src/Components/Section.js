import React, { useState, useEffect, memo, useLayoutEffect, useRef, useMemo, useCallback } from "react";
import "../App.css";
import Store from "../Common/Store";
import Image from "./Image";
import { positionImages } from "../Common/functions";

const Section = memo(({ sections, init, setInit }) => {

  const [sectionHeight, setSectionHeight] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
     const numImages  = 150 ;
    // Calculate the section's height based on the number of images
    // FIXME: compute numImages to a state so it takes the data set of section for now its  A CONSTANT
    const calculatedHeight = 100 + numImages * 2;
    setSectionHeight(calculatedHeight);
  }, []);

  // to insure that sectoon are in dom so perform interscrion observer
  //FIXME: change initlize state to parent component set and make a progress with events and hooks
  useEffect(() => {

    if (init) return;

    if (sections.length === sectionsRef.current.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // check if it falls 
          const start_fall = Boolean(entry.target.getAttribute('start-fall'));
          // remove observer if is start fall 

          if (start_fall) observer.unobserve(entry.target);

          if (entry.isIntersecting && !start_fall) {
            // check if entery still has child
            if (entry.target.childNodes.length > 0) {
              // fallFlowers(entry.target);
              entry.target.classList.add('container-section-img-fall')
              entry.target.setAttribute('start-fall', 1);

              window.dispatchEvent(new CustomEvent('section:fall' , {
                detail:{
                  target:entry.target.getAttribute('data-fall')
                }
              }))
            }

            if (entry.target.childNodes.length === 0) observer.unobserve(entry.target);
          }


        });
      }, {
        threshold: 1,
        rootMargin:"100px"
      })

      sectionsRef.current.forEach((section, index) => {
        observer.observe(section)

        if (index === sectionsRef.current.length - 1) {
          setInit(!init)
          console.log("attache observer");
        }
      });

    }

    // return () => sectionsRef.current.forEach(section => observer.unobserve(section));

  }, [sections]);

  const handleRef = useCallback((el) => {
    sectionsRef.current.push(el);
  });


  // do reciver section apperance and fall 


  return (
    <>

      {sections.map((section, index) => {


        return (
          <div ref={handleRef} className={`section section-${index} contianer-section-img-set`} style={{ height: sectionHeight }} key={index} data-fall={`section-${index}`}>
            <div className="section-number">
              <div className="section-numberT">
                <span className="dash">_</span>
                {section.date.toLocaleString("default", { month: "short" })}{" "}
                {section.date.getDate()}
              </div>
              <h1 className="title">
                <div className="title">{section.data} </div>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
                <span className="drop"></span>
              </h1>
            </div>
            <div className="section-image" 
             data-scroll
            data-scroll-speed="0.3"
 >

              {Array.from({ length: section.data }).map((_, i) => (
                <Image
                  key={i}
                  url={Store.getImage().url}
                  top={Math.random() * (sectionHeight - 100)}
                  left={Math.random() * 90}
                  date={section.date}
                  index={i}
                  iposition={positionImages(i)}
                />
              ))}
            </div>
          </div>

        )
      })}
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