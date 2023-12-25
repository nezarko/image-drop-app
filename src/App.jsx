import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./App.css";
import Suspence from "./Components/Suspence";
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


  App becomes init when all data are set so after fetching data from api app becoms ready to go

 */

function App() {
  const [init, setInit] = React.useState(false);
  const [sections, setSections] = React.useState([]);

  const [signed, setSign] = useState(null);
  const sectionsContainerRef = useRef(null);


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
    if (sections.length > 0) {
      setInit(true);
    }
  }, [sections]);
  return (


    <div className="App">
      <Suspence show={!init} />

      {
        init && (
          <>
            <Header />
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
                    sectionIndex={index}
                    section={section}
                    height={(100 + section.dataPerson.roses.length) * 1.2}
                  />
                ))}
            </div>
            <DropedSection sections={sections} />

            <Comments />
            <Form setSign={setSign} />
            <NeverAgain signed={signed} />
            <Footer />

          </>
        )
      }
    </div>
  );
}

export default App;

// Nizar phone : 0597265683

// Nizar email :  n.ediesat@storyme.info
