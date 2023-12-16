
import { useState, useEffect, useRef } from "react";
import { getDocs } from "firebase/firestore";
import { obserCallback, attache_observer } from "./Common/functions";
import { roses } from "../firebase";
import Section from "./Components/Section";
import DropedSection from "./Components/dropedSection";
export function Demo() {
  const [sections, setSections] = useState([]);

  const sectionsContainerRef = useRef(null);
  const sectionsRef = useRef([]);

      useEffect(() => {
          if (sectionsRef.current.length === sections.length) {
            console.log(sectionsRef)
          const { height: _s_h } =
            sectionsContainerRef.current.getBoundingClientRect();
          const observer = new IntersectionObserver(obserCallback, {
            threshold: 0.9,
            // root:sectionsContainerRef.current,
            // rootMargin: "0px 0px -300px 0px",
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
      }, []);
    
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

            data.splice(1, data.length - 5);
            setSections(data);
            // setSections(data.splice(1, data.length - 2));
            resolve(data);
          });
        }
        f();
      }, []);


  return (
    <div className="App">
      <div
        className="sections"
        ref={sectionsContainerRef}
        style={{
          "--parent-sections-h": 1,
        }}
      >
        {
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
    </div>
  );
}
