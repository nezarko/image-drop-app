import React, { useEffect, useRef,useLayoutEffect } from "react";
import gsap from "gsap";
import { fallFlowers } from "./Common/functions";
import "./App.css";
import Section from "./Components/Section";
import DropedSection from "./Components/dropedSection";

function App() {
  const sectionsContainerRef = useRef(null);

  useLayoutEffect(() => {
    const fallImagesInSections = () => {
      if (sectionsContainerRef.current) {
        const sectionElements = sectionsContainerRef.current.querySelectorAll(".section");
        sectionElements.forEach((section, index) => {
          // const images = section.querySelectorAll('img');
          const images = section.querySelectorAll(".section-img");
          const rect = section.getBoundingClientRect();
          if (
            rect.top >= 0 &&
            rect.top < rect.height &&
            section.id !== "receiver-section"
          ) {
            fallFlowers(section);
          } else {
            // section.style.background = "red";
          }
        });
      }
    };

    window.addEventListener("scroll", fallImagesInSections);

    return () => window.removeEventListener('scroll' , fallImagesInSections)
  }, []);

  return (
    <div className="App">
      <div className="sections" ref={sectionsContainerRef}>
        <Section />
        <DropedSection />
      </div>
    </div>
  );
}

export default App;


// Nizar phone : 0597265683

// Nizar email :  n.ediesat@storyme.info