import { memo, useState } from "react";
import { gsap } from "gsap";
import '../assets/css/tooltip.css'
const Image = memo(({ top, left, url, date, index ,iposition}) => {
   
    const [person, setPerson] = useState({
        "name": "Ahmad",
        "age": "3 years",
        "date_deth": date,
        "gender": "male",
        "index": index

    });
    const imageStyle = {
        "--i"        : index,
        "--def-top"  : top ? `${top}px` : null,
        "--def-left" : left ? `${left}%`: null,
        "--rc-x"     : iposition.x,
        '--rc-y'     : iposition.y,
        '--rc-r'     : iposition.r,
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

        const targets = [currentTarget.querySelector('.popup-bg'), currentTarget.querySelector('.popup-text')]
        // aniamte ;
        gsap.set(currentTarget.querySelector('.tooltipContainer'), {
            zIndex: 2222
        })
        gsap.set(currentTarget.querySelector('.tooltipContainer .wrapper'), {
            display: 'block'
        })

        gsap.to(currentTarget.querySelector('.tooltipContainer .wrapper'), {
            opacity: 1,
            duration:.5,   

        });

    }

    // TODO: extract each event aniamtion to a function 

    const handleLeave = async ({ currentTarget }) => {

        // console.log("inLeave")
        const targets = 
        [
        currentTarget.querySelector('.tooltipContainer'),// 0
        //currentTarget.querySelector('.popup-bg'), // 1
        //currentTarget.querySelector('.popup-text') // 2
       ]

       const wrapper = targets[0].querySelector('.wrapper');
        // aniamte ;
        const leave = target => {
          return  gsap.to(target,{
              rotateY:180,
            }).then($tween => {
                //TODO: when mouse leave while animation not compete kill animation and revert changes applied as inline.
                gsap.delayedCall(2 , (target) => {
                   // set popup so it wont flush when changing the opacity of parent while changine 
                   // opacity of wrapper it shows the first elmenet while changing 
                  const front =  gsap.set(target.querySelector('.front') , {
                    opacity: 0,
                   });
                    gsap.to(target,{
                     duration:.5,   
                     y:100,
                     opacity:0,
                     clearProps:true
                   }).then(tween => {
                      front.revert(); 
                      //tween.kill()
                      //$tween.kill()
                   })
                   // revert tween default ;                    
                } , [target , $tween])
            });
        }
      
        
       const  dellayLeave = await gsap.delayedCall(2, leave, [wrapper]);
      

           
    }
    return (
        // <>

        <div
            // onMouseEnter={handleEnter}
            // onMouseLeave={handleLeave}
            className="section-img section-img-set section-img-fall section-img-append section-img-rc"
            style={imageStyle}
            // loading="lazy"
        >
            <GToolTip person={person} />

        </div>
    );
});

const GToolTip = ({ person }) => {
    return (
        <>
            <div className="tooltipContainer">
                <div className="wrapper">
                    <div className="front">
                        front
                        <svg className="popup-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.16 41.68">
                            <path fill="#404041" d="m18.75,19.8c4.26-10.32,15.87-15.66,26.91-17.39,10.32-1.62,21.01-1.59,31.43-2.26,7.3-.47,14.17.34,21.4.79,5.88.37,10.99.68,14.82,6.01,3.25,4.51,3.73,10.8,1.41,15.85-.93,2.02-2.25,3.83-3.64,5.56-4.77,5.93-10.38,8.82-17.79,10.22-9.46,1.79-19.2.3-28.83.5-12.14.25-24.37,3.25-36.5,1.32-10.12-1.61-18.91-7.51-27.95,1.29.83-3.87,4.07-6.72,7.28-9.05,5.12-3.71,9.07-7,11.47-12.84Z" />
                        </svg>
                        <div className="popup-text" dataindex={person.index}>
                            <p>
                                <span>{person.name}</span>
                                <span>{person.age}</span>
                                <span>
                                    {
                                        person.date_deth.toLocaleString("default", { month: "short" })
                                        + ' '
                                        + person.date_deth.getDay()
                                        + ','
                                        + person.date_deth.getFullYear()
                                    }
                                </span>
                            </p>
                        </div>

                    </div>
                    <div className="back">
                      <div className="avatar">
                        BACK FACE
                      </div>

                    </div>
                </div>

            </div>

        </>
    )
}


export default Image;