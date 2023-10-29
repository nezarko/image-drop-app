import React, { useState, useEffect, useRef } from 'react';
import { TweenMax, TweenLite, Linear, Sine } from 'gsap/all';

import './App.css';
import Section from './SectionOld';

function App() {
    const numSections =18; // Generate between 10 to 15 sections

    const sections = Array.from({ length: numSections }, (_, index) => (
        <Section key={index} />
    ));

    // Add a new section at the bottom with a fixed height of 300px and name it "dropedSection"
    const dropedSection = (<div className="section" id="receiver-section" style={{ height: '730px', marginTop: "50px", borderTop: "1px red solid" }}></div>);
    // Add a new section at the bottom with a fixed height of 300px and name it "droppedSection"
    const sectionsContainerRef = useRef(null);

    useEffect(() => {
      const fallImagesInSections = () => {
        if (sectionsContainerRef.current) {
          const sectionElements =
            sectionsContainerRef.current.querySelectorAll(".section");
  
          sectionElements.forEach((section, index) => {
            const images = section.querySelectorAll("img");
            const rect = section.getBoundingClientRect();
  
           
            if (
              rect.top >= 0 &&
              rect.top < rect.height &&
              section.id !== "receiver-section"
            ) {
              fallFlowers(section);
            } else {
              // section.style.background = "red";
            }
          });
        }
      };
      const faindImagesInSections = () => {
        if (sectionsContainerRef.current) {
          const sectionElements =
            sectionsContainerRef.current.querySelectorAll(".section");
  
          sectionElements.forEach((section, index) => {
            const flowers = section.querySelectorAll("img");
            const rect = section.getBoundingClientRect();
  
            flowers.forEach((flower, index) => {
              flower.addEventListener("click", () => {
                const receiverSection =
                  document.getElementById("receiver-section");
  
                // Handle the click event for the image here
                const floweRect = flower.getBoundingClientRect();
                const topPosition = getRandomInt(0, 1000);
                const leftPosition = getRandomInt(130, window.innerWidth - 200);
                flower.style.transition = "top 1s ease, left 1s ease";
  
                receiverSection.appendChild(flower);
              });
              flower.addEventListener("mouseover", () => {
                flower.style.cursor = "pointer";
              });
            });
          });
        }
      };
  
      window.addEventListener("scroll", fallImagesInSections);
      faindImagesInSections();
    }, []);
    function fallFlowers(section) {
      const flowers = section.querySelectorAll("img");
      const receiverSection = document.getElementById("receiver-section");
      flowers.forEach((flower, index) => {
        setTimeout(() => {
          // Randomize the delay for a staggered effect
          const floweRect = flower.getBoundingClientRect();
  
          // Calculate random positions within the receiver section
          const topPosition = getRandomInt(0, 900);
          const leftPosition = getRandomInt(130, window.innerWidth - 400);
  
          // Apply the calculated positions and opacity
          // flower.style.top = topPosition + "px";
          // flower.style.left = leftPosition + "px";
  
          // Delay the transition to create a staggered effect
  
          flower.style.top = topPosition + "px";
          flower.style.left = leftPosition + "10px";
  
          // flower.style.left = leftPosition + "px";
          flower.style.transition = "all 1s ease-in-out";
  
          // flower.style.transform = `translateX(${leftPosition}px)`;
          // flower.style.transform = `translate(${0}px, ${40 + topPosition}px)`;
  
          // flower.style.transform = `translate(${
          //   (leftPosition * 0.6, topPosition)
          // }px)`;
          receiverSection.appendChild(flower);
        }, 1000 * index);
      });
    }
  
    function getRandomInt(min, max) {
      return Math.random() * (max - min) + min;
    }

    return (
        <div className="App">
          <div className="sections" ref={sectionsContainerRef}>
            {sections}
            {dropedSection}
          </div>
        </div>
      );
}

export default App;
