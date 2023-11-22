import { memo, useState } from "react";
import { gsap } from "gsap";
import "../assets/css/image.css";
const Image = memo(({ top, left, url, date, index, iposition, children }) => {
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
  // DONE: before start enter make sure to set inital valuee before animation starts

  const handleEnter = ({ currentTarget }) => {
    // cahce
    // console.log("inEnter")

    // aniamte ;
    gsap.set(currentTarget.querySelector(".tooltipContainer"), {
      zIndex: 2222,
    });
    gsap.set(currentTarget.querySelector(".tooltipContainer .wrapper"), {
      display: "block",
    });

    gsap.to(currentTarget.querySelector(".tooltipContainer .wrapper"), {
      opacity: 1,
      duration: 0.5,
    });
  };

  // TODO: extract each event aniamtion to a function

  const handleLeave = async ({ currentTarget }) => {
    // console.log("inLeave")
    const targets = [
      currentTarget.querySelector(".tooltipContainer"), // 0
      //currentTarget.querySelector('.popup-bg'), // 1
      //currentTarget.querySelector('.popup-text') // 2
    ];

    const wrapper = targets[0].querySelector(".wrapper");
    // aniamte ;
    const leave = (target) => {
      return gsap
        .to(target, {
          rotateY: 180,
          onComplete: () => {},
        })
        .then(($tween) => {
          //     //TODO: when mouse leave while animation not compete kill animation and revert changes applied as inline.
          //    const av =  gsap.to(target.querySelector('.avatar') , {
          //         opacity: 1
          //     })
          //     gsap.delayedCall(2 , (target) => {
          //        // set popup so it wont flush when changing the opacity of parent while changine
          //        // opacity of wrapper it shows the first elmenet while changing
          //       const front =  gsap.set(target.querySelector('.front') , {
          //         opacity: 0,
          //        });
          //         gsap.to(target,{
          //          duration:.5,
          //          y:100,
          //          opacity:0,
          //          clearProps:true
          //        }).then(tween => {
          //           front.revert();
          //         //   av.revert()
          //        })
          // revert tween default ;
          // } , [target , $tween])
        });
    };

    const dellayLeave = await gsap.delayedCall(2, leave, [wrapper]);
  };
  return (
    // <>

    <div
      // onClick={handleEnter}
      // onMouseLeave={handleLeave}
      className="section-img section-img-set section-img-fall section-img-append section-img-rc"
      style={imageStyle}
      // loading="lazy"
    >
      {children}
    </div>
  );
});

export default Image;
