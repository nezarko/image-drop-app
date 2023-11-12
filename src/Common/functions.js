import gsap from "gsap";

// fall images in section fun code
export const fallImagesInSections = (sectionsContainerRef) => {
  if (sectionsContainerRef.current) {
    const sectionElements =
      sectionsContainerRef.current.querySelectorAll(".section");

    sectionElements.forEach((section, index) => {
      // const images = section.querySelectorAll('img');
      const images = section.querySelectorAll(".section-img");
      const rect = section.getBoundingClientRect();

      if (
        rect.top >= 0 &&
        rect.top < rect.height &&
        section.id !== "receiver-section"
      ) {
        //fallFlowers(section);
      } else {
        // section.style.background = "red";
      }
    });
  }
};

// falling the image fun  code ..
export function fallFlowers(section, index) {

  // in order to limit function excution we set attribute as indicator we use to check if section has intersect and excuted fallFlawers 
  // bu setting an attribute to  seciton tells that has recevived this scrope of function 

  section.setAttribute("data-fall",1) ;

  // excute animation only to interscting section 

  const target_selector = `.${section.classList[1]} .section-img`;
  
  
  // const flowers = Array.from(section.querySelectorAll(target_selector));
  // const receiverSection = document.getElementById("receiver-section");
  
  // remove timeline and replace with a cache 
  //const tl = gsap.timeline(1);

  gsap.to(target_selector , {
    y: 250,
    opacity: 0,
    // duration: 0.05,
    ease: "easeInSine",
    stagger:0.1
  })
  .then(tween => tween.kill())

 // do a stager for falling flalwers 

 // cache falawers into cache or queue recever div animation and appnding


  // remove this section because we are moveing this senario to cahce
  // flowers.forEach((flower, index) => {
  //   const startRotation = getRandomRotation();
  //   tl.to(flower, {
  //     y: () => getRandomInt(0, 850),
  //     opacity: 1,
  //     duration: 0.35,
  //     ease: "easeInSine",
  //   });

  //   // Add a callback to update the position and rotation at the bottom

  //   // do not excute this untile you reach the end and excuted it for a few 

  //   // issue: drow the pile again : forget until reach it. 

  //   tl.add(() => {
  //     if (index > 140) {
  //       gsap.to(flower, {
  //         y: () => getRandomInt(50, 100),
  //         // y: () => getRandomInt(20, 50),
  //         left: () => getRandomInt(600, window.innerWidth - 800),
  //         rotation: startRotation,
  //         duration: 1,
  //         ease: "linear",
  //       });
  //     } else if (index >= 98 && index <= 140) {
  //       gsap.to(flower, {
  //         left: () => getRandomInt(400, window.innerWidth - 600),
  //         y: () => getRandomInt(100, 200),
  //         rotation: startRotation,
  //         duration: 1,
  //         ease: "linear",
  //       });
  //     } else if (index >= 61 && index <= 97) {
  //       gsap.to(flower, {
  //         left: () => getRandomInt(300, window.innerWidth - 400),
  //         y: () => getRandomInt(200, 400),
  //         rotation: startRotation,
  //         duration: 1,
  //         ease: "linear",
  //       });
  //     } else if (index >= 31 && index <= 60) {
  //       gsap.to(flower, {
  //         left: () => getRandomInt(200, window.innerWidth - 200),
  //         y: () => getRandomInt(400, 600),
  //         rotation: startRotation,
  //         duration: 1,
  //         ease: "linear",
  //       });
  //     } else if (index < 30) {
  //       gsap.to(flower, {
  //         left: () => getRandomInt(0, window.innerWidth - 100),
  //         y: () => getRandomInt(600, 800),
  //         rotation: startRotation,
  //         duration: 1,
  //         ease: "linear",
  //       });
  //     }
  //     receiverSection.appendChild(flower);
  //   }, `-=${0.1}`);
  // });
}

export function getRandomRotation() {
  // Generate a random rotation value between -180 and 180 degrees
  return getRandomInt(-180, 180);
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


export  function positionImages(index)  {
  const posistion = {

    r: getRandomRotation() + 'deg'
  }
  let _w ;
  if(window.innerWidth > 1200) _w = 1200 ;
  // set postions of images in reciecer section according to index

  if (index >= 141) {
    posistion.y = `${getRandomInt(50, 100)}px`;
    posistion.x = getRandomInt(600, window.innerWidth - 800) + 'px'


  } else if (index >= 98 && index <= 140) {

    posistion.y = `${getRandomInt(100, 200)}px`;
    posistion.x = getRandomInt(400, window.innerWidth - 600) + 'px'

  } else if (index >= 61 && index <= 97) {

    posistion.y = `${getRandomInt(200, 400)}px`;
    posistion.x = getRandomInt(300, window.innerWidth - 400) + 'px'

  } else if (index >= 31 && index <= 60) {

    posistion.y = `${getRandomInt(400, 600)}px`;
    posistion.x = getRandomInt(200, _w - 200) + 'px'

  } else if (index <= 30) {
    posistion.y = `${getRandomInt(600, 800)}px`;
    posistion.x = getRandomInt(0, _w - 100) + 'px'

  }

  return posistion;
}






/**
 * This function will only represent floawer fall from section while scroling 
 * and only excute while section is in view port 
 * flawers of section each apllay fall animation to it while in view port 
 * 
 * helper function needed (is_section_in_view_port , get_section_flaowers )
 * This function will excute in scrol event 
 * so when section 
 *  */


function fallFalawer() {

}
