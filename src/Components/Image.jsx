import { memo, useState } from "react";
import { gsap } from "gsap";
import '../assets/css/tooltip.css'
const Image = memo(({ top, left, url, date, index }) => {

    const [person, setPerson] = useState({
        "name": "Ahmad",
        "age": "3 years",
        "date_deth": date,
        "gender": "male",
        "index": index

    });
    const imageStyle = {
        top: `${top}px`,
        left: `${left}%`,
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
        const targets = [currentTarget.querySelector('.popup-bg'), currentTarget.querySelector('.popup-text')]
        // aniamte ;
        gsap.set(targets , {
            zIndex:2222
        })

        gsap.to(targets, {
            opacity: 1,
        });
       
   }

   // TODO: extract each event aniamtion to a function 

    const handleLeave = ({ currentTarget }) => {
        const targets = [currentTarget.querySelector('.popup-bg'), currentTarget.querySelector('.popup-text')]
        // aniamte ;
        const leave = targets =>  gsap.to(targets , {
            opacity:0,
            onStart: () => console.log('start Exit'),
        });

        gsap.delayedCall(2, leave , [targets])
    }
    return (
        // <>
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="section-img"
            style={imageStyle}
            loading="lazy"
        >
            <GToolTip person={person} />
             <div className="avatar">

            </div>
        </div>
    );
});

const GToolTip = ({ person }) => {
    return (
        <>
            <div className="tooltipContainer">
                <div className="wrapper">
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

            </div>

        </>
    )
}


export default Image;