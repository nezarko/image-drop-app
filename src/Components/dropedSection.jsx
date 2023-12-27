import { memo, useEffect, useMemo, useRef } from "react";
import "../App.css";

import Image from "./Image";

import Store from "../Common/Store";
import { positionImages } from "../Common/functions";

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}




const DropedSection = memo(function DropedSection({ sections }) {
  const q = useRef(null);
  const sectionsRef = useRef({});
  const debouncedHandler = useRef(
    debounce((e) => {
      const {
        detail: { target },
      } = e;
      q.current.querySelector(`[data-rc="${target}"]`).classList.add("rc-image-append");
    })
  );

  const debouncedSingleFallHandler = useRef(
    debounce((e) => {
      const {
        detail: {
          target: { section, person },
        },
      } = e;
      let a = q.current.querySelector(
        `div[data-rc="section-${section}"] div[data-person="person-${person}"]`
      );
      a.classList.add("rc-single-fall");
    }, 100)
  );

  useEffect(() => {
    window.addEventListener("section:fall", debouncedHandler.current);
    window.addEventListener("singel:fall", debouncedSingleFallHandler.current);

    return () => {
      window.removeEventListener("section:fall", debouncedHandler.current);
      window.removeEventListener("singel:fall", debouncedSingleFallHandler.current);
    };
  }, []);

  const images = useMemo(() => {
    return sections.map((section, index) => {
          return (<div
               data-rc={`section-${index}`}
               className={`rc-section rc-section-${index} rc-section-img-container reciver-section-image `}
               key={index}
             >
      {Array.from({ length: section.dataPerson.roses.length }).map((_, i) => (
        <Image
          key={`${section.date}-${i}`}
          r={true}
          url={Store.getImage().url}
          top={0}
          left={Math.random() * 90}
          date={section.date}
          index={i}
          iposition={positionImages(i)}
          data-person={`person-${i}`}
          className="section-img section-img-rc"
        />
      ))};
      </div>)
    });
  }, [sections]);

  return (
    <div
      ref={q}
      className="section reciver-section-image-container"
      id="receiver-section"
      style={{
        width: "100%",
        marginBottom: "10px",
        marginTop: "10px",
        position: "relative",
        boxSizing: "border-box",
        padding: "5px",
      }}
    >
      {images}
      <div
        className="zigzag-border"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "0.5%",
          zIndex: -1,
        }}
      ></div>

     
    </div>
  );
});


function sectionImage({section}) {

}


export default DropedSection