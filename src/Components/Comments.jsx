import { memo, useEffect, useRef } from "react";
import "../assets/css/comments.css";
const Comments = memo(props => {
  /**
   * A auto fit grid system with 12 columnd and each cell in a grid
   * dont go bellow 250px in width
   */

  const ref = useRef(null);
  useEffect(() => {
    let d = 1000;

    const observer = new IntersectionObserver(
      (enteris) => {
        enteris.forEach((e) => {
          const { isIntersecting } = e;
          isIntersecting && e.target.classList.add("scale");
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -200px 0px  ",
      }
    );
    const items = ref.current.querySelectorAll(".item").forEach(item => observer.observe(item));

  }, []);

  
  return (
    <>
      <div ref={ref} className="grid-container">
        <div
          data-scroll
          // data-offset="100,100"
          data-scroll-call="scroll"
          data-scroll-css-progress
          className="item"
          data-show-mob="1"
        >
          <div className="sub-item b1">
            <p>
              "Children recounted stories that would haunt anyone who hears
              them. We witnessed horrified people who entered the shelter still
              carrying white flags, symbols of surrender & desperate hope for
              sanctuary as they passed Israeli Armed Forces.”
            </p>
            <span>UNRWA</span>
          </div>
        </div>
        <div className="item" data-show-mob="2">
          <div className="sub-item b1">
            <p>
              "Children recounted stories that would haunt anyone who hears
              them. We witnessed horrified people who entered the shelter still
              carrying white flags, symbols of surrender & desperate hope for
              sanctuary as they passed Israeli Armed Forces.”
            </p>
            <span>UNRWA</span>
          </div>
        </div>
        <div className="item" data-show-mob="6">
          <div className="sub-item b5">
            <p>
              “Israel is deliberately denying 2.3 million Palestinians – half of
              them children – from accessing safe, clean water. This will have
              dire consequences on their health.”
            </p>
            <span className="date">18.Oct.2023</span>
            <span>Middle East Children’s Alliance</span>
          </div>
        </div>
        <div className="item" data-show-mob="4">
          <div className="sub-item b5">
            <p>
              How many people have to die before world leaders wake up and call
              for a ceasefire?”
            </p>
            <span className="date"> 4.Nov.2023</span>
            <span>Doctors Without Borders</span>
          </div>
        </div>
        <div className="item " data-show-mob="5">
          <div className="sub-item b5">
            <p>
              How many people have to die before world leaders wake up and call
              for a ceasefire?”
            </p>
            <span className="date"> 4.Nov.2023</span>
            <span>Doctors Without Borders</span>
          </div>
        </div>
        <div className="item" data-show-mob="3">
          <div className="sub-item b1">
            <p className="m-0">
              "Children recounted stories that would haunt anyone who hears
              them. We witnessed horrified people who entered the shelter still
              carrying white flags, symbols of surrender & desperate hope for
              sanctuary as they passed Israeli Armed Forces.”
            </p>
            <span>UNRWA</span>
          </div>
        </div>
        <div className="item" data-show-mob="7">
          <div className="sub-item b8">
            <p>
              “The carnage in #Gaza reaches new levels of horror every day. The
              world must act before it is too late.”
            </p>{" "}
            <span className="date">15.Nov.2023 </span>
            <span>UNOCHA</span>
          </div>
        </div>
        <div className="item" data-show-mob="8">
          <div className="sub-item b6">
            <p>
              "The Israeli military’s repeated, apparently unlawful attacks on
              medical facilities, personnel, and transport are further
              destroying the Gaza Strip’s healthcare system and should be
              investigated as war crimes.”
              <span className="date"> 14.Nov.2023</span>
              <span> Human Rights Watch</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Comments;
