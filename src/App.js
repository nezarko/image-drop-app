import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import './App.css';
import Section from './Components/Section';
import DropedSection from './Components/dropedSection';

function App() { 
  // Add a new section at the bottom with a fixed height of 300px and name it "droppedSection"
  const sectionsContainerRef = useRef(null);

  useEffect(() => {
    const fallImagesInSections = () => {
      if (sectionsContainerRef.current) {
        const sectionElements =
          sectionsContainerRef.current.querySelectorAll('.section');

        sectionElements.forEach((section, index) => {
          const images = section.querySelectorAll('.section-img');
          const rect = section.getBoundingClientRect();

          if (
            rect.top >= 0 &&
            rect.top < rect.height &&
            section.id !== 'receiver-section'
          ) {
            fallFlowers(section);
          } else {
            // section.style.background = "red";
          }
        });
      }
    };

    window.addEventListener('scroll', fallImagesInSections);
  }, []);

  function fallFlowers(section) {
    const flowers = section.querySelectorAll('.section-img');
    const receiverSection = document.getElementById('receiver-section');
  
    const tl = gsap.timeline(1);
  
    flowers.forEach((flower, index) => {
      tl.to(flower, {
        // x: () => getRandomInt(130, window.innerWidth - 100),
        y: () => getRandomInt(0, 800),
        rotation: getRandomRotation(90), // Add rotation animation
        opacity: 10,
        duration: 1,
        ease: 'ease-in-out',
      });
  
      tl.add(() => {
        receiverSection.appendChild(flower);
      }, `-=${0.1}`);
    });
  }
  
  function getRandomRotation() {
    // Generate a random rotation value between -180 and 180 degrees
    return getRandomInt(-180, 180);
  }
  

  function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div className="App">
      <div className="sections" ref={sectionsContainerRef}>
        <Section />
        <DropedSection />
      </div>
    </div>
  );
}

export default App;
