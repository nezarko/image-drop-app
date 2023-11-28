import { forwardRef, useEffect, useRef, useState } from "react";
import { delay ,_dispatchEvent} from "../Common/functions";
import "../assets/css/image.css";
const Image = forwardRef(
  (props , ref) => {

    const { top, left, url, date, index, iposition, children, sectionIndex,...$props } =
      props;
    const imageStyle = {
      "--i": index,
      "--def-top": top ? `${top}px` : null,
      "--def-left": left ? `${left}%` : null,
      "--rc-x": iposition.x,
      "--rc-y": iposition.y,
      "--rc-r": iposition.r,
      position: "absolute",
      backgroundImage: `url(${url})`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `80px 150px`,
      width: `80px`,
      height: `100%`,
    };

    const [active, setActive] = useState(true);
    const ref2 = useRef(null)
    useEffect(() => {
      // console.log("Image",ref)
    },[])
    // const item = useRef(null);
    async function flip() {
      //DONE: transition delay function when its single its a must to set it to initla state
      //DONE: When fall single remove it from nodes
      //DONE: Image fall single , fall the one in dropsection
      //FIXME: Tooltip element float at the top of all elements , Remove element unless no action

      const { current: $item } = ref2;

      const is_aniamting =
      $item.getAttribute("data-tooltip-start") === "true" ? true : false;

      const container = $item.querySelector(".tooltip-container");
      const wrapper = $item.querySelector(".tooltip-wrapper");
      const back_face = $item.querySelector(".back");

      // display tooltip
      if (is_aniamting) return;
      $item.setAttribute("data-tooltip-start", true);
      container.style.display = 'block'
      await delay(200)
      container.classList.add("t-show");
      // wait for info time reading
      await delay(2000);
      // flip wrapper
      wrapper.classList.add("t-flip");
      // wait for person image show time
      await delay(2000);
      // hide persone image
      back_face.classList.add("t-hide");
      // waite for clean up
      await delay(1000);
      //Clean up
      container.style.display = "none";
      container.classList.remove("t-show");
      wrapper.classList.remove("t-flip");
      back_face.classList.remove("t-hide");

      // fall flawer
      $item.classList.add("fall-single");
      _dispatchEvent("singel:fall", {
        section: sectionIndex,
        person: index,
      });
      
      // wait for fall
      await delay(2000);

      // close animatoin
      $item.setAttribute("data-tooltip-start", false);

      setActive(!active);
    }
    return (
      <>
        {active && (
          <div
            onClick={flip}
            // onMouseLeave={handleLeave}
            // className="section-img section-img-set section-img-fall section-img-append section-img-rc"
            style={imageStyle}
            ref={el => {}}
            data-tooltip-start={false}
            
            {...$props}
          >
            {children}
          </div>
        )}
      </>
    );
  }
);

export default Image;
