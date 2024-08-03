const liftOpenDoor = () => {
  gsap.to(liftLeftDoor, {
    x: "-100%",
    duration: 1.5,
    ease: Power1.easeInOut,
    onComplete: () => {
      gsap.to(liftLeftDoor, {
        x: 0,
        delay: 1,
        duration: 1.2,
        ease: Power1.easeInOut,
      });
    },
  });
  gsap.to(liftRightDoor, {
    x: "100%",
    duration: 1.5,
    ease: Power1.easeInOut,
    onComplete: () => {
      gsap.to(liftRightDoor, {
        x: 0,
        delay: 1,
        duration: 1.2,
        ease: Power1.easeInOut,
      });
    },
  });
};

const liftFloors = document.querySelector(".lift-floors");
const liftBtns = document.querySelectorAll(".lift-btn");
const Floors = document.querySelectorAll(".floor");
const lift = document.querySelector(".lift");
const liftLeftDoor = document.querySelector(".lift-left-door");
const liftRightDoor = document.querySelector(".lift-right-door");

let liftAnimate = false;

gsap.to(lift, {
  top: Floors[5].getBoundingClientRect().top + "px",
  duration: 0,
});

const floorRequestArray = [];

const flooranimationChecker = (duration) => {
  if (floorRequestArray.length === 0) {
    liftAnimate = false;
    return;
  }

  liftAnimate = true;
  let floorRequestArrayIndex = floorRequestArray.shift();

  gsap.to(lift, {
    top: Floors[floorRequestArrayIndex].getBoundingClientRect().top + "px",
    duration: duration,
    ease: Power4.easeInOut,
    onComplete: () => {
      liftOpenDoor();
      setTimeout(() => {
        flooranimationChecker(4);
        gsap.to(liftBtns[floorRequestArrayIndex], {
          backgroundColor: "gray",
          zIndex: 1,
          opacity: 1,
          cursor: "pointer",
        });
      }, 4000);
    },
  });
};
flooranimationChecker(4);

Array.from(liftBtns).forEach((liftBtnsElem) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    gsap.to(liftBtnsElem, {
      backgroundColor: "black",
    });
    Array.from(Floors).forEach((e, i) => {
      if (e.textContent === liftBtnsElemTarget.currentTarget.textContent) {
        floorRequestArray.push(i);
        if (i === 5) {
          flooranimationChecker(1);
        }
        gsap.to(liftBtns[i], {
          backgroundColor: "black",
          zIndex: -1,
          cursor: "not-allowed",
        });
        if (!liftAnimate) {
          flooranimationChecker(4);
        }
      }
    });
  });
});

liftBtns.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    gsap.to(e, {
      duration: 0,
      backgroundColor: "black",
    });
  });
  e.addEventListener("mouseleave", () => {
    gsap.to(e, {
      duration: 0,
      backgroundColor: "grey",
    });
  });
});
