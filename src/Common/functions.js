
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
export function fallFlowers(section) {
  const flowers = section.querySelectorAll(".section-img");
  const receiverSection = document.getElementById("receiver-section");

  const tl = gsap.timeline(1);

  flowers.forEach((flower, index) => {
    const startRotation = getRandomRotation(90);

    tl.to(flower, {
      y: () => getRandomInt(0, 700),
      // x: () => getRandomInt(0, 100),
      // rotation: startRotation, // Initial rotation
      opacity: 10,
      duration: .35,
      ease: "linear",
    });

    // Add a callback to update the rotation at the bottom
    tl.add(() => {
      gsap.to(flower, {
        rotation: startRotation, // Add 360 degrees to the initial rotation
        duration: 1,
        ease: "linear",
      });
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
