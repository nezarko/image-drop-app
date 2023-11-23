import React, { useEffect, useRef, useLayoutEffect } from "react";

import "./App.css";
import Section from "./Components/Section";
import DropedSection from "./Components/dropedSection";
import Suspence from "./Components/Suspence";
import persons from "./data/persons.json";
import { obserCallback, attache_observer } from "./Common/functions";

import LocomotiveScroll from "locomotive-scroll";

/**
 *
 * App map
 *
 * Loading screen
 * Sections > Section > date + Person > Image + info  > tooltip
 * DropSection > Sections > section > Perosn
 *
 */

function App() {
  const [init, setInit] = React.useState({
    sections: null,
    dropSection: null,
    app: null,
  });
  const [show, setShow] = React.useState(true);
  const [sections, setSections] = React.useState([]);
  // dates
  const startDate = new Date(new Date().getFullYear(), 10, 20);
  const currentDate = new Date();
  //uw7o1b7pqfohc7sewcopqptnnrn93ec66z9tad0g
  const sectionsContainerRef = useRef(null);
  const sectionsRef = useRef([]);

  // initlize app data and states
  useEffect(() => {
    const $sections = [];
    let currentDatePointer = new Date(startDate);
    while (currentDatePointer <= currentDate) {
      let _section = {
        date: new Date(currentDatePointer),
        dataPerson: persons,
      };
      $sections.push(_section);
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    setSections($sections);

    const locomotiveScroll = new LocomotiveScroll();

  }, []);

  useEffect(() => {
    if (sectionsRef.current.length === sections.length) {
      const observer = new IntersectionObserver(obserCallback, {
        threshold: 1,
      });
      sectionsRef.current.forEach((section) =>
        attache_observer(section, observer)
      );
    }
  }, [sections]);

  //TODO: CREATE INITLIZE STATE FOR THE APP, get to kno when app is ready

  //TODO: observe each section when its in view port fall person
  // when all section flowers had fallen applay animation to drop section
  // Issue, Queue each section

  return (
    <div className="App">
      {/* <Suspence show={show} /> */}

      <div className="sections" ref={sectionsContainerRef}>
        {sections.map((section, index) => (
          <Section
            key={crypto.randomUUID()}
            ref={(el) => (sectionsRef.current[index] = el)}
            sectionIndex={index}
            section={section}
            height={(100 + section.dataPerson.length) * 2}
          />
        ))}

        <DropedSection sections={sections} />
      </div>
    </div>
  );
}

export default App;

// Nizar phone : 0597265683

// Nizar email :  n.ediesat@storyme.info
