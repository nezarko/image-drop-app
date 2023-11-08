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
        fallFlowers(section);
      } else {
        // section.style.background = "red";
      }
    });
  }
};

// falling the image fun  code ..
export function fallFlowers(section, index) {
  const flowers = section.querySelectorAll(".section-img");
  const receiverSection = document.getElementById("receiver-section");
  const tl = gsap.timeline(1);
  flowers.forEach((flower, index) => {
    const startRotation = getRandomRotation();
    flower.setAttribute('data-flowe' , index)
    console.log(index, "index");
    tl.to(flower, {
      // y: () => getRandomInt(0, 850),
      opacity: 1,
      duration: 0.35,
      ease: "easeInSine",
    });
    // Add a callback to update the position and rotation at the bottom
    tl.add(() => {
      if (index > 140) {
        gsap.to(flower, {
          y: () => getRandomInt(50, 100),
          // y: () => getRandomInt(20, 50),
          left: () => getRandomInt(600, window.innerWidth - 800),
          backgroundColor:'green',
          rotation: startRotation,
          duration: 1,
          ease: "linear",
        });
      } else if (index >= 98 && index <= 140) {
        gsap.to(flower, {
          left: () => getRandomInt(400, window.innerWidth - 600),
          y: () => getRandomInt(100, 200),
          rotation: startRotation,
          duration: 1,
          ease: "linear",
        });
      } else if (index >= 61 && index <= 97) {
        gsap.to(flower, {
          left: () => getRandomInt(300, window.innerWidth - 400),
          y: () => getRandomInt(200, 400),
          rotation: startRotation,
          duration: 1,
          ease: "linear",
        });
      } else if (index >= 31 && index <= 60) {
        gsap.to(flower, {
          left: () => getRandomInt(200, window.innerWidth - 200),
          y: () => getRandomInt(400, 600),
          rotation: startRotation,
          duration: 1,
          ease: "linear",
        });
      } else if (index < 30) {
        gsap.to(flower, {
          left: () => getRandomInt(0, window.innerWidth - 100),
          y: () => getRandomInt(600, 800),
          rotation: startRotation,
          duration: 1,
          ease: "linear",
        });
      }
      receiverSection.appendChild(flower);
    }, `-=${0.1}`);
  });
}

export function getRandomRotation() {
  // Generate a random rotation value between -180 and 180 degrees
  return getRandomInt(-180, 180);
}

export function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}
