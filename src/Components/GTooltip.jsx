import "../assets/css/tooltip.css";

import av from "../assets/imags/av.png";
/**
 *
 * @Tooltip commponentn
 *
 * 1- display tooltip container
 * 2- delay
 * 3- flip tooltip container
 * 4- delay
 * 5- fade out avatar
 * 6- delay [No need]
 * 7- fall flawer
 *
 * @action (On fllawer)
 * Css selectors
 *
 * tooltip-container : this will whold perspective and transfrom origin
 * tooltip-wrapper   : this selector aimd to hold tooltip decendend front and back face
 * front-face        : front face will hold tooltip background
 * back-face         : will hold avatr
 *
 * ######
 * Events
 * onStart : tooltip start appearing
 * BeforFlip : before flip tooltip
 * OnFlip     : while fliping tooltip
 * afterFlip   : after flip tooltip
 * avatarShow
 * flipComplete
 * startFall
 *
 *
 * ######
 * HTML
 *
 * container > wrapper > (front-face > content > text) + (back-face > person image as a content)
 */
const GToolTip = ({ person, date }) => {

  return (
    <>
      <div  className="tooltip-container">
        <div className="tooltip-wrapper">
          <div className="front">
            <div className="content">
              <p className="content-text">
                <span>{person.name}</span>
                <span>{person.age}</span>
                <span>
                  {date.toLocaleString("default", { month: "short" }) +
                    " " +
                    date.getDay() +
                    "," +
                    date.getFullYear()}
                </span>
              </p>
            </div>
          </div>
          <div className="back">
            <div className="avatar">
              <img src={av} alt={person.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GToolTip;
