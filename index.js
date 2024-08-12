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
let liftBtnClickCheck = 0;
let liftAnimate = false;
const FLOOR_KEY = "floor";

window.addEventListener("load", () => {
  let saveFloorCheck = JSON.parse(localStorage.getItem(FLOOR_KEY)) || [];

  // let saveFloorCheck.pop());

  if (saveFloorCheck.length !== 0) {
    gsap.to(lift, {
      top: Floors[5].getBoundingClientRect().top + "px",
      duration: 0,
    });
  }
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
          backgroundColor: "black",
          cursor: "pointer",
          zIndex: 10,
          opacity: 1,
        });
      }, 4000);
    },
  });
};
flooranimationChecker(4);

Array.from(liftBtns).forEach((liftBtnsElem) => {
  liftBtnsElem.addEventListener("click", (liftBtnsElemTarget) => {
    liftBtnClickCheck++;
    gsap.to(liftBtnsElem, {
      backgroundColor: "black",
    });
    let floorSave = JSON.parse(localStorage.getItem(FLOOR_KEY)) || [];
    Array.from(Floors).forEach((e, i) => {
      if (e.textContent === liftBtnsElemTarget.currentTarget.textContent) {
        floorRequestArray.push(i);
        floorSave.push(liftBtnsElemTarget.currentTarget.textContent);
        localStorage.setItem(FLOOR_KEY, JSON.stringify(floorSave));
        if (liftBtnClickCheck === 1 && i === 5) {
          flooranimationChecker(1);
          liftBtnClickCheck = 0;
        }
        gsap.to(liftBtns[i], {
          backgroundColor: "gray",
          cursor: "not-allowed",
          zIndex: -10,
          opacity: 0.5,
        });
        if (!liftAnimate) {
          flooranimationChecker(4);
        }
      }
    });
  });
});
