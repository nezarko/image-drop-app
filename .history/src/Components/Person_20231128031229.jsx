import GToolTip from "./GTooltip";
import Image from "./Image";
import { positionImages } from "../Common/functions";
import Store from "../Common/Store";
import { useEffect, useRef, useState } from "react";
import { _dispatchEvent } from "../Common/functions";
const Person = ({ person, index, date, height, sectionIndex }) => {
  const [active, setActive] = useState(true);
  // set Person image based on geneder
  // each person component is an image and a tool tip actiavte onclick perosn
  const imageRef = useRef(null);
  
  useEffect(() => {
    
    // console.log("person ref" , imageRef.current)
    
    if (imageRef) {
      imageRef.current.ontransitionend = () => {
        
        // setActive(false);
        
        _dispatchEvent("singel:fall", {
              section: sectionIndex,
              person: index,
        });
      } 
    
      const observer = new IntersectionObserver((entry) => console.log(entry))
      
      // observer.observe(imageRef.current)

    }

    return () => {
      console.log(`person un mount ${index}`);
      imageRef.current.ontransitionend = null;
    }
  },[])
  return (
    <>
      {active && (
        <div className="person" key={person.id}>
          <Image
            //   key={i}
            url={Store.getImage().url}
            top={Math.random() * (height - 100)}
            left={Math.random() * 90}
            date={new Date()}
            index={index}
            sectionIndex={sectionIndex}
            iposition={positionImages(index)}
            className="section-img section-img-set section-img-fall"
            ref={imageRef}
          >
            <GToolTip person={person} date={date} />
          </Image>
        </div>
      )}
    </>
  );
};

export default Person;
