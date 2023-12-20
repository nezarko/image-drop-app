import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./App.css";


// import Section from "./Components/Section";
// import DropedSection from "./Components/dropedSection";
import Suspence from "./Components/Suspence";
import { obserCallback, attache_observer, fall } from "./Common/functions";
import { getDocs } from "firebase/firestore";
import { roses } from "../firebase";
// import LocomotiveScroll from "locomotive-scroll";
import Header from "./Components/Header";
import Comments from "./Components/Comments";
import Form from "./Components/Form";
import Footer from "./Components/Footer";
import { NeverAgain } from "./Components/NeverAgain";
import Section from './Components/Section';
import DropedSection from "./Components/dropedSection";
/**
 *
 * App map
 *
 * Loading screen
 * Sections > Section > date + Person > Image + info  > tooltip
 * DropSection > Sections > section > Perosn
 *FIXME: change state of section in order to render once 
  TODO:  add initial state to app in order to activate susbnce loading component
  TODO: level up state of dropsection and sections ref 
  TODO: reomve adding section side effect in order to reduce rendering count 
 */

function App() {
  const [init, setInit] = React.useState(false);
  const [sections, setSections] = React.useState([]);

  const [signed, setSign] = useState(null);
  // dates
  //uw7o1b7pqfohc7sewcopqptnnrn93ec66z9tad0g
    const sectionsContainerRef = useRef(null);
  const sectionsRef = useRef([]);


  // useEffect(() => console.log(signed), [signed])
  // initlize app data and states
  useEffect(() => {
    if (init && sectionsRef.current.length === sections.length) {
      const { height: _s_h } =
        sectionsContainerRef.current.getBoundingClientRect();
      const observer = new IntersectionObserver(obserCallback, {
        threshold: 0.9,
        // root:sectionsContainerRef.current,
        rootMargin: "-100px 0px 0px 0px",
      });

      // section distance from its postion to bottom of its parrent =
      // distance from top - parent section height ;

      sectionsRef.current.forEach((section) => {
        attache_observer(section, observer);
        const { top, height } = section.getBoundingClientRect();

        const _f = top > _s_h ? "100vh" : _s_h - top + "px";
        section.style.setProperty("--fall-distance", _f);
      });

      // const lscrol = new LocomotiveScroll();
    }
  }, [init]);

  useEffect(() => {
    //FIXME: delete this side effect ;
    async function f() {
      const $docs = await getDocs(roses);
      const $data = await new Promise((resolve) => {
        let data = $docs.docs
          .map((doc) => {
            const { date, numberOfRoses, ...$doc } = doc.data();
            return {
              date: date,
              numberOfRoses: numberOfRoses,
              dataPerson: $doc,
            };
          })
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateA - dateB;
          });

        // data.splice(1, data.length - 5);
        setSections(data);
        // setSections(data.splice(1, data.length - 2));
         resolve(data);
      });
    }
    f();
  }, []);

  useEffect(() => {
    if (sections.length) {
      setInit(true);
    }
  }, [sections]);
  //TODO: CREATE INITLIZE STATE FOR THE APP, get to kno when app is ready
  //TODO: observe each section when its in view port fall person
  // when all section flowers had fallen applay animation to drop section
  // Issue, Queue each section

  useEffect(() => {
    console.log("component mountrd" , sections);

    return () => console.log("App unmounted");
  }, [init, sections]);


  // return (
  //   <>
  //   </>
  // )
  return (
      

      <div className="App">
        <Header />
        <Suspence show={!init} />

        <div
          className="sections"
          ref={sectionsContainerRef}
          style={{
            "--parent-sections-h": 1,
          }}
        >
          {init &&
          sections.map((section, index) => (
            <Section
              key={crypto.randomUUID()}
              ref={(el) => (sectionsRef.current[index] = el)}
              sectionIndex={index}
              section={section}
              height={(100 + section.dataPerson.roses.length) * 1.2}
              // data-scroll
              // data-scroll-speed="0.3"
              // data-scroll-call="scrollEvent"
              // data-scroll-ofsset="200px , 0"
            />
          ))}
        </div>
        <DropedSection sections={sections} />
        <Comments />
        <Form setSign={setSign} />
        <NeverAgain signed={signed} />
        <Footer />
      </div>
    );
}

export default App;

// Nizar phone : 0597265683

// Nizar email :  n.ediesat@storyme.info
