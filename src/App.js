import React, { useEffect, useRef,useLayoutEffect } from "react";

import "./App.css";
import Section from "./Components/Section";
import DropedSection from "./Components/dropedSection";
import Suspence from "./Components/Suspence";
import LocomotiveScroll from "locomotive-scroll";
function App() {

  const [init , setInit]        = React.useState(false);
  const [show , setShow]        = React.useState(true);
  // dates
  const startDate = new Date(new Date().getFullYear(), 10, 5);
  const currentDate = new Date();


  const [sections ,setSections] = React.useState([]);
  const sectionsContainerRef = useRef(null);
  
 // initlize app data and states
 useEffect(() => {
  const $sections = [];
  let currentDatePointer = new Date(startDate);
  while (currentDatePointer <= currentDate) {
    let _section = {
      date : new Date(currentDatePointer),
      data:150
    } 
    $sections.push(_section);
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    // setDates((prev) => [...prev , new Date(currentDatePointer)])
  }
  // setDates(dateArray);  
  setSections($sections);
 }, [])

  useEffect(() => {
   if(init) {
    setShow(false)
    // console.log(document.querySelector('html'))

   }
  } ,[init]);

  useLayoutEffect(() => {
    const scroll = new LocomotiveScroll();
  } , [])

  return (
    <div className="App">


      <Suspence show={show}/>

      <div className="sections" ref={sectionsContainerRef}>
        <Section init={init} setInit={setInit} sections={sections} />
        <DropedSection sections={sections}/>
      </div>
    </div>
  );
}

export default App;


// Nizar phone : 0597265683

// Nizar email :  n.ediesat@storyme.info



