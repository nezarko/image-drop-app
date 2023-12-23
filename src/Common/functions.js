import gsap from "gsap";
const stack = new Array();
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

export function getRandomRotation() {
  // Generate a random rotation value between -180 and 180 degrees
  return getRandomInt(-25, 45);
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function positionImages(index) {
  const posistion = {
    r: getRandomRotation() + "deg",
  };
  let _w = window.innerWidth;
  const image_height = 120;
  if (window.innerWidth > 1200) _w = 1100;

  // set positions of images in receiver section according to index
  switch (true) {
    case index >= 178:
      posistion.y = `${getRandomInt(700, 920) - image_height}px`;
      posistion.x = getRandomInt(0, _w + 900 ) + "%";
      break;
    case index  >= 168 && index <= 177:
      posistion.y = `${getRandomInt(550, 900) - image_height}px`;
      posistion.x = getRandomInt(100, _w +700 ) + "%";
      break;
      case index >= 141 && index <= 167:
        posistion.y = `${getRandomInt(169, 450) - image_height}px`;
        posistion.x = getRandomInt(550, _w)+"%";
        break;
    case index >= 121 && index <= 140:
      posistion.y = `${getRandomInt(470, 590) - image_height}px`;
      posistion.x = getRandomInt(550, _w + 100) + "%";
      break;
    case index >= 98 && index <= 120:
      posistion.y = `${getRandomInt(250, 590) - image_height}px`;
      posistion.x = getRandomInt(420, _w + 150) + "%";
      break;

    case index >= 63 && index <= 97:
      posistion.y = `${getRandomInt(400, 890) - image_height}px`;
      posistion.x = getRandomInt(400, _w + 378) + "%";
      break;

    case index >= 41 && index <= 62:
      posistion.y = `${getRandomInt(490, 760) - image_height}px`;
      posistion.x = getRandomInt(250, _w+ 490) + "%";
      break;
      case index >=31 && index <= 40:
        posistion.y = `${getRandomInt(600, 900) - image_height}px`;
        posistion.x = getRandomInt(460, _w+ 580) + "%";
        break;
    case index <= 30 && index > 21:
      posistion.y = `${getRandomInt(180, 600) - image_height}px`;
      posistion.x = getRandomInt(790, _w -100) + "%";
      break;
      case index <=20 && index >10:
      posistion.y = `${getRandomInt(320, 500) - image_height}px`;
      posistion.x = getRandomInt(550, _w -200) + "%";
      break;
      case index <=10 && index >= 5:
      posistion.y = `${getRandomInt(350, 850) - image_height}px`;
      posistion.x = getRandomInt(990, _w -460) + "%";
      break;
      case index < 5 && index > 2:
        posistion.y = `${getRandomInt(550, 920) - image_height}px`;
        posistion.x = getRandomInt(20, 800) + "%";
        break
        case index <= 2:
        posistion.y = `${getRandomInt(120, 200) - image_height}px`;
        posistion.x = getRandomInt(950, 900) + "%";
        break;
    default:
      posistion.y = `${getRandomInt(580, 700) - image_height}px`;
      posistion.x = getRandomInt(1050, _w - 600) + "%";
      break;
  }

  return posistion;
}

export function obserCallback(entries = [], observer) {
  

  entries.forEach(async (entry) => {
    // check if it falls

    const start_fall = Boolean(entry.target.getAttribute("start-fall"));

    const index = entry.target.getAttribute('data-index') ;
    // remove observer if is start fall

    // if (start_fall) observer.unobserve(entry.target);
    // if (!entry.target.classList.contains('section-0')) {
    // const r = Math.floor(entry.intersectionRatio * 100);

    //  console.log(entry)
    // console.log("r", entry.intersectionRatio);
      // if (entry.boundingClientRect.top <= -15 && r >= 85 && !start_fall) {
       
    if (start_fall) observer.unobserve(entry.target);
    
    
       if(entry.isIntersecting) {
         console.log(entry.target.children.length)
        
        fall(
          entry.target,
          _dispatchEvent("section:fall", entry.target.getAttribute("data-fall"))
        );

        const time = entry.target.querySelector('.section-image').children.length * 0.045 * 900
         



        setTimeout(() => {
          entry.target.querySelector(`[data-section-fog="${index}"]`).style.display = "block";
        } , Math.floor(time))
       } 
        // add intersecting section to queue
      //   //  stack.push(entry.target);
      // }
    //}
    
    
    

    // console.log(stack)
  });
}

export function _dispatchEvent(name, message) {
  window.dispatchEvent(
    new CustomEvent(name, {
      detail: {
        target: message,
      },
    })
  );
}

export function fall(section, cb = null) {
  section.classList.add("container-section-img-fall");
  section.setAttribute("start-fall", 1);

  if (cb) cb();
  // return new Promise((resolve) => setTimeout(() => resolve(1), delay));
}

export function attache_observer(target = [] || "", observer) {
  if (Array.isArray(target)) {
    target.forEach((item) => observer.observe(item));

    return resolve(true);
  }
  observer.observe(target);
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(() => resolve(1), time));
}


export function  interploate(input, fromMax, fromMin, toMax, toMin , stop = null) {
  
               
  const value = (input - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    
  return value
  
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