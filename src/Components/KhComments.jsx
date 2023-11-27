import { useEffect } from "react";
import "../assets/css/khc.css";
import bottom from '../assets/imags/bottom.svg'
const KhComments = () => {
    useEffect(() => {
     console.log("hello wolrd words 4".wordCount());
    }, [])
    
    // bassed on word counts select template 

    //TODO: add comment user name
    //TODO: add comment date 
    //TODO: template selection ; 
    return (
      <div className="comment-container">
        <div className="divide">
          <img src={bottom} alt="comments" />
        </div>
        <div className="row flex items-end">
          <div className="col-7" style={{ marginBottom: "20px" }}>
            <div className="comment b1">
              <p>
                Children recounted stories that would haunt anyone who hears
                them. We witnessed horrified people who entered the shelter
                still carrying white flags, symbols of surrender & desperate
                hope for sanctuary as they passed Israeli Armed Forces.
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                UNRWA
              </span>
            </div>
          </div>
        </div>

        <div className="row flex">
          <div className="col-7 ">
            <div className="comment b1">
              <p>
                Children recounted stories that would haunt anyone who hears
                them. We witnessed horrified people who entered the shelter
                still carrying white flags, symbols of surrender & desperate
                hope for sanctuary as they passed Israeli Armed Forces.
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                UNRWA
              </span>
            </div>
          </div>
          <div className="col-6" style={{ marginTop: "80px" }}>
            <div className="comment b5">
              <p>
                “Israel is deliberately denying 2.3 million Palestinians half of
                them children from accessing safe, clean water. This will have
                dire consequences on their health.”
                <span>18.Oct.2023</span>
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                UNRWA
              </span>
            </div>
          </div>
        </div>

        <div className="row flex">
          <div className="col-5 offset-2">
            <div className="comment b5">
              <p>
                “How many people have to die before world leaders wake up and
                call for a ceasefire?”
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                Doctors Without Borders
              </span>
            </div>
          </div>
          <div className="col-5 ml-auto pull-2" style={{ marginTop: "50px" }}>
            <div className="comment b5">
              <p>
                “How many people have to die before world leaders wake up and
                call for a ceasefire?”
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                Doctors Without Borders
              </span>
            </div>
          </div>
        </div>

        <div className="row flex">
          <div className="col-7">
            <div className="comment b1">
              <p>
                Children recounted stories that would haunt anyone who hears
                them. We witnessed horrified people who entered the shelter
                still carrying white flags, symbols of surrender & desperate
                hope for sanctuary as they passed Israeli Armed Forces.
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                UNRWA
              </span>
            </div>
          </div>
          <div className="col-4 offset-2">
            <div className="comment b8">
              <p>
                “The carnage in #Gaza reaches new levels of horror every day.
                The world must act before it is too late.{" "}
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                Doctors Without Borders
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            <div className="comment b6">
              <p className="pr-10" style={{ transform: "translateY(-10px)" }}>
                "The Israeli military’s repeated, apparently unlawful attacks on
                medical facilities, personnel, and transport are further
                destroying the Gaza Strip’s healthcare system and should be
                investigated as war crimes.”{" "}
              </p>
              <span className="commatnable" style={{ color: "var(--red-2)" }}>
                UNRWA
              </span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default KhComments;
