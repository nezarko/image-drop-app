import { useEffect, useRef } from "react";
import "../App.css";

import Image from "./Image";

import Store from "../Common/Store";
import { positionImages } from "../Common/functions";

function DropedSection({ sections }) {
  /**
   * FIXME: ajdust transtion timing at single fall
   */
  const q = useRef(null);

  useEffect(() => {
    // attache event listiner to observer

    async function handler(e) {
      const {
        detail: { target },
      } = e;
      // dont start excution unless the working function end
      q.current
        .querySelector(`[data-rc="${target}"]`)
        .classList.add("rc-image-append");
    }

    function singel_fall_handler(e) {
      const {
        detail: {
          target: { section, person },
        },
      } = e;
      let a = q.current.querySelector(
        `div[data-rc="section-${section}"] div[data-person="person-${person}"]`
      );

      a.classList.add("rc-single-fall");
    }

     window.addEventListener("section:fall", handler);
     window.addEventListener("singel:fall", singel_fall_handler);


    return () => {
      window.removeEventListener("section:fall", handler);
      window.removeEventListener("singel:fall", singel_fall_handler);
    };
  }, []);

  return (
    <div
      ref={q}
      className="section reciver-section-image-container"
      id="receiver-section"
      style={{
        width: "90%",
        marginBottom: "10px",
        marginTop: "10px",
        position: "relative",
        boxSizing: "border-box",
        padding: "5px",
        margin: "10px",
      }}
    >
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

      <>
        {sections.map((section, index) => {
          return (
            <div
              data-rc={`section-${index}`}
              className={`section rc-section-${index} rc-section-img-container reciver-section-image `}
              key={index}
            >
              <div className="section-image">
                {Array.from({ length: section.dataPerson.roses.length }).map(
                  (_, i) => (
                    <Image
                      key={i}
                      url={Store.getImage().url}
                      top={0}
                      left={Math.random() * 90}
                      date={section.date}
                      index={i}
                      iposition={positionImages(i)}
                      data-person={`person-${i}`}
                      className="section-img section-img-rc"
                    />
                  )
                )}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default DropedSection;
