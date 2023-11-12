import {useEffect , useRef} from "react";
import "../App.css";

import Image from "./Image";

import Store from "../Common/Store";
import { positionImages } from "../Common/functions";

function DropedSection({ sections }) {

  const q = useRef(null);

  function waite(time) {
    return setTimeout(() => true , time)
  }
  useEffect(() => {
    // attache event listiner to observer
  
      async function handler(e){
        const {detail : {target}} = e ; 
        // dont start excution unless the working function end 
        setTimeout(() => {
          q.current.querySelector(`[data-rc="${target}"]`).classList.add('rc-image-append')

        } , 5000)
      }
      
      window.addEventListener('section:fall' ,handler)
    
     
      return () => window.removeEventListener('section:fall' , handler);
     
  }, []);

  
  return (
    <div
      ref={q}
      className="section reciver-section-image-container"
      id="receiver-section"
      style={{
        // height: "1100px",
        width: "95%",
        marginBottom: "10px",
        marginTop: "10px",
        position: "relative",
        // background: "linear-gradient(to bottom, #fff 40%, #00f 100%)",
        // borderRadius: "10% / 700px 700px 100px 100px",
        boxSizing: "border-box",
        padding: "5px",
        margin: "10px"
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
            <div data-rc={`section-${index}`} className={`section rc-section-${index} rc-section-img-container reciver-section-image `} key={index}>
              <div className="section-image">

                {Array.from({ length: section.data }).map((_, i) => (
                  <Image
                    key={i}
                    url={Store.getImage().url}
                    // top={Math.random() * (sectionHeight - 100)}
                    // left={Math.random() * 90}
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



    </div>
  );
}

export default DropedSection;
