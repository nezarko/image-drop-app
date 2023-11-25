import GToolTip from "./GTooltip";
import Image from "./Image";
import { positionImages } from "../Common/functions";
import Store from "../Common/Store";
const Person = ({ person, index, date, height , sectionIndex }) => {
  // set Person image based on geneder
  // each person component is an image and a tool tip actiavte onclick perosn

  return (
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
        className="section-img section-img-set section-img-fall animate-singel"
      >
        <GToolTip person={person} date={date} />
      </Image>
    </div>
  );
};

export default Person;
