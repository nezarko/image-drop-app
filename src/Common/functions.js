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
  const image_height = 150;
  if (window.innerWidth > 1200) _w = 1200;

  // set positions of images in receiver section according to index
  switch (true) {
    case index >= 171:
      posistion.y = `${getRandomInt(100, 690) - image_height}px`;
      posistion.x = getRandomInt(560, _w -220 ) + "px";
      break;
    case index  >= 169 && index <= 170:
      posistion.y = `${getRandomInt(150, 880) - image_height}px`;
      posistion.x = getRandomInt(520, _w -180 ) + "px";
      break;
      case index >= 141 && index <= 167:
        posistion.y = `${getRandomInt(169, 750) - image_height}px`;
        posistion.x = getRandomInt(480, _w -30)+"px";
        break;
    case index >= 121 && index <= 140:
      posistion.y = `${getRandomInt(270, 790) - image_height}px`;
      posistion.x = getRandomInt(390, _w + 50) + "px";
      break;
    case index >= 98 && index <= 120:
      posistion.y = `${getRandomInt(250, 590) - image_height}px`;
      posistion.x = getRandomInt(220, _w + 80) + "px";
      break;

    case index >= 63 && index <= 97:
      posistion.y = `${getRandomInt(400, 790) - image_height}px`;
      posistion.x = getRandomInt(130, _w + 150) + "px";
      break;

    case index >= 41 && index <= 62:
      posistion.y = `${getRandomInt(590, 860) - image_height}px`;
      posistion.x = getRandomInt(20, _w+270) + "px";
      break;
      case index >=31 && index <= 40:
        posistion.y = `${getRandomInt(620, 870) - image_height}px`;
        posistion.x = getRandomInt(10, _w+360) + "px";
        break;
    case index <= 30:
      posistion.y = `${getRandomInt(780, 900) - image_height}px`;
      posistion.x = getRandomInt(-80, _w+ 400) + "px";
      break;

    default:
      posistion.y = `${getRandomInt(580, 700) - image_height}px`;
      posistion.x = getRandomInt(50, _w + 20) + "px";
      break;
  }

  return posistion;
}

export function obserCallback(entries = [], observer) {

  entries.forEach(async (entry) => {
    // check if it falls
    // console.log(`Et ${i}`, entry);

    const start_fall = Boolean(entry.target.getAttribute("start-fall"));
    // remove observer if is start fall

    // if (start_fall) observer.unobserve(entry.target);
    // if (!entry.target.classList.contains('section-0')) {
    const r = Math.floor(entry.intersectionRatio * 100);
    // console.log("r", entry.intersectionRatio);
      if (entry.boundingClientRect.top <= -15 && r >= 85 && !start_fall) {
       
        fall(
          entry.target,
          100000,
          _dispatchEvent("section:fall", entry.target.getAttribute("data-fall"))
        ); // add intersecting section to queue
        //  stack.push(entry.target);
      }
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

export function fall(section, delay = 3000, cb = null) {
  section.classList.add("container-section-img-fall");
  section.setAttribute("start-fall", 1);

  if (cb) cb();
  return new Promise((resolve) => setTimeout(() => resolve(1), delay));
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
/**
 * This function will only represent floawer fall from section while scroling
 * and only excute while section is in view port
 * flawers of section each apllay fall animation to it while in view port
 *
 * helper function needed (is_section_in_view_port , get_section_flaowers )
 * This function will excute in scrol event
 * so when section

 *  */